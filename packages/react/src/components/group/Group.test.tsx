import React, { createRef, useEffect, useRef, useState } from 'react';
import { render, waitFor, fireEvent, act, cleanup } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';

import { Group, RenderWithController } from './Group';
import { GroupChild, GroupProps, PropSetter } from './utils';
import { Button } from '../button';
import { TextInput } from '../textInput';
import useForceRender from '../../hooks/useForceRender';
import { getAllMockCallArgs } from '../../utils/testHelpers';
import { StorageData } from './utils/storage';
import { ForwardController } from './utils/forwardController';

type DomEventData = { rendered: number; mounted: number; unmounted: number; updateTime: number };
type DataPerId = DomEventData & {
  instanceId: string;
  instanceRenderCount: number;
  value: unknown;
  id: string;
};

/* eslint-disable react/no-unused-prop-types */
type TestComponentProps = {
  id?: string;
  value?: string;
  key?: string;
  onButtonClick?: () => void;
  onTextInputChange?: () => void;
};
/* eslint-enable react/no-unused-prop-types */

type ControllerData = Record<string, number | string>;

describe('Group', () => {
  // track how many times group's children are rendered and (un/)mounted
  const domEventsPerId = new Map<string, DomEventData>();
  const initialDomEventData: DomEventData = { rendered: 0, mounted: 0, unmounted: 0, updateTime: 0 };
  const propSetterTracker = jest.fn();

  const getCurrentDomEventData = (id: string) => {
    return domEventsPerId.get(id) || { ...initialDomEventData };
  };

  const getDomUpdateTime = (id: string) => {
    const current = getCurrentDomEventData(id);
    return current.updateTime;
  };

  const updateDomEventsPerId = (id: string, targetProp: keyof DomEventData) => {
    const current = getCurrentDomEventData(id);
    current[targetProp] += 1;
    current.updateTime = Date.now();
    domEventsPerId.set(id, current);
  };

  const domEventCountHook = (id: string) => {
    // when component is mounted, these refs are initialized or reset.
    // domEventsPerId tracks all renders, this ref only renders of this instance.
    const instanceRenderCountRef = useRef(1);
    // instanceIdRef changes when new instance is created.
    const instanceIdRef = useRef(uuidv4());
    useEffect(() => {
      updateDomEventsPerId(id, 'mounted');
      return () => {
        updateDomEventsPerId(id, 'unmounted');
      };
    }, []);
    useEffect(() => {
      updateDomEventsPerId(id, 'rendered');
      instanceRenderCountRef.current += 1;
    });
    return { instanceRenderCount: instanceRenderCountRef.current, instanceId: instanceIdRef.current };
  };

  // return initial render data of a component when it has been mounted once.
  const getRenderedComponentDataPerId = (
    id: string,
    data: StorageData,
  ): Omit<DataPerId, 'updateTime' | 'instanceId'> => {
    return {
      id,
      instanceRenderCount: 1,
      rendered: 1,
      mounted: 1,
      unmounted: 0,
      // getValue() returns element's innerHTML which is a string
      // so data[id] must also be a string to use expect.toBe()
      value: String(data[id]),
    };
  };

  const TestComponent = React.forwardRef<HTMLDivElement, TestComponentProps>((componentProps, ref) => {
    const { id, value, onButtonClick, onTextInputChange } = componentProps;
    const { instanceRenderCount, instanceId } = domEventCountHook(id || 'no-id');
    return (
      <div id={`${id}`} ref={ref}>
        <Button id={`button-${id}`} onClick={onButtonClick}>
          Click me!
        </Button>
        <TextInput id={`input-${id}`} value={value} onChange={onTextInputChange} />
        <span id={`render-count-${id}`}>{instanceRenderCount}</span>
        <span id={`instance-uuid-${id}`}>{instanceId}</span>
        <span id={`value-${id}`}>{value as string}</span>
      </div>
    );
  });

  // tracks only whole group's re-rendering process
  const GroupRenderCounter: GroupChild = () => {
    const id = 'group';
    const { instanceRenderCount } = domEventCountHook(id);
    return <span id="render-count-group">{instanceRenderCount}</span>;
  };

  const ForwardedController = ForwardController<{ childId?: string }>((props, controller) => {
    const id = String(props.id);
    const { childId } = props;
    const value = (controller.getData() as ControllerData)[id];
    const { instanceRenderCount, instanceId } = domEventCountHook(id);
    const onButtonClick = () => {
      controller.triggerChange({ id, type: 'click' });
    };
    return (
      <>
        <Button id={`button-${id}`} onClick={onButtonClick}>
          Click me!
        </Button>
        <span id={`render-count-${id}`}>{instanceRenderCount}</span>
        <span id={`instance-uuid-${id}`}>{instanceId}</span>
        <span id={`value-${id}`}>{value as string}</span>
        {childId && (
          <RenderWithController controller={controller}>
            <TestComponent id={childId} key={childId} />
          </RenderWithController>
        )}
      </>
    );
  });

  const renderComponent = ({
    initialData,
    dataSets,
    componentIds,
    updateKeys,
  }: {
    initialData: StorageData;
    dataSets?: Array<StorageData>;
    componentIds: string[];
    updateKeys?: boolean;
  }) => {
    const propSetter: PropSetter = ({ id, controller, elementProps }) => {
      propSetterTracker(id, controller, elementProps);
      return {
        id,
        value: (controller.getData() as ControllerData)[id],
        onButtonClick: () => {
          controller.triggerChange({ id, type: 'click' });
        },
        onTextInputChange: (e: React.KeyboardEvent<HTMLInputElement>) => {
          controller.triggerChange({ id, type: 'change', payload: { value: e.currentTarget.value } });
        },
      };
    };

    const onChange: GroupProps['onChange'] = (changeProps) => {
      const { controller, id } = changeProps;
      const currentData = (controller.getData() as ControllerData)[id];
      controller.updateData({
        data: { [id as string]: Number(currentData) + 1 },
        updateKeys: [updateKeys !== false ? id : ''],
      });
    };

    // multiple dataSets are used for controller re-initialization
    // when initialData changes.
    const getGroupInitialData = (): StorageData => {
      if (dataSets) {
        return dataSets.shift() as StorageData;
      }
      return initialData;
    };

    const GroupWrapper = () => {
      const [renderGroup, toggleRenderGroup] = useState(true);
      const rerender = useForceRender();
      const onClick = () => {
        rerender();
      };
      const toggleGroup = () => {
        toggleRenderGroup((current) => !current);
      };
      return (
        <div>
          <Button id="button-wrapper" onClick={onClick}>
            Re-render
          </Button>
          <Button id="button-toggleGroup" onClick={toggleGroup}>
            Show/hide group
          </Button>
          {renderGroup && (
            <div id="group-wrapper">
              <Group propSetter={propSetter} initialData={getGroupInitialData()} onChange={onChange}>
                {componentIds.includes('test1') && <TestComponent id="test1" key="key1" />}
                {componentIds.includes('test2') && <TestComponent id="test2" key="key2" />}
                {componentIds.includes('test3') && <ForwardedController id="test3" key="key3" />}
                {componentIds.includes('test4') && <ForwardedController id="test4" key="key4" childId="test4_0" />}
                {componentIds.includes('test5') &&
                  (({ controller }) => {
                    return (
                      <RenderWithController controller={controller} key="renderWithController">
                        <TestComponent id="test5" key="key5" />
                      </RenderWithController>
                    );
                  })}
                <p key="p">I am just a child</p>
                <GroupRenderCounter key="counter" />
              </Group>
            </div>
          )}
        </div>
      );
    };

    const result = render(<GroupWrapper />);

    const getElementById = (id: string) => {
      return result.container.querySelector(`#${id}`) as HTMLElement;
    };

    const getInstanceRenderCount = (id: string) => {
      return parseInt(getElementById(`render-count-${id}`).innerHTML, 10);
    };
    const getInstanceId = (id: string) => {
      return getElementById(`instance-uuid-${id}`).innerHTML;
    };

    const getValue = (id: string) => {
      return getElementById(`value-${id}`).innerHTML;
    };

    const clickButton = (id: string) => {
      const el = getElementById(`button-${id}`);
      fireEvent.click(el);
    };

    const executeAndWaitForUpdate = async (executor: () => void) => {
      await act(async () => {
        const lastUpdateTime = getDomUpdateTime('group');
        executor();
        await waitFor(() => {
          if (getDomUpdateTime('group') === lastUpdateTime) {
            throw new Error('Group not updated');
          }
        });
      });
    };

    const rerenderAll = async () => {
      await act(async () => {
        const lastUpdateTime = getDomUpdateTime('group');
        clickButton('wrapper');
        await waitFor(() => {
          if (getDomUpdateTime('wrapper') === lastUpdateTime) {
            throw new Error('Wrapper not updated');
          }
        });
      });
    };

    const toggleGroup = async () => {
      await act(async () => {
        const isVisible = !!getElementById('group-wrapper');
        clickButton('toggleGroup');
        await waitFor(() => {
          if (!!getElementById('group-wrapper') === isVisible) {
            throw new Error('Group not toggled');
          }
        });
      });
    };

    const collectAllDataPerId = (id: string): DataPerId => {
      const domEvents = getCurrentDomEventData(id);
      const instanceId = getInstanceId(id);
      const instanceRenderCount = getInstanceRenderCount(id);
      const value = getValue(id);
      return {
        ...domEvents,
        instanceId,
        instanceRenderCount,
        value,
        id,
      };
    };

    // store component's data for easy comparisons after re-renders
    const createComponentDataStorage = (id: string, groupData: StorageData) => {
      const storage = [getRenderedComponentDataPerId(id, groupData)] as Array<Partial<DataPerId>>;
      const get = (index = -1): DataPerId => {
        const arrIndex = index < 0 ? storage.length + index : index;
        return storage[arrIndex] as DataPerId;
      };
      return {
        add: (data: Partial<DataPerId>) => {
          storage.push(data);
        },
        addWithMerge: (partial: Partial<DataPerId>) => {
          const last = get();
          storage.push({ ...last, ...partial });
        },
        get,
      };
    };

    return {
      ...result,
      getInstanceRenderCount,
      getElementById,
      getValue,
      clickButton,
      executeAndWaitForUpdate,
      rerenderAll,
      toggleGroup,
      getInstanceId,
      collectAllDataPerId,
      createComponentDataStorage,
    };
  };

  const getControllerFromPropSetterCalls = () => {
    const calls = getAllMockCallArgs(propSetterTracker);
    return calls[calls.length - 1][1];
  };

  const getControllerByIdFromPropSetterCalls = (id: string) => {
    const calls = getAllMockCallArgs(propSetterTracker).filter((call) => call[0] === id);
    return calls[calls.length - 1][1];
  };

  const increaseValueByOne = (value?: number) => {
    return typeof value !== 'number' ? 0 : value + 1;
  };

  const updateComponentDataAfterReMount = (previousData: Partial<DataPerId>): Partial<DataPerId> => {
    return {
      ...previousData,
      mounted: increaseValueByOne(previousData.mounted),
      rendered: increaseValueByOne(previousData.rendered),
      unmounted: increaseValueByOne(previousData.unmounted),
      instanceRenderCount: 1,
    };
  };

  const updateComponentDataAfterInstanceRender = (previousData: Partial<DataPerId>): Partial<DataPerId> => {
    return {
      ...previousData,
      rendered: increaseValueByOne(previousData.rendered),
      instanceRenderCount: increaseValueByOne(previousData.instanceRenderCount),
    };
  };

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
    domEventsPerId.clear();
  });

  describe('Basic components are rendered with propSetter and given data', () => {
    const initialData = {
      test1: 100,
      test2: 2000,
    };
    const componentIds = ['test1', 'test2'];
    it('Data is passed to components and all components are rendered with proper data.', async () => {
      const { collectAllDataPerId, createComponentDataStorage, getValue } = renderComponent({
        initialData,
        componentIds,
      });
      const test1Storage = createComponentDataStorage('test1', initialData);
      // automatic data comparision
      expect(collectAllDataPerId('test1')).toMatchObject(test1Storage.get());
      // manual data comparision
      expect(collectAllDataPerId('test2')).toMatchObject({
        id: 'test2',
        rendered: 1,
        mounted: 1,
        unmounted: 0,
        value: getValue('test2'),
      });
    });
    it('Component is not re-mounted even if whole group is re-rendered', async () => {
      const { rerenderAll, getInstanceId, collectAllDataPerId, createComponentDataStorage } = renderComponent({
        initialData,
        componentIds,
      });
      const test1Storage = createComponentDataStorage('test1', initialData);
      const test2Storage = createComponentDataStorage('test2', initialData);

      // store instaceIds so those can be compared.
      test1Storage.addWithMerge({ instanceId: getInstanceId('test1') });
      test2Storage.addWithMerge({ instanceId: getInstanceId('test2') });

      expect(collectAllDataPerId('test1')).toMatchObject(test1Storage.get());
      expect(collectAllDataPerId('test2')).toMatchObject(test2Storage.get());

      await rerenderAll();
      test1Storage.addWithMerge(updateComponentDataAfterInstanceRender(test1Storage.get()));
      test2Storage.addWithMerge(updateComponentDataAfterInstanceRender(test2Storage.get()));
      expect(collectAllDataPerId('test1')).toMatchObject(test1Storage.get());
      expect(collectAllDataPerId('test2')).toMatchObject(test2Storage.get());
      await rerenderAll();
      test1Storage.addWithMerge(updateComponentDataAfterInstanceRender(test1Storage.get()));
      test2Storage.addWithMerge(updateComponentDataAfterInstanceRender(test2Storage.get()));
      expect(collectAllDataPerId('test1')).toMatchObject(test1Storage.get());
      expect(collectAllDataPerId('test2')).toMatchObject(test2Storage.get());

      // manual data comparision to make sure automation works
      expect(collectAllDataPerId('test2')).toMatchObject({
        id: 'test2',
        rendered: 3,
        unmounted: 0,
        mounted: 1,
        instanceRenderCount: 3,
      });

      // verify instanceIds did not change
      expect(test1Storage.get(-1).instanceId).toBe(test1Storage.get(-2).instanceId);
      expect(test1Storage.get(-2).instanceId).toBe(test1Storage.get(-3).instanceId);

      // verify instanceIds did not change
      expect(test2Storage.get(-1).instanceId).toBe(test2Storage.get(-2).instanceId);
      expect(test2Storage.get(-2).instanceId).toBe(test2Storage.get(-3).instanceId);
    });
    it('Only the component whose data and key changes is re-mounted', async () => {
      const {
        rerenderAll,
        clickButton,
        executeAndWaitForUpdate,
        getInstanceId,
        createComponentDataStorage,
        collectAllDataPerId,
      } = renderComponent({ initialData, componentIds });
      const test1Storage = createComponentDataStorage('test1', initialData);
      const test2Storage = createComponentDataStorage('test2', initialData);
      test1Storage.addWithMerge({ instanceId: getInstanceId('test1') });
      test2Storage.addWithMerge({ instanceId: getInstanceId('test2') });

      // one call for each group component * render times
      expect(propSetterTracker).toHaveBeenCalledTimes(2);
      await executeAndWaitForUpdate(() => {
        clickButton('test1');
      });

      test1Storage.addWithMerge({
        ...updateComponentDataAfterReMount(test1Storage.get()),
        instanceId: getInstanceId('test1'),
        value: String(initialData.test1 + 1),
      });
      test2Storage.addWithMerge(updateComponentDataAfterInstanceRender(test2Storage.get()));
      expect(collectAllDataPerId('test1')).toMatchObject(test1Storage.get());
      expect(collectAllDataPerId('test2')).toMatchObject(test2Storage.get());
      // one call for each component * render times
      expect(propSetterTracker).toHaveBeenCalledTimes(4);
      await executeAndWaitForUpdate(() => {
        clickButton('test2');
      });

      test1Storage.addWithMerge(updateComponentDataAfterInstanceRender(test1Storage.get()));
      test2Storage.addWithMerge({
        ...updateComponentDataAfterReMount(test2Storage.get()),
        instanceId: getInstanceId('test2'),
        value: String(initialData.test2 + 1),
      });

      expect(collectAllDataPerId('test1')).toMatchObject(test1Storage.get());
      expect(collectAllDataPerId('test2')).toMatchObject(test2Storage.get());
      expect(test1Storage.get().rendered).toBe(3);
      expect(test2Storage.get().rendered).toBe(3);
      // one call for each component * render times
      expect(propSetterTracker).toHaveBeenCalledTimes(6);
      await rerenderAll();
      test1Storage.addWithMerge(updateComponentDataAfterInstanceRender(test1Storage.get()));
      test2Storage.addWithMerge(updateComponentDataAfterInstanceRender(test2Storage.get()));
      expect(collectAllDataPerId('test1')).toMatchObject(test1Storage.get());
      expect(collectAllDataPerId('test2')).toMatchObject(test2Storage.get());

      expect(collectAllDataPerId('test2')).toMatchObject({
        id: 'test2',
        rendered: 4,
        unmounted: 1,
        mounted: 2,
        instanceRenderCount: 2,
      });

      // one call for each component * render times
      expect(propSetterTracker).toHaveBeenCalledTimes(8);
    });
    it('Component whose data changed, but key did not, is not re-mounted', async () => {
      const {
        clickButton,
        executeAndWaitForUpdate,
        getInstanceId,
        createComponentDataStorage,
        collectAllDataPerId,
      } = renderComponent({ initialData, componentIds, updateKeys: false });
      const test1Storage = createComponentDataStorage('test1', initialData);
      test1Storage.addWithMerge({ instanceId: getInstanceId('test1') });

      await executeAndWaitForUpdate(() => {
        clickButton('test1');
      });

      test1Storage.addWithMerge({
        ...updateComponentDataAfterInstanceRender(test1Storage.get()),
        instanceId: test1Storage.get().instanceId,
        value: String(initialData.test1 + 1),
      });

      expect(collectAllDataPerId('test1')).toMatchObject(test1Storage.get());
    });
    it('Controller instance does not change when Group or parent re-renders, if initialData remains the same', async () => {
      const { executeAndWaitForUpdate, rerenderAll, clickButton, collectAllDataPerId } = renderComponent({
        initialData,
        componentIds,
      });
      const controller = getControllerFromPropSetterCalls();
      await executeAndWaitForUpdate(() => {
        clickButton('test1');
      });
      expect(getControllerFromPropSetterCalls()).toBe(controller);
      await rerenderAll();
      await executeAndWaitForUpdate(() => {
        clickButton('test1');
      });
      expect(getControllerFromPropSetterCalls()).toBe(controller);
      await rerenderAll();
      expect(getControllerFromPropSetterCalls()).toBe(controller);
      await executeAndWaitForUpdate(() => {
        clickButton('test1');
      });
      expect(collectAllDataPerId('test1')).toMatchObject({
        id: 'test1',
        rendered: 6,
        unmounted: 3,
        mounted: 4,
        instanceRenderCount: 1,
        value: String(initialData.test1 + 3),
      });
      expect(collectAllDataPerId('test2')).toMatchObject({
        id: 'test2',
        rendered: 6,
        unmounted: 0,
        mounted: 1,
        instanceRenderCount: 6,
        value: String(initialData.test2),
      });
    });
    it('Controller instance changes when initialData is changed. Component values is updated to the new value from the initialData.', async () => {
      const dataSets = [
        { ...initialData, test1: 400000, test2: 7000, key: 1 },
        { ...initialData, test1: 500000, test2: 8000, key: 2 },
        { ...initialData, test1: 600000, test2: 9000, key: 3 },
      ];
      const { executeAndWaitForUpdate, rerenderAll, clickButton, collectAllDataPerId, getValue } = renderComponent({
        dataSets: [...dataSets],
        initialData: {},
        componentIds,
      });
      const controller = getControllerFromPropSetterCalls();
      await executeAndWaitForUpdate(() => {
        clickButton('test1');
      });
      expect(getControllerFromPropSetterCalls()).toBe(controller);
      expect(getValue('test1')).toBe(String(dataSets[0].test1 + 1));

      await rerenderAll();
      const newController = getControllerFromPropSetterCalls();
      expect(newController).not.toBe(controller);
      expect(getValue('test1')).toBe(String(dataSets[1].test1));
      expect(getValue('test2')).toBe(String(dataSets[1].test2));

      await executeAndWaitForUpdate(() => {
        clickButton('test1');
      });
      expect(getControllerFromPropSetterCalls()).toBe(newController);

      await rerenderAll();
      const newestController = getControllerFromPropSetterCalls();
      expect(newestController).not.toBe(newController);
      expect(getValue('test1')).toBe(String(dataSets[2].test1));
      expect(getValue('test2')).toBe(String(dataSets[2].test2));

      await executeAndWaitForUpdate(() => {
        clickButton('test1');
      });
      expect(getControllerFromPropSetterCalls()).toBe(newestController);
      expect(collectAllDataPerId('test1')).toMatchObject({
        id: 'test1',
        rendered: 6,
        unmounted: 5,
        mounted: 6,
        instanceRenderCount: 1,
        value: String(dataSets[2].test1 + 1),
      });
      expect(collectAllDataPerId('test2')).toMatchObject({
        id: 'test2',
        rendered: 6,
        unmounted: 0,
        mounted: 1,
        instanceRenderCount: 6,
        value: String(dataSets[2].test2),
      });
      // one call for each component * render times
      expect(propSetterTracker).toHaveBeenCalledTimes(12);
    });
  });
  describe('ForwardController and plain function', () => {
    const initialData = {
      test3: 300,
      test4: 400,
      test4_0: 4000,
      test5: 500,
    };
    const componentIds = ['test3', 'test4', 'test5'];
    it('Receives controller as a function argument and uses it with children.', async () => {
      const { collectAllDataPerId, createComponentDataStorage } = renderComponent({
        initialData,
        componentIds,
      });
      const test3Storage = createComponentDataStorage('test3', initialData);
      const test4Storage = createComponentDataStorage('test4', initialData);
      const test40Storage = createComponentDataStorage('test4_0', initialData);
      const test5Storage = createComponentDataStorage('test5', initialData);
      expect(collectAllDataPerId('test3')).toMatchObject(test3Storage.get());
      expect(collectAllDataPerId('test4')).toMatchObject(test4Storage.get());
      expect(collectAllDataPerId('test4_0')).toMatchObject(test40Storage.get());
      expect(collectAllDataPerId('test5')).toMatchObject(test5Storage.get());
    });
    it('Only the component whose data and key changes is re-mounted', async () => {
      const {
        rerenderAll,
        clickButton,
        executeAndWaitForUpdate,
        getInstanceId,
        createComponentDataStorage,
        collectAllDataPerId,
      } = renderComponent({ initialData, componentIds });
      const test3Storage = createComponentDataStorage('test3', initialData);
      const test4Storage = createComponentDataStorage('test4', initialData);
      const test40Storage = createComponentDataStorage('test4_0', initialData);
      const test5Storage = createComponentDataStorage('test5', initialData);
      test3Storage.addWithMerge({ instanceId: getInstanceId('test3') });
      test4Storage.addWithMerge({ instanceId: getInstanceId('test4') });
      test40Storage.addWithMerge({ instanceId: getInstanceId('test4_0') });
      test5Storage.addWithMerge({ instanceId: getInstanceId('test5') });

      // one call for each component * render times
      expect(propSetterTracker).toHaveBeenCalledTimes(4);
      await executeAndWaitForUpdate(() => {
        clickButton('test3');
      });

      test3Storage.addWithMerge({
        ...updateComponentDataAfterReMount(test3Storage.get()),
        instanceId: getInstanceId('test3'),
        value: String(initialData.test3 + 1),
      });
      test4Storage.addWithMerge(updateComponentDataAfterInstanceRender(test4Storage.get()));
      test40Storage.addWithMerge(updateComponentDataAfterInstanceRender(test40Storage.get()));
      test5Storage.addWithMerge(updateComponentDataAfterInstanceRender(test5Storage.get()));
      expect(collectAllDataPerId('test3')).toMatchObject(test3Storage.get());
      expect(collectAllDataPerId('test4')).toMatchObject(test4Storage.get());
      expect(collectAllDataPerId('test4_0')).toMatchObject(test40Storage.get());
      expect(collectAllDataPerId('test5')).toMatchObject(test5Storage.get());
      // one call for each component * render times
      expect(propSetterTracker).toHaveBeenCalledTimes(8);
      await executeAndWaitForUpdate(() => {
        clickButton('test4');
      });

      test3Storage.addWithMerge(updateComponentDataAfterInstanceRender(test3Storage.get()));
      test4Storage.addWithMerge({
        ...updateComponentDataAfterReMount(test4Storage.get()),
        instanceId: getInstanceId('test4'),
        value: String(initialData.test4 + 1),
      });
      test40Storage.addWithMerge({
        ...updateComponentDataAfterReMount(test40Storage.get()),
        instanceId: getInstanceId('test4_0'),
        value: String(initialData.test4_0),
      });
      test5Storage.addWithMerge(updateComponentDataAfterInstanceRender(test5Storage.get()));

      expect(collectAllDataPerId('test3')).toMatchObject(test3Storage.get());
      expect(collectAllDataPerId('test4')).toMatchObject(test4Storage.get());
      expect(collectAllDataPerId('test4_0')).toMatchObject(test40Storage.get());
      expect(collectAllDataPerId('test5')).toMatchObject(test5Storage.get());
      expect(test3Storage.get().rendered).toBe(3);
      expect(test4Storage.get().rendered).toBe(3);
      expect(test40Storage.get().rendered).toBe(3);
      expect(test5Storage.get().rendered).toBe(3);
      // one call for each component * render times
      expect(propSetterTracker).toHaveBeenCalledTimes(12);
      await rerenderAll();
      test3Storage.addWithMerge(updateComponentDataAfterInstanceRender(test3Storage.get()));
      test4Storage.addWithMerge(updateComponentDataAfterInstanceRender(test4Storage.get()));
      test40Storage.addWithMerge(updateComponentDataAfterInstanceRender(test40Storage.get()));
      test5Storage.addWithMerge(updateComponentDataAfterInstanceRender(test5Storage.get()));
      expect(collectAllDataPerId('test3')).toMatchObject(test3Storage.get());
      expect(collectAllDataPerId('test4')).toMatchObject(test4Storage.get());
      expect(collectAllDataPerId('test4_0')).toMatchObject(test40Storage.get());
      expect(collectAllDataPerId('test5')).toMatchObject(test5Storage.get());

      expect(collectAllDataPerId('test5')).toMatchObject({
        id: 'test5',
        rendered: 4,
        unmounted: 0,
        mounted: 1,
        instanceRenderCount: 4,
      });

      // one call for each component * render times
      expect(propSetterTracker).toHaveBeenCalledTimes(16);
    });
    it('Same controller instance is passed to all components. Also after update.', async () => {
      const dataSets = [
        { ...initialData, test3: 400000, test4: 7000, test4_0: 10000, test5: 3000, key: 1 },
        { ...initialData, test3: 400001, test4: 7001, test4_0: 10001, test5: 3001, key: 2 },
      ];
      const { rerenderAll, getValue } = renderComponent({
        dataSets: [...dataSets],
        initialData: {},
        componentIds,
      });
      const test3Controller = getControllerByIdFromPropSetterCalls('test3');
      expect(test3Controller).toBe(getControllerByIdFromPropSetterCalls('test4'));
      expect(test3Controller).toBe(getControllerByIdFromPropSetterCalls('test4_0'));
      expect(test3Controller).toBe(getControllerByIdFromPropSetterCalls('test5'));

      expect(getValue('test3')).toBe(String(dataSets[0].test3));
      expect(getValue('test4')).toBe(String(dataSets[0].test4));
      expect(getValue('test4_0')).toBe(String(dataSets[0].test4_0));
      expect(getValue('test5')).toBe(String(dataSets[0].test5));

      await rerenderAll();
      const newTest3Controller = getControllerByIdFromPropSetterCalls('test3');
      expect(newTest3Controller).not.toBe(test3Controller);
      expect(newTest3Controller).toBe(getControllerByIdFromPropSetterCalls('test4'));
      expect(newTest3Controller).toBe(getControllerByIdFromPropSetterCalls('test4_0'));
      expect(newTest3Controller).toBe(getControllerByIdFromPropSetterCalls('test5'));

      expect(getValue('test3')).toBe(String(dataSets[1].test3));
      expect(getValue('test4')).toBe(String(dataSets[1].test4));
      expect(getValue('test4_0')).toBe(String(dataSets[1].test4_0));
      expect(getValue('test5')).toBe(String(dataSets[1].test5));
    });
  });
});
