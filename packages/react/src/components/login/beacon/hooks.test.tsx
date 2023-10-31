import React, { useMemo, useRef, useState } from 'react';
import { waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { v4 } from 'uuid';

import { useSignalListener, useSignalTrackingWithCallback, useSignalTrackingWithReturnValue } from './hooks';
import { UserCreationProps } from '../testUtils/userTestUtil';
import {
  createHookTestEnvironment,
  HookTestUtil,
  useListenerFactory,
  getCommonListenerFunctions,
  RenderCounter,
} from '../testUtils/hooks.testUtil';
import { createSignalTrigger, SignalTrigger, SignalListenerSource, Signal } from './beacon';
import { apiTokensClientNamespace } from '../apiTokensClient';
import { oidcClientNamespace } from '../client';
import { errorSignalType, eventSignalType, stateChangeSignalType } from './signals';

describe('Beacon hooks', () => {
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
    const triggerFunction = createSignalTrigger(`third:${namespace2}`);
    const triggeringSignalTypes = ['*:*', `*:${namespace1}`, `second:${namespace1}`, triggerFunction];
    const triggerForListenersIndex0Index1 = { type: 'first', namespace: namespace1 };
    const triggerForListenersIndex0Index1Index2 = { type: 'second', namespace: namespace1 };
    const triggerForListenersIndex0Index3 = { type: 'third', namespace: namespace2 };
    let invertTriggersToChangeProps = false;
    let testUtil: HookTestUtil;
    let commonFuncs: ReturnType<typeof getCommonListenerFunctions>;

    const TestListenerFunctionalities = ({
      id,
      signalTypeOrTrigger,
    }: {
      id: string;
      signalTypeOrTrigger: SignalListenerSource;
    }) => {
      const listenerFactory = useListenerFactory();
      const memoizedListener = useMemo<SignalTrigger>(() => {
        const uuid = v4();
        return (signal) => {
          const trigger =
            typeof signalTypeOrTrigger === 'function' ? signalTypeOrTrigger : createSignalTrigger(signalTypeOrTrigger);
          if (!trigger(signal)) {
            return false;
          }
          const listener = listenerFactory.getOrAdd(id);
          listener({ ...signal }, uuid);
          return true;
        };
      }, [id, signalTypeOrTrigger]);
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
          {count > 0 && <TestListenerFunctionalities id={componentIds[0]} signalTypeOrTrigger={triggers[0]} />}
          {count > 1 && <TestListenerFunctionalities id={componentIds[1]} signalTypeOrTrigger={triggers[1]} />}
          {count > 2 && <TestListenerFunctionalities id={componentIds[2]} signalTypeOrTrigger={triggers[2]} />}
          {count > 3 && <TestListenerFunctionalities id={componentIds[3]} signalTypeOrTrigger={triggers[3]} />}
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
  describe('useSignalTrackingWithCallback and useSignalTrackingWithReturnValue hooks', () => {
    const elementIds = {
      removeSignalListenerButton: 'remove-signal-listener-button',
      signalListenerCount: 'signal-listener-count',
      renderTimeSuffix: 'render-time',
      rerenderButton: 'test-specific-re-render-button',
      parent: 'parent-element',
      resetButtonSuffix: 'reset-button',
    } as const;

    const componentIds = ['tester0', 'tester1', 'tester2', 'tester3'];
    const triggersPerComponent = [
      { type: errorSignalType },
      { type: eventSignalType, namespace: apiTokensClientNamespace },
      createSignalTrigger({ type: eventSignalType }),
      { type: stateChangeSignalType, namespace: oidcClientNamespace },
    ];
    const triggerForListener0 = { type: errorSignalType, namespace: oidcClientNamespace };
    const triggerForListener1And2 = { type: eventSignalType, namespace: apiTokensClientNamespace };
    const triggerForListener2 = { type: eventSignalType, namespace: oidcClientNamespace };
    const triggerForListener3 = { type: stateChangeSignalType, namespace: oidcClientNamespace };
    let invertTriggersToChangeProps = false;
    let testUtil: HookTestUtil;
    let commonFuncs: ReturnType<typeof getCommonListenerFunctions>;

    const TestSignalTrackingWithCallback = ({ id, trigger }: { id: string; trigger: SignalListenerSource }) => {
      const signalHistoryRef = useRef<Signal[]>([]);
      const listenerFactory = useListenerFactory();
      const uuid = v4();
      const listener = (signal: Signal) => {
        const storedSignal = { ...signal };
        const mock = listenerFactory.getOrAdd(id);
        mock(storedSignal, uuid);
        signalHistoryRef.current.push(storedSignal);
      };
      const returnsUndefined = useSignalTrackingWithCallback(trigger, listener);
      if (returnsUndefined !== undefined) {
        throw new Error('callback version should return nothing');
      }
      return (
        <div>
          <ul id={`${id}-history`}>
            {signalHistoryRef.current.map((signal, index) => {
              const { type, namespace } = signal;
              return (
                // eslint-disable-next-line react/no-array-index-key
                <li key={`item-${index}`} id={`${id}-history-item-${index}`}>
                  {JSON.stringify({ type, namespace })}
                </li>
              );
            })}
          </ul>
          <span id={`${id}-history-length`}>{signalHistoryRef.current.length}</span>
          <span id={`${id}-${elementIds.renderTimeSuffix}`}>{Date.now()}</span>
          <RenderCounter idPrefix={id} />
        </div>
      );
    };

    const TestSignalTrackingWithReturnValue = ({ id, trigger }: { id: string; trigger: SignalListenerSource }) => {
      const [currentSignal, reset] = useSignalTrackingWithReturnValue(trigger);
      const { type, namespace } = currentSignal || {};
      return (
        <div>
          <span id={`${id}`}>{JSON.stringify({ type, namespace })}</span>;
          <span id={`${id}-${elementIds.renderTimeSuffix}`}>{Date.now()}</span>
          <button
            type="button"
            id={`${id}-${elementIds.resetButtonSuffix}`}
            onClick={() => {
              reset();
            }}
          >
            Reset currentSignal
          </button>
        </div>
      );
    };

    const MultipleSignalTriggers = ({ type }: { type: 'callback' | 'returnValue' }) => {
      const [childCount, setChildCount] = useState(4);
      const [, forceRender] = useState(0);
      const removeListener = () => {
        setChildCount((n) => n - 1);
      };
      const Component = type === 'callback' ? TestSignalTrackingWithCallback : TestSignalTrackingWithReturnValue;
      const triggers = invertTriggersToChangeProps ? [...triggersPerComponent].reverse() : triggersPerComponent;

      return (
        <div>
          {childCount > 0 && <Component trigger={triggers[0]} id={componentIds[0]} />}
          {childCount > 1 && <Component trigger={triggers[1]} id={componentIds[1]} />}
          {childCount > 2 && <Component trigger={triggers[2]} id={componentIds[2]} />}
          {childCount > 3 && <Component trigger={triggers[3]} id={componentIds[3]} />}
          <button
            type="button"
            id={elementIds.removeSignalListenerButton}
            onClick={() => {
              removeListener();
            }}
          >
            Remove listener
          </button>
          <button
            key="button"
            type="button"
            id={elementIds.rerenderButton}
            onClick={() => {
              forceRender((counter) => counter + 1);
            }}
          >
            Rerender
          </button>
          <span id={elementIds.signalListenerCount}>{childCount}</span>
          <span id={`${elementIds.parent}-${elementIds.renderTimeSuffix}`}>{Date.now()}</span>
        </div>
      );
    };

    const init = ({ type }: { type: 'callback' | 'returnValue' }) => {
      testUtil = createHookTestEnvironment({
        children: [<MultipleSignalTriggers type={type} key="test" />],
      });
      commonFuncs = getCommonListenerFunctions(testUtil, componentIds, elementIds);
    };

    afterEach(() => {
      invertTriggersToChangeProps = false;
    });

    describe('useSignalTrackingWithCallback', () => {
      it('Calls the given callback, but does not re-render', async () => {
        init({ type: 'callback' });
        const { emit, waitForComponentRerender } = testUtil;
        const { getComponentListeners, getRenderTime, getReceivedSignalHistory } = commonFuncs;

        const listeners = getComponentListeners();

        const listener0FirstRenderTime = getRenderTime(0);
        const listener1FirstRenderTime = getRenderTime(1);
        const listener2FirstRenderTime = getRenderTime(2);
        const listener3FirstRenderTime = getRenderTime(3);

        await act(async () => {
          emit(triggerForListener0);
        });
        expect(listeners[0]).toHaveBeenCalledTimes(1);
        expect(listeners[1]).toHaveBeenCalledTimes(0);
        expect(listeners[2]).toHaveBeenCalledTimes(0);
        expect(listeners[3]).toHaveBeenCalledTimes(0);
        expect(getRenderTime(0)).toBe(listener0FirstRenderTime);

        await act(async () => {
          emit(triggerForListener1And2);
        });
        expect(listeners[0]).toHaveBeenCalledTimes(1);
        expect(listeners[1]).toHaveBeenCalledTimes(1);
        expect(listeners[2]).toHaveBeenCalledTimes(1);
        expect(listeners[3]).toHaveBeenCalledTimes(0);
        expect(getRenderTime(1)).toBe(listener1FirstRenderTime);

        await act(async () => {
          emit(triggerForListener2);
        });
        expect(listeners[0]).toHaveBeenCalledTimes(1);
        expect(listeners[1]).toHaveBeenCalledTimes(1);
        expect(listeners[2]).toHaveBeenCalledTimes(2);
        expect(listeners[3]).toHaveBeenCalledTimes(0);
        expect(getRenderTime(2)).toBe(listener2FirstRenderTime);

        await act(async () => {
          emit(triggerForListener3);
        });
        expect(listeners[0]).toHaveBeenCalledTimes(1);
        expect(listeners[1]).toHaveBeenCalledTimes(1);
        expect(listeners[2]).toHaveBeenCalledTimes(2);
        expect(listeners[3]).toHaveBeenCalledTimes(1);
        expect(getRenderTime(3)).toBe(listener3FirstRenderTime);

        await act(async () => {
          emit(triggerForListener0);
          emit(triggerForListener1And2);
          emit(triggerForListener2);
          emit(triggerForListener3);
        });
        expect(listeners[0]).toHaveBeenCalledTimes(2);
        expect(listeners[1]).toHaveBeenCalledTimes(2);
        expect(listeners[2]).toHaveBeenCalledTimes(4);
        expect(listeners[3]).toHaveBeenCalledTimes(2);

        // re-render to render history
        await waitForComponentRerender(elementIds.parent, 0, elementIds.rerenderButton);

        expect(getReceivedSignalHistory(0)).toEqual([triggerForListener0, triggerForListener0]);
        expect(getReceivedSignalHistory(1)).toEqual([triggerForListener1And2, triggerForListener1And2]);
        expect(getReceivedSignalHistory(2)).toEqual([
          triggerForListener1And2,
          triggerForListener2,
          triggerForListener1And2,
          triggerForListener2,
        ]);
        expect(getReceivedSignalHistory(3)).toEqual([triggerForListener3, triggerForListener3]);
        expect(getRenderTime(0)).not.toBe(listener0FirstRenderTime);
        expect(getRenderTime(1)).not.toBe(listener1FirstRenderTime);
        expect(getRenderTime(2)).not.toBe(listener2FirstRenderTime);
        expect(getRenderTime(3)).not.toBe(listener3FirstRenderTime);
      });
      it('listeners are removed when component unmounts', async () => {
        init({ type: 'callback' });
        const { getComponentListeners, removeSignalListener, getComponentListener } = commonFuncs;
        const { emit } = testUtil;
        let triggerCount = 0;
        let removeCount = 0;
        const triggerAllListeners = () => {
          act(() => {
            emit(triggerForListener0);
            emit(triggerForListener1And2);
            emit(triggerForListener3);
          });
          triggerCount += 1;
        };

        const checkListenerCallCounts = () => {
          // first listener listens all events so it is triggered twice
          const callCountIncreasePerTrigger = [1, 1, 1, 1];
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
        expect(getComponentListener(0)).toHaveBeenCalledTimes(4);
        expect(getComponentListener(3)).toHaveBeenCalledTimes(1);
      });
    });
    it('listener function does not change during re-renders.', async () => {
      init({ type: 'callback' });
      const { emit, waitForRerender } = testUtil;
      const { removeSignalListener, getLastListenerCall } = commonFuncs;
      act(() => {
        emit(triggerForListener0);
      });
      const firstCall = getLastListenerCall(0);
      expect(firstCall.uuid).not.toBeUndefined();
      expect(firstCall.id).toBe(componentIds[0]);
      await waitForRerender();
      act(() => {
        emit(triggerForListener0);
      });
      const newCall = getLastListenerCall(0);
      expect(newCall === firstCall).toBeFalsy();
      expect(newCall.uuid).toBe(firstCall.uuid);

      await removeSignalListener(4);
      act(() => {
        emit(triggerForListener0);
      });
      const lastCall = getLastListenerCall(0);
      expect(lastCall === firstCall).toBeFalsy();
      expect(lastCall.uuid).toBe(firstCall.uuid);
      expect(lastCall.id).toBe(componentIds[0]);
    });
    it('listener function does not change on props change.', async () => {
      init({ type: 'callback' });
      const { getLastListenerCall, removeSignalListener } = commonFuncs;
      const { emit } = testUtil;
      act(() => {
        emit(triggerForListener0);
      });
      const firstCall = getLastListenerCall(0);
      invertTriggersToChangeProps = true;
      await removeSignalListener(4);
      act(() => {
        emit(triggerForListener3);
      });
      const lastCall = getLastListenerCall(0);
      expect(lastCall.uuid).toBe(firstCall.uuid);
      expect(lastCall.id).toBe(componentIds[0]);
    });
    it('listener function changes only unmount + re-mount.', async () => {
      init({ type: 'callback' });
      const { emit, toggleTestComponent } = testUtil;
      const { getLastListenerCall } = commonFuncs;
      act(() => {
        emit(triggerForListener0);
      });
      const firstCall = getLastListenerCall(0);
      // unmount all
      await toggleTestComponent();
      // mount all
      await toggleTestComponent();
      act(() => {
        emit(triggerForListener0);
      });
      const lastCall = getLastListenerCall(0);
      expect(lastCall.uuid).not.toBe(firstCall.uuid);
      expect(lastCall.id).toBe(componentIds[0]);
    });
    describe('useSignalTrackingWithReturnValue', () => {
      it('Re-renders everytime the trigger matches the signal', async () => {
        init({ type: 'returnValue' });
        const { emit } = testUtil;
        const { getReceivedSignal, getRenderTime } = commonFuncs;
        const renderTimes = [getRenderTime(0), getRenderTime(1), getRenderTime(2), getRenderTime(3)];

        const verifyAndSetNewRenderTime = (index: number) => {
          const currentTime = renderTimes[index];
          const newTime = getRenderTime(index);
          expect(newTime > currentTime).toBeTruthy();
          renderTimes[index] = newTime;
        };

        const waitForRerender = async (index: number) => {
          await waitFor(() => {
            verifyAndSetNewRenderTime(index);
          });
        };

        act(() => {
          emit(triggerForListener0);
        });
        await waitForRerender(0);
        expect(getReceivedSignal(0)).toEqual(triggerForListener0);
        expect(getReceivedSignal(0)).toEqual(triggerForListener0);

        act(() => {
          emit(triggerForListener1And2);
        });
        await waitForRerender(1);
        await waitForRerender(2);
        expect(getReceivedSignal(1)).toEqual(triggerForListener1And2);
        expect(getReceivedSignal(2)).toEqual(triggerForListener1And2);

        act(() => {
          emit(triggerForListener2);
        });
        await waitForRerender(2);
        expect(getReceivedSignal(2)).toEqual(triggerForListener2);

        act(() => {
          emit(triggerForListener3);
        });
        await waitForRerender(3);
        expect(getReceivedSignal(3)).toEqual(triggerForListener3);
      });
      it('signal can be reset with the returned function. Component re-renders', async () => {
        init({ type: 'returnValue' });
        const { emit } = testUtil;
        const { resetSignalListener, getReceivedSignal } = commonFuncs;

        act(() => {
          emit(triggerForListener1And2);
        });
        await waitFor(() => {
          expect(getReceivedSignal(1)).toEqual(triggerForListener1And2);
          expect(getReceivedSignal(2)).toEqual(triggerForListener1And2);
        });

        await resetSignalListener(1);
        await waitFor(() => {
          expect(getReceivedSignal(1)).toEqual({});
          expect(getReceivedSignal(2)).toEqual(triggerForListener1And2);
        });

        await resetSignalListener(2);
        await waitFor(() => {
          expect(getReceivedSignal(1)).toEqual({});
          expect(getReceivedSignal(2)).toEqual({});
        });
      });
    });
  });
});
