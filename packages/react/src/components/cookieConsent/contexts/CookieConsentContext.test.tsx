import React from 'react';
import { act, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';

import { Provider, useCookieConsentContext, useCookieConsentsInstance } from './CookieConsentContext';
// eslint-disable-next-line jest/no-mocks-import
import { mockCookieConsentCore } from '../../cookieConsentCore/__mocks__/mockCookieConsentCore';
import { CookieConsentCore } from '../../cookieConsentCore/cookieConsentCore';
import useForceRender from '../../../hooks/useForceRender';
import siteSettings from '../../cookieConsentCore/example/minimal_sitesettings.json';

const mockCore = mockCookieConsentCore();

jest.mock('../../cookieConsentCore/cookieConsentCore', () => ({
  CookieConsentCore: {
    create: (...args: Parameters<typeof CookieConsentCore.create>) => mockCore.create(...args),
  },
}));

describe('ConsentContext', () => {
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
    instanceExists: 'instance-exists',
  };

  const onChange = jest.fn();
  const instanceTracker = jest.fn();
  let language: string = '';
  let renderCount = 0;
  const InstanceHookComponent = () => {
    const instance = useCookieConsentsInstance();
    instanceTracker(instance);
    return (
      <div>
        <p data-testid={testIds.instanceExists}>{instance ? 1 : 0}</p>);
      </div>
    );
  };
  const ContextHookComponent = () => {
    const { settingsPageId, consents } = useCookieConsentContext();
    return (
      <div>
        <p data-testid={testIds.settingsPageId}>{settingsPageId}</p>);
        <p data-testid={testIds.consents}>{JSON.stringify(consents)}</p>);
        <p data-testid={testIds.onChangeCount}>{onChange.mock.calls.length}</p>);
      </div>
    );
  };
  const ContextComponent = () => {
    renderCount += 1;
    const forceRender = useForceRender();
    return (
      <div>
        <Provider onChange={onChange} siteSettings={siteSettings} options={{ language }}>
          <p data-testid={testIds.ready}>Context is ready</p>
          <ContextHookComponent />
          <InstanceHookComponent />
        </Provider>
        <button
          type="button"
          data-testid={testIds.renderAgain}
          onClick={() => {
            forceRender();
          }}
        >
          {renderCount}
        </button>
      </div>
    );
  };
  afterEach(() => {
    mockCore.reset();
    onChange.mockReset();
    renderCount = 0;
    language = '';
  });
  const renderTests = (
    props: { language?: string; consents?: ReturnType<CookieConsentCore['getAllConsentStatuses']> } = {},
  ) => {
    if (props.language) {
      language = props.language;
    }
    if (props.consents) {
      mockCore.setConsents(props.consents);
    }
    mockCore.setReadyEventDelay(200);
    let result: RenderResult;
    act(() => {
      result = render(<ContextComponent />);
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
    const getInstanceExists = () => {
      return parseInt(result.getByTestId(testIds.instanceExists).innerHTML, 10) === 1;
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

    const renderAgain = async (newLanguage = '') => {
      language = newLanguage;
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
      waitForReady: async () => {
        await waitForTestId(testIds.ready);
      },
      createPromiseForOnChangeUpdate,
      getRenderCount,
      getInstanceExists,
      renderAgain,
    };
  };
  it('Context does not render its children until it is ready', async () => {
    const result = renderTests();
    expect(() => result.getByTestId(testIds.ready)).toThrow();
    expect(() => result.getInstanceExists()).toThrow();
    await result.waitForReady();
  });
  it('Once ready children are rendered', async () => {
    const result = renderTests();
    await result.waitForReady();
    expect(() => result.getByTestId(testIds.ready)).not.toThrow();
    expect(result.getInstanceExists()).toBeTruthy();
  });

  it('"consents" contain current consents', async () => {
    const consentData = [
      { group: 'group1', consented: true },
      { group: 'group2', consented: false },
    ];
    const { getConsents, waitForReady } = renderTests({ consents: consentData });
    await waitForReady();
    expect(getConsents()).toEqual(consentData);
  });

  it('"onChange" is triggered when an event is dispatched', async () => {
    const result = renderTests();
    const { getConsents, waitForReady, createPromiseForOnChangeUpdate } = result;
    await waitForReady();
    const updatedConsentData = ['group3', 'group4'];
    const updatePromise = createPromiseForOnChangeUpdate();
    mockCore.triggerChangeEvent(updatedConsentData);
    await updatePromise;
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(getConsents()).toEqual(updatedConsentData.map((group) => ({ group, consented: true })));
    const updatePromise2 = createPromiseForOnChangeUpdate();
    mockCore.triggerChangeEvent([]);
    await updatePromise2;
    expect(getConsents()).toEqual([]);
    expect(onChange).toHaveBeenCalledTimes(2);

    mockCore.triggerMonitorEvent('type', 'keys', []);
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it('If language changes, setLanguage is called.', async () => {
    const result = renderTests();
    const { waitForReady, renderAgain } = result;
    await waitForReady();
    await renderAgain('za');
    await renderAgain('be');
    expect(mockCore.getTrackerCallCounts('setLanguage')).toBe(2);
  });
});
