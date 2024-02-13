import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { render, waitFor, fireEvent, act, cleanup } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';

import useForceRender from '../../../hooks/useForceRender';
import { getAllMockCallArgs } from '../../../utils/testHelpers';
import { Button } from '../../button';
import { TextInput } from '../../textInput';
import DataContainer, { DataBase, DataContainerProps, Tools } from './DataContext';
import { useDataStorage, useMetaDataStorage, useChangeTrigger, useContextTools, useDataContext } from './hooks';
import { Storage } from '../../group/utils/storage';

type DomEventData = { rendered: number; mounted: number; unmounted: number; updateTime: number };
type DataPerId = DomEventData & {
  instanceId: string;
  instanceRenderCount: number;
  value: unknown;
  id: string;
};

/* eslint-disable react/no-unused-prop-types */
type TestComponentProps = {
  id: string;
  value?: string;
  key: string;
  onButtonClick?: () => void;
  onTextInputChange?: () => void;
};
/* eslint-enable react/no-unused-prop-types */

type TestData = {
  time: number;
  list: Array<string>;
  componentData: DataBase;
  keys?: DataBase;
  uuid: string;
};

describe('DataContext', () => {
  // track how many times context's children are rendered and (un/)mounted
  const domEventsPerId = new Map<string, DomEventData>();
  const initialDomEventData: DomEventData = { rendered: 0, mounted: 0, unmounted: 0, updateTime: 0 };
  const contextTracker = jest.fn();
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
    testData: TestData,
  ): Omit<DataPerId, 'updateTime' | 'instanceId'> => {
    return {
      id,
      instanceRenderCount: 1,
      rendered: 1,
      mounted: 1,
      unmounted: 0,
      // getValue() returns element's innerHTML which is a string
      // so data[id] must also be a string to use expect.toBe()
      value: String(testData.componentData[id]),
    };
  };

  const getOnClickUpdaterProps = (id: string) => {
    const trigger = useChangeTrigger();
    return {
      onClick: () => {
        trigger({ id, type: 'click' });
      },
    };
  };

  const getOnChangeUpdaterProps = (id: string) => {
    const trigger = useChangeTrigger();
    return {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        trigger({ id, type: 'change', payload: { value: e.currentTarget.value } });
      },
    };
  };

  const getComponentKey = (metaData: TestData, componentProps: unknown) => {
    const keys = metaData.keys || {};
    const { id } = (componentProps as unknown) as { id: string };
    return String(keys[id] || id) || undefined;
  };

  const updateComponentKeyInMetaData = (id: string, metaData: TestData) => {
    const keys = metaData.keys || {};
    keys[id] = uuidv4();
    return {
      ...metaData,
      keys,
    };
  };

  const TestComponent = (componentProps: TestComponentProps) => {
    const { id } = componentProps;
    const contextData = useDataStorage().get() as TestData;
    contextTracker(useContextTools(), useDataStorage(), useMetaDataStorage());
    const value = String(contextData.componentData[id]);
    const { instanceRenderCount, instanceId } = domEventCountHook(id || 'no-id');
    return (
      <div id={`${id}`}>
        <Button id={`button-${id}`} {...getOnClickUpdaterProps(id)}>
          Click me!
        </Button>
        <TextInput id={`input-${id}`} value={value} {...getOnChangeUpdaterProps(id)} />
        <span id={`render-count-${id}`}>{instanceRenderCount}</span>
        <span id={`instance-uuid-${id}`}>{instanceId}</span>
        <span id={`value-${id}`}>{value as string}</span>
      </div>
    );
  };

  function ForceDataContextChildToUpdate<T = PropsWithChildren<unknown>>(f: React.FC<T>) {
    return (props: T) => {
      useDataContext();
      return f(props);
    };
  }

  function DataContextChildWithKeyTracking<T = PropsWithChildren<unknown>>(Comp: React.FC<T>) {
    return (props: T) => {
      const componentKey = getComponentKey(useMetaDataStorage().get() as TestData, props);
      return <Comp {...{ ...props, key: componentKey }} />;
      // return React.cloneElement(f, { ...props, key: componentKey });
    };
  }

  const TestComponentWithKeyTracking = DataContextChildWithKeyTracking<TestComponentProps>(TestComponent);

  // tracks only whole data container's re-rendering process
  const DataContextRenderCounter = ForceDataContextChildToUpdate((props: PropsWithChildren<{ id: string }>) => {
    const { instanceRenderCount } = domEventCountHook(props.id);
    // console.log('---instanceRenderCount', instanceRenderCount);
    return <span id="render-count-context">{instanceRenderCount}</span>;
  });

  const renderComponent = ({ initialData, metaData }: { initialData: TestData; metaData: TestData }) => {
    const onChange: DataContainerProps<TestData, TestData>['onChange'] = (event, tools) => {
      if (event.type === 'click') {
        const data = tools.getData() as TestData;
        const currentValue = data.componentData[event.id] as number;
        const newComponentData = {
          ...data.componentData,
          [event.id]: currentValue + 1,
        };
        // console.log('onChange', event);
        // console.log('data', data);
        // console.log('new', { ...data, componentData: newComponentData });
        tools.updateData({ ...data, componentData: newComponentData });
        if (event.id === 'test3') {
          tools.updateMetaData(updateComponentKeyInMetaData(event.id, (tools.getMetaData() as unknown) as TestData));
        }
      }
      return true;
    };

    const Root = () => {
      const [renderContext, toggleRenderContext] = useState(true);
      const rerender = useForceRender();
      const onClick = () => {
        rerender();
      };
      const toggleContext = () => {
        toggleRenderContext((current) => !current);
      };
      return (
        <div>
          <Button id="button-re-render" onClick={onClick}>
            Re-render
          </Button>
          <Button id="button-toggle-context" onClick={toggleContext}>
            Show/hide context
          </Button>
          {renderContext && (
            <div id="container-wrapper">
              <DataContainer initialData={initialData} metaData={metaData} onChange={onChange}>
                <TestComponent id="test1" key="key1" />
                <TestComponent id="test2" key="key2" />
                <TestComponentWithKeyTracking id="test3" key="key3" />
                <DataContextRenderCounter id="context-counter" key="counter" />
              </DataContainer>
            </div>
          )}
        </div>
      );
    };

    const result = render(<Root />);

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
        const lastUpdateTime = getDomUpdateTime('context-counter');
        executor();
        await waitFor(() => {
          if (getDomUpdateTime('context-counter') === lastUpdateTime) {
            throw new Error('Context not updated');
          }
        });
      });
    };

    const rerenderAll = async () => {
      await act(async () => {
        const lastUpdateTime = getDomUpdateTime('context-counter');
        clickButton('re-render');
        await waitFor(() => {
          if (getDomUpdateTime('context-counter') === lastUpdateTime) {
            throw new Error('Context not updated');
          }
        });
      });
    };

    const toggleContext = async () => {
      await act(async () => {
        const isVisible = !!getElementById('container-wrapper');
        clickButton('toggle-context');
        await waitFor(() => {
          if (!!getElementById('container-wrapper') === isVisible) {
            throw new Error('Context not toggled');
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
    const createComponentDataStorage = (id: string, testData: TestData) => {
      const storage = [getRenderedComponentDataPerId(id, testData)] as Array<Partial<DataPerId>>;
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
      toggleContext,
      getInstanceId,
      collectAllDataPerId,
      createComponentDataStorage,
    };
  };

  const getLastContextTrackerCall = (): Tools => {
    const calls = getAllMockCallArgs(contextTracker);
    return calls[calls.length - 1];
  };
  const getToolsFromUseContextToolsCalls = (): Tools => {
    return getLastContextTrackerCall()[0];
  };
  const getDataStorageFromUseContextToolsCalls = (): Storage => {
    return getLastContextTrackerCall()[1];
  };
  const getMetaDataStorageFromUseContextToolsCalls = (): Storage => {
    return getLastContextTrackerCall()[2];
  };
  /*
  const getControllerByIdFromPropSetterCalls = (id: string) => {
    const calls = getAllMockCallArgs(propSetterTracker).filter((call) => call[0] === id);
    return calls[calls.length - 1][1];
  }; */

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

  const getDataById = (testData: TestData, id: string): number => {
    return Reflect.get(testData.componentData, id);
  };

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
    domEventsPerId.clear();
  });

  describe('Basic components are rendered with given data', () => {
    const initialData: TestData = {
      time: Date.now(),
      list: [],
      componentData: { test1: 100, test2: 200, test3: 300 },
      uuid: uuidv4(),
    };
    const metaData: TestData = {
      time: Date.now(),
      list: [],
      componentData: { test1: 1000, test2: 2000, test3: 3000 },
      uuid: uuidv4(),
    };
    it('Data is passed to components and all components are rendered with proper data.', async () => {
      const { collectAllDataPerId, createComponentDataStorage, getValue } = renderComponent({
        initialData,
        metaData,
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
    it('Component is not re-mounted even if whole context is re-rendered', async () => {
      const { rerenderAll, getInstanceId, collectAllDataPerId, createComponentDataStorage } = renderComponent({
        initialData,
        metaData,
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

    it('Component whose data changed, but key did not, is not re-mounted', async () => {
      const {
        clickButton,
        executeAndWaitForUpdate,
        getInstanceId,
        createComponentDataStorage,
        collectAllDataPerId,
      } = renderComponent({ initialData, metaData });
      const test1Storage = createComponentDataStorage('test1', initialData);
      test1Storage.addWithMerge({ instanceId: getInstanceId('test1') });

      await executeAndWaitForUpdate(() => {
        clickButton('test1');
      });

      test1Storage.addWithMerge({
        ...updateComponentDataAfterInstanceRender(test1Storage.get()),
        instanceId: test1Storage.get().instanceId,
        value: String(getDataById(initialData, 'test1') + 1),
      });

      expect(collectAllDataPerId('test1')).toMatchObject(test1Storage.get());
    });
    it('Component whose key changes, is re-mounted', async () => {
      const {
        clickButton,
        executeAndWaitForUpdate,
        getInstanceId,
        createComponentDataStorage,
        collectAllDataPerId,
      } = renderComponent({ initialData, metaData });
      const test3Storage = createComponentDataStorage('test3', initialData);
      test3Storage.addWithMerge({ instanceId: getInstanceId('test1') });

      await executeAndWaitForUpdate(() => {
        clickButton('test3');
      });

      test3Storage.addWithMerge({
        ...updateComponentDataAfterReMount(test3Storage.get()),
        instanceId: getInstanceId('test3'),
        value: String(getDataById(initialData, 'test3') + 1),
      });
      expect(collectAllDataPerId('test3')).toMatchObject(test3Storage.get());
    });
    it('Data instances does not change when Context or parent re-renders, if initialData remains the same', async () => {
      const { executeAndWaitForUpdate, rerenderAll, clickButton } = renderComponent({
        initialData,
        metaData,
      });

      const pickInstances = () => {
        const tools = getToolsFromUseContextToolsCalls();
        return [
          tools,
          tools.getData(),
          tools.getMetaData(),
          getDataStorageFromUseContextToolsCalls(),
          getMetaDataStorageFromUseContextToolsCalls(),
        ];
      };

      const [toolsV1, dataV1, metaDataV1, dataStorageV1, metaDataStorageV1] = pickInstances();
      await rerenderAll();

      const [toolsV2, dataV2, metaDataV2] = pickInstances();
      expect(toolsV2).toBe(toolsV1);
      expect(dataV2).toBe(dataV1);
      expect(metaDataV2).toBe(metaDataV1);

      await executeAndWaitForUpdate(() => {
        clickButton('test1');
      });
      const [toolsV3, dataV3, metaDataV3] = pickInstances();
      expect(toolsV3).toBe(toolsV2);
      expect(dataV3).not.toBe(dataV2);
      expect(metaDataV3).toBe(metaDataV2);
      await rerenderAll();
      await executeAndWaitForUpdate(() => {
        // this will update metaData:
        clickButton('test3');
      });
      const [toolsV4, dataV4, metaDataV4, dataStorageV4, metaDataStorageV4] = pickInstances();
      expect(toolsV4).toBe(toolsV3);
      expect(dataV4).not.toBe(dataV3);
      expect(metaDataV4).not.toBe(metaDataV3);
      expect(dataStorageV4).toBe(dataStorageV1);
      expect(metaDataStorageV4).toBe(metaDataStorageV1);
    });
  });
});
