import React, { useState } from 'react';
import { act, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';

import { useCookieSettingsPage } from '../useCookieSettingsPage';
// eslint-disable-next-line jest/no-mocks-import
import { mockCookieConsentCore } from '../../../cookieConsentCore/__mocks__/mockCookieConsentCore';
import { CookieConsentCore } from '../../../cookieConsentCore/cookieConsentCore';
import useForceRender from '../../../../hooks/useForceRender';
import { CookieConsentContextProvider } from '../../contexts/CookieConsentContext';
import { defaultSettingsPageId } from '../useCookieConsent';

const mockCore = mockCookieConsentCore();

jest.mock('../../../cookieConsentCore/cookieConsentCore', () => ({
  ...(jest.requireActual('../../../cookieConsentCore/cookieConsentCore') as Record<string, unknown>),
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
    setLanguageTo_sv: 'set-sv-lang',
    setLanguageTo_fi: 'set-fi-lang',
    setThemeTo_black: 'set-black-theme',
    setThemeTo_bus: 'set-bus-theme',
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
    const [language, setLanguage] = useState('fi');
    const [theme, setTheme] = useState('bus');
    renderCount += 1;
    const forceRender = useForceRender();
    return (
      <CookieConsentContextProvider onChange={jest.fn()} settingsPageId={settingsPageId} options={{ language, theme }}>
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
          <button
            type="button"
            data-testid={testIds.setLanguageTo_sv}
            onClick={() => {
              setLanguage('sv');
            }}
          >
            Set language sv
          </button>
          <button
            type="button"
            data-testid={testIds.setLanguageTo_fi}
            onClick={() => {
              setLanguage('fi');
            }}
          >
            Set language fi
          </button>
          <button
            type="button"
            data-testid={testIds.setThemeTo_black}
            onClick={() => {
              setTheme('black');
            }}
          >
            Set theme black
          </button>
          <button
            type="button"
            data-testid={testIds.setThemeTo_bus}
            onClick={() => {
              setTheme('bus');
            }}
          >
            Set theme bus
          </button>
        </div>
      </CookieConsentContextProvider>
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

    const setLanguage = async (newLang: 'sv' | 'fi') => {
      fireEvent.click(result.getByTestId(testIds[`setLanguageTo_${newLang}`]));
      await waitFor(() => {
        expect(mockCore.getRenderedLanguage()).toBe(newLang);
      });
    };
    const setTheme = async (newTheme: 'bus' | 'black') => {
      fireEvent.click(result.getByTestId(testIds[`setThemeTo_${newTheme}`]));
      await waitFor(() => {
        expect(mockCore.getRenderedTheme()).toBe(newTheme);
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
      setLanguageSv: async () => {
        return setLanguage('sv');
      },
      setLanguageFi: async () => {
        return setLanguage('fi');
      },
      setThemeBus: async () => {
        return setTheme('bus');
      },
      setThemeBlack: async () => {
        return setTheme('black');
      },
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
  it('changing language re-renders the page', async () => {
    const result = renderTests();
    await result.waitForReady();
    await result.setLanguageSv();
    expect(mockCore.getRenderedLanguage()).toBe('sv');
    await result.setLanguageFi();
    expect(mockCore.getRenderedLanguage()).toBe('fi');
  });
  it('changing theme re-renders the page', async () => {
    const result = renderTests();
    await result.waitForReady();
    await result.setThemeBlack();
    expect(mockCore.getRenderedTheme()).toBe('black');
    await result.setThemeBus();
    expect(mockCore.getRenderedTheme()).toBe('bus');
  });
});
