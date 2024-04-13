import React, { useState } from 'react';
import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react';

import { useRenderUntilCallbackFails } from '../useRenderUntilCallbackFails';
import { getMockCalls } from '../../../../utils/testHelpers';

type PlainFunction = () => void;
type TestData = { max: number; pos: number; inc: number };

describe('useRenderUntilCallbackFails', () => {
  const ids = {
    hookState: 'hookState',
    renderCounter: 'renderCounter',
    renderButton: 'renderButton',
  };
  const noValue = 'none';
  const defaultValue: TestData = { max: 10, pos: 0, inc: 1 };
  const callbackTracker = jest.fn();

  const pendingCallbacks: Array<PlainFunction> = [];
  let pendingCallbackCount = 0;

  const advanceAnimationFrame = () => {
    if (pendingCallbackCount === 0) {
      return false;
    }
    const callback = pendingCallbacks[pendingCallbacks.length - 1];
    pendingCallbackCount -= 1;
    callback();
    return true;
  };

  const getRequestAnimationFrameCallCount = () => {
    return pendingCallbacks.length;
  };

  const requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame').mockImplementation((f) => {
    pendingCallbacks.push(f as PlainFunction);
    pendingCallbackCount += 1;
    return Date.now();
  });

  const getPreviousCallbackState = (index = -1) => {
    const calls = getMockCalls(callbackTracker);
    return calls[index > -1 ? index : calls.length - 1][0];
  };

  const renderScenario = (initialValue: TestData) => {
    const callback = (prevState: TestData | null) => {
      callbackTracker(prevState);
      if (!prevState) {
        return { ...initialValue };
      }
      if (prevState.pos === prevState.max) {
        return null;
      }
      return { ...initialValue, pos: Math.min(prevState.pos + prevState.inc, initialValue.max) };
    };
    const Hook = () => {
      const current = useRenderUntilCallbackFails(callback);
      return <span id={ids.hookState}>{current ? JSON.stringify(current) : 'noValue'}</span>;
    };

    const App = () => {
      const [renderCount, updateRenderCount] = useState(0);
      return (
        <div>
          <Hook />
          <span id={ids.renderCounter}>{renderCount}</span>
          <button type="button" id={ids.renderButton} onClick={() => updateRenderCount((v) => v + 1)}>
            Render/unrender listeners
          </button>
        </div>
      );
    };

    const result = render(<App />);

    const getElementById = (id: string) => {
      return result.container.querySelector(`#${id}`) as HTMLElement;
    };
    const getState = () => {
      const el = getElementById(ids.hookState);
      const state = el && el.innerHTML;
      if (!state || state === noValue) {
        return null;
      }
      return JSON.parse(state);
    };
    const getRenderCount = () => {
      const el = getElementById(ids.renderCounter);
      return el ? el.innerHTML : noValue;
    };
    const waitForUpdate = async () => {
      const currentState = getState();
      await waitFor(() => {
        if (getState() === currentState) {
          throw new Error('NOT UPDATED');
        }
      });
      return getState();
    };
    const proceedToNextCallback = async () => {
      const promise = waitForUpdate();
      advanceAnimationFrame();
      return promise;
    };
    const waitForMaxReached = async () => {
      let currentState = getState();
      await waitFor(() => {
        advanceAnimationFrame();
        const newState = getState();
        if (newState === currentState) {
          throw new Error('NOT UPDATED');
        }
        currentState = newState;
        if (newState.pos < newState.max) {
          throw new Error('NOT ENDED');
        }
      });
    };
    const waitForRender = async () => {
      const button = getElementById(ids.renderButton);
      const currentRenderCount = getRenderCount();
      act(() => {
        fireEvent.click(button);
      });
      await waitFor(() => {
        if (getRenderCount() === currentRenderCount) {
          throw new Error('NOT UPDATED');
        }
      });
    };
    return {
      ...result,
      getState,
      waitForUpdate,
      waitForRender,
      waitForMaxReached,
      proceedToNextCallback,
    };
  };

  afterEach(() => {
    callbackTracker.mockReset();
    pendingCallbacks.length = 0;
    pendingCallbackCount = 0;
  });

  afterAll(() => {
    cleanup();
    requestAnimationFrameSpy.mockRestore();
  });

  it('useRenderUntilCallbackFails() given callback is first called with null and after first render again with previously returned value', async () => {
    const testValue = { ...defaultValue };
    const { getState } = renderScenario(testValue);
    expect(getPreviousCallbackState(0)).toEqual(null);
    expect(getState()).toEqual(testValue);
    expect(getPreviousCallbackState()).toEqual(testValue);
    expect(getRequestAnimationFrameCallCount()).toEqual(1);
  });

  it('useRenderUntilCallbackFails() given callback is polled afterwards with previously returned value', async () => {
    const testValue = { ...defaultValue };
    const { proceedToNextCallback } = renderScenario(testValue);
    const nextValue = await proceedToNextCallback();
    expect(nextValue).toEqual({ ...testValue, pos: 1 });
    expect(getRequestAnimationFrameCallCount()).toEqual(2);
    const latestValue = await proceedToNextCallback();
    expect(latestValue).toEqual({ ...testValue, pos: 2 });
    expect(getRequestAnimationFrameCallCount()).toEqual(3);
  });

  it('useRenderUntilCallbackFails runs until given callback returns a falsy value', async () => {
    const testValue = { ...defaultValue };
    const endValue = { ...testValue, pos: testValue.max };
    const { waitForMaxReached, getState } = renderScenario(testValue);
    await waitForMaxReached();
    expect(getPreviousCallbackState()).toEqual(endValue);
    expect(getState()).toEqual(endValue);
    expect(getRequestAnimationFrameCallCount()).toEqual(10);
    expect(pendingCallbackCount).toEqual(0);
  });
  it('rendering parent component also polls the given function', async () => {
    const testValue = { ...defaultValue };
    const { waitForRender, getState } = renderScenario(testValue);
    await waitForRender();
    expect(getState().pos).toEqual(1);
    await waitForRender();
    expect(getState().pos).toEqual(2);
    await waitForRender();
    expect(getState().pos).toEqual(3);
  });
  it('rendering parent component does not poll after completion', async () => {
    const testValue = { max: 6, pos: 4, inc: 20 };
    const endValue = { ...testValue, pos: testValue.max };
    const { waitForRender, getState, waitForMaxReached } = renderScenario(testValue);
    await waitForMaxReached();
    await waitForRender();
    expect(getState()).toEqual(endValue);
    expect(getRequestAnimationFrameCallCount()).toEqual(1);
    expect(pendingCallbackCount).toEqual(0);
    await waitForRender();
    expect(getState()).toEqual(endValue);
    expect(getRequestAnimationFrameCallCount()).toEqual(1);
    expect(pendingCallbackCount).toEqual(0);
  });
});
