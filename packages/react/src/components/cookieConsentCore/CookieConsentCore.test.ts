import { fireEvent, waitFor } from '@testing-library/dom';
import fetchMock, { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';

import { CookieConsentCore } from './cookieConsentCore';
import * as settingsJSON from './example/helfi_sitesettings.json';

type Options = {
  siteSettingsJsonUrl: string;
  language: string;
  tempCssPath: string;
};

type CookieConsentClass = InstanceType<typeof CookieConsentCore>;

describe('cookieConsentCore', () => {
  let mockTextEncoderDisposer: () => void;
  let mockCryptoDisposer: () => void;
  let instance: CookieConsentClass;
  const rootId = 'hds-cc';
  const formId = 'hds-cc-form';
  const showDetailsButtonSelector = `#${rootId} .hds-cc__aligner button`;
  const acceptAllButtonSelector = `.hds-cc__buttons button[data-approved="all"]`;
  const acceptRequiredButtonSelector = `.hds-cc__buttons button[data-approved="required"]`;
  const essentialCookiesCheckboxSelector = `#essential-cookies`;
  const containerSelector = `.hds-cc__container`;

  const options: Options = {
    siteSettingsJsonUrl: 'http://localhost/helfi_sitesettings.json',
    language: 'fi', // Lang code defaults to 'en'
    // targetSelector: 'body', // Defaults to 'body'
    // spacerParentSelector: 'body', // Defaults to 'body'
    // pageContentSelector: 'body', // Defaults to 'body'
    // submitEvent: 'cookie-consent-changed', // If this string is set, triggers a window level event with that string and detail.acceptedGroups before closing banner. If not set, reloads page instead
    // settingsPageSelector: '#hds-cookie-consent-full-page', // If this string is set and matching element is found on page, instead of banner, show a full page cookie settings replacing the matched element.
    // monitorInterval: 500, // Monitors cookies that JS can see (same domain, not hidden from js) for misconfiguration. Defaults to 500ms, set to 0 to disable monitoring
    // remove: true, // If true, will remove unallowed cookies and storage. Defaults to false
    // monitorWithOverride: true, // If true, will override native writing to cookies and storage to monitor them. Defaults to false
    // block: true, // If true, will block setting unallowed cookies and storage. Defaults to false
    // blockWithErrors: true, // If true, will throw errors when trying to set unallowed cookies and storage. Defaults to false
    tempCssPath: 'http://localhost:6006/static-cookie-consent/cookieConsent.css', // TODO: Remove this when the real build process can include css files
  };

  const getShadowRoot = () => {
    const body = document.querySelector('body') as HTMLBodyElement;
    const shadowRoots = Array.from(body.children).map((n) => n.shadowRoot);
    return shadowRoots[0] as ShadowRoot;
  };
  const getRootElement = () => {
    return getShadowRoot().getElementById(rootId) as HTMLDivElement;
  };

  const getFormElement = () => {
    return getShadowRoot().getElementById(formId) as HTMLFormElement;
  };

  const getContainerElement = () => {
    return getRootElement().querySelector(containerSelector) as HTMLDivElement;
  };

  const getShowDetailsButtonElement = () => {
    return getRootElement().querySelector(showDetailsButtonSelector) as HTMLButtonElement;
  };

  const getAcceptAllButtonElement = () => {
    return getRootElement().querySelector(acceptAllButtonSelector) as HTMLButtonElement;
  };

  const getAcceptRequiredButtonElement = () => {
    return getRootElement().querySelector(acceptRequiredButtonSelector) as HTMLButtonElement;
  };

  const getEssentialCookiesCheckbox = () => {
    return getRootElement().querySelector(essentialCookiesCheckboxSelector) as HTMLInputElement;
  };

  const isDetailsExpanded = () => {
    const button = getShowDetailsButtonElement();
    return button.getAttribute('aria-expanded') === 'true';
  };

  const createDomRect = (props: Partial<DOMRect>): DOMRect => {
    const rect = {
      left: props.left || props.x || 0,
      top: props.top || props.y || 0,
      width: props.width || 0,
      height: props.height || 0,
      right: props.right || 0,
      bottom: props.bottom || 0,
    };

    const right = Math.max(rect.right, rect.left + rect.width);
    const bottom = Math.max(rect.bottom, rect.top + rect.height);
    const width = Math.max(rect.width, rect.right - rect.left);
    const height = Math.max(rect.height, rect.bottom - rect.top);

    return {
      left: rect.left,
      top: rect.top,
      width,
      height,
      right,
      bottom,
      x: rect.left,
      y: rect.top,
      toJSON: () => '',
    };
  };

  const addBoundingClientRect = (element: HTMLElement, rect?: DOMRect) => {
    jest.spyOn(element, 'getBoundingClientRect').mockImplementation(() => {
      return rect || createDomRect({});
    });
  };

  const addMutationEntries = (entries: ResizeObserverEntry[]) => {
    return entries.map((e) => {
      return {
        ...e,
        contentRect: createDomRect({}),
        target: getContainerElement(),
      };
    });
  };

  const initMockTextEncoder = (responseList: string[]) => {
    const current = global.TextEncoder;
    const mockTextEncoder = function MockTextEncoder() {
      this.prototype = Object.create(null).prototype;
      this.encode = () => {
        return responseList.shift();
      };
    } as unknown as TextEncoder;

    // @ts-ignore
    global.TextEncoder = mockTextEncoder;

    return () => {
      if (current) {
        global.TextEncoder = current;
      }
    };
  };
  const initCryptoTextEncoder = (responseList: string[]) => {
    const current = global.crypto;
    const mockCrypto = {
      subtle: {
        digest: () => {
          return Promise.resolve(responseList.shift() || 'hash');
        },
      },
    };

    // @ts-ignore
    global.crypto = mockCrypto;

    return () => {
      if (current) {
        global.crypto = current;
      }
    };
  };

  const returnSettingsJSON = () =>
    Promise.resolve({
      body: JSON.stringify(settingsJSON),
      headers: {
        'content-type': 'application/json',
      },
    });

  const returnTempCSS = () =>
    Promise.resolve({
      body: 'div{}',
      headers: {
        'content-type': 'application/css',
      },
    });

  const waitForRoot = async () => {
    await waitFor(() => {
      const root = getRootElement();
      if (!root) {
        throw new Error('No root');
      }
    });
  };

  beforeAll(() => {
    enableFetchMocks();
    fetchMock.mockResponse((req) => {
      if (req.url.includes(options.siteSettingsJsonUrl)) {
        return returnSettingsJSON();
      }
      if (req.url.includes(options.tempCssPath)) {
        return returnTempCSS();
      }
      return Promise.reject(new Error(`Unknown url ${req.url}`));
    });
    global.ResizeObserverEntrySpy = addMutationEntries;
  });

  beforeEach(() => {
    try {
      const el = getRootElement();
      if (el) {
        el.remove();
      }
    } catch (e) {
      // it is normal to fail
    }
    mockTextEncoderDisposer = initMockTextEncoder(['xx']);
    mockCryptoDisposer = initCryptoTextEncoder(['xx']);
    instance = new CookieConsentCore(options);
  });

  afterEach(() => {
    if (mockCryptoDisposer) {
      mockCryptoDisposer();
    }
    if (mockTextEncoderDisposer) {
      mockTextEncoderDisposer();
    }
  });
  afterAll(() => {
    disableFetchMocks();
    global.ResizeObserverEntrySpy = undefined;
  });

  it('adds elements to shadowRoot', async () => {
    await waitForRoot();
    expect(instance).toBeDefined();
    expect(getFormElement()).not.toBeNull();
    expect(getContainerElement()).not.toBeNull();
    expect(getAcceptAllButtonElement()).not.toBeNull();
    expect(getAcceptRequiredButtonElement()).not.toBeNull();
    expect(getShowDetailsButtonElement()).not.toBeNull();
    expect(getEssentialCookiesCheckbox()).not.toBeNull();
    expect(isDetailsExpanded()).toBeFalsy();
  });
  it('Changes on button click', async () => {
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    fireEvent.click(getShowDetailsButtonElement());
    expect(isDetailsExpanded()).toBeTruthy();
  });
});
