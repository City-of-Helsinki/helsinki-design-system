import React, { useRef, useState } from 'react';
import { waitFor, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { v4 } from 'uuid';

import { useSignalTrackingWithCallback, useSignalTrackingWithReturnValue } from './hooks';
import { createHookTestEnvironment, HookTestUtil, useListenerFactory, RenderCounter } from './testUtils/hooks.testUtil';
import { Signal, SignalTriggerProps } from './beacon/beacon';
import { apiTokensClientNamespace } from './apiTokensClient';
import { errorSignalType, eventSignalType } from './beacon/signals';
import { oidcClientNamespace } from './client';
import { stateChangeSignalType } from './client/signals';

describe('useSignalTrackingWithCallback and useSignalTrackingWithReturnValue hooks', () => {
  const elementIds = {
    removeSignalListenerButton: 'remove-signal-listener-button',
    signalListenerCount: 'signal-listener-count',
    renderTimeSuffix: 'render-time',
    rerenderButton: 'test-specific-re-render-button',
    parent: 'parent-element',
  } as const;

  const componentIds = ['tester0', 'tester1', 'tester2', 'tester3'];
  const triggersPerComponent = [
    { type: errorSignalType },
    { type: eventSignalType, namespace: apiTokensClientNamespace },
    { type: eventSignalType },
    { type: stateChangeSignalType, namespace: oidcClientNamespace },
  ];
  const triggerForListener0 = { type: errorSignalType, namespace: oidcClientNamespace };
  const triggerForListener1And2 = { type: eventSignalType, namespace: apiTokensClientNamespace };
  const triggerForListener2 = { type: eventSignalType, namespace: oidcClientNamespace };
  const triggerForListener3 = { type: stateChangeSignalType, namespace: oidcClientNamespace };
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

  const getReceivedSignalHistory = (index: number) => {
    const list = testUtil.getElementById(`${componentIds[index]}-history`);
    const children = Array.from(list.childNodes);
    return children.map((node) => {
      return testUtil.getElementJSON('', node as HTMLElement) as Signal;
    });
  };

  const getRenderTime = (index: number) =>
    testUtil.getInnerHtmlAsNumber(`${componentIds[index]}-${elementIds.renderTimeSuffix}`);

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

  const TestSignalTrackingWithCallback = ({ id, trigger }: { id: string; trigger: SignalTriggerProps }) => {
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

  const TestSignalTrackingWithReturnValue = ({ id, trigger }: { id: string; trigger: SignalTriggerProps }) => {
    const [currentSignal] = useSignalTrackingWithReturnValue(trigger);
    const { type, namespace } = currentSignal || {};
    return (
      <div>
        <span id={`${id}`}>{JSON.stringify({ type, namespace })}</span>;
        <span id={`${id}-${elementIds.renderTimeSuffix}`}>{Date.now()}</span>
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
    return (
      <div>
        {childCount > 0 && <Component trigger={triggersPerComponent[0]} id={componentIds[0]} />}
        {childCount > 1 && <Component trigger={triggersPerComponent[1]} id={componentIds[1]} />}
        {childCount > 2 && <Component trigger={triggersPerComponent[2]} id={componentIds[2]} />}
        {childCount > 3 && <Component trigger={triggersPerComponent[3]} id={componentIds[3]} />}
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
  };

  describe('useSignalTrackingWithCallback', () => {
    it('Calls the given callback, but does not re-render', async () => {
      init({ type: 'callback' });
      const { getBeaconFuncs, waitForComponentRerender } = testUtil;

      const listeners = getComponentListeners();

      const listener0FirstRenderTime = getRenderTime(0);
      const listener1FirstRenderTime = getRenderTime(1);
      const listener2FirstRenderTime = getRenderTime(2);
      const listener3FirstRenderTime = getRenderTime(3);

      await act(async () => {
        await getBeaconFuncs().emitAsync(triggerForListener0);
      });
      expect(listeners[0]).toHaveBeenCalledTimes(1);
      expect(listeners[1]).toHaveBeenCalledTimes(0);
      expect(listeners[2]).toHaveBeenCalledTimes(0);
      expect(listeners[3]).toHaveBeenCalledTimes(0);
      expect(getRenderTime(0)).toBe(listener0FirstRenderTime);

      await act(async () => {
        await getBeaconFuncs().emitAsync(triggerForListener1And2);
      });
      expect(listeners[0]).toHaveBeenCalledTimes(1);
      expect(listeners[1]).toHaveBeenCalledTimes(1);
      expect(listeners[2]).toHaveBeenCalledTimes(1);
      expect(listeners[3]).toHaveBeenCalledTimes(0);
      expect(getRenderTime(1)).toBe(listener1FirstRenderTime);

      await act(async () => {
        await getBeaconFuncs().emitAsync(triggerForListener2);
      });
      expect(listeners[0]).toHaveBeenCalledTimes(1);
      expect(listeners[1]).toHaveBeenCalledTimes(1);
      expect(listeners[2]).toHaveBeenCalledTimes(2);
      expect(listeners[3]).toHaveBeenCalledTimes(0);
      expect(getRenderTime(2)).toBe(listener2FirstRenderTime);

      await act(async () => {
        await getBeaconFuncs().emitAsync(triggerForListener3);
      });
      expect(listeners[0]).toHaveBeenCalledTimes(1);
      expect(listeners[1]).toHaveBeenCalledTimes(1);
      expect(listeners[2]).toHaveBeenCalledTimes(2);
      expect(listeners[3]).toHaveBeenCalledTimes(1);
      expect(getRenderTime(3)).toBe(listener3FirstRenderTime);

      await act(async () => {
        await getBeaconFuncs().emitAsync(triggerForListener0);
        await getBeaconFuncs().emitAsync(triggerForListener1And2);
        await getBeaconFuncs().emitAsync(triggerForListener2);
        await getBeaconFuncs().emitAsync(triggerForListener3);
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
      const { getBeaconFuncs } = testUtil;
      const { emit } = getBeaconFuncs();
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
  describe('useSignalTrackingWithReturnValue', () => {
    it('Re-renders everytime the trigger matches the signal', async () => {
      init({ type: 'returnValue' });
      const { getBeaconFuncs } = testUtil;
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

      await act(async () => {
        await getBeaconFuncs().emitAsync(triggerForListener0);
      });
      await waitForRerender(0);
      expect(getReceivedSignal(0)).toEqual(triggerForListener0);
      expect(getReceivedSignal(0)).toEqual(triggerForListener0);

      await act(async () => {
        await getBeaconFuncs().emitAsync(triggerForListener1And2);
      });
      await waitForRerender(1);
      await waitForRerender(2);
      expect(getReceivedSignal(1)).toEqual(triggerForListener1And2);
      expect(getReceivedSignal(2)).toEqual(triggerForListener1And2);

      await act(async () => {
        await getBeaconFuncs().emitAsync(triggerForListener2);
      });
      await waitForRerender(2);
      expect(getReceivedSignal(2)).toEqual(triggerForListener2);

      await act(async () => {
        await getBeaconFuncs().emitAsync(triggerForListener3);
      });
      await waitForRerender(3);
      expect(getReceivedSignal(3)).toEqual(triggerForListener3);
    });
  });
});
