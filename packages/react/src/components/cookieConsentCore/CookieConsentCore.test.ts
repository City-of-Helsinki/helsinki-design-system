/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jest/no-mocks-import */
import { fireEvent, waitFor } from '@testing-library/dom';
import fetchMock, { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';

import mockDocumentCookie from './__mocks__/mockDocumentCookieCore';
import { CookieConsentCore } from './cookieConsentCore';
import * as siteSettingsObjRaw from './example/helfi_sitesettings.json';
import helpers from './helpers/cookieConsentTestHelpers';

const siteSettingsObj = { ...siteSettingsObjRaw, monitorInterval: 50 };

type Options = {
  language?: string;
  theme?: string;
  targetSelector?: string;
  spacerParentSelector?: string;
  pageContentSelector?: string;
  submitEvent?: boolean | string;
  settingsPageSelector?: string;
};

jest.mock('hds-core/lib/components/cookie-consent/cookieConsent', () => ({
  default: '/* We are not using styles inside jest yet */',
}));

type CookieConsentClass = InstanceType<typeof CookieConsentCore>;

describe('cookieConsentCore', () => {
  let mockTextEncoderDisposer: () => void;
  let mockCryptoDisposer: () => void;
  const mockedCookieControls = mockDocumentCookie();
  let instance: CookieConsentClass;
  const rootId = 'hds-cc';
  const formId = 'hds-cc-form';
  const showDetailsButtonSelector = `#${rootId} .hds-cc__aligner button`;
  const acceptAllButtonSelector = `.hds-cc__buttons button[data-approved="all"]`;
  const acceptRequiredButtonSelector = `.hds-cc__buttons button[data-approved="required"]`;
  const essentialCookiesCheckboxSelector = `#essential-cookies`;
  const containerSelector = `.hds-cc__container`;

  /**
   * Wait for console log to be called with a specific message
   * @param level Console level, e.g. 'log', 'warn', 'error'
   * @param messageToWait Message to wait for
   */
  async function waitForConsole(level, messageToWait) {
    const consoleLogSpy = jest.spyOn(console, level);
    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith(messageToWait);
    });
  }

  const urls = {
    siteSettingsJsonUrl: '/helfi_sitesettings.json',
    siteSettings404: '/404.json',
    siteSettingsNotJSON: '/malformed.json',
  };

  // -------------------------------------------------------------------------------------------------------------------
  // MARK: Default options
  const options: Options = {
    language: 'fi', // Lang code defaults to 'en'
    // theme: 'black', // Defaults to 'bus'
    // targetSelector: 'body', // Defaults to 'body'
    // spacerParentSelector: 'body', // Defaults to 'body'
    // pageContentSelector: 'body', // Defaults to 'body'
    // submitEvent: 'cookie-consent-changed', // If this string is set, triggers a window level event with that string and detail.acceptedGroups before closing banner. If not set, reloads page instead
    settingsPageSelector: '#hds-cookie-consent-full-page', // If this string is set and matching element is found on page, instead of banner, show a full page cookie settings replacing the matched element.
  };
  const optionsEvent = { ...options, submitEvent: 'cookie-consent-changed' };

  const STORAGE_TYPE = {
    cookie: 1,
    localStorage: 2,
    sessionStorage: 3,
    indexedDB: 4,
    cacheStorage: 5,
  };

  const getShadowRoot = () => {
    const targetElement = document.querySelector('.hds-cc__target') as HTMLElement;
    if (!targetElement) {
      return null;
    }
    return targetElement.shadowRoot as ShadowRoot;
  };

  const getRootElement = () => {
    return getShadowRoot()?.getElementById(rootId) as HTMLDivElement;
  };

  const getFormElement = () => {
    return getShadowRoot()?.getElementById(formId) as HTMLFormElement;
  };

  const getContainerElement = () => {
    return getRootElement()?.querySelector(containerSelector) as HTMLDivElement;
  };

  const getShowDetailsButtonElement = () => {
    return getRootElement()?.querySelector(showDetailsButtonSelector) as HTMLButtonElement;
  };

  const getAcceptAllButtonElement = () => {
    return getRootElement()?.querySelector(acceptAllButtonSelector) as HTMLButtonElement;
  };

  const getAcceptRequiredButtonElement = () => {
    return getRootElement()?.querySelector(acceptRequiredButtonSelector) as HTMLButtonElement;
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
      if (getShadowRoot() === null || getRootElement() === null) {
        return {
          ...e,
          contentRect: createDomRect({}),
          target: document.body,
        };
      }

      return {
        ...e,
        contentRect: createDomRect({}),
        target: getContainerElement(),
      };
    });
  };

  // Wrap bannerClicks
  const bannerClicks = {
    approveAll: () => helpers.approveAll(getShadowRoot(), fireEvent),
    approveCategory: (category: string) => helpers.approveCategory(getShadowRoot(), fireEvent, category),
    unApproveCategory: (category: string) => helpers.unApproveCategory(getShadowRoot(), fireEvent, category),
  };

  // Make simplified cheksum handling for testing purposes
  const initMockTextEncoder = () => {
    const current = global.TextEncoder;
    const mockTextEncoder = function MockTextEncoder() {
      this.prototype = Object.create(null).prototype;
      this.encode = (param: string) => {
        return param;
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

  const initCryptoTextEncoder = () => {
    const current = global.crypto;
    const mockCrypto = {
      subtle: {
        digest: (algo: string, input: string) => {
          let checksum = 0;
          let returnCheck = [''];

          for (let i = 0; i < input.length; i += 1) {
            checksum += input.charCodeAt(i);
          }
          checksum = (checksum % 256) * 123456789;
          returnCheck = checksum.toString().split('');
          returnCheck.push(...returnCheck);

          return returnCheck;
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
      body: JSON.stringify(siteSettingsObj),
      headers: {
        'content-type': 'application/json',
      },
    });

  const returnNotJSON = () =>
    Promise.resolve({
      body: 'This is not a JSON',
      headers: {
        'content-type': 'application/json',
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

  // -------------------------------------------------------------------------------------------------------------------
  // MARK: Hooks

  beforeAll(() => {
    // Set to true to get console.log() to output
    // const testDebug = false;
    const testDebug = true;
    jest.spyOn(console, 'log').mockImplementation((message) => {
      if (testDebug) {
        process.stdout.write(`console.log: ${message}\n`);
      }
    });
    jest.spyOn(console, 'error').mockImplementation((message) => {
      if (testDebug) {
        process.stderr.write(`console.error: ${message}\n`);
      }
    });
    jest.spyOn(console, 'warn').mockImplementation((message) => {
      if (testDebug) {
        process.stdout.write(`console.warn: ${message}\n`);
      }
    });
    jest.spyOn(console, 'info').mockImplementation((message) => {
      if (testDebug) {
        process.stdout.write(`console.info: ${message}\n`);
      }
    });

    enableFetchMocks();
    fetchMock.mockResponse((req) => {
      if (req.url.includes(urls.siteSettingsJsonUrl)) {
        return returnSettingsJSON();
      }
      if (req.url.includes(urls.siteSettings404)) {
        // return a 404 response
        return Promise.resolve({ status: 404, ok: false, body: 'Not found' });
      }
      if (req.url.includes(urls.siteSettingsNotJSON)) {
        return returnNotJSON();
      }
      return Promise.reject(new Error(`Unknown url ${req.url}`));
    });
    // @ts-ignore next-line
    global.ResizeObserverEntrySpy = addMutationEntries;
  });

  beforeEach(() => {
    jest.useFakeTimers(); // Since monitor loop uses setInterval, we need to fake timers. It's here, so we can override this per test if needed
    try {
      const el = getRootElement();
      if (el) {
        el.remove();
      }
    } catch (e) {
      // it is normal to fail
    }
    mockTextEncoderDisposer = initMockTextEncoder();
    mockCryptoDisposer = initCryptoTextEncoder();
  });

  afterEach(() => {
    mockedCookieControls.clear();
    if (mockCryptoDisposer) {
      mockCryptoDisposer();
    }
    if (mockTextEncoderDisposer) {
      mockTextEncoderDisposer();
    }
    jest.resetModules();
  });

  afterAll(() => {
    disableFetchMocks();
    // @ts-ignore next-line
    global.ResizeObserverEntrySpy = undefined;
  });

  // -------------------------------------------------------------------------------------------------------------------
  // MARK: Basic tests

  it('should add elements to shadowRoot', async () => {
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, options);
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

  it('should change on button click', async () => {
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, options);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    fireEvent.click(getShowDetailsButtonElement());
    expect(isDetailsExpanded()).toBeTruthy();
  });

  // -------------------------------------------------------------------------------------------------------------------
  // MARK: Config
  // - Is the settings file properly linked?

  it('should throw an error if constructor is accessed directly without create method', () => {
    // @ts-ignore
    return expect(() => new CookieConsentCore(siteSettingsObj, options)).toThrow(
      'Cookie consent: direct construction not allowed. Use `await CookieConsentCore.create()` instead.',
    );
  });

  it('should accept siteSettingsObj as input instead of url', async () => {
    instance = await CookieConsentCore.create(siteSettingsObj, options);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    fireEvent.click(getShowDetailsButtonElement());
    expect(isDetailsExpanded()).toBeTruthy();
  });

  it('should throw an error if siteSettingsObj is not defined', async () => {
    return expect(async () => CookieConsentCore.create(null, options)).rejects.toThrow(
      'Cookie consent: siteSettingsParam is required, it should be an URL string or an siteSettings object.',
    );
  });

  it('should throw an error if siteSettings URL is not found', async () => {
    await expect(CookieConsentCore.create(urls.siteSettings404, { ...options })).rejects.toThrow(
      `Cookie consent: Unable to fetch cookie consent settings: '404' from: '${urls.siteSettings404}' `,
    );
  });

  it('should throw an error if siteSettings JSON is malformed', async () => {
    await expect(CookieConsentCore.create(urls.siteSettingsNotJSON, { ...options })).rejects.toThrow(
      'Cookie consent: siteSettings JSON parsing failed: SyntaxError: Unexpected token',
    );
  });

  // - If the banner is set for custom targets, are the selectors available on DOM?
  it('should throw error if targetSelector is set but not found on DOM', async () => {
    // eslint-disable-next-line jest/valid-expect
    expect(
      CookieConsentCore.create(urls.siteSettingsJsonUrl, { ...options, targetSelector: '#not-found' }),
    ).rejects.toThrow("Cookie consent: The targetSelector element '#not-found' was not found");
  });

  // - If the banner is set for custom targets, are the selectors available on DOM?
  it('should throw error if spacerParentSelector is set but not found on DOM', async () => {
    // eslint-disable-next-line jest/valid-expect
    expect(
      CookieConsentCore.create(urls.siteSettingsJsonUrl, { ...options, spacerParentSelector: '#not-found' }),
    ).rejects.toThrow("Cookie consent: The spacerParentSelector element '#not-found' was not found");
  });

  // - If the banner is set for custom targets, are the selectors available on DOM?
  it('should throw error if pageContentSelector is set but not found on DOM', async () => {
    // eslint-disable-next-line jest/valid-expect
    expect(
      CookieConsentCore.create(urls.siteSettingsJsonUrl, { ...options, pageContentSelector: '#not-found' }),
    ).rejects.toThrow("Cookie consent: The pageContentSelector element '#not-found' was not found");
  });

  // - Are there whitelisted groups available in window scope?
  it('should allow consenting from API to a group that is whitelisted', async () => {
    instance = await CookieConsentCore.create(
      {
        ...siteSettingsObj,
        requiredGroups: [
          {
            groupId: 'essential',
            title: 'Essential without consent cookie',
            description: '-',
            cookies: [
              {
                name: 'helfi-cookie-consents',
                host: '-',
                description: '-',
                expiration: '-',
                type: 1,
              },
            ],
          },
        ],
        optionalGroups: [
          {
            groupId: 'chat',
            title: 'Chat',
            description: '-',
            cookies: [
              {
                name: 'chat-cookie',
                host: '-',
                description: '-',
                expiration: '-',
                type: 1,
              },
            ],
          },
        ],
        groupsWhitelistedForApi: ['chat'],
      },
      optionsEvent,
    );
    await waitForRoot();

    const result = await helpers.setGroupsStatusToAccepted(['chat']);
    expect(result).toBeTruthy();

    const cookiesAsString = mockedCookieControls.getCookie();
    const parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    const helfiCookie = parsed['helfi-cookie-consents'];
    const writtenCookieGroups = JSON.parse(helfiCookie as string)?.groups || '';
    const writtenKeys = Object.keys(writtenCookieGroups);
    const expectedGroups = ['essential', 'chat'];
    expect(writtenKeys).toEqual(expectedGroups);
  });

  it('should not allow consenting from API to a group that is not whitelisted', async () => {
    instance = await CookieConsentCore.create(
      {
        ...siteSettingsObj,
        requiredGroups: [
          {
            groupId: 'essential',
            title: 'Essential without consent cookie',
            description: '-',
            cookies: [
              {
                name: 'helfi-cookie-consents',
                host: '-',
                description: '-',
                expiration: '-',
                type: 1,
              },
            ],
          },
        ],
        optionalGroups: [
          {
            groupId: 'chat',
            title: 'Chat',
            description: '-',
            cookies: [
              {
                name: 'chat-cookie',
                host: '-',
                description: '-',
                expiration: '-',
                type: 1,
              },
            ],
          },
        ],
        groupsWhitelistedForApi: ['not-chat'],
      },
      optionsEvent,
    );
    await waitForRoot();

    const result = await helpers.setGroupsStatusToAccepted(['chat']);
    expect(result).toBeFalsy();

    await waitForConsole(
      'error',
      'Cookie consent: The group(s) "chat" not found in groupsWhitelistedForApi: "not-chat".',
    );

    const cookiesAsString = mockedCookieControls.getCookie();
    const parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    const cookieContent = parsed['helfi-cookie-consents'];
    expect(cookieContent).toBeUndefined();
  });

  it('should complain in console if setGroupsStatusToAccepted is not given an array', async () => {
    instance = await CookieConsentCore.create(siteSettingsObj, optionsEvent);
    await waitForRoot();

    // @ts-ignore
    const result = await helpers.setGroupsStatusToAccepted('not-an-array');

    await waitForConsole(
      'error',
      'Cookie consent: Accepted groups must be provided as an array to setGroupsStatusToAccepted function.',
    );

    expect(result).toBeFalsy();
  });

  it('should complain in console if group can not be found in site settings', async () => {
    instance = await CookieConsentCore.create(
      {
        ...siteSettingsObj,
        requiredGroups: [
          {
            groupId: 'essential',
            title: 'Essential without consent cookie',
            description: '-',
            cookies: [
              {
                name: 'helfi-cookie-consents',
                host: '-',
                description: '-',
                expiration: '-',
                type: 1,
              },
            ],
          },
        ],
        optionalGroups: [],
        groupsWhitelistedForApi: ['group_not_defined_in_essential_or_optional'],
      },
      optionsEvent,
    );
    await waitForRoot();

    const result = await helpers.setGroupsStatusToAccepted(['group_not_defined_in_essential_or_optional']);

    await waitForConsole(
      'error',
      'Cookie consent: The group(s) "group_not_defined_in_essential_or_optional" not found in required or optional groups in site settings.',
    );

    expect(result).toBeFalsy();
  });

  it('should complain in console if groupNamesArray is not an array when calling API getConsentStatus', async () => {
    instance = await CookieConsentCore.create(siteSettingsObj, optionsEvent);
    await waitForRoot();

    // @ts-ignore
    const result = await helpers.getConsentStatus('chat');

    await waitForConsole('error', 'Cookie consent: Group names must be provided as an non-empty array.');

    expect(result).toBeFalsy();
  });

  // - Do site settings contain a group for consent cookie?
  it('should throw error if there is no required group to store consent cookie in', () => {
    return expect(async () =>
      CookieConsentCore.create({ ...siteSettingsObj, requiredGroups: [] }, options),
    ).rejects.toThrow(
      "Cookie consent: At least one required group is needed to store consent in 'helfi-cookie-consents'.",
    );
  });

  // - Do site site settings contain consent cookie?
  it('should throw error if there is no consent cookie in site settings required groups', () => {
    return expect(async () =>
      CookieConsentCore.create(
        {
          ...siteSettingsObj,
          requiredGroups: [
            {
              groupId: 'essential',
              title: 'Essential without consent cookie',
              description: '',
              cookies: [
                {
                  name: 'not_consent_cookie',
                  host: '-',
                  description: '-',
                  expiration: '-',
                  type: 1,
                },
              ],
            },
          ],
        },
        options,
      ),
    ).rejects.toThrow("Cookie consent: No group found in requiredGroups that contains cookie 'helfi-cookie-consents'.");
  });

  // - Do site site settings have duplicate groups?
  it('should throw error if site settings contains duplicate groups', () => {
    return expect(async () =>
      CookieConsentCore.create(
        {
          ...siteSettingsObj,
          requiredGroups: [
            {
              groupId: 'duplicate',
              title: 'Duplicate group',
              description: '',
              cookies: [
                {
                  name: 'helfi-cookie-consents',
                  host: '-',
                  description: '-',
                  expiration: '-',
                  type: 1,
                },
              ],
            },
          ],
          optionalGroups: [
            {
              groupId: 'duplicate',
              title: 'Duplicate group',
              description: '',
              cookies: [
                {
                  name: 'cookie',
                  host: '-',
                  description: '-',
                  expiration: '-',
                  type: 1,
                },
              ],
            },
          ],
        },
        options,
      ),
    ).rejects.toThrow("Cookie consent: Groups 'duplicate' found multiple times in settings.");
  });

  // -------------------------------------------------------------------------------------------------------------------
  // MARK: Functionalities
  // - When user enters the site first time with empty cookies, does the banner show up?
  it('should render banner if the consent cookie is not set', async () => {
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, options);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    const banner = document.querySelector('.hds-cc__target');
    expect(banner).not.toBeNull();
  });

  // - When user accepts all cookies, the cookie should be written with all groups mentioned in settings.
  it('should add consentCookie with all groups when user consents to all groups', async () => {
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    const allButton = getShadowRoot()?.querySelector('button[data-approved="all"]');
    fireEvent.click(allButton as HTMLElement);

    const cookiesAsString = mockedCookieControls.getCookie();
    const parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    const writtenCookieGroups = JSON.parse(parsed['helfi-cookie-consents'] as string)?.groups || '';
    const writtenKeys = Object.keys(writtenCookieGroups);
    const expectedGroups = [...siteSettingsObj.requiredGroups, ...siteSettingsObj.optionalGroups].map((e) => e.groupId);
    expect(writtenKeys).toEqual(expectedGroups);
  });

  // - When user accepts essential cookies, the cookie should be written with essential groups.
  it('should add consentCookie with only required groups when user consents only to required groups', async () => {
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    const requiredButton = getShadowRoot()?.querySelector('button[data-approved="required"]');
    fireEvent.click(requiredButton as HTMLElement);

    const cookiesAsString = mockedCookieControls.getCookie();
    const parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    const writtenCookieGroups = JSON.parse(parsed['helfi-cookie-consents'] as string)?.groups || '';
    const writtenKeys = Object.keys(writtenCookieGroups);
    const expectedGroups = [...siteSettingsObj.requiredGroups].map((e) => e.groupId);
    expect(writtenKeys).toEqual(expectedGroups);
  });

  // - When user selects certain groups, the cookie should be written according to those.
  it('should add consentCookie with required groups and selected groups when user consents to selected cookie groups', async () => {
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    const openAccordionButton = getShadowRoot()?.querySelector('.hds-cc__accordion-button--details');
    fireEvent.click(openAccordionButton as HTMLElement);

    // Approve essentials + statistics
    const statisticsCookiesCheckbox = getShadowRoot()?.querySelector('#statistics-cookies');
    fireEvent.click(statisticsCookiesCheckbox as HTMLElement);

    const selectedButton = getShadowRoot()?.querySelector('button[data-approved="selected"]');
    fireEvent.click(selectedButton as HTMLElement);

    const cookiesAsString = mockedCookieControls.getCookie();
    const parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    const writtenCookieGroups = JSON.parse(parsed['helfi-cookie-consents'] as string)?.groups || '';
    const writtenKeys = Object.keys(writtenCookieGroups);
    const expectedGroups = [...siteSettingsObj.requiredGroups].map((e) => e.groupId);
    expectedGroups.push('statistics');
    expect(writtenKeys).toEqual(expectedGroups);
  });

  // - If the user removes group permission, the groups should be removed from the consentCookie
  it('should modify consentCookie to contain only required and consented groups when user changes their consent', async () => {
    document.body.innerHTML = `<div id="${options?.settingsPageSelector?.replace('#', '')}">Page settings will be loaded here instead of banner.</div>`;
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    // Accept all
    const allButton = getShadowRoot()?.querySelector('button[data-approved="all"]');
    fireEvent.click(allButton as HTMLElement);
    const cookiesAsString = mockedCookieControls.getCookie();
    const parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    const writtenCookieGroups = JSON.parse(parsed['helfi-cookie-consents'] as string)?.groups || '';
    const writtenKeys = Object.keys(writtenCookieGroups);
    const expectedGroups = [...siteSettingsObj.requiredGroups, ...siteSettingsObj.optionalGroups].map((e) => e.groupId);
    expect(writtenKeys).toEqual(expectedGroups);

    // All cookies accepted, now open banner and remove statistics
    const openAccordionButton = getShadowRoot()?.querySelector('.hds-cc__accordion-button--details');
    fireEvent.click(openAccordionButton as HTMLElement);

    // Uncheck statistics
    const statisticsBox = getShadowRoot()?.querySelector('.hds-checkbox input[data-group="statistics"]');
    fireEvent.click(statisticsBox as HTMLElement);

    // Save changes
    const selectedButton = getShadowRoot()?.querySelector('button[data-approved="selected"]');
    fireEvent.click(selectedButton as HTMLElement);

    // Verify cookie changes
    const cookiesAsStringAfterRemoval = mockedCookieControls.getCookie();
    const parsedAfterRemoval = mockedCookieControls.extractCookieOptions(cookiesAsStringAfterRemoval, '');
    const writtenCookieGroupsAfterRemoval =
      JSON.parse(parsedAfterRemoval['helfi-cookie-consents'] as string)?.groups || '';
    const writtenKeysAfterRemoval = Object.keys(writtenCookieGroupsAfterRemoval);
    const expectedGroupsAfterRemoval = [...siteSettingsObj.requiredGroups, ...siteSettingsObj.optionalGroups]
      .map((e) => e.groupId)
      .filter((e) => e !== 'statistics');
    expect(writtenKeysAfterRemoval).toEqual(expectedGroupsAfterRemoval);
  });

  // - If the user removes group permission, the related items should be removed.
  it('should remove cookies that were previously consented when user removes consent and it should not report them as illegal when monitoring', async () => {
    document.body.innerHTML = `<div id="${options?.settingsPageSelector?.replace('#', '')}">Page settings will be loaded here instead of banner.</div>`;
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    const openAccordionButton = getShadowRoot()?.querySelector('.hds-cc__accordion-button--details');
    fireEvent.click(openAccordionButton as HTMLElement);

    // Approve essentials + statistics
    const statisticsCookiesCheckbox = getShadowRoot()?.querySelector('#statistics-cookies');
    fireEvent.click(statisticsCookiesCheckbox as HTMLElement);

    const selectedButton = getShadowRoot()?.querySelector('button[data-approved="selected"]');
    fireEvent.click(selectedButton as HTMLElement);

    const cookiesAsString = mockedCookieControls.getCookie();
    const parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    const writtenCookieGroups = JSON.parse(parsed['helfi-cookie-consents'] as string)?.groups || '';
    const writtenKeys = Object.keys(writtenCookieGroups);
    const expectedGroups = [...siteSettingsObj.requiredGroups].map((e) => e.groupId);
    expectedGroups.push('statistics');
    expect(writtenKeys).toEqual(expectedGroups);

    // Find a statistics cookie
    type SiteSettings = typeof siteSettingsObj;
    type OptionalGroup = SiteSettings['optionalGroups'][0];
    const statisticsCookies = siteSettingsObj.optionalGroups.find((e) => e.groupId === 'statistics') as OptionalGroup;
    const firstCookieValues = statisticsCookies.cookies[0];
    const singleStatisticsCookie = { [firstCookieValues.name]: 1 };
    // Write cookie
    // @ts-ignore
    mockedCookieControls.add(singleStatisticsCookie);
    // Expect the cookie
    const statisticsCookieWritten = document.cookie.includes(firstCookieValues.name);
    expect(statisticsCookieWritten).toBeTruthy();

    // Remove statistics
    // In testing the form doesn't update the checkboxes, it must be done
    // manually here. Checking all but statistics
    const checkboxes = getShadowRoot()?.querySelectorAll('.hds-checkbox input');
    if (checkboxes) {
      checkboxes.forEach((box) => {
        if (box.attributes['data-group'].value === 'statistics') {
          fireEvent.click(box);
        }
      });
    }

    // Save changes
    fireEvent.click(selectedButton as HTMLElement);

    // Verify cookie changes
    const cookiesAsStringAfterRemoval = mockedCookieControls.getCookie();
    const parsedAfterRemoval = mockedCookieControls.extractCookieOptions(cookiesAsStringAfterRemoval, '');
    const writtenCookieGroupsAfterRemoval =
      JSON.parse(parsedAfterRemoval['helfi-cookie-consents'] as string)?.groups || '';
    const writtenKeysAfterRemoval = Object.keys(writtenCookieGroupsAfterRemoval);
    const expectedGroupsAfterRemoval = [...siteSettingsObj.requiredGroups].map((e) => e.groupId);
    expect(writtenKeysAfterRemoval).toEqual(expectedGroupsAfterRemoval);

    await waitForConsole('log', "Cookie consent: will delete consent withdrawn cookie(s): 'nmstat'");

    // Expect the cookie to be removed
    const statisticsCookieWrittenAfterRemoval = document.cookie.includes(firstCookieValues.name);
    expect(statisticsCookieWrittenAfterRemoval).toBeFalsy();
  });

  it('should remove localStorage items that were previously consented when user removes consent and it should not report them as illegal when monitoring', async () => {
    document.body.innerHTML = `<div id="${options?.settingsPageSelector?.replace('#', '')}">Page settings will be loaded here instead of banner.</div>`;
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    // Approve essentials + test_optional
    const selectedCategory = 'test_optional';
    bannerClicks.approveCategory(selectedCategory);

    const cookiesAsString = mockedCookieControls.getCookie();
    const parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    const writtenCookieGroups = JSON.parse(parsed['helfi-cookie-consents'] as string)?.groups || '';
    const writtenKeys = Object.keys(writtenCookieGroups);
    const expectedGroups = [...siteSettingsObj.requiredGroups].map((e) => e.groupId);
    expectedGroups.push('test_optional');
    expect(writtenKeys).toEqual(expectedGroups);

    // Find an optional localStorage item
    const localStorageItem = siteSettingsObj?.optionalGroups
      .find((e) => e.groupId === 'test_optional')
      // @ts-ignore
      ?.cookies.find((e) => e.type === STORAGE_TYPE.localStorage);
    const itemName = localStorageItem?.name || 'no name';
    // Write to localStorage
    // @ts-ignore
    localStorage.setItem(itemName, 'I go to localStorage');
    // Expect the localStorageItem
    expect(localStorage.getItem(itemName)).toEqual('I go to localStorage');
    expect(Object.keys(localStorage)).toEqual([itemName]);

    // Remove test_optional approval
    bannerClicks.unApproveCategory(selectedCategory);

    await waitForConsole('log', `Cookie consent: will delete unapproved localStorage(s): '${itemName}'`);

    // Verify localStorage changes
    const localStorageItemAfterRemoval = localStorage.getItem(itemName);
    expect(localStorageItemAfterRemoval).toEqual(null);
    expect(Object.keys(localStorage)).toEqual([]);
  });

  it('should remove sessionStorage items that were previously consented when user removes consent and it should not report them as illegal when monitoring', async () => {
    document.body.innerHTML = `<div id="${options?.settingsPageSelector?.replace('#', '')}">Page settings will be loaded here instead of banner.</div>`;
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    // Approve essentials + test_optional
    const selectedCategory = 'test_optional';
    bannerClicks.approveCategory(selectedCategory);

    const cookiesAsString = mockedCookieControls.getCookie();
    const parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    const writtenCookieGroups = JSON.parse(parsed['helfi-cookie-consents'] as string)?.groups || '';
    const writtenKeys = Object.keys(writtenCookieGroups);
    const expectedGroups = [...siteSettingsObj.requiredGroups].map((e) => e.groupId);
    expectedGroups.push(selectedCategory);
    expect(writtenKeys).toEqual(expectedGroups);

    // Find an optional sessionStorage item
    const sessionStorageItem = siteSettingsObj?.optionalGroups
      .find((e) => e.groupId === selectedCategory)
      // @ts-ignore
      ?.cookies.find((e) => e.type === STORAGE_TYPE.sessionStorage);
    const itemName = sessionStorageItem?.name || 'no name';
    // Write to sessionStorage
    // @ts-ignore
    sessionStorage.setItem(itemName, 'I go to sessionStorage');
    // Expect the sessionStorageItem
    expect(sessionStorage.getItem(itemName)).toEqual('I go to sessionStorage');
    expect(Object.keys(sessionStorage)).toEqual([itemName]);

    // Remove test_optional approval
    bannerClicks.unApproveCategory(selectedCategory);

    await waitForConsole('log', `Cookie consent: will delete unapproved sessionStorage(s): '${itemName}'`);

    // Verify sessionStorage changes
    const sessionStorageItemAfterRemoval = sessionStorage.getItem(itemName);
    expect(sessionStorageItemAfterRemoval).toEqual(null);
    expect(Object.keys(sessionStorage)).toEqual([]);
  });

  it('should remove indexedDb items that were previously consented when user removes consent and it should not report them as illegal when monitoring', async () => {
    document.body.innerHTML = `<div id="${options?.settingsPageSelector?.replace('#', '')}">Page settings will be loaded here instead of banner.</div>`;
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    // Approve essentials + test_optional
    const selectedCategory = 'test_optional';
    bannerClicks.approveCategory(selectedCategory);

    const cookiesAsString = mockedCookieControls.getCookie();
    const parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    const writtenCookieGroups = JSON.parse(parsed['helfi-cookie-consents'] as string)?.groups || '';
    const writtenKeys = Object.keys(writtenCookieGroups);
    const expectedGroups = [...siteSettingsObj.requiredGroups].map((e) => e.groupId);
    expectedGroups.push(selectedCategory);
    expect(writtenKeys).toEqual(expectedGroups);

    // Find an optional indexedDB item
    const indexedDBItem = siteSettingsObj?.optionalGroups
      .find((e) => e.groupId === selectedCategory)
      // @ts-ignore
      ?.cookies.find((e) => e.type === STORAGE_TYPE.indexedDB);
    const itemName = indexedDBItem?.name || 'no name';
    async function createIndexedDb(key: string) {
      // Open (or create) the database
      return new Promise((resolve, reject) => {
        const openRequest = indexedDB.open(key, 1);
        let db: any;

        openRequest.onupgradeneeded = function upgradeNeeded(event: any) {
          // The database did not previously exist, so create object stores and indexes here
          db = event.target.result;
          db.createObjectStore(itemName, { autoIncrement: true });
        };

        openRequest.onsuccess = function success(event: any) {
          // The database has been opened (or created)
          db = event.target.result;

          // Close the database connection, so that it can be deleted
          db.close();
          // @ts-ignore
          return resolve(db);
        };

        openRequest.onerror = function error(event: any) {
          // eslint-disable-next-line no-console
          console.log('Error opening/creating database: ', event.target.errorCode);
          reject(event.target.errorCode);
        };
      });
    }

    // Check that no indexedDB's exist and open one with given name
    expect(await indexedDB.databases()).toEqual([]);
    await createIndexedDb(itemName);
    // @ts-ignore
    expect((await indexedDB.databases())[0].name).toEqual(itemName);

    // Remove test_optional approval
    bannerClicks.unApproveCategory(selectedCategory);

    await waitForConsole('log', `Cookie consent: will delete consent withdrawn indexedDB(s): '${itemName}'`);

    await waitForConsole('log', `Cookie consent: IndexedDB database '${itemName}' deleted successfully.`);
    // Verify indexedDB changes
    expect(await indexedDB.databases()).toEqual([]);
  });

  it('should remove cache storage items that were previously consented when user removes consent and it should not report them as illegal when monitoring', async () => {
    document.body.innerHTML = `<div id="${options?.settingsPageSelector?.replace('#', '')}">Page settings will be loaded here instead of banner.</div>`;
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    // Approve essentials + test_optional
    const selectedCategory = 'test_optional';
    bannerClicks.approveCategory(selectedCategory);

    const cookiesAsString = mockedCookieControls.getCookie();
    const parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    const writtenCookieGroups = JSON.parse(parsed['helfi-cookie-consents'] as string)?.groups || '';
    const writtenKeys = Object.keys(writtenCookieGroups);
    const expectedGroups = [...siteSettingsObj.requiredGroups].map((e) => e.groupId);
    expectedGroups.push(selectedCategory);
    expect(writtenKeys).toEqual(expectedGroups);

    // Find an optional cacheStorage item
    const cacheStorageItem = siteSettingsObj?.optionalGroups
      .find((e) => e.groupId === selectedCategory)
      // @ts-ignore
      ?.cookies.find((e) => e.type === STORAGE_TYPE.cacheStorage);
    const itemName = cacheStorageItem?.name || 'no name';

    // Write to cacheStorage
    // @ts-ignore
    await caches.open(itemName);
    const cacheBeforeReport = await caches.keys();
    expect(cacheBeforeReport).toBeTruthy();

    // Remove test_optional approval
    bannerClicks.unApproveCategory(selectedCategory);

    await waitForConsole('log', `Cookie consent: will delete unapproved cacheStorage(s): '${itemName}'`);

    // Verify cacheStorage changes
    const cacheStorageItemAfterRemoval = sessionStorage.getItem(itemName);
    expect(cacheStorageItemAfterRemoval).toEqual(null);
    expect(await caches.keys()).toEqual([]);
  });

  // - It should monitor and report items that have not been consented to if monitor interval parameter is set in siteSettings above 0
  it('should monitor and report cookies that have not been consented to if monitor interval parameter is set in siteSettings above 0', async () => {
    instance = await CookieConsentCore.create({ ...siteSettingsObj, remove: false }, options);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    expect(document.cookie).toBeFalsy();
    // @ts-ignore
    mockedCookieControls.add({ rogue_cookie: 1 });
    expect(document.cookie).toBeTruthy();
    await waitForConsole('log', "Cookie consent: found unapproved cookie(s): 'rogue_cookie'");
    expect(document.cookie).toEqual('rogue_cookie=1');
  });

  it('should monitor and report localStorage items that have not been consented to if monitor interval parameter is set in siteSettings above 0', async () => {
    instance = await CookieConsentCore.create({ ...siteSettingsObj, remove: false }, options);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    localStorage.unallowed = 'delete this';
    expect(localStorage.unallowed).toBe('delete this');

    await waitForConsole('log', "Cookie consent: found unapproved localStorage(s): 'unallowed'");

    expect(localStorage.unallowed).not.toBeFalsy();
    expect(localStorage.unallowed).toBe('delete this');
  });

  it('should monitor and report sessionStorage items that have not been consented to if monitor interval parameter is set in siteSettings above 0', async () => {
    instance = await CookieConsentCore.create({ ...siteSettingsObj, remove: false }, options);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    sessionStorage.unallowed = 'delete this';
    expect(sessionStorage.unallowed).toBe('delete this');

    await waitForConsole('log', "Cookie consent: found unapproved sessionStorage(s): 'unallowed'");

    expect(sessionStorage.unallowed).not.toBeFalsy();
    expect(sessionStorage.unallowed).toBe('delete this');
  });

  it('should monitor and report indexedDb items that have not been consented to if monitor interval parameter is set in siteSettings above 0', async () => {
    instance = await CookieConsentCore.create({ ...siteSettingsObj, remove: false }, options);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    async function createIndexedDb(key: string) {
      // Open (or create) the database
      return new Promise((resolve, reject) => {
        const openRequest = indexedDB.open(key, 1);
        let db: any;

        openRequest.onupgradeneeded = function upgradeNeeded(event: any) {
          // The database did not previously exist, so create object stores and indexes here
          db = event.target.result;
          db.createObjectStore(`${key}_testObjectStore`, { autoIncrement: true });
        };

        openRequest.onsuccess = function success(event: any) {
          // The database has been opened (or created)
          db = event.target.result;

          // Close the database connection, so that it can be deleted
          db.close();
          // @ts-ignore
          return resolve(db);
        };

        openRequest.onerror = function error(event: any) {
          // eslint-disable-next-line no-console
          console.log('Error opening/creating database: ', event.target.errorCode);
          reject(event.target.errorCode);
        };
      });
    }

    expect(await indexedDB.databases()).toEqual([]);
    await createIndexedDb('indexedDb_unapproved');
    // @ts-ignore
    expect((await indexedDB.databases())[0].name).toEqual('indexedDb_unapproved');
    await waitForConsole('log', "Cookie consent: found unapproved indexedDB(s): 'indexedDb_unapproved'");

    expect((await indexedDB.databases())[0].name).toEqual('indexedDb_unapproved');
  });

  it('should monitor and report cache storage items that have not been consented to if monitor interval parameter is set in siteSettings above 0', async () => {
    instance = await CookieConsentCore.create({ ...siteSettingsObj, remove: false }, options);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    await caches.open('cacheStorageMonitorTest');
    const cacheBeforeReport = await caches.keys();
    expect(cacheBeforeReport).toBeTruthy();
    await waitForConsole('log', "Cookie consent: found unapproved cacheStorage(s): 'cacheStorageMonitorTest'");
    const cacheAfterReport = await caches.keys();
    expect(cacheAfterReport.length).not.toEqual(0);
    expect(cacheBeforeReport).toEqual(cacheAfterReport);
  });

  // - It should remove items that have not been consented to if remove parameter is set in siteSettings
  it('should remove cookies that have not been consented to if remove parameter is set in siteSettings', async () => {
    instance = await CookieConsentCore.create({ ...siteSettingsObj, remove: true }, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    expect(document.cookie).toBeFalsy();
    // @ts-ignore
    mockedCookieControls.add({ rogue_cookie: 1 });
    expect(document.cookie).toBeTruthy();
    await waitForConsole('log', "Cookie consent: will delete unapproved cookie(s): 'rogue_cookie'");
    expect(document.cookie).toBeFalsy();
  });

  it('should remove localStorage items that have not been consented to if remove parameter is set in siteSettings', async () => {
    instance = await CookieConsentCore.create({ ...siteSettingsObj, remove: true }, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    localStorage.unallowedLocalStorage = 'delete this';
    expect(localStorage.unallowedLocalStorage).toBe('delete this');

    await waitForConsole('log', "Cookie consent: will delete unapproved localStorage(s): 'unallowedLocalStorage'");

    expect(localStorage.unallowedLocalStorage).toBeFalsy();
  });

  it('should remove sessionStorage items that have not been consented to if remove parameter is set in siteSettings', async () => {
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    sessionStorage.unallowedSessionStorage = 'delete this';
    expect(sessionStorage.unallowedSessionStorage).toBe('delete this');

    await waitForConsole('log', "Cookie consent: will delete unapproved sessionStorage(s): 'unallowedSessionStorage'");

    expect(sessionStorage.unallowedSessionStorage).toBeFalsy();
  });

  it('should remove indexedDb items that have not been consented to if remove parameter is set in siteSettings', async () => {
    jest.useRealTimers(); // Other tests work with fake timers, but indexedDB mock seems to need real timers
    instance = await CookieConsentCore.create({ ...siteSettingsObj, remove: true }, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    async function createIndexedDb(key: string) {
      // Open (or create) the database
      return new Promise((resolve, reject) => {
        const openRequest = indexedDB.open(key, 1);
        let db: any;

        openRequest.onupgradeneeded = function upgradeNeeded(event: any) {
          // The database did not previously exist, so create object stores and indexes here
          db = event.target.result;
          db.createObjectStore(`${key}_testObjectStore`, { autoIncrement: true });
        };

        openRequest.onsuccess = function success(event: any) {
          // The database has been opened (or created)
          db = event.target.result;

          // Close the database connection, so that it can be deleted
          db.close();
          // @ts-ignore
          return resolve(db);
        };

        openRequest.onerror = function error(event: any) {
          // eslint-disable-next-line no-console
          console.log('Error opening/creating database: ', event.target.errorCode);
          reject(event.target.errorCode);
        };
      });
    }

    expect(await indexedDB.databases()).toEqual([]);
    await createIndexedDb('indexedDb_remove');
    // @ts-ignore
    expect((await indexedDB.databases())[0].name).toEqual('indexedDb_remove');
    await waitForConsole('log', "Cookie consent: IndexedDB database 'indexedDb_remove' deleted successfully.");

    expect(await indexedDB.databases()).toEqual([]);
  });

  it('should remove cache storage items that have not been consented to if remove parameter is set in siteSettings', async () => {
    instance = await CookieConsentCore.create({ ...siteSettingsObj, remove: true }, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    await caches.open('cacheStorageTest');
    const cacheBeforeDelete = await caches.keys();
    expect(cacheBeforeDelete).toBeTruthy();
    await waitForConsole('log', "Cookie consent: Cache 'cacheStorageTest' has been deleted");
    const cacheAfterDelete = await caches.keys();
    expect(cacheAfterDelete.length).toEqual(0);
    expect(cacheBeforeDelete).not.toEqual(cacheAfterDelete);
  });

  it('should open banner when essentials are approved but user wants to enable embedded content', async () => {
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    // Approve essentials + test_optional
    bannerClicks.approveCategory('test_optional');

    // Delete banner
    document.body.innerHTML = '';
    const banner = document.querySelector('.hds-cc__target');
    expect(banner).toBeNull();

    // Open banner via window scoped method
    await helpers.openBanner(urls.siteSettingsJsonUrl, optionsEvent);

    // Banner should spawn
    const openedBanner = document.querySelector('.hds-cc__target');
    expect(openedBanner).not.toBeNull();
  });

  // - The cookie should contain the timestamp of the consent
  it('should write and keep cookie timestamp on the moment of first consent', async () => {
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    // Approve essentials + test_optional
    bannerClicks.approveCategory('test_optional');

    let cookiesAsString = mockedCookieControls.getCookie();
    let parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    let writtenCookieGroups = JSON.parse(parsed['helfi-cookie-consents'] as string)?.groups || '';
    const essentialTimeStamp = writtenCookieGroups.essential.timestamp;

    // Delete banner
    document.body.innerHTML = '';
    const banner = document.querySelector('.hds-cc__target');
    expect(banner).toBeNull();

    // Open banner via window scoped method
    await helpers.openBanner(urls.siteSettingsJsonUrl, optionsEvent);

    // Approve essentials + chat
    bannerClicks.approveCategory('chat');
    cookiesAsString = mockedCookieControls.getCookie();
    parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    writtenCookieGroups = JSON.parse(parsed['helfi-cookie-consents'] as string)?.groups || '';

    const chatTimeStamp = writtenCookieGroups.chat.timestamp;

    // The timestamps should be different due to different approval times
    // Note: do not run this on a supercomputer to avoid all cookie operations
    // happening within a single millisecond
    expect(essentialTimeStamp).not.toEqual(chatTimeStamp);
    expect(essentialTimeStamp).toBeLessThan(chatTimeStamp);
  });

  // -------------------------------------------------------------------------------------------------------------------
  // MARK: State changes
  // - If the settings file has changed, the banner should appear
  it('should show banner if the hashes do not match in any consented group', async () => {
    // @ts-ignore
    document.body.innerHTML = `<div id="${options?.settingsPageSelector?.replace('#', '')}">Page settings will be loaded here instead of banner.</div>`;
    // @ts-ignore
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    fireEvent.click(getShowDetailsButtonElement());
    expect(isDetailsExpanded()).toBeTruthy();

    // Write the cookie with all groups accepted
    bannerClicks.approveAll();

    // Delete banner
    document.body.innerHTML = '';

    // Init banner to verify it doesn't render due to existing cookie - simulate
    // loading the page with cookies untouched
    // @ts-ignore
    await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    let rootNotFound = false;
    try {
      await waitForRoot();
    } catch (err) {
      rootNotFound = true;
    }
    expect(rootNotFound).toBe(true);

    // Modify cookie group descriptions
    const changedCookiesObj = { ...siteSettingsObj };
    let totalGroups = 0;
    changedCookiesObj.requiredGroups.forEach((group) => {
      // eslint-disable-next-line no-param-reassign
      group.description = 'this has changed';
      totalGroups += 1;
    });
    changedCookiesObj.optionalGroups.forEach((group) => {
      // eslint-disable-next-line no-param-reassign
      group.description = 'this has changed';
      totalGroups += 1;
    });

    const cookieReader = () => {
      const cookiesAsString = mockedCookieControls.getCookie();
      // @ts-ignore
      const { 'helfi-cookie-consents': parsed } = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
      // @ts-ignore
      const categories = JSON.parse(parsed).groups;
      return categories;
    };

    const { essential: cookiesBeforeRemoval } = cookieReader();

    // Init banner once more, it should appear due to changed category descriptions
    // @ts-ignore
    await CookieConsentCore.create(changedCookiesObj, optionsEvent);

    const consoleLogSpy = jest.spyOn(console, 'info');
    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledTimes(totalGroups);
    });

    const { essential: cookiesAfterRemoval } = cookieReader();

    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    fireEvent.click(getShowDetailsButtonElement());
    expect(isDetailsExpanded()).toBeTruthy();

    // Chat should be removed from accepted cookie categories string
    expect(cookiesAfterRemoval).not.toEqual(cookiesBeforeRemoval);
  });

  // - If the settings are changed, the banner should recognize the changes
  it('should remove only invalid (checksum mismatch) groups from cookie', async () => {
    document.body.innerHTML = `<div id="${options?.settingsPageSelector?.replace('#', '')}">Page settings will be loaded here instead of banner.</div>`;
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    fireEvent.click(getShowDetailsButtonElement());
    expect(isDetailsExpanded()).toBeTruthy();

    // Write the cookie with all groups accepted
    bannerClicks.approveAll();

    // Delete banner
    document.body.innerHTML = '';

    // Init banner to verify it doesn't render due to existing cookie - simulate
    // loading the page with cookies untouched
    await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    let rootNotFound = false;
    try {
      await waitForRoot();
    } catch (err) {
      rootNotFound = true;
    }
    expect(rootNotFound).toBe(true);

    let newOptionalGroups = siteSettingsObj.optionalGroups;
    newOptionalGroups = newOptionalGroups.filter((e) => e.groupId !== 'chat');
    const changedCookiesObj = { ...siteSettingsObj, optionalGroups: newOptionalGroups };

    // Init banner once more, it should appear due to removed 'chat' settings
    await CookieConsentCore.create(changedCookiesObj, optionsEvent);
    await waitForConsole('info', "Invalid group found in browser cookie: 'chat', removing from cookie.");
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    fireEvent.click(getShowDetailsButtonElement());
    expect(isDetailsExpanded()).toBeTruthy();

    const cookiesAsString = mockedCookieControls.getCookie();
    // @ts-ignore
    const { 'helfi-cookie-consents': parsed } = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    // @ts-ignore
    const categories = JSON.parse(parsed).groups;
    // Chat should be removed from accepted cookie categories string
    expect(categories.chat).toEqual(undefined);
  });

  // -------------------------------------------------------------------------------------------------------------------
  // MARK: Special cases
  // - Are robot-cookies allowed (cookies that are not set by the site, but set by a robot like Siteimprove crawler)
  it('should not complain or show details about pre-approved robot cookies', async () => {
    document.body.innerHTML = `<div id="${options?.settingsPageSelector?.replace('#', '')}">Page settings will be loaded here instead of banner.</div>`;
    instance = await CookieConsentCore.create({ ...siteSettingsObj, remove: true }, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    // Find and add a robot cookie
    // @ts-ignore
    const firstRobotCookieValues = siteSettingsObj.robotCookies[0];
    // @ts-ignore
    const singleRobotCookie = { [firstRobotCookieValues.name]: 1 };
    // @ts-ignore
    mockedCookieControls.add(singleRobotCookie);

    // Add unlisted cookie
    // @ts-ignore
    mockedCookieControls.add({ rogue_cookie: 1 });

    // Find and add statistics cookie
    const statisticsCookies = siteSettingsObj.optionalGroups.find((e) => e.groupId === 'statistics');
    // @ts-ignore
    const firstStatisticsCookieValues = statisticsCookies.cookies[0];
    const singleStatisticsCookie = { [firstStatisticsCookieValues.name]: 1 };
    // @ts-ignore
    mockedCookieControls.add(singleStatisticsCookie);

    // Expect the cookies to be written
    const cookiesAsString = mockedCookieControls.getCookie();
    const parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    expect(parsed.helfi_accordions_open).toBeTruthy();
    expect(parsed.nmstat).toBeTruthy();
    expect(parsed.rogue_cookie).toBeTruthy();

    // Let the Cookie Monster finish it's work
    await waitForConsole(
      'log',
      `Cookie consent: found unapproved cookie(s): 'rogue_cookie', '${firstStatisticsCookieValues.name}'`,
    );

    // Expect the robot cookie to be the only one to exist afterwards
    const robotCookieWritten = document.cookie.includes(firstRobotCookieValues.name);
    expect(robotCookieWritten).toBeTruthy();
  });

  // - Language tests
  it('should fall back to fallback language if the wanted language is not found in site settings and complain in console.error', async () => {
    instance = await CookieConsentCore.create(siteSettingsObj, { ...optionsEvent, language: 'ru' });
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    await waitForConsole('error', 'Cookie consent: Missing translation: description:ru, using fallback language: fi');
    const showButton = getShowDetailsButtonElement();
    expect(showButton).not.toBeNull();
  });

  it('should fall back to key if the wanted language and fallback is not found in site settings and complain in console.error', async () => {
    instance = await CookieConsentCore.create(
      { ...siteSettingsObj, fallbackLanguage: 'non-existing-fallback' },
      { ...optionsEvent, language: 'ru' },
    );
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    await waitForConsole(
      'error',
      'Cookie consent: Missing primary and fallback translation: description:ru/non-existing-fallback, using first known language: fi',
    );
    const showButton = getShowDetailsButtonElement();
    expect(showButton).not.toBeNull();
  });

  it('should complain in console.error and use key as final fallback if UI translation is missing from siteSettings', async () => {
    const siteSettingsObjWithoutATranslation = siteSettingsObj;
    // @ts-ignore
    delete siteSettingsObjWithoutATranslation.translations.showDetails;

    instance = await CookieConsentCore.create(siteSettingsObjWithoutATranslation, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    await waitForConsole(
      'error',
      'Cookie consent: Missing translation key: showDetails, falling back to key as translation',
    );
    const showButton = getShowDetailsButtonElement();
    expect(showButton).not.toBeNull();
    expect(showButton.textContent).toContain('showDetails');
  });

  it('should complain in console.error if cookie translation is missing from siteSettings', async () => {
    const siteSettingsObjWithoutATranslation = siteSettingsObj;
    // @ts-ignore
    delete siteSettingsObjWithoutATranslation.requiredGroups[0].title;

    instance = await CookieConsentCore.create(siteSettingsObjWithoutATranslation, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    await waitForConsole('error', 'Cookie consent: Missing translation key: title, falling back to key as translation');

    const showButton = getShowDetailsButtonElement();
    expect(showButton).not.toBeNull();
  });

  it('should throw an error if needed cookie translations contain other than string, number or objects', async () => {
    return expect(async () =>
      CookieConsentCore.create(
        {
          ...siteSettingsObj,
          translations: {
            ...siteSettingsObj.translations,
            showDetails: ['Array', 'not', 'ok', 'translation'],
          },
        },
        optionsEvent,
      ),
    ).rejects.toThrow('Cookie consent: Invalid translation: showDetails, should be string, number or object');
  });

  // MARK: Visual issues
  // - Do the checkboxes in banner describe the accepted categories?
  it('should have same checkbox checked values with cookie string', async () => {
    document.body.innerHTML = `<div id="${options?.settingsPageSelector?.replace('#', '')}">Page settings will be loaded here instead of banner.</div>`;
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    // Approve essentials + test_optional + chat
    bannerClicks.approveCategory('test_optional');
    bannerClicks.approveCategory('chat');

    const cookiesAsString = mockedCookieControls.getCookie();
    const parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    const writtenCookieGroups = JSON.parse(parsed['helfi-cookie-consents'] as string)?.groups || '';

    // Delete banner
    document.body.innerHTML = '';

    document.body.innerHTML = `<div id="${options?.settingsPageSelector?.replace('#', '')}">Page settings will be loaded here instead of banner.</div>`;
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    // Go through checkboxes
    const checkboxes = getShadowRoot()?.querySelectorAll('.hds-checkbox input');
    const checkedCategories = {};
    if (checkboxes) {
      checkboxes.forEach((box) => {
        // @ts-ignore
        if (box.checked) {
          checkedCategories[box.attributes['data-group'].value] = 1;
        }
      });
    }

    // Verify that the form checkboxes match the cookie accepted categories
    expect(Object.keys(checkedCategories)).toEqual(Object.keys(writtenCookieGroups));
  });
});
