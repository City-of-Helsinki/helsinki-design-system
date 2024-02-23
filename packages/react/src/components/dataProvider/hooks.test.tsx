import React, { useEffect, useRef } from 'react';
import { render, waitFor, fireEvent, act, cleanup } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';

import { getAllMockCallArgs } from '../../utils/testHelpers';
import { Button } from '../button';
import { ChangeEvent, DataContextContent, DataHandlers } from './DataContext';
import { DataProviderProps, DataProvider } from './DataProvider';
import {
  useAsyncChangeTrigger,
  useChangeTrigger,
  useContextDataHandlers,
  useDataContext,
  useDataStorage,
  useMetaDataStorage,
} from './hooks';
import useForceRender from '../../hooks/useForceRender';
import { Storage } from './storage';

type TestData = {
  time: number;
  uuid: string;
};

describe('DataContext hooks', () => {
  const hookReturnValueTester = jest.fn();
  const onChangeTracker = jest.fn();
  const updateTracker = jest.fn();
  const asyncTracker = jest.fn();
  const getNewTestData = (): TestData => {
    const newData: TestData = {
      time: Date.now(),
      uuid: uuidv4(),
    };
    updateTracker(newData);
    return newData;
  };

  const ids = {
    dataContextHook: 'data-context-hook',
    dataStorageHook: 'data-storage-hook',
    metaDataStorageHook: 'metadata-storage-hook',
    handlersHook: 'handlers-hook',
    rerenderHook: 're-render-hook',
    triggerHook: 'trigger-hook',
    asyncTriggerHook: 'async-trigger-hook',
  };

  const DataContextHookTest = () => {
    const id = ids.dataContextHook;
    const context = useDataContext();
    hookReturnValueTester(id, context);
    return (
      <div>
        <Button id={`button-${id}`} onClick={() => context.dataHandlers.trigger({ id: 'foo' })}>
          Re-render
        </Button>
      </div>
    );
  };

  const ContextDataStorageHookTest = () => {
    const id = ids.dataStorageHook;
    const storage = useDataStorage();
    hookReturnValueTester(id, storage);
    const updateData = () => {
      storage.set(getNewTestData());
    };
    return (
      <div>
        <Button id={`button-${id}`} onClick={updateData}>
          Update
        </Button>
      </div>
    );
  };

  const ContextMetaDataStorageHookTest = () => {
    const id = ids.metaDataStorageHook;
    const storage = useMetaDataStorage();
    hookReturnValueTester(id, storage);
    const updateMetaData = () => {
      storage.set(getNewTestData());
    };
    return (
      <div>
        <Button id={`button-${id}`} onClick={updateMetaData}>
          Update
        </Button>
      </div>
    );
  };

  const ContextDataHandlersHookTest = () => {
    const id = ids.handlersHook;
    const handlers = useContextDataHandlers();
    hookReturnValueTester(id, handlers);
    const trigger = () => handlers.trigger({ id: 'handler' });
    return (
      <div>
        <Button id={`button-${id}`} onClick={trigger}>
          Trigger
        </Button>
      </div>
    );
  };

  const ContextTriggerHookTest = () => {
    const id = ids.triggerHook;
    const trigger = useChangeTrigger();
    hookReturnValueTester(id, trigger);
    const triggerOnClick = () => {
      trigger({ id: 'updateMetaData', payload: { value: getNewTestData() } });
    };
    return (
      <div>
        <Button id={`button-${id}`} onClick={triggerOnClick}>
          Trigger
        </Button>
      </div>
    );
  };

  const ContextAsyncTriggerHookTest = () => {
    const id = ids.asyncTriggerHook;
    const asyncTrigger = useAsyncChangeTrigger();
    hookReturnValueTester(id, asyncTrigger);
    const triggerOnClick = () => {
      const promise: Promise<ChangeEvent> = new Promise((resolve) => {
        const resolver = () => {
          const event = { id: 'updateMetaData', payload: { value: getNewTestData() } };
          resolve(event);
        };
        setTimeout(resolver, 300);
      });
      promise.finally(asyncTracker);
      asyncTrigger(promise);
    };
    return (
      <div>
        <Button id={`button-${id}`} onClick={triggerOnClick}>
          Trigger
        </Button>
      </div>
    );
  };

  const useRenderCountHook = () => {
    const instanceRenderCountRef = useRef(1);

    useEffect(() => {
      instanceRenderCountRef.current += 1;
    });
    return instanceRenderCountRef.current;
  };

  // tracks only whole data container's re-rendering process
  const DataContextRenderCounter = () => {
    // components that does not use context are not re-rendered when context changes.
    // calling useDataContext() to force re-render
    useDataContext();
    const count = useRenderCountHook();
    return <span id="render-time-context">{count}</span>;
  };

  const initialData: TestData = {
    time: Date.now(),
    uuid: uuidv4(),
  };

  const metaData: TestData = {
    time: Date.now(),
    uuid: uuidv4(),
  };

  // renders dom
  const renderComponent = () => {
    const onChange: DataProviderProps<TestData, TestData>['onChange'] = (event, dataHandlers) => {
      onChangeTracker(event, dataHandlers);
      const { id, payload } = event;
      const data = payload && (payload.value as TestData);
      if (id === 'updateData' && data) {
        dataHandlers.updateData(data);
      }
      if (id === 'updateMetaData' && data) {
        dataHandlers.updateMetaData(data);
      }
      return true;
    };

    const Root = () => {
      const forceRender = useForceRender();
      const onClick = () => {
        forceRender();
      };

      return (
        <div>
          <Button id="button-re-render" onClick={onClick}>
            Re-render
          </Button>
          <DataProvider initialData={initialData} metaData={metaData} onChange={onChange}>
            <DataContextHookTest key="key1" />
            <ContextDataHandlersHookTest key="key2" />
            <ContextDataStorageHookTest key="key3" />
            <ContextMetaDataStorageHookTest key="key4" />
            <ContextTriggerHookTest key="key5" />
            <ContextAsyncTriggerHookTest key="key6" />
            <DataContextRenderCounter key="counter" />
          </DataProvider>
        </div>
      );
    };

    const result = render(<Root />);

    const getElementById = (id: string) => {
      return result.container.querySelector(`#${id}`) as HTMLElement;
    };

    const getInstanceRenderTime = (id: string) => {
      return parseInt(getElementById(`render-time-${id}`).innerHTML, 10);
    };

    const clickButton = (id: string) => {
      const el = getElementById(`button-${id}`);
      fireEvent.click(el);
    };

    const executeAndWaitForUpdate = async (executor: () => void) => {
      await act(async () => {
        const lastUpdateTime = getInstanceRenderTime('context');
        executor();
        await waitFor(() => {
          if (getInstanceRenderTime('context') === lastUpdateTime) {
            throw new Error('Context not updated');
          }
        });
      });
    };

    const rerenderAll = async () => {
      await executeAndWaitForUpdate(() => clickButton('re-render'));
    };

    return {
      ...result,
      getElementById,
      clickButton,
      executeAndWaitForUpdate,
      rerenderAll,
    };
  };

  const getLastContextTrackerCallPerId = (id: string): unknown[] => {
    const calls = getAllMockCallArgs(hookReturnValueTester).filter((call) => call[0] === id);
    return calls[calls.length - 1];
  };

  const getLastUpdateTrackerCall = (): unknown[] => {
    const calls = getAllMockCallArgs(updateTracker);
    return calls[calls.length - 1];
  };

  const getContextFromTracker = () => {
    return getLastContextTrackerCallPerId(ids.dataContextHook)[1] as DataContextContent;
  };

  const getDataStorageFromTracker = () => {
    return getLastContextTrackerCallPerId(ids.dataStorageHook)[1] as Storage<TestData>;
  };

  const getMetaDataStorageFromTracker = () => {
    return getLastContextTrackerCallPerId(ids.metaDataStorageHook)[1] as Storage<TestData>;
  };

  const getHandlersFromTracker = () => {
    return getLastContextTrackerCallPerId(ids.handlersHook)[1] as DataHandlers;
  };

  const getTriggerFunctionFromTracker = () => {
    return getLastContextTrackerCallPerId(ids.triggerHook)[1] as DataHandlers['trigger'];
  };

  const getAsyncTriggerFunctionFromTracker = () => {
    return getLastContextTrackerCallPerId(ids.asyncTriggerHook)[1] as DataHandlers['asyncRequestWithTrigger'];
  };

  const getUpdatedData = () => {
    return getLastUpdateTrackerCall()[0] as Storage<TestData>;
  };

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('useDataContext hook returns the whole context object', async () => {
    const { clickButton, executeAndWaitForUpdate, rerenderAll } = renderComponent();

    const context = getContextFromTracker();
    expect(context.dataStorage).toBeDefined();
    expect(context.metaDataStorage).toBeDefined();
    expect(context.dataHandlers).toBeDefined();
    await executeAndWaitForUpdate(() => {
      clickButton(ids.dataContextHook);
    });
    await executeAndWaitForUpdate(() => {
      clickButton(ids.dataContextHook);
    });
    await rerenderAll();
    const context2 = getContextFromTracker();
    expect(context.dataStorage).toBe(context2.dataStorage);
    expect(context.metaDataStorage).toBe(context2.metaDataStorage);
    expect(context.dataHandlers).toBe(context2.dataHandlers);
  });

  it('useDataStorage hook returns the data storage object.', async () => {
    const { clickButton, rerenderAll } = renderComponent();

    const storage = getDataStorageFromTracker();
    expect(storage.get).toBeDefined();
    expect(storage.set).toBeDefined();
    expect(storage.get()).toMatchObject(initialData);

    clickButton(ids.dataStorageHook);
    await rerenderAll();

    const newData = getUpdatedData();
    const storage2 = getDataStorageFromTracker();
    expect(storage).toBe(storage2);
    expect(storage2.get()).toMatchObject(newData);
    expect(storage2.get()).not.toMatchObject(initialData);
  });

  it('useMetaDataStorage hook returns the data storage object.', async () => {
    const { clickButton, rerenderAll } = renderComponent();

    const metaDataStorage = getMetaDataStorageFromTracker();
    expect(metaDataStorage.get).toBeDefined();
    expect(metaDataStorage.set).toBeDefined();
    expect(metaDataStorage.get()).toMatchObject(metaData);

    clickButton(ids.metaDataStorageHook);
    await rerenderAll();

    const newMetaData = getUpdatedData();
    const metaDataStorage2 = getMetaDataStorageFromTracker();
    expect(metaDataStorage).toBe(metaDataStorage2);
    expect(metaDataStorage2.get()).toMatchObject(newMetaData);
    expect(metaDataStorage2.get()).not.toMatchObject(metaData);
  });

  it('useContextDataHandlers hook returns the dataHandlers object.', async () => {
    const { rerenderAll } = renderComponent();

    const handlers = getHandlersFromTracker();
    expect(handlers.updateData).toBeDefined();
    expect(handlers.updateMetaData).toBeDefined();
    expect(handlers.getData()).toMatchObject(initialData);
    expect(handlers.getMetaData()).toMatchObject(metaData);
    expect(handlers.asyncRequestWithTrigger).toBeDefined();
    expect(handlers.trigger).toBeDefined();

    const triggeredData = getNewTestData();
    act(() => {
      handlers.trigger({ id: 'updateData', payload: { value: triggeredData } });
    });
    await rerenderAll();
    const handlers2 = getHandlersFromTracker();
    expect(handlers2).toBe(handlers);
    expect(handlers2.getData()).toMatchObject(triggeredData);
  });

  it('useTrigger hook returns a function to trigger a change', async () => {
    const { executeAndWaitForUpdate, clickButton } = renderComponent();

    const trigger = getTriggerFunctionFromTracker();
    const metadataStorage = getMetaDataStorageFromTracker();
    const currentData = metadataStorage.get();

    expect(currentData).toMatchObject(metaData);
    expect(trigger).toBeDefined();

    await executeAndWaitForUpdate(() => {
      clickButton(ids.triggerHook);
    });

    const newData = getUpdatedData();
    const metadataStorage2 = getMetaDataStorageFromTracker();
    expect(metadataStorage2.get()).toMatchObject(newData);
  });
  it('useAsyncChangeTrigger hook returns a function to trigger a change after a promise is fulfilled.', async () => {
    const { executeAndWaitForUpdate, clickButton } = renderComponent();

    const asyncTrigger = getAsyncTriggerFunctionFromTracker();
    const metadataStorage = getMetaDataStorageFromTracker();
    const currentData = metadataStorage.get();

    expect(currentData).toMatchObject(metaData);
    expect(asyncTrigger).toBeDefined();

    await executeAndWaitForUpdate(() => {
      clickButton(ids.asyncTriggerHook);
    });

    await waitFor(() => {
      expect(asyncTracker).toHaveBeenCalledTimes(1);
    });

    const newData = getUpdatedData();
    expect(metadataStorage.get()).toMatchObject(newData);

    await executeAndWaitForUpdate(() => {
      clickButton(ids.asyncTriggerHook);
    });

    const newestData = getUpdatedData();
    expect(metadataStorage.get()).toMatchObject(newestData);
  });
});
