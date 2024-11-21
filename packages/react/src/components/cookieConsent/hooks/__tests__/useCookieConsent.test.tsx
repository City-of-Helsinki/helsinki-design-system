import React from 'react';
import { act, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';

import { CookieConsentReactProps, defaultSettingsPageId, useCookieConsent } from '../useCookieConsent';
// eslint-disable-next-line jest/no-mocks-import
import { mockCookieConsentCore } from '../../../cookieConsentCore/__mocks__/mockCookieConsentCore';
import { CookieConsentCore } from '../../../cookieConsentCore/cookieConsentCore';
import useForceRender from '../../../../hooks/useForceRender';

const mockCore = mockCookieConsentCore();

jest.mock('../../../cookieConsentCore/cookieConsentCore', () => ({
  ...(jest.requireActual('../../../cookieConsentCore/cookieConsentCore') as Record<string, unknown>),
  CookieConsentCore: {
    create: (...args: Parameters<typeof CookieConsentCore.create>) => mockCore.create(...args),
  },
}));

describe('useCookieConsent', () => {
  const testIds = {
    ready: 'is-ready',
    notReady: 'is-not-ready',
    settingsPageId: 'settings-page-id',
    consents: 'consents',
    renderPageButton: 'render-page-button',
    openBannerButton: 'open-banner-button',
    openBannerIfNeededButton: 'open-banner-if-needed-button',
    onChangeCount: 'on-change-count',
    renderAgain: 'render-again',
  };

  const onChange = jest.fn();
  let language: string | undefined;
  let theme: string | undefined;
  let renderCount = 1;
  const HookComponent = (props: Partial<CookieConsentReactProps> & { renderPageContainer?: boolean } = {}) => {
    const { options = {}, siteSettings = {}, settingsPageId, renderPageContainer } = props;
    if (language) {
      options.language = language;
    }
    if (theme) {
      options.theme = theme;
    }
    const {
      isReady,
      settingsPageId: currentSettingsPageId,
      consents,
      renderPage,
      openBanner,
      openBannerIfNeeded,
    } = useCookieConsent({
      onChange,
      options,
      siteSettings,
      settingsPageId,
    });
    renderCount += 1;
    const forceRender = useForceRender();
    return (
      <div>
        <p data-testid={isReady ? testIds.ready : testIds.notReady}>Ready or not</p>);
        <p data-testid={testIds.settingsPageId}>{currentSettingsPageId}</p>);
        <p data-testid={testIds.consents}>{JSON.stringify(consents)}</p>);
        <p data-testid={testIds.onChangeCount}>{onChange.mock.calls.length}</p>);
        <button
          type="button"
          data-testid={testIds.renderPageButton}
          onClick={() => {
            renderPage();
          }}
        >
          Render page
        </button>
        <button
          type="button"
          data-testid={testIds.openBannerButton}
          onClick={() => {
            openBanner();
          }}
        >
          openBanner
        </button>
        <button
          type="button"
          data-testid={testIds.openBannerIfNeededButton}
          onClick={() => {
            openBannerIfNeeded();
          }}
        >
          openBannerIfNeededButton
        </button>
        <button
          type="button"
          data-testid={testIds.renderAgain}
          onClick={() => {
            forceRender();
          }}
        >
          {renderCount}
        </button>
        {renderPageContainer && <div id={settingsPageId} />}
      </div>
    );
  };
  afterEach(() => {
    mockCore.reset();
    onChange.mockReset();
    language = undefined;
    theme = undefined;
    renderCount = 0;
  });
  const renderTests = (
    props: Partial<CookieConsentReactProps> & {
      consents?: ReturnType<CookieConsentCore['getAllConsentStatuses']>;
      readyEventDelay?: number;
      renderPageContainer?: boolean;
    } = {},
  ) => {
    if (props.consents) {
      mockCore.setConsents(props.consents);
    }
    if (props.readyEventDelay) {
      mockCore.setReadyEventDelay(props.readyEventDelay);
    }
    let result: RenderResult;
    act(() => {
      result = render(<HookComponent {...props} renderPageContainer={props.renderPageContainer} />);
    });
    const getSettingsPageId = () => {
      return result.getByTestId(testIds.settingsPageId).innerHTML;
    };
    const getOnChangeCallCount = () => {
      return parseInt(result.getByTestId(testIds.onChangeCount).innerHTML, 10);
    };
    const getRenderCount = () => {
      return parseInt(result.getByTestId(testIds.renderAgain).innerHTML, 10);
    };
    const getConsents = () => {
      return JSON.parse(result.getByTestId(testIds.consents).innerHTML);
    };
    const waitForTestId = async (testId: string) => {
      await waitFor(() => {
        expect(result.getByTestId(testId)).not.toBeNull();
      });
    };
    const createPromiseForOnChangeUpdate = async () => {
      const countNow = getOnChangeCallCount();
      return waitFor(() => {
        expect(getOnChangeCallCount()).not.toBe(countNow);
      });
    };

    const renderAgain = async (newLanguage?: string, newTheme?: string) => {
      if (newLanguage) {
        language = newLanguage;
      }
      if (newTheme) {
        theme = newTheme;
      }
      const lastRender = getRenderCount();
      fireEvent.click(result.getByTestId(testIds.renderAgain));
      await waitFor(() => {
        expect(getRenderCount()).not.toBe(lastRender);
      });
    };

    return {
      // @ts-ignore
      ...result,
      getSettingsPageId,
      getConsents,
      clickRenderPage: async () => {
        fireEvent.click(result.getByTestId(testIds.renderPageButton));
        await waitForTestId(mockCore.getRenderPageTestId());
      },
      clickOpenBanner: async () => {
        fireEvent.click(result.getByTestId(testIds.openBannerButton));
        await waitForTestId(mockCore.getBannerTestId());
      },
      waitForReady: async () => {
        await waitForTestId(testIds.ready);
      },
      createPromiseForOnChangeUpdate,
      getRenderCount,
      renderAgain,
    };
  };
  it('"isReady" is false until a ready event is triggered and instance exists', async () => {
    const result = renderTests({ readyEventDelay: 900 });
    expect(result.getByTestId('is-not-ready')).not.toBeNull();
    await result.waitForReady();
  });
  it('"settingsPageId" is the default id when not set', async () => {
    const { getSettingsPageId, waitForReady } = renderTests();
    await waitForReady();
    expect(getSettingsPageId()).toBe(defaultSettingsPageId);
  });
  it('"settingsPageId" is given id', async () => {
    const settingsPageId = 'new-id';
    const { getSettingsPageId, waitForReady } = renderTests({ settingsPageId });
    await waitForReady();
    expect(getSettingsPageId()).toBe(settingsPageId);
  });
  it('"consents" contain current consents', async () => {
    const settingsPageId = 'new-id';
    const consentData = [
      { group: 'group1', consented: true },
      { group: 'group2', consented: false },
    ];
    const { getConsents, waitForReady } = renderTests({ settingsPageId, consents: consentData });
    await waitForReady();
    expect(getConsents()).toEqual(consentData);
  });
  it('"renderPage" renders settings to given element. Previous pages are removed.', async () => {
    const settingsPageId = 'new-id';
    const result = renderTests({ settingsPageId, renderPageContainer: true });
    const { clickRenderPage, waitForReady } = result;
    mockCore.setRenderResult(result);
    await waitForReady();
    await clickRenderPage();
    expect(result.container.querySelectorAll(`#${settingsPageId}`)).toHaveLength(1);
    await clickRenderPage();
    await clickRenderPage();
    await clickRenderPage();
    expect(result.container.querySelectorAll(`#${settingsPageId}`)[0].childElementCount).toBe(1);
  });
  it('"openBanner" opens the banner', async () => {
    const result = renderTests({ renderPageContainer: true });
    const { clickOpenBanner, waitForReady } = result;
    mockCore.setRenderResult(result);
    await waitForReady();
    await clickOpenBanner();
    expect(result.getAllByTestId(mockCore.getBannerTestId())).toHaveLength(1);
  });
  it('"onChange" is triggered when an event is dispatched', async () => {
    const result = renderTests({ options: { submitEvent: true } });
    const { getConsents, waitForReady, createPromiseForOnChangeUpdate } = result;
    await waitForReady();
    const updatedConsentData = ['group3', 'group4'];
    const updatePromise = createPromiseForOnChangeUpdate();
    mockCore.triggerChangeEvent(updatedConsentData);
    await updatePromise;
    expect(getConsents()).toEqual(updatedConsentData.map((group) => ({ group, consented: true })));
    const updatePromise2 = createPromiseForOnChangeUpdate();
    mockCore.triggerChangeEvent([]);
    await updatePromise2;
    expect(getConsents()).toEqual([]);
  });
  it('Re-render uses stored cookieConsents in window.hds and does not re-create', async () => {
    expect(mockCore.getTrackerCallCounts('create')).toBe(0);
    const result = renderTests();
    const { waitForReady, renderAgain } = result;
    await waitForReady();
    expect(mockCore.getTrackerCallCounts('create')).toBe(1);

    await renderAgain();
    await renderAgain();
    await renderAgain();
    expect(mockCore.getTrackerCallCounts('create')).toBe(1);
  });
  it('If language changes, setLanguage is called.', async () => {
    const result = renderTests();
    const { waitForReady, renderAgain } = result;
    await waitForReady();
    await renderAgain('za');
    await renderAgain('be');
    expect(mockCore.getTrackerCallCounts('setLanguage')).toBe(2);
  });
  it('If theme changes, setTheme is called.', async () => {
    const result = renderTests();
    const { waitForReady, renderAgain } = result;
    await waitForReady();
    await renderAgain('', 'black');
    await renderAgain('', 'bus');
    expect(mockCore.getTrackerCallCounts('setTheme')).toBe(2);
  });
});
