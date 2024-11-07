import React, { useState } from 'react';
import { act, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';

import { monitorEvent, useCookieConsentEvents } from '../useCookieConsentEvents';
// eslint-disable-next-line jest/no-mocks-import
import { mockCookieConsentCore } from '../../__mocks__/mockCookieConsentCore';
import { CookieConsentCore } from '../../cookieConsentCore';
import useForceRender from '../../../../hooks/useForceRender';
import { getLastMockCallArgs } from '../../../../utils/testHelpers';

const mockCore = mockCookieConsentCore();

jest.mock('../../cookieConsentCore', () => ({
  CookieConsentCore: {
    create: (...args: Parameters<typeof CookieConsentCore.create>) => mockCore.create(...args),
  },
}));

describe('useCookieConsentEventsEvents', () => {
  const testIds = {
    disposeButton: 'dispose',
    renderAgainButton: 'render-again',
    toggleMountButton: 'toggleMount',
    listener: 'listener',
    isMounted: 'is-mounted',
  };

  const getCallCount = (tracker: jest.Mock) => {
    return tracker.mock.calls.length;
  };

  const onChange = jest.fn();
  const onMonitorEvent = jest.fn();
  const onReady = jest.fn();
  let renderCount: number = 0;
  let submitEvent: string | undefined;
  const ListenerComponent = () => {
    const disposer = useCookieConsentEvents({
      onChange,
      onMonitorEvent,
      onReady,
      submitEvent,
    });
    return (
      <div data-testid={testIds.listener}>
        <button
          type="button"
          data-testid={testIds.disposeButton}
          onClick={() => {
            disposer();
          }}
        >
          Render page
        </button>
        );
      </div>
    );
  };
  const HookComponent = () => {
    const [isMounted, setIsMounted] = useState(true);
    renderCount += 1;
    const forceRender = useForceRender();
    return (
      <div>
        {isMounted && <ListenerComponent />}
        <div data-testid={testIds.isMounted}>{isMounted ? 1 : 0}</div>
        <button
          type="button"
          data-testid={testIds.renderAgainButton}
          onClick={() => {
            forceRender();
          }}
        >
          {renderCount}
        </button>
        <button
          type="button"
          data-testid={testIds.toggleMountButton}
          onClick={() => {
            setIsMounted((v) => !v);
          }}
        >
          {isMounted}
        </button>
        );
      </div>
    );
  };
  afterEach(() => {
    mockCore.reset();
    onChange.mockReset();
    onMonitorEvent.mockReset();
    onReady.mockReset();
    renderCount = 0;
    submitEvent = undefined;
  });
  const triggerAllEvents = () => {
    mockCore.triggerReadyEvent();
    mockCore.triggerChangeEvent([]);
    mockCore.triggerMonitorEvent('', '', []);
  };

  const renderTests = (newSubmitEvent?: string) => {
    if (newSubmitEvent) {
      submitEvent = newSubmitEvent;
    }
    let result: RenderResult;
    act(() => {
      result = render(<HookComponent />);
    });

    const getRenderCount = () => {
      return parseInt(result.getByTestId(testIds.renderAgainButton).innerHTML, 10);
    };
    const getIsMounted = () => {
      return parseInt(result.getByTestId(testIds.isMounted).innerHTML, 10) === 1;
    };

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const renderAgain = async (newSubmitEvent?: string) => {
      if (newSubmitEvent) {
        submitEvent = newSubmitEvent;
      }
      const lastRender = getRenderCount();
      fireEvent.click(result.getByTestId(testIds.renderAgainButton));
      await waitFor(() => {
        expect(getRenderCount()).not.toBe(lastRender);
      });
    };
    const toggleMount = async () => {
      const current = getIsMounted();
      fireEvent.click(result.getByTestId(testIds.toggleMountButton));
      await waitFor(() => {
        expect(getIsMounted()).not.toBe(current);
      });
    };
    const dispose = async () => {
      fireEvent.click(result.getByTestId(testIds.disposeButton));
      // await renderAgain();
    };

    return {
      // @ts-ignore
      ...result,
      getRenderCount,
      renderAgain,
      toggleMount,
      dispose,
    };
  };

  it('listeners are not called on init', async () => {
    renderTests();
    expect(getCallCount(onChange)).toBe(0);
    expect(getCallCount(onMonitorEvent)).toBe(0);
    expect(getCallCount(onReady)).toBe(0);
  });
  it('listeners are called with correct events', async () => {
    renderTests();
    mockCore.triggerReadyEvent();
    expect(getCallCount(onChange)).toBe(0);
    expect(getCallCount(onMonitorEvent)).toBe(0);
    expect(getCallCount(onReady)).toBe(1);

    const consentData = ['group3', 'group4'];

    mockCore.triggerChangeEvent(consentData);
    expect(getCallCount(onChange)).toBe(1);
    expect(getLastMockCallArgs(onChange)[0].acceptedGroups).toEqual(consentData);
    expect(getCallCount(onMonitorEvent)).toBe(0);
    expect(getCallCount(onReady)).toBe(1);

    mockCore.triggerChangeEvent([]);
    expect(getCallCount(onChange)).toBe(2);
    expect(getLastMockCallArgs(onChange)[0].acceptedGroups).toEqual([]);
    expect(getCallCount(onMonitorEvent)).toBe(0);
    expect(getCallCount(onReady)).toBe(1);

    const storageKeys = 'storageKeys';
    const storageType = 'storageType';
    const acceptedGroups = ['acceptedGroups'];
    mockCore.triggerMonitorEvent(storageType, storageKeys, acceptedGroups);
    expect(getCallCount(onChange)).toBe(2);
    expect(getCallCount(onMonitorEvent)).toBe(1);
    expect(getLastMockCallArgs(onMonitorEvent)[0]).toEqual({
      storageKeys,
      storageType,
      acceptedGroups,
      type: monitorEvent,
    });
    expect(getCallCount(onReady)).toBe(1);
  });
  it('listeners are not called after unmount', async () => {
    const { toggleMount, renderAgain } = renderTests();

    triggerAllEvents();
    triggerAllEvents();
    expect(getCallCount(onChange)).toBe(2);
    expect(getCallCount(onMonitorEvent)).toBe(2);
    expect(getCallCount(onReady)).toBe(2);
    await renderAgain();
    triggerAllEvents();
    expect(getCallCount(onChange)).toBe(3);
    expect(getCallCount(onMonitorEvent)).toBe(3);
    expect(getCallCount(onReady)).toBe(3);
    await toggleMount();
    await renderAgain();
    triggerAllEvents();
    expect(getCallCount(onChange)).toBe(3);
    expect(getCallCount(onMonitorEvent)).toBe(3);
    expect(getCallCount(onReady)).toBe(3);
  });
  it('listeners are not called after disposer is called. Remounting sets listeners back', async () => {
    const { dispose, toggleMount, renderAgain } = renderTests();

    dispose();
    triggerAllEvents();
    expect(getCallCount(onChange)).toBe(0);
    expect(getCallCount(onMonitorEvent)).toBe(0);
    expect(getCallCount(onReady)).toBe(0);
    await renderAgain();
    triggerAllEvents();
    expect(getCallCount(onChange)).toBe(0);
    expect(getCallCount(onMonitorEvent)).toBe(0);
    expect(getCallCount(onReady)).toBe(0);
    await toggleMount();
    triggerAllEvents();
    expect(getCallCount(onChange)).toBe(0);
    expect(getCallCount(onMonitorEvent)).toBe(0);
    expect(getCallCount(onReady)).toBe(0);
    await toggleMount();
    triggerAllEvents();
    expect(getCallCount(onChange)).toBe(1);
    expect(getCallCount(onMonitorEvent)).toBe(1);
    expect(getCallCount(onReady)).toBe(1);
  });
  it('changing the submit event changes event listeners', async () => {
    const { renderAgain } = renderTests();
    const newSubmitEvent = 'new-event-type';
    triggerAllEvents();
    expect(getCallCount(onChange)).toBe(1);
    expect(getCallCount(onMonitorEvent)).toBe(1);
    expect(getCallCount(onReady)).toBe(1);
    await renderAgain(newSubmitEvent);
    triggerAllEvents();
    expect(getCallCount(onChange)).toBe(1);
    expect(getCallCount(onMonitorEvent)).toBe(2);
    expect(getCallCount(onReady)).toBe(2);

    mockCore.triggerChangeEvent([], newSubmitEvent);
    expect(getCallCount(onChange)).toBe(2);

    await renderAgain();
    mockCore.triggerChangeEvent([], newSubmitEvent);
    expect(getCallCount(onChange)).toBe(3);
  });
});
