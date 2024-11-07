import React, { useState } from 'react';
import { act, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';

import { useCookieSettingsPage } from '../useCookieSettingsPage';
// eslint-disable-next-line jest/no-mocks-import
import { mockCookieConsentCore } from '../../__mocks__/mockCookieConsentCore';
import { CookieConsentCore } from '../../cookieConsentCore';
import useForceRender from '../../../../hooks/useForceRender';
import { Provider } from '../../contexts/CookieConsentContext';
import { defaultSettingsPageId } from '../useCookieConsent';

const mockCore = mockCookieConsentCore();

jest.mock('../../cookieConsentCore', () => ({
  CookieConsentCore: {
    create: (...args: Parameters<typeof CookieConsentCore.create>) => mockCore.create(...args),
  },
}));

describe('useCookieSettingsPage', () => {
  const testIds = {
    ready: 'is-ready',
    notReady: 'is-not-ready',
    renderAgainButton: 'render-again',
    toggleMountButton: 'toggleMount',
    pageComponent: 'page-component',
    consents: 'consents',
    isMounted: 'is-mounted',
    settingsPageId: 'settings-page-id',
  };

  let renderCount: number = 0;
  const ModalComponent = () => {
    const { isReady, consents, settingsPageId } = useCookieSettingsPage();
    return (
      <div data-testid={testIds.pageComponent}>
        <p data-testid={isReady ? testIds.ready : testIds.notReady}>Ready or not</p>
        <p data-testid={testIds.consents}>{JSON.stringify(consents)}</p>);
        <p data-testid={testIds.settingsPageId}>{settingsPageId}</p>);
        <div id={settingsPageId} />;
      </div>
    );
  };
  let settingsPageId: string | undefined;
  const HookComponent = () => {
    const [isMounted, setIsMounted] = useState(true);
    renderCount += 1;
    const forceRender = useForceRender();
    return (
      <Provider onChange={jest.fn()} settingsPageId={settingsPageId}>
        <div>
          {isMounted && <ModalComponent />}
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
      </Provider>
    );
  };
  afterEach(() => {
    mockCore.reset();
    renderCount = 0;
    settingsPageId = undefined;
  });

  const renderTests = (newSettingsPageId?: string) => {
    let result: RenderResult;
    if (newSettingsPageId) {
      settingsPageId = newSettingsPageId;
    }
    // delay is need, so page is not rendered before mockCore.setRenderResult() is called
    mockCore.setReadyEventDelay(200);
    act(() => {
      result = render(<HookComponent />);
    });

    const getRenderCount = () => {
      return parseInt(result.getByTestId(testIds.renderAgainButton).innerHTML, 10);
    };
    const getIsMounted = () => {
      return parseInt(result.getByTestId(testIds.isMounted).innerHTML, 10) === 1;
    };
    const getConsents = () => {
      return JSON.parse(result.getByTestId(testIds.consents).innerHTML);
    };
    const getSettingsPageId = () => {
      return result.getByTestId(testIds.settingsPageId).innerHTML;
    };

    const renderAgain = async () => {
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
    const waitForTestId = async (testId: string) => {
      await waitFor(() => {
        expect(result.getByTestId(testId)).not.toBeNull();
      });
    };

    // @ts-ignore
    mockCore.setRenderResult(result);

    return {
      // @ts-ignore
      ...result,
      getRenderCount,
      renderAgain,
      toggleMount,
      getConsents,
      waitForReady: async () => {
        // mockCore.triggerReadyEvent();
        await waitForTestId(testIds.ready);
      },
      getSettingsPageId,
    };
  };

  it('renders the page', async () => {
    const result = renderTests();
    await result.waitForReady();
    expect(result.getAllByTestId(mockCore.getRenderPageTestId())).toHaveLength(1);
  });
  it('page is removed on unmount and returned on mount', async () => {
    const result = renderTests();
    await result.waitForReady();
    expect(result.getSettingsPageId()).toBe(defaultSettingsPageId);
    await result.toggleMount();
    expect(result.container.querySelectorAll(`#${defaultSettingsPageId}`)).toHaveLength(0);
    expect(() => result.getAllByTestId(mockCore.getRenderPageTestId())).toThrow();

    await result.toggleMount();
    expect(result.container.querySelectorAll(`#${defaultSettingsPageId}`)).toHaveLength(1);
    expect(() => result.getAllByTestId(mockCore.getRenderPageTestId())).not.toThrow();
  });
  it('returns and uses given settingsPageId', async () => {
    const id = 'new-id';
    const result = renderTests(id);
    await result.waitForReady();
    expect(result.getSettingsPageId()).toBe(id);
    expect(result.container.querySelectorAll(`#${id}`)).toHaveLength(1);
    expect(result.getAllByTestId(mockCore.getRenderPageTestId())).toHaveLength(1);
  });
  it('returns consents', async () => {
    const initialConsents = ['group1', 'group2'].map((group) => ({ group, consented: true }));
    mockCore.setConsents(initialConsents);
    const result = renderTests();
    const { getConsents, waitForReady } = result;
    await waitForReady();
    expect(getConsents()).toEqual(initialConsents);
    const updatedConsentData = ['group3', 'group4'];
    act(() => {
      mockCore.triggerChangeEvent(updatedConsentData);
    });
    await waitFor(() => {
      expect(getConsents()).toEqual(updatedConsentData.map((group) => ({ group, consented: true })));
    });
  });
});
