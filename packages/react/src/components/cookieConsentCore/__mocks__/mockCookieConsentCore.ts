// eslint-disable-next-line import/no-extraneous-dependencies
import { RenderResult } from '@testing-library/react';

import { CookieConsentCore, cookieEventType } from '../cookieConsentCore';
import { getLastMockCallArgs, getMockCalls } from '../../../utils/testHelpers';
import { defaultSettingsPageId } from '../../cookieConsent/hooks/useCookieConsent';

export function mockCookieConsentCore() {
  const innerState: {
    consents: ReturnType<CookieConsentCore['getAllConsentStatuses']>;
    readyEventDelay: number;
    isBannerNeeded: boolean;
    renderResult: RenderResult | null;
    renderPageTestId: string;
    bannerTestId: string;
    language: string;
    theme: string;
    renderedTestId: string;
  } = {
    consents: [],
    readyEventDelay: 0,
    isBannerNeeded: false,
    renderResult: null,
    renderPageTestId: 'rendered-page',
    bannerTestId: 'rendered-banner',
    language: '',
    theme: '',
    renderedTestId: '',
  };

  const trackers = {
    renderPage: jest.fn(),
    create: jest.fn(),
    openBanner: jest.fn(),
    setLanguage: jest.fn(),
    setTheme: jest.fn(),
  };

  const getRenderPageArgs = () => {
    return getLastMockCallArgs(trackers.renderPage);
  };

  const getCreateOptions = () => {
    return getLastMockCallArgs(trackers.create)[0][1];
  };

  const triggerReadyEvent = () => {
    window.dispatchEvent(new Event(cookieEventType.READY));
  };

  const triggerChangeEvent = (acceptedGroups: string[]) => {
    innerState.consents = acceptedGroups.map((group) => {
      return { group, consented: true };
    });
    window.dispatchEvent(new CustomEvent(cookieEventType.CHANGE, { detail: { acceptedGroups } }));
  };

  const triggerMonitorEvent = (storageType: string, keys: string, acceptedGroups: string[]) => {
    window.dispatchEvent(new CustomEvent(cookieEventType.MONITOR, { detail: { storageType, keys, acceptedGroups } }));
  };

  const getRenderedElement = (renderResult?: RenderResult) => {
    const result = renderResult || innerState.renderResult;
    if (!innerState.renderedTestId) {
      return null;
    }
    if (!result) {
      throw new Error('Missing renderResult');
    }
    try {
      return result.getByTestId(innerState.renderedTestId);
    } catch (e) {
      return null;
    }
  };

  const removeCurrentElement = (renderResult?: RenderResult) => {
    const element = getRenderedElement(renderResult);
    if (element) {
      element.remove();
      innerState.renderedTestId = '';
    }
  };

  const openBanner = async (...args: Parameters<CookieConsentCore['openBanner']>) => {
    trackers.openBanner(...args);
    if (!innerState.renderResult) {
      throw new Error('Missing innerState.renderResult');
    }
    removeCurrentElement();
    const banner = document.createElement('div');
    banner.innerHTML = 'banner';
    banner.setAttribute('data-testid', innerState.bannerTestId);
    banner.setAttribute('data-language', innerState.language);
    banner.setAttribute('data-theme', innerState.theme);
    innerState.renderedTestId = innerState.bannerTestId;
    const target = innerState.renderResult.container;
    target.appendChild(banner);
    return Promise.resolve();
  };

  const createInstance = (): Partial<CookieConsentCore> => {
    return {
      getAllConsentStatuses: () => {
        return innerState.consents;
      },
      setLanguage: (lang) => {
        trackers.setLanguage(lang);
        innerState.language = lang;
      },
      setTheme: (theme) => {
        trackers.setTheme(theme);
        innerState.theme = theme;
      },
      openBannerIfNeeded: async (...args: Parameters<CookieConsentCore['openBannerIfNeeded']>) => {
        if (innerState.isBannerNeeded) {
          openBanner(...args);
        }
        return Promise.resolve(innerState.isBannerNeeded);
      },
      renderPage: async (...args: Parameters<CookieConsentCore['renderPage']>) => {
        trackers.renderPage(...args);
        if (!innerState.renderResult) {
          throw new Error('Missing innerState.renderResult');
        }
        const page = document.createElement('div');
        page.innerHTML = 'renderPage';
        page.setAttribute('data-testid', innerState.renderPageTestId);
        page.setAttribute('data-language', innerState.language);
        page.setAttribute('data-theme', innerState.theme);
        const targetId = getRenderPageArgs()[0] || defaultSettingsPageId;
        const target = innerState.renderResult.container.querySelector(targetId) as HTMLElement;
        innerState.renderedTestId = innerState.renderPageTestId;
        target.appendChild(page);
        return Promise.resolve();
      },
      removePage: () => {
        removeCurrentElement();
        return false;
      },
      removeBanner: () => {
        removeCurrentElement();
        return undefined;
      },
      openBanner,
    };
  };

  return {
    triggerReadyEvent,
    triggerChangeEvent,
    triggerMonitorEvent,
    create: async (...args: Parameters<typeof CookieConsentCore.create>) => {
      trackers.create(args);
      const instance = createInstance();
      const options = getCreateOptions();
      innerState.language = options.language || '';
      innerState.theme = options.theme || '';
      if (innerState.readyEventDelay) {
        await new Promise((resolve) => {
          setTimeout(resolve, innerState.readyEventDelay);
        });
      }
      window.hds = { cookieConsent: instance as CookieConsentCore };
      triggerReadyEvent();
      return Promise.resolve(instance);
    },
    setConsents: (consents: ReturnType<CookieConsentCore['getAllConsentStatuses']>) => {
      innerState.consents = consents;
    },
    setReadyEventDelay: (delay: number) => {
      innerState.readyEventDelay = delay;
    },
    setRenderResult: (result: RenderResult) => {
      innerState.renderResult = result;
    },
    setBannerNeeded: () => {
      innerState.isBannerNeeded = true;
    },
    reset: () => {
      innerState.consents = [];
      innerState.readyEventDelay = 0;
      innerState.isBannerNeeded = false;
      innerState.renderResult = null;
      innerState.language = '';
      innerState.theme = '';
      innerState.renderedTestId = '';
      Object.keys(trackers).forEach((key) => {
        trackers[key].mockReset();
      });
      if (window.hds) {
        // @ts-ignore
        window.hds.cookieConsent = undefined;
        // @ts-ignore
        window.hds = undefined;
      }
    },
    getRenderPageTestId: () => {
      return innerState.renderPageTestId;
    },
    getBannerTestId: () => {
      return innerState.bannerTestId;
    },
    getRenderedLanguage: (renderResult?: RenderResult) => {
      const elem = getRenderedElement(renderResult);
      return elem ? elem.getAttribute('data-language') : null;
    },
    getRenderedTheme: (renderResult?: RenderResult) => {
      const elem = getRenderedElement(renderResult);
      return elem ? elem.getAttribute('data-theme') : null;
    },
    getTrackerCallCounts: (key: keyof typeof trackers) => {
      return getMockCalls(trackers[key]).length;
    },
  };
}
