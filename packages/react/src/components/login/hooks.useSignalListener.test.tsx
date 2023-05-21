import React, { useMemo, useState } from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { v4 } from 'uuid';

import { SignalListenerWithResponse, useSignalListener } from './hooks';
import { UserCreationProps } from './testUtils/userTestUtil';
import { createHookTestEnvironment, HookTestUtil, ListenerData, useListenerFactory } from './testUtils/hooks.testUtil';
import { Signal, SignalType, createSignalTrigger } from './beacon/beacon';

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

  const getComponentListener = (index: number) => {
    testUtil.listenerFactory.getOrAdd(componentIds[index]);
    return testUtil.listenerFactory.getListener(componentIds[index]) as jest.Mock;
  };
  const getComponentListeners = () => {
    return componentIds.map((id, index) => {
      return getComponentListener(index);
    });
  };

  const getReceivedSignal = (index: number) => {
    return testUtil.getElementJSON(`${componentIds[index]}`) as Signal | Error;
  };

  const resetSignalListener = async (index: number) => {
    const id = componentIds[index];
    const startTime = testUtil.getRenderTime(id);
    await act(async () => {
      fireEvent.click(testUtil.getElementById(`${id}-${elementIds.resetButtonSuffix}`));
    });
    await testUtil.waitForComponentRerender(id, startTime);
  };

  const removeSignalListener = async (assumedStartCount) => {
    const getCurrentListenerCount = () => {
      return testUtil.getInnerHtmlAsNumber(elementIds.signalListenerCount);
    };
    const currentCount = getCurrentListenerCount();
    if (assumedStartCount !== currentCount) {
      throw new Error(
        `removeSignalListener error with assumedStartCount${assumedStartCount} and currentCount ${currentCount}`,
      );
    }
    fireEvent.click(testUtil.getElementById(elementIds.removeSignalListenerButton));
    await waitFor(() => {
      if (getCurrentListenerCount() !== currentCount - 1) {
        throw new Error('Not removed yet');
      }
    });
  };

  const getLastListenerCall = (componentIndex: number): ListenerData => {
    testUtil.listenerFactory.getOrAdd(componentIds[componentIndex]);
    const calls = testUtil.listenerFactory.getCalls(componentIds[componentIndex]);
    const lastIndex = calls.length - 1;
    // argument #0 holds all listened data
    return calls[lastIndex][0];
  };

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
  };

  afterEach(() => {
    invertTriggersToChangeProps = false;
  });

  it('returns last listened signal and re-renders only when listener returns true', async () => {
    init();
    const { getBeaconFuncs } = testUtil;
    const { emit, emitAsync } = getBeaconFuncs();
    const listeners = getComponentListeners();
    expect(listeners[0]).toHaveBeenCalledTimes(0);
    expect(listeners[1]).toHaveBeenCalledTimes(0);
    act(() => {
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
      await emitAsync(triggerForListenersIndex0Index1Index2);
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
    const { getBeaconFuncs } = testUtil;
    const { emit } = getBeaconFuncs();
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
    const { getBeaconFuncs } = testUtil;
    const { emit } = getBeaconFuncs();
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
    const { getBeaconFuncs, waitForRerender } = testUtil;
    const { emit } = getBeaconFuncs();
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
    const { getBeaconFuncs, toggleTestComponent } = testUtil;
    const { emit } = getBeaconFuncs();
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
    const { getBeaconFuncs } = testUtil;
    const { emit } = getBeaconFuncs();
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
