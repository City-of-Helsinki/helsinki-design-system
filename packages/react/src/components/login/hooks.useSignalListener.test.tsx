import React, { useMemo, useState } from 'react';
import { waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { v4 } from 'uuid';

import { SignalListenerWithResponse, useSignalListener } from './hooks';
import { UserCreationProps } from './testUtils/userTestUtil';
import {
  createHookTestEnvironment,
  HookTestUtil,
  useListenerFactory,
  getCommonListenerFunctions,
} from './testUtils/hooks.testUtil';
import { SignalType, createSignalTrigger } from './beacon/beacon';

describe('useSignalListener hook', () => {
  const elementIds = {
    removeSignalListenerButton: 'remove-signal-listener-button',
    signalListenerCount: 'signal-listener-count',
    resetButtonSuffix: 'reset-button',
    renderTimeSuffix: 'render-time',
  } as const;

  const componentIds = ['tester0', 'tester1', 'tester2', 'tester3'];
  const namespace1 = 'namespace1';
  const namespace2 = 'namespace2';
  const triggeringSignalTypes = ['*:*', `*:${namespace1}`, `second:${namespace1}`, `third:${namespace2}`];
  const triggerForListenersIndex0Index1 = { type: 'first', namespace: namespace1 };
  const triggerForListenersIndex0Index1Index2 = { type: 'second', namespace: namespace1 };
  const triggerForListenersIndex0Index3 = { type: 'third', namespace: namespace2 };
  let invertTriggersToChangeProps = false;
  let testUtil: HookTestUtil;
  let commonFuncs: ReturnType<typeof getCommonListenerFunctions>;

  const TestListenerFunctionalities = ({ id, signalType }: { id: string; signalType: SignalType }) => {
    const listenerFactory = useListenerFactory();
    const memoizedListener = useMemo<SignalListenerWithResponse>(() => {
      const uuid = v4();
      return (signal) => {
        const trigger = signalType ? createSignalTrigger(signalType) : () => true;
        if (!trigger(signal)) {
          return false;
        }
        const listener = listenerFactory.getOrAdd(id);
        listener({ ...signal }, uuid);
        return true;
      };
    }, [id, signalType]);
    const [currentSignal, reset] = useSignalListener(memoizedListener);
    const { type, namespace } = currentSignal || {};
    return (
      <div>
        <span id={id}>{JSON.stringify({ type, namespace })}</span>;
        <span id={`${id}-${elementIds.renderTimeSuffix}`}>{Date.now()}</span>;
        <button
          type="button"
          id={`${id}-reset-button`}
          onClick={() => {
            reset();
          }}
        >
          Reset currentSignal
        </button>
      </div>
    );
  };

  const MultipleSignalListeners = () => {
    const [count, setCount] = useState(4);
    const removeListener = () => {
      setCount((n) => n - 1);
    };
    const triggers = invertTriggersToChangeProps ? [...triggeringSignalTypes].reverse() : triggeringSignalTypes;
    return (
      <div>
        {count > 0 && <TestListenerFunctionalities id={componentIds[0]} signalType={triggers[0]} />}
        {count > 1 && <TestListenerFunctionalities id={componentIds[1]} signalType={triggers[1]} />}
        {count > 2 && <TestListenerFunctionalities id={componentIds[2]} signalType={triggers[2]} />}
        {count > 3 && <TestListenerFunctionalities id={componentIds[3]} signalType={triggers[3]} />}
        <button
          type="button"
          id={elementIds.removeSignalListenerButton}
          onClick={() => {
            removeListener();
          }}
        >
          Remove listener
        </button>
        <span id={elementIds.signalListenerCount}>{count}</span>
      </div>
    );
  };

  const init = (userProps?: UserCreationProps) => {
    testUtil = createHookTestEnvironment({
      userInStorage: userProps,
      children: [<MultipleSignalListeners key="test" />],
    });
    commonFuncs = getCommonListenerFunctions(testUtil, componentIds, elementIds);
  };

  afterEach(() => {
    invertTriggersToChangeProps = false;
  });

  it('returns last listened signal and re-renders only when listener returns true', async () => {
    init();
    const { emit } = testUtil;
    const { getComponentListeners, getReceivedSignal } = commonFuncs;
    const listeners = getComponentListeners();
    expect(listeners[0]).toHaveBeenCalledTimes(0);
    expect(listeners[1]).toHaveBeenCalledTimes(0);
    await act(async () => {
      emit(triggerForListenersIndex0Index1);
    });
    expect(listeners[0]).toHaveBeenCalledTimes(1);
    expect(listeners[1]).toHaveBeenCalledTimes(1);
    expect(listeners[2]).toHaveBeenCalledTimes(0);
    expect(listeners[3]).toHaveBeenCalledTimes(0);
    await waitFor(() => {
      expect(getReceivedSignal(0)).toMatchObject(triggerForListenersIndex0Index1);
      expect(getReceivedSignal(1)).toMatchObject(triggerForListenersIndex0Index1);
    });
    act(() => {
      emit({ type: `${triggerForListenersIndex0Index3.type}:${triggerForListenersIndex0Index3.namespace}` });
    });
    expect(listeners[0]).toHaveBeenCalledTimes(2);
    expect(listeners[1]).toHaveBeenCalledTimes(1);
    expect(listeners[2]).toHaveBeenCalledTimes(0);
    expect(listeners[3]).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(getReceivedSignal(3)).toMatchObject(triggerForListenersIndex0Index3);
    });
    await act(async () => {
      emit(triggerForListenersIndex0Index1Index2);
    });
    expect(listeners[0]).toHaveBeenCalledTimes(3);
    expect(listeners[1]).toHaveBeenCalledTimes(2);
    expect(listeners[2]).toHaveBeenCalledTimes(1);
    expect(listeners[3]).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(getReceivedSignal(0)).toMatchObject(triggerForListenersIndex0Index1Index2);
      expect(getReceivedSignal(1)).toMatchObject(triggerForListenersIndex0Index1Index2);
      expect(getReceivedSignal(2)).toMatchObject(triggerForListenersIndex0Index1Index2);
    });
  });
  it('signal can be reset with the returned function. Component re-renders', async () => {
    init();
    const { emit } = testUtil;
    const { resetSignalListener, getReceivedSignal } = commonFuncs;
    act(() => {
      emit(triggerForListenersIndex0Index1);
    });
    await waitFor(() => {
      expect(getReceivedSignal(0)).toMatchObject(triggerForListenersIndex0Index1);
      expect(getReceivedSignal(1)).toMatchObject(triggerForListenersIndex0Index1);
    });
    await resetSignalListener(0);
    await waitFor(() => {
      expect(getReceivedSignal(0)).toMatchObject({});
      expect(getReceivedSignal(1)).toMatchObject(triggerForListenersIndex0Index1);
    });
    await resetSignalListener(1);
    await waitFor(() => {
      expect(getReceivedSignal(0)).toMatchObject({});
      expect(getReceivedSignal(1)).toMatchObject({});
    });
  });
  it('listeners are removed when component unmounts', async () => {
    init();
    const { emit } = testUtil;
    const { removeSignalListener, getComponentListeners, getComponentListener } = commonFuncs;
    let triggerCount = 0;
    let removeCount = 0;
    const triggerAllListeners = () => {
      act(() => {
        emit(triggerForListenersIndex0Index1Index2);
        emit(triggerForListenersIndex0Index3);
      });
      triggerCount += 1;
    };

    const checkListenerCallCounts = () => {
      // first listener listens all events so it is triggered twice
      const callCountIncreasePerTrigger = [2, 1, 1, 1];
      getComponentListeners().forEach((listener, listenerIndex, arr) => {
        const assumedTriggerCountPerEmit = callCountIncreasePerTrigger[listenerIndex];
        // count how many triggers have been missed after component was removed
        const emitsAfterRemoval = Math.max(0, arr.length * -1 + (listenerIndex + removeCount + 1));
        const assumedTriggerCount = assumedTriggerCountPerEmit * (triggerCount - emitsAfterRemoval);
        expect(listener).toHaveBeenCalledTimes(assumedTriggerCount);
      });
    };

    const emitAndRemoveListener = async (assumedComponentCount: number) => {
      await act(async () => {
        await removeSignalListener(assumedComponentCount);
      });
      removeCount += 1;
      triggerAllListeners();
      checkListenerCallCounts();
    };
    triggerAllListeners();
    checkListenerCallCounts();
    await emitAndRemoveListener(4);
    await emitAndRemoveListener(3);
    await emitAndRemoveListener(2);
    await emitAndRemoveListener(1);
    // check last and first listener to make sure
    expect(getComponentListener(0)).toHaveBeenCalledTimes(8);
    expect(getComponentListener(3)).toHaveBeenCalledTimes(1);
  });
  it('listener function does not change during re-renders, when it is memoized properly.', async () => {
    init();
    const { emit, waitForRerender } = testUtil;
    const { removeSignalListener, getLastListenerCall } = commonFuncs;
    act(() => {
      emit(triggerForListenersIndex0Index1);
    });
    const firstCall = getLastListenerCall(0);
    expect(firstCall.uuid).not.toBeUndefined();
    expect(firstCall.id).toBe(componentIds[0]);
    await waitForRerender();
    act(() => {
      emit(triggerForListenersIndex0Index1);
    });
    const newCall = getLastListenerCall(0);
    expect(newCall === firstCall).toBeFalsy();
    expect(newCall.uuid).toBe(firstCall.uuid);

    await removeSignalListener(4);
    act(() => {
      emit(triggerForListenersIndex0Index1);
    });
    const lastCall = getLastListenerCall(0);
    expect(lastCall === firstCall).toBeFalsy();
    expect(lastCall.uuid).toBe(firstCall.uuid);
    expect(lastCall.id).toBe(componentIds[0]);
  });
  it('listener function changes on unmount + re-mount.', async () => {
    init();
    const { emit, toggleTestComponent } = testUtil;
    const { getLastListenerCall } = commonFuncs;
    act(() => {
      emit(triggerForListenersIndex0Index1);
    });
    const firstCall = getLastListenerCall(0);
    // unmount all
    await toggleTestComponent();
    // mount all
    await toggleTestComponent();
    act(() => {
      emit(triggerForListenersIndex0Index1);
    });
    const lastCall = getLastListenerCall(0);
    expect(lastCall.uuid).not.toBe(firstCall.uuid);
    expect(lastCall.id).toBe(componentIds[0]);
  });
  it('listener function changes when props change.', async () => {
    init();
    const { emit } = testUtil;
    const { removeSignalListener, getLastListenerCall } = commonFuncs;
    act(() => {
      emit(triggerForListenersIndex0Index1);
    });
    const firstCall = getLastListenerCall(0);
    invertTriggersToChangeProps = true;
    await removeSignalListener(4);
    act(() => {
      emit(triggerForListenersIndex0Index3);
    });
    const lastCall = getLastListenerCall(0);
    expect(lastCall.uuid).not.toBe(firstCall.uuid);
    expect(lastCall.id).toBe(componentIds[0]);
  });
});
