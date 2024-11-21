import React, { useCallback, useState } from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import { useResizeObserver } from './useResizeObserver';
import { createTimedPromise } from '../components/login/testUtils/timerTestUtil';

describe('useResizeObserver', () => {
  const testIds = {
    observer: 'observerElement',
    renderButton: 'renderButton',
    renderTime: 'renderTime',
    mountOrUnmountButton: 'mountButton',
    removeObserverButton: 'removeObserver',
  };

  const resizeListener = jest.fn();

  const renderElements = (delay = 10) => {
    const ObserverComponent = () => {
      // making sure with state that it is now updated after unmount via observer resize call
      const [, update] = useState(0);
      const memoizedCallback = useCallback(() => {
        resizeListener();
        act(() => {
          update((n) => n + 1);
        });
      }, [resizeListener, act, update]);
      const [elementRef, removeObserver] = useResizeObserver(memoizedCallback, delay);

      return (
        <>
          <div data-testid={testIds.observer} ref={elementRef} />
          <button data-testid={testIds.renderButton} type="button" onClick={() => update((n) => n + 1)}>
            re-render observer
          </button>
          <button data-testid={testIds.removeObserverButton} type="button" onClick={() => removeObserver()}>
            remove observer
          </button>
          <span data-testid={testIds.renderTime}>{Date.now()}</span>
        </>
      );
    };

    const Wrapper = () => {
      const [key, updateKey] = useState(1);
      return (
        <div>
          {key % 2 !== 0 && <ObserverComponent key={key} />}
          <button data-testid={testIds.mountOrUnmountButton} type="button" onClick={() => updateKey((k) => k + 1)}>
            Unmount observer
          </button>
        </div>
      );
    };

    const result = render(
      <span>
        <Wrapper />
      </span>,
    );

    const getRenderTime = () => {
      return result.getByTestId(testIds.renderTime).innerHTML;
    };

    const reRenderAndWaitForUpdate = async () => {
      const renderTime = getRenderTime();
      act(() => {
        fireEvent.click(result.getByTestId(testIds.renderButton));
      });
      await waitFor(() => {
        expect(getRenderTime() === renderTime).toBeFalsy();
      });
    };

    const unmountObserver = async () => {
      act(() => {
        fireEvent.click(result.getByTestId(testIds.mountOrUnmountButton));
      });
      await waitFor(() => {
        expect(() => result.getByTestId(testIds.observer)).toThrow();
      });
    };

    const mountObserver = async () => {
      act(() => {
        fireEvent.click(result.getByTestId(testIds.mountOrUnmountButton));
      });
      await waitFor(() => {
        expect(() => result.getByTestId(testIds.observer)).not.toThrow();
      });
    };

    const waitUntilDebounceIsExpired = async () => {
      await createTimedPromise(undefined, delay + 200);
    };

    const removeObserver = async () => {
      act(() => {
        fireEvent.click(result.getByTestId(testIds.removeObserverButton));
      });
    };

    return {
      ...result,
      reRenderAndWaitForUpdate,
      unmountObserver,
      mountObserver,
      waitUntilDebounceIsExpired,
      removeObserver,
    };
  };

  const currentResizeObserver = global.ResizeObserver;
  const observeSpy = jest.fn();
  const disconnectSpy = jest.fn();
  const constructorSpy = jest.fn();

  const observers: Set<null | ((...args: unknown[]) => void)> = new Set();
  const callObservers = (entry: unknown) => {
    observers.forEach((obs) => obs && obs(entry));
  };

  const triggerObservers = () => {
    act(() => {
      callObservers({});
    });
  };

  beforeAll(() => {
    global.ResizeObserver = class MockedResizeObserver {
      observer: null;

      constructor(fn) {
        this.observer = fn;
        observers.add(fn);
        constructorSpy();
      }

      observe = observeSpy;

      unobserve = jest.fn();

      disconnect = () => {
        observers.delete(this.observer);
        disconnectSpy();
      };
    };
  });

  afterAll(() => {
    jest.clearAllMocks();
    global.ResizeObserver = currentResizeObserver;
  });

  afterEach(() => {
    resizeListener.mockClear();
    observeSpy.mockClear();
    disconnectSpy.mockClear();
    constructorSpy.mockClear();
    observers.clear();
  });

  it('onResize is called when observer changes', async () => {
    const result = renderElements();

    expect(observeSpy).toHaveBeenCalledTimes(1);
    triggerObservers();
    await waitFor(() => {
      expect(resizeListener).toHaveBeenCalledTimes(1);
    });
    await result.unmountObserver();
    expect(disconnectSpy).toHaveBeenCalledTimes(1);
    expect(constructorSpy).toHaveBeenCalledTimes(1);
  });

  it('onResize is called debouced', async () => {
    const result = renderElements();
    triggerObservers();
    triggerObservers();
    triggerObservers();
    triggerObservers();
    triggerObservers();

    await waitFor(() => {
      expect(resizeListener).toHaveBeenCalledTimes(1);
    });
    await result.unmountObserver();
    await waitFor(() => {
      expect(disconnectSpy).toHaveBeenCalledTimes(1);
    });
    expect(constructorSpy).toHaveBeenCalledTimes(1);
  });
  it('When callback is properly memoized, disconnect will not be called on re-render', async () => {
    const result = renderElements();
    triggerObservers();
    await result.waitUntilDebounceIsExpired();
    await result.reRenderAndWaitForUpdate();

    triggerObservers();
    await result.reRenderAndWaitForUpdate();
    await result.waitUntilDebounceIsExpired();

    triggerObservers();
    await result.waitUntilDebounceIsExpired();
    await result.reRenderAndWaitForUpdate();

    triggerObservers();
    await result.reRenderAndWaitForUpdate();
    await result.waitUntilDebounceIsExpired();

    await waitFor(() => {
      expect(resizeListener).toHaveBeenCalledTimes(4);
    });
    expect(disconnectSpy).toHaveBeenCalledTimes(0);
    await result.unmountObserver();
    expect(disconnectSpy).toHaveBeenCalledTimes(1);
    expect(constructorSpy).toHaveBeenCalledTimes(1);
  });

  it('observers are disconnected when element is removed', async () => {
    const result = renderElements(500);
    // fire a pending (via debounce) onResize
    triggerObservers();
    await result.unmountObserver();
    triggerObservers();
    // the debounce is cancelled on unmount, so listener should not get called
    await result.waitUntilDebounceIsExpired();
    triggerObservers();
    expect(resizeListener).toHaveBeenCalledTimes(0);
    expect(disconnectSpy).toHaveBeenCalledTimes(1);
    expect(constructorSpy).toHaveBeenCalledTimes(1);
  });

  it('observer can be removed manually', async () => {
    const result = renderElements();
    triggerObservers();
    await waitFor(() => {
      expect(resizeListener).toHaveBeenCalledTimes(1);
    });
    result.removeObserver();
    triggerObservers();
    await result.waitUntilDebounceIsExpired();
    expect(resizeListener).toHaveBeenCalledTimes(1);
    expect(disconnectSpy).toHaveBeenCalledTimes(1);

    // re-rendering should not add the observer back
    await result.reRenderAndWaitForUpdate();
    triggerObservers();
    await result.waitUntilDebounceIsExpired();
    expect(resizeListener).toHaveBeenCalledTimes(1);

    // calling multiple times will not throw
    result.removeObserver();
    result.removeObserver();
    expect(disconnectSpy).toHaveBeenCalledTimes(1);
    expect(constructorSpy).toHaveBeenCalledTimes(1);
  });

  it('observer is recreated when new instance is created.', async () => {
    const result = renderElements();
    triggerObservers();
    await waitFor(() => {
      expect(resizeListener).toHaveBeenCalledTimes(1);
    });
    result.removeObserver();
    await result.unmountObserver();
    expect(disconnectSpy).toHaveBeenCalledTimes(1);
    triggerObservers();
    await result.waitUntilDebounceIsExpired();
    expect(resizeListener).toHaveBeenCalledTimes(1);

    await result.mountObserver();

    triggerObservers();
    await waitFor(() => {
      expect(resizeListener).toHaveBeenCalledTimes(1);
    });

    await result.unmountObserver();
    expect(disconnectSpy).toHaveBeenCalledTimes(2);
    expect(constructorSpy).toHaveBeenCalledTimes(2);
  });
});
