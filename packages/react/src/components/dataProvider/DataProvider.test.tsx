import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { render, waitFor, fireEvent, act, cleanup } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';

import useForceRender from '../../hooks/useForceRender';
import { getAllMockCallArgs, getMockCalls } from '../../utils/testHelpers';
import { Button } from '../button';
import { ChangeEvent, DataHandlers } from './DataContext';
import { DataProviderProps, DataProvider } from './DataProvider';
import {
  useDataStorage,
  useMetaDataStorage,
  useChangeTrigger,
  useContextDataHandlers,
  useDataContext,
  useAsyncChangeTrigger,
} from './hooks';
import { Storage, StorageData } from './storage';

type DomEventData = { rendered: number; mounted: number; unmounted: number; updateTime: number };
type DataPerId = DomEventData & {
  instanceId: string;
  instanceRenderCount: number;
  value: unknown;
  id: string;
};

type TestComponentProps = {
  id: string;
};

type TestData = {
  time: number;
  list: Array<string>;
  componentData: StorageData;
  keys?: StorageData;
  uuid: string;
};

describe('DataContext', () => {
  // this tracks how many times context's children are rendered and (un/)mounted
  const domEventsPerId = new Map<string, DomEventData>();
  const initialDomEventData: DomEventData = { rendered: 0, mounted: 0, unmounted: 0, updateTime: 0 };
  const contextTracker = jest.fn();
  const asyncTracker = jest.fn();
  const getDomEventDataPerId = (id: string) => {
    return domEventsPerId.get(id) || { ...initialDomEventData };
  };

  let renderCounter = 0;
  const getUpdateTime = () => {
    renderCounter += 1;
    return renderCounter;
  };
  // get the time a component was rendered.
  const getDomUpdateTime = (id: string) => {
    const current = getDomEventDataPerId(id);
    return current.updateTime;
  };

  // upadates domEvents of given id. Called in useEffect.
  const updateDomEventsPerId = (id: string, targetProp: keyof DomEventData) => {
    const current = getDomEventDataPerId(id);
    current[targetProp] += 1;
    current.updateTime = getUpdateTime();
    domEventsPerId.set(id, current);
  };

  const useDomEventCountHook = (id: string) => {
    // when component is mounted, these refs are initialized or reset.
    // domEventsPerId tracks all renders, this ref tracks only renders of this instance.
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

  const getOnClickUpdaterProps = (id: string) => {
    const trigger = useChangeTrigger();
    return {
      onClick: () => {
        trigger({ id, type: 'click' });
      },
    };
  };

  const getComponentKey = (metaData: TestData, componentProps: unknown) => {
    const keys = metaData.keys || {};
    const { id } = componentProps as unknown as { id: string };
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
    const data = useDataStorage<TestData>().get();
    contextTracker(useContextDataHandlers(), useDataStorage(), useMetaDataStorage());
    const value = String(data.componentData[id]);
    const { instanceRenderCount, instanceId } = useDomEventCountHook(id);
    const asyncTrigger = useAsyncChangeTrigger();
    const onClick = (success: boolean) => {
      const promise: Promise<ChangeEvent> = new Promise((resolve, reject) => {
        const resolver = () => {
          success ? resolve({ id, type: 'async', payload: { value: '4000' } }) : reject(new Error('Failed async call'));
        };
        setTimeout(resolver, 500);
      });
      success ? promise.then(asyncTracker) : promise.catch(asyncTracker);
      asyncTrigger(promise);
    };
    return (
      <div id={`${id}`}>
        <Button id={`button-${id}`} {...getOnClickUpdaterProps(id)}>
          Click me!
        </Button>
        <Button id={`button-${id}-async`} onClick={() => onClick(true)}>
          Successful Async test
        </Button>
        <Button id={`button-${id}-failed-async`} onClick={() => onClick(false)}>
          Failing Async test
        </Button>
        <span id={`render-count-${id}`}>{instanceRenderCount}</span>
        <span id={`instance-uuid-${id}`}>{instanceId}</span>
        <span id={`value-${id}`}>{value as string}</span>
      </div>
    );
  };
  // components that does not use context are not re-rendered when context changes.
  // calling useDataContext() to force re-render
  function ForceDataContextChildToUpdate<T = PropsWithChildren<unknown>>(f: React.FC<T>) {
    return (props: T) => {
      useDataContext();
      return f(props);
    };
  }

  // When key changes, the component is re-mounted
  function DataContextChildWithKeyTracking<T = PropsWithChildren<unknown>>(Comp: React.FC<T>) {
    return (props: T) => {
      const componentKey = getComponentKey(useMetaDataStorage<TestData>().get(), props);
      return <Comp {...{ ...props, key: componentKey }} />;
    };
  }

  const TestComponentWithKeyTracking = DataContextChildWithKeyTracking<TestComponentProps>(TestComponent);

  // tracks only whole data container's re-rendering process
  const DataContextRenderCounter = ForceDataContextChildToUpdate((props: PropsWithChildren<{ id: string }>) => {
    const { instanceRenderCount } = useDomEventCountHook(props.id);
    return <span id="render-count-context">{instanceRenderCount}</span>;
  });

  // renders dom
  const renderComponent = ({
    initialData,
    metaData,
    onReset,
  }: {
    initialData: TestData;
    metaData: TestData;
    onReset?: DataProviderProps<TestData, TestData>['onReset'];
  }) => {
    const onChange: DataProviderProps<TestData, TestData>['onChange'] = (event, dataHandlers) => {
      if (event.type === 'click') {
        const data = dataHandlers.getData();
        const currentValue = data.componentData[event.id] as number;
        const newComponentData = {
          ...data.componentData,
          [event.id]: currentValue + 1,
        };
        dataHandlers.updateData({ ...data, componentData: newComponentData });
        if (event.id === 'test3') {
          dataHandlers.updateMetaData(updateComponentKeyInMetaData(event.id, dataHandlers.getMetaData()));
        }
      }
      if (event.type === 'async') {
        const data = dataHandlers.getData();
        const newComponentData = {
          ...data.componentData,
          [event.id]: event.payload?.value,
        };
        dataHandlers.updateData({ ...data, componentData: newComponentData });
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
      // store data so it can be changed later to force a new Context instance.
      const dataRefs = useRef({ initialData, metaData, onChange, onReset });
      const updateData = () => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const { initialData, metaData, onChange, onReset } = dataRefs.current;
        dataRefs.current = {
          initialData: {
            ...initialData,
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            componentData: updatedComponentData,
            time: getUpdateTime(),
          },
          metaData,
          onChange,
          onReset,
        };
        rerender();
      };
      const updateMetaData = () => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const { initialData, metaData, onChange, onReset } = dataRefs.current;
        dataRefs.current = {
          initialData,
          onChange,
          onReset,
          metaData: {
            ...metaData,
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            componentData: updatedMetaComponentData,
            time: getUpdateTime(),
          },
        };
        rerender();
      };
      const updateOnChange = () => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const { initialData, metaData, onReset } = dataRefs.current;
        dataRefs.current = {
          initialData,
          onChange: () => {
            throw new Error('This should not happen');
          },
          metaData,
          onReset,
        };
        rerender();
      };
      return (
        <div>
          <Button id="button-re-render" onClick={onClick}>
            Re-render
          </Button>
          <Button id="button-toggle-context" onClick={toggleContext}>
            Show/hide context
          </Button>
          <Button id="button-update-data" onClick={updateData}>
            Update data
          </Button>
          <Button id="button-update-metadata" onClick={updateMetaData}>
            Update metadata
          </Button>
          <Button id="button-update-onChange" onClick={updateOnChange}>
            Update onChange
          </Button>
          {renderContext && (
            <div id="container-wrapper">
              <DataProvider
                initialData={dataRefs.current.initialData}
                metaData={dataRefs.current.metaData}
                onChange={dataRefs.current.onChange}
                onReset={dataRefs.current.onReset}
              >
                <TestComponent id="test1" key="key1" />
                <TestComponent id="test2" key="key2" />
                <TestComponentWithKeyTracking id="test3" key="key3" />
                <TestComponent id="test4" key="key4" />
                <DataContextRenderCounter id="context-counter" key="counter" />
              </DataProvider>
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
      await executeAndWaitForUpdate(() => clickButton('re-render'));
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
      const domEvents = getDomEventDataPerId(id);
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

    // store dom data into arrays for easy comparisons after re-renders
    const createComponentDataStorage = (id: string, testData: TestData) => {
      const storage = [getRenderedComponentDataPerId(id, testData)] as Array<Partial<DataPerId>>;
      const get = (index = -1): DataPerId => {
        const arrIndex = index < 0 ? storage.length + index : index;
        return storage[arrIndex] as DataPerId;
      };
      return {
        appendData: (partial: Partial<DataPerId>) => {
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

  // contextTracker stores last context props used in components.
  const getLastContextTrackerCall = (): DataHandlers => {
    const calls = getAllMockCallArgs(contextTracker);
    return calls[calls.length - 1];
  };

  const getDataHandlersFromUseContextDataHandlersCalls = (): DataHandlers => {
    return getLastContextTrackerCall()[0];
  };

  const getDataStorageFromUseContextDataHandlersCalls = (): Storage => {
    return getLastContextTrackerCall()[1];
  };

  const getMetaDataStorageFromUseContextDataHandlersCalls = (): Storage => {
    return getLastContextTrackerCall()[2];
  };

  const getUsedContextInstances = () => {
    const dataHandlers = getDataHandlersFromUseContextDataHandlersCalls();
    return [
      dataHandlers,
      dataHandlers.getData(),
      dataHandlers.getMetaData(),
      getDataStorageFromUseContextDataHandlersCalls(),
      getMetaDataStorageFromUseContextDataHandlersCalls(),
    ];
  };

  const increaseValueByOne = (value?: number) => {
    return typeof value !== 'number' ? 0 : value + 1;
  };

  // increase tracked values by one after remount
  const updateComponentDataAfterReMount = (previousData: Partial<DataPerId>): Partial<DataPerId> => {
    return {
      ...previousData,
      mounted: increaseValueByOne(previousData.mounted),
      rendered: increaseValueByOne(previousData.rendered),
      unmounted: increaseValueByOne(previousData.unmounted),
      instanceRenderCount: 1,
    };
  };

  // increase tracked values by one after re-render
  const updateComponentDataAfterInstanceRender = (previousData: Partial<DataPerId>): Partial<DataPerId> => {
    return {
      ...previousData,
      rendered: increaseValueByOne(previousData.rendered),
      instanceRenderCount: increaseValueByOne(previousData.instanceRenderCount),
    };
  };

  const getDataById = (testData: TestData, id: string): number => {
    return Reflect.get(testData.componentData, id) as number;
  };

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
    domEventsPerId.clear();
  });

  const initialData: TestData = {
    time: getUpdateTime(),
    list: [],
    componentData: { test1: 100, test2: 200, test3: 300, test4: 0 },
    uuid: uuidv4(),
  };
  const metaData: TestData = {
    time: getUpdateTime(),
    list: [],
    componentData: { test1: 1000, test2: 2000, test3: 3000, test4: 0 },
    uuid: uuidv4(),
  };

  const updatedMetaComponentData = {
    test1: -1000,
    test2: -2000,
    test3: -3000,
  };

  const updatedComponentData = {
    test1: -100,
    test2: -200,
    test3: -300,
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
    test1Storage.appendData({ instanceId: getInstanceId('test1') });
    test2Storage.appendData({ instanceId: getInstanceId('test2') });

    expect(collectAllDataPerId('test1')).toMatchObject(test1Storage.get());
    expect(collectAllDataPerId('test2')).toMatchObject(test2Storage.get());

    await rerenderAll();
    test1Storage.appendData(updateComponentDataAfterInstanceRender(test1Storage.get()));
    test2Storage.appendData(updateComponentDataAfterInstanceRender(test2Storage.get()));
    expect(collectAllDataPerId('test1')).toMatchObject(test1Storage.get());
    expect(collectAllDataPerId('test2')).toMatchObject(test2Storage.get());
    await rerenderAll();
    test1Storage.appendData(updateComponentDataAfterInstanceRender(test1Storage.get()));
    test2Storage.appendData(updateComponentDataAfterInstanceRender(test2Storage.get()));
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
    const { clickButton, executeAndWaitForUpdate, getInstanceId, createComponentDataStorage, collectAllDataPerId } =
      renderComponent({ initialData, metaData });
    const test1Storage = createComponentDataStorage('test1', initialData);
    test1Storage.appendData({ instanceId: getInstanceId('test1') });

    await executeAndWaitForUpdate(() => {
      clickButton('test1');
    });

    test1Storage.appendData({
      ...updateComponentDataAfterInstanceRender(test1Storage.get()),
      instanceId: test1Storage.get().instanceId,
      value: String(getDataById(initialData, 'test1') + 1),
    });

    expect(collectAllDataPerId('test1')).toMatchObject(test1Storage.get());
  });
  it('Component whose key changes, is re-mounted', async () => {
    const { clickButton, executeAndWaitForUpdate, getInstanceId, createComponentDataStorage, collectAllDataPerId } =
      renderComponent({ initialData, metaData });
    const test3Storage = createComponentDataStorage('test3', initialData);
    test3Storage.appendData({ instanceId: getInstanceId('test1') });

    await executeAndWaitForUpdate(() => {
      clickButton('test3');
    });

    test3Storage.appendData({
      ...updateComponentDataAfterReMount(test3Storage.get()),
      instanceId: getInstanceId('test3'),
      value: String(getDataById(initialData, 'test3') + 1),
    });
    expect(collectAllDataPerId('test3')).toMatchObject(test3Storage.get());
  });
  it('Data instances does not change when Context or parent re-renders, if props remains the same', async () => {
    const { executeAndWaitForUpdate, rerenderAll, clickButton } = renderComponent({
      initialData,
      metaData,
    });

    const [dataHandlersV1, dataV1, metaDataV1, dataStorageV1, metaDataStorageV1] = getUsedContextInstances();
    await rerenderAll();

    const [dataHandlersV2, dataV2, metaDataV2] = getUsedContextInstances();
    expect(dataHandlersV2).toBe(dataHandlersV1);
    expect(dataV2).toBe(dataV1);
    expect(metaDataV2).toBe(metaDataV1);

    await executeAndWaitForUpdate(() => {
      clickButton('test1');
    });
    const [dataHandlersV3, dataV3, metaDataV3] = getUsedContextInstances();
    expect(dataHandlersV3).toBe(dataHandlersV2);
    expect(dataV3).not.toBe(dataV2);
    expect(metaDataV3).toBe(metaDataV2);
    await rerenderAll();
    await executeAndWaitForUpdate(() => {
      // this will update metaData:
      clickButton('test3');
    });
    const [dataHandlersV4, dataV4, metaDataV4, dataStorageV4, metaDataStorageV4] = getUsedContextInstances();
    expect(dataHandlersV4).toBe(dataHandlersV3);
    expect(dataV4).not.toBe(dataV3);
    expect(metaDataV4).not.toBe(metaDataV3);
    expect(dataStorageV4).toBe(dataStorageV1);
    expect(metaDataStorageV4).toBe(metaDataStorageV1);
  });
  it('Data and dataHandlers instances change when initialData is changed. MetaData is not changed.', async () => {
    const { executeAndWaitForUpdate, clickButton, collectAllDataPerId } = renderComponent({
      initialData,
      metaData,
    });
    const [dataHandlersV1, dataV1, metaDataV1, dataStorageV1, metaDataStorageV1] = getUsedContextInstances();
    await executeAndWaitForUpdate(() => {
      clickButton('update-data');
    });
    const [dataHandlersV2, dataV2, metaDataV2, dataStorageV2, metaDataStorageV2] = getUsedContextInstances();
    expect(dataHandlersV2).not.toBe(dataHandlersV1);
    expect(dataV2).not.toBe(dataV1);
    expect(metaDataV2).toBe(metaDataV1);
    expect(dataStorageV2).not.toBe(dataStorageV1);
    expect(metaDataStorageV2).toBe(metaDataStorageV1);
    expect(collectAllDataPerId('test1')).toMatchObject({
      id: 'test1',
      instanceRenderCount: 2,
      mounted: 1,
      rendered: 2,
      unmounted: 0,
      value: '-100',
    });
    expect(collectAllDataPerId('test2')).toMatchObject({
      id: 'test2',
      instanceRenderCount: 2,
      mounted: 1,
      rendered: 2,
      unmounted: 0,
      value: '-200',
    });
  });
  it('MetaData and dataHandlers instances change when metaData is changed. Data is not changed.', async () => {
    const { executeAndWaitForUpdate, clickButton, collectAllDataPerId } = renderComponent({
      initialData,
      metaData,
    });
    await executeAndWaitForUpdate(() => {
      clickButton('test1');
      clickButton('test2');
    });

    const [dataHandlersV1, dataV1, metaDataV1, dataStorageV1, metaDataStorageV1] = getUsedContextInstances();
    await executeAndWaitForUpdate(() => {
      clickButton('update-metadata');
    });
    const [dataHandlersV2, dataV2, metaDataV2, dataStorageV2, metaDataStorageV2] = getUsedContextInstances();
    expect(dataHandlersV2).not.toBe(dataHandlersV1);
    expect(dataV2).toBe(dataV1);
    expect(metaDataV2).not.toBe(metaDataV1);
    expect(dataStorageV2).toBe(dataStorageV1);
    expect(metaDataStorageV2).not.toBe(metaDataStorageV1);
    expect(collectAllDataPerId('test1')).toMatchObject({
      id: 'test1',
      mounted: 1,
      rendered: 3,
      unmounted: 0,
      value: '101',
    });
    expect(collectAllDataPerId('test2')).toMatchObject({
      id: 'test2',
      mounted: 1,
      rendered: 3,
      unmounted: 0,
      value: '201',
    });
  });
  it('The onChange callback is memoized.', async () => {
    const { executeAndWaitForUpdate, clickButton, collectAllDataPerId } = renderComponent({
      initialData,
      metaData,
    });
    await executeAndWaitForUpdate(() => {
      clickButton('test2');
    });
    expect(collectAllDataPerId('test2')).toMatchObject({
      id: 'test2',
      mounted: 1,
      rendered: 2,
      unmounted: 0,
      value: '201',
    });
    await executeAndWaitForUpdate(() => {
      clickButton('update-onChange');
    });
    await executeAndWaitForUpdate(() => {
      clickButton('test2');
    });
    expect(collectAllDataPerId('test2')).toMatchObject({
      id: 'test2',
      mounted: 1,
      rendered: 4,
      unmounted: 0,
      value: '202',
    });
  });
  it('asyncRequestWithTrigger accepts a promise and triggers the result as an event', async () => {
    const { executeAndWaitForUpdate, clickButton, collectAllDataPerId } = renderComponent({
      initialData,
      metaData,
    });
    const dataHandlers = getDataHandlersFromUseContextDataHandlersCalls();
    const triggerSpy = jest.spyOn(dataHandlers, 'trigger');
    expect(collectAllDataPerId('test4')).toMatchObject({
      id: 'test4',
      mounted: 1,
      rendered: 1,
      unmounted: 0,
      value: '0',
    });
    await executeAndWaitForUpdate(() => {
      clickButton('test4-async');
    });
    await waitFor(() => {
      expect(asyncTracker).toHaveBeenCalledTimes(1);
      expect(triggerSpy).toHaveBeenCalledTimes(1);
    });
    expect(collectAllDataPerId('test4')).toMatchObject({
      id: 'test4',
      mounted: 1,
      rendered: 2,
      unmounted: 0,
      value: '4000',
    });
  });
  it('asyncRequestWithTrigger ignores failed promises.', async () => {
    const { clickButton } = renderComponent({
      initialData,
      metaData,
    });
    const dataHandlers = getDataHandlersFromUseContextDataHandlersCalls();
    const triggerSpy = jest.spyOn(dataHandlers, 'trigger');
    clickButton('test4-failed-async');
    await waitFor(() => {
      expect(asyncTracker).toHaveBeenCalledTimes(1);
      expect(triggerSpy).toHaveBeenCalledTimes(0);
    });
  });
  it('async triggers are properly handled also after component teardown', async () => {
    // without the unmount check with isComponentUnmounted
    // console.error would be called with "Can't perform a React state update on an unmounted component"
    const logSpy = jest.spyOn(global.console, 'error');
    const { clickButton, toggleContext } = renderComponent({
      initialData,
      metaData,
    });
    clickButton('test4-async');
    expect(asyncTracker).toHaveBeenCalledTimes(0);
    await toggleContext();
    await waitFor(() => {
      expect(asyncTracker).toHaveBeenCalledTimes(1);
    });
    expect(logSpy).toHaveBeenCalledTimes(0);
  });
  it('onReset is not called when component mounts or when re-rendered internally', async () => {
    const onReset = jest.fn();
    const { executeAndWaitForUpdate, clickButton, getInstanceRenderCount } = renderComponent({
      initialData,
      metaData,
      onReset,
    });
    await executeAndWaitForUpdate(() => {
      clickButton('test1');
    });
    await executeAndWaitForUpdate(() => {
      clickButton('test2');
    });
    await executeAndWaitForUpdate(() => {
      clickButton('test3');
    });
    await executeAndWaitForUpdate(() => {
      clickButton('update-onChange');
    });
    expect(onReset).toHaveBeenCalledTimes(0);
    expect(getInstanceRenderCount('test1')).toBe(5);
  });
  it("onReset is not called when component's parent re-renders and data or metaData has not changed.", async () => {
    const onReset = jest.fn();
    const { rerenderAll } = renderComponent({
      initialData,
      metaData,
      onReset,
    });
    await rerenderAll();
    expect(onReset).toHaveBeenCalledTimes(0);
  });
  it("onReset is called when component's parent re-renders with new data or metaData", async () => {
    const onResetTracker = jest.fn();
    const onReset: DataProviderProps<TestData, TestData>['onReset'] = (args) => {
      onResetTracker(args);
      const { currentData, currentMetaData } = args;
      return (currentData || currentMetaData) as TestData;
    };
    const { clickButton, rerenderAll } = renderComponent({
      initialData,
      metaData,
      onReset,
    });
    clickButton('update-data');
    await rerenderAll();
    expect(onResetTracker).toHaveBeenCalledTimes(1);
    await rerenderAll();
    expect(onResetTracker).toHaveBeenCalledTimes(1);
    clickButton('update-metadata');
    await rerenderAll();
    expect(onResetTracker).toHaveBeenCalledTimes(2);
    await rerenderAll();
    expect(onResetTracker).toHaveBeenCalledTimes(2);
  });
  it('onReset can alter given data which is stored as new', async () => {
    const onResetTracker = jest.fn();
    // alter data.componentData with this data set
    const newValues = [
      { test1: 'newValue1' },
      { test1: 'newValue1.1', test2: 'newValue2' },
      { test2: 'newValue2.1', test3: 'newValue3' },
    ];
    const onReset: DataProviderProps<TestData, TestData>['onReset'] = (args) => {
      const { currentData, previousData, currentMetaData, previousMetaData } = args;
      // track only data changes i.e. currentData is set
      if (currentData) {
        const { componentData } = currentData;
        const callCount = getMockCalls(onResetTracker).length;
        const newValue = newValues[callCount];
        const { componentData: previousComponentData } = previousData || {};
        // construct new data
        const newData = { ...currentData, componentData: { ...previousComponentData, ...componentData, ...newValue } };
        // track passed data and the new modified data.
        onResetTracker({
          componentData,
          previousComponentData,
          result: newData.componentData,
          currentMetaData,
          previousMetaData,
        });

        return newData;
      }

      return currentMetaData as TestData;
    };
    const { clickButton, rerenderAll, getValue } = renderComponent({
      initialData,
      metaData,
      onReset,
    });
    // first data update
    clickButton('update-data');
    await rerenderAll();
    expect(onResetTracker).toHaveBeenCalledTimes(1);
    expect(onResetTracker).toHaveBeenLastCalledWith({
      previousComponentData: initialData.componentData,
      componentData: updatedComponentData,
      result: {
        ...initialData.componentData,
        ...updatedComponentData,
        test1: 'newValue1',
      },
      currentMetaData: undefined,
      previousMetaData: undefined,
    });

    expect(getValue('test1')).toBe(newValues[0].test1);

    // second data update
    clickButton('update-data');
    await rerenderAll();
    expect(onResetTracker).toHaveBeenCalledTimes(2);
    expect(onResetTracker).toHaveBeenLastCalledWith({
      previousComponentData: {
        ...initialData.componentData,
        ...updatedComponentData,
        test1: 'newValue1',
      },
      componentData: updatedComponentData,
      result: {
        ...initialData.componentData,
        ...updatedComponentData,
        test1: 'newValue1.1',
        test2: 'newValue2',
      },
      currentMetaData: undefined,
      previousMetaData: undefined,
    });

    expect(getValue('test1')).toBe(newValues[1].test1);
    expect(getValue('test2')).toBe(newValues[1].test2);

    // third data update
    clickButton('update-data');
    await rerenderAll();
    expect(onResetTracker).toHaveBeenCalledTimes(3);
    expect(onResetTracker).toHaveBeenLastCalledWith({
      previousComponentData: {
        ...initialData.componentData,
        ...updatedComponentData,
        test1: 'newValue1.1',
        test2: 'newValue2',
      },
      componentData: updatedComponentData,
      result: {
        ...initialData.componentData,
        ...updatedComponentData,
        test2: 'newValue2.1',
        test3: 'newValue3',
      },
      currentMetaData: undefined,
      previousMetaData: undefined,
    });

    expect(getValue('test1')).toBe('-100');
    expect(getValue('test2')).toBe(newValues[2].test2);
    expect(getValue('test3')).toBe(newValues[2].test3);
  });
  it('onReset can alter given metadata which is stored as new', async () => {
    const onResetTracker = jest.fn();
    // alter metadata.componentData with this data set
    const newMetaValues = [
      { test1: 'newMetaValue1' },
      { test1: 'newMetaValue1.1', test2: 'newMetaValue2' },
      { test2: 'newMetaValue2.1', test3: 'newMetaValue3' },
    ];
    const onReset: DataProviderProps<TestData, TestData>['onReset'] = (args) => {
      const { currentData, previousData, currentMetaData, previousMetaData } = args;
      // track only metadata changes i.e. currentMetaData is set
      if (currentMetaData) {
        const { componentData } = currentMetaData;
        const callCount = getMockCalls(onResetTracker).length;
        const newMetaValue = newMetaValues[callCount];
        const { componentData: previousComponentData } = previousMetaData || {};
        const newMetaData = {
          ...currentMetaData,
          componentData: { ...previousComponentData, ...componentData, ...newMetaValue },
        };
        // track passed metadata and the new modified metadata.
        onResetTracker({
          componentData,
          previousComponentData,
          result: newMetaData.componentData,
          currentData,
          previousData,
        });

        return newMetaData;
      }

      return currentData as TestData;
    };
    const { clickButton, rerenderAll } = renderComponent({
      initialData,
      metaData,
      onReset,
    });
    clickButton('update-metadata');
    await rerenderAll();
    expect(onResetTracker).toHaveBeenCalledTimes(1);
    expect(onResetTracker).toHaveBeenLastCalledWith({
      previousComponentData: metaData.componentData,
      componentData: updatedMetaComponentData,
      result: {
        ...metaData.componentData,
        ...updatedMetaComponentData,
        test1: 'newMetaValue1',
      },
      currentData: undefined,
      previousData: undefined,
    });

    clickButton('update-metadata');
    await rerenderAll();
    expect(onResetTracker).toHaveBeenCalledTimes(2);
    expect(onResetTracker).toHaveBeenLastCalledWith({
      previousComponentData: {
        ...metaData.componentData,
        ...updatedMetaComponentData,
        test1: 'newMetaValue1',
      },
      componentData: updatedMetaComponentData,
      result: {
        ...metaData.componentData,
        ...updatedMetaComponentData,
        test1: 'newMetaValue1.1',
        test2: 'newMetaValue2',
      },
      currentData: undefined,
      previousData: undefined,
    });

    clickButton('update-metadata');
    await rerenderAll();
    expect(onResetTracker).toHaveBeenCalledTimes(3);
    expect(onResetTracker).toHaveBeenLastCalledWith({
      previousComponentData: {
        ...metaData.componentData,
        ...updatedMetaComponentData,
        test1: 'newMetaValue1.1',
        test2: 'newMetaValue2',
      },
      componentData: updatedMetaComponentData,
      result: {
        ...metaData.componentData,
        ...updatedMetaComponentData,
        test2: 'newMetaValue2.1',
        test3: 'newMetaValue3',
      },
      currentData: undefined,
      previousData: undefined,
    });
  });
});
