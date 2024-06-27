/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jest/no-mocks-import */
import { fireEvent, waitFor } from '@testing-library/dom';
import fetchMock, { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';

import mockDocumentCookie from './__mocks__/mockDocumentCookieCore';
import { CookieConsentCore } from './cookieConsentCore';
import * as siteSettingsObjRaw from './example/helfi_sitesettings.json';
import bannerClickMethods from './helpers/cookieConsentTestHelpers';

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

  const getShadowRoot = () => {
    const targetElement = document.querySelector('.hds-cc__target') as HTMLElement;
    return targetElement.shadowRoot as ShadowRoot;
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
    approveAll: () => bannerClickMethods.approveAll(getShadowRoot(), fireEvent),
    approveCategory: (category: string) => bannerClickMethods.approveCategory(getShadowRoot(), fireEvent, category),
    unApproveCategory: (category: string) => bannerClickMethods.unApproveCategory(getShadowRoot(), fireEvent, category)
  }

  // Make simplified cheksum handling for testing purposes
  const initMockTextEncoder = (responseList: string[]) => {
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

  const initCryptoTextEncoder = (responseList: string[]) => {
    const current = global.crypto;
    const mockCrypto = {
      subtle: {
        digest: (algo: string, input: string) => {
          let checksum = 0;
          let returnCheck = [''];

          for (let i = 0; i < input.length; i++) {
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
    mockTextEncoderDisposer = initMockTextEncoder(['xx']);
    mockCryptoDisposer = initCryptoTextEncoder(['xx']);
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

  // TODO: `Cookie consent: Aria notification parent element '${this.#TARGET_SELECTOR}' was not found`
  // TODO: `Cookie consent: targetSelector element '${this.#TARGET_SELECTOR}' was not found`
  // TODO: `Cookie consent: The spacerParentSelector element '${this.#SPACER_PARENT_SELECTOR}' was not found`
  // TODO: `Cookie consent: contentSelector element '${this.#PAGE_CONTENT_SELECTOR}' was not found`

  // -------------------------------------------------------------------------------------------------------------------
  // MARK: Basic tests

  it('should add elements to shadowRoot', async () => {
    // @ts-ignore
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
    // @ts-ignore
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
    // @ts-ignore
    instance = await CookieConsentCore.create(siteSettingsObj, options);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    fireEvent.click(getShowDetailsButtonElement());
    expect(isDetailsExpanded()).toBeTruthy();
  });

  it('should throw an error if siteSettingsObj is not defined', async () => {
    // @ts-ignore
    return expect(async () => CookieConsentCore.create(null, options)).rejects.toThrow(
      'Cookie consent: siteSettingsParam is required, it should be an URL string or an siteSettings object.',
    );
  });

  it('should throw an error if siteSettings URL is not found', async () => {
    // @ts-ignore
    await expect(CookieConsentCore.create(urls.siteSettings404, { ...options })).rejects.toThrow(
      `Cookie consent: Unable to fetch cookie consent settings: '404' from: '${urls.siteSettings404}' `,
    );
  });

  it('should throw an error if siteSettings JSON is malformed', async () => {
    // @ts-ignore
    await expect(CookieConsentCore.create(urls.siteSettingsNotJSON, { ...options })).rejects.toThrow("Cookie consent: siteSettings JSON parsing failed: SyntaxError: Unexpected token");
  });

  /* eslint-disable jest/no-commented-out-tests */

  // - If the banner is set for custom targets, are the selectors available on DOM?
  it('should throw error if targetSelector is set but not found on DOM', async () => {
    // @ts-ignore
    expect(CookieConsentCore.create(urls.siteSettingsJsonUrl, { ...options, targetSelector: '#not-found' })).rejects.toThrow("Cookie consent: targetSelector element '#not-found' was not found");
  });

  // it('should throw error if spacerParentSelector is set but not found on DOM', () => {});
  // it('should throw error if pageContentSelector is set but not found on DOM', () => {});
  // it('should throw error if Aria notification element is not found on DOM', () => {});

  // - Are there whitelisted groups available in window scope?
  // it('should not allow consenting from API to a group that is not whitelisted', () => {});

  // - Do site settings contain a group for consent cookie?
  it('should throw error if there is no required group to store consent cookie in', () => {
    return expect(async () =>
      // @ts-ignore
      CookieConsentCore.create({ ...siteSettingsObj, requiredGroups: [] }, options),
    ).rejects.toThrow(
      "Cookie consent: At least one required group is needed to store consent in 'helfi-cookie-consents'.",
    );
  });

  // - Do site site settings contain consent cookie?
  it('should throw error if there is no consent cookie in site settings required groups', () => {
    return expect(async () =>
      // @ts-ignore
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
      // @ts-ignore
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
    // @ts-ignore
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, options);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    let banner = document.querySelector('.hds-cc__target');
    expect(banner).not.toBeNull();
  });

  // - When user accepts all cookies, the cookie should be written with all groups mentioned in settings.
  it('should add consentCookie with all groups when user consents to all groups', async () => {
    // @ts-ignore
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    let allButton = getShadowRoot().querySelector('button[data-approved="all"]');
    fireEvent.click(allButton);

    const cookiesAsString = mockedCookieControls.getCookie();
    let parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    const writtenCookieGroups = JSON.parse(parsed['helfi-cookie-consents'])?.groups || '';
    const writtenKeys = Object.keys(writtenCookieGroups);
    const expectedGroups = [...siteSettingsObj.requiredGroups, ...siteSettingsObj.optionalGroups].map((e) => e.groupId);
    expect(writtenKeys).toEqual(expectedGroups);
  });

  // - When user accepts essential cookies, the cookie should be written with essential groups.
  it('should add consentCookie with only required groups when user consents only to required groups', async () => {
    // @ts-ignore
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    let requiredButton = getShadowRoot().querySelector('button[data-approved="required"]');
    fireEvent.click(requiredButton);

    const cookiesAsString = mockedCookieControls.getCookie();
    let parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    const writtenCookieGroups = JSON.parse(parsed['helfi-cookie-consents'])?.groups || '';
    const writtenKeys = Object.keys(writtenCookieGroups);
    const expectedGroups = [...siteSettingsObj.requiredGroups].map((e) => e.groupId);
    expect(writtenKeys).toEqual(expectedGroups);
  });

  // - When user selects certain groups, the cookie should be written according to those.
  it('should add consentCookie with required groups and selected groups when user consents to selected cookie groups', async () => {
    // @ts-ignore
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    const openAccordionButton = getShadowRoot().querySelector('.hds-cc__accordion-button--details');
    fireEvent.click(openAccordionButton);

    // Approve essentials + statistics
    const statisticsCookiesCheckbox = getShadowRoot().querySelector('#statistics-cookies');
    fireEvent.click(statisticsCookiesCheckbox);

    let selectedButton = getShadowRoot().querySelector('button[data-approved="selected"]');
    fireEvent.click(selectedButton);

    const cookiesAsString = mockedCookieControls.getCookie();
    let parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    const writtenCookieGroups = JSON.parse(parsed['helfi-cookie-consents'])?.groups || '';
    const writtenKeys = Object.keys(writtenCookieGroups);
    const expectedGroups = [...siteSettingsObj.requiredGroups].map((e) => e.groupId);
    expectedGroups.push('statistics');
    expect(writtenKeys).toEqual(expectedGroups);
  });

  // - If the user removes group permission, the groups should be removed from the consentCookie
  it('should modify consentCookie to contain only required and consented groups when user changes their consent', async () => {
    document.body.innerHTML = `<div id="${options?.settingsPageSelector?.replace('#', '')}">Page settings will be loaded here instead of banner.</div>`;
    // @ts-ignore
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    // Accept all
    let allButton = getShadowRoot().querySelector('button[data-approved="all"]');
    fireEvent.click(allButton);
    const cookiesAsString = mockedCookieControls.getCookie();
    let parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    const writtenCookieGroups = JSON.parse(parsed['helfi-cookie-consents'])?.groups || '';
    const writtenKeys = Object.keys(writtenCookieGroups);
    const expectedGroups = [...siteSettingsObj.requiredGroups, ...siteSettingsObj.optionalGroups].map((e) => e.groupId);
    expect(writtenKeys).toEqual(expectedGroups);

    // All cookies accepted, now open banner and remove statistics
    const openAccordionButton = getShadowRoot().querySelector('.hds-cc__accordion-button--details');
    fireEvent.click(openAccordionButton);

    // In testing the form doesn't update the checkboxes, it must be done
    // manually here. Checking all but statistics
    const checkboxes = getShadowRoot().querySelectorAll('.hds-checkbox input');
    checkboxes.forEach((box) => {
      if (box.attributes['data-group'].value !== 'statistics' && !box.disabled) {
        fireEvent.click(box);
      }
    });

    // Save changes
    let selectedButton = getShadowRoot().querySelector('button[data-approved="selected"]');
    fireEvent.click(selectedButton);

    // Verify cookie changes
    const cookiesAsStringAfterRemoval = mockedCookieControls.getCookie();
    let parsedAfterRemoval = mockedCookieControls.extractCookieOptions(cookiesAsStringAfterRemoval, '');
    const writtenCookieGroupsAfterRemoval = JSON.parse(parsedAfterRemoval['helfi-cookie-consents'])?.groups || '';
    const writtenKeysAfterRemoval = Object.keys(writtenCookieGroupsAfterRemoval);
    const expectedGroupsAfterRemoval = [...siteSettingsObj.requiredGroups, ...siteSettingsObj.optionalGroups]
      .map((e) => e.groupId)
      .filter((e) => e != 'statistics');
    expect(writtenKeysAfterRemoval).toEqual(expectedGroupsAfterRemoval);
  });

  // - If the user removes group permission, the related items should be removed.
  it('should remove cookies that were previously consented when user removes consent and it should not report them as illegal when monitoring', async () => {
    document.body.innerHTML = `<div id="${options?.settingsPageSelector?.replace('#', '')}">Page settings will be loaded here instead of banner.</div>`;
    // @ts-ignore
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    const openAccordionButton = getShadowRoot().querySelector('.hds-cc__accordion-button--details');
    fireEvent.click(openAccordionButton);

    // Approve essentials + statistics
    const statisticsCookiesCheckbox = getShadowRoot().querySelector('#statistics-cookies');
    fireEvent.click(statisticsCookiesCheckbox);

    let selectedButton = getShadowRoot().querySelector('button[data-approved="selected"]');
    fireEvent.click(selectedButton);

    const cookiesAsString = mockedCookieControls.getCookie();
    let parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    const writtenCookieGroups = JSON.parse(parsed['helfi-cookie-consents'])?.groups || '';
    const writtenKeys = Object.keys(writtenCookieGroups);
    const expectedGroups = [...siteSettingsObj.requiredGroups].map((e) => e.groupId);
    expectedGroups.push('statistics');
    expect(writtenKeys).toEqual(expectedGroups);

    // Find a statistics cookie
    const statisticsCookies = siteSettingsObj.optionalGroups.find((e) => e.groupId === 'statistics');
    // @ts-ignore
    const firstCookieValues = statisticsCookies.cookies[0];
    const singleStatisticsCookie = {
      [firstCookieValues.name]: 1,
    };
    // Write cookie
    mockedCookieControls.add(singleStatisticsCookie);
    // Expect the cookie
    const statisticsCookieWritten = document.cookie.includes(firstCookieValues.name);
    expect(statisticsCookieWritten).toBeTruthy();

    // Remove statistics
    // In testing the form doesn't update the checkboxes, it must be done
    // manually here. Checking all but statistics
    const checkboxes = getShadowRoot().querySelectorAll('.hds-checkbox input');
    checkboxes.forEach((box) => {
      if (box.attributes['data-group'].value === 'statistics') {
        fireEvent.click(box);
      }
    });

    // Save changes
    fireEvent.click(selectedButton);

    // Verify cookie changes
    const cookiesAsStringAfterRemoval = mockedCookieControls.getCookie();
    let parsedAfterRemoval = mockedCookieControls.extractCookieOptions(cookiesAsStringAfterRemoval, '');
    const writtenCookieGroupsAfterRemoval = JSON.parse(parsedAfterRemoval['helfi-cookie-consents'])?.groups || '';
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
    // @ts-ignore
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
    // @ts-ignore
    const localStorageItem = siteSettingsObj?.optionalGroups.find((e) => e.groupId === 'test_optional')?.cookies.find((e) => e.type === 2);
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
    // @ts-ignore
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
    // @ts-ignore
    const sessionStorageItem = siteSettingsObj?.optionalGroups.find((e) => e.groupId === selectedCategory)?.cookies.find((e) => e.type === 3);
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
    // @ts-ignore
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
    // @ts-ignore
    const indexedDBItem = siteSettingsObj?.optionalGroups.find((e) => e.groupId === selectedCategory)?.cookies.find((e) => e.type === 4);
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
    // @ts-ignore
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
    // @ts-ignore
    const cacheStorageItem = siteSettingsObj?.optionalGroups.find((e) => e.groupId === selectedCategory)?.cookies.find((e) => e.type === 5);
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
    // @ts-ignore
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
    // @ts-ignore
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
    // @ts-ignore
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
    // @ts-ignore
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
    // @ts-ignore
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
    // @ts-ignore
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
    // @ts-ignore
    instance = await CookieConsentCore.create({ ...siteSettingsObj, remove: true }, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    localStorage.unallowedLocalStorage = 'delete this';
    expect(localStorage.unallowedLocalStorage).toBe('delete this');

    await waitForConsole('log', "Cookie consent: will delete unapproved localStorage(s): 'unallowedLocalStorage'");

    expect(localStorage.unallowedLocalStorage).toBeFalsy();
  });

  it('should remove sessionStorage items that have not been consented to if remove parameter is set in siteSettings', async () => {
    // @ts-ignore
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
    // @ts-ignore
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
    // @ts-ignore
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

  // -------------------------------------------------------------------------------------------------------------------
  // MARK: State changes
  // - If the settings file has changed, the banner should appear
  // it('should show banner if the hashes do not match in any consented group', () => {});

  // - If the settings are changed, the banner should recognize the changes
  // it('should remove only invalid (checksum mismatch) groups from cookie', () => {});

  // -------------------------------------------------------------------------------------------------------------------
  // MARK: Special cases
  // - Are robot-cookies allowed (cookies that are not set by the site, but set by a robot like Siteimprove crawler)
  // it('should not complain or show details about pre-approved robot cookies', () => {});

  // - Language tests
  // it('should fallback to English texts if an unknown language key is provided and complain in console.error', () => {});
  //   `Cookie consent: Missing translation: ${key}:${lang}`
  // it('should fallback to first found language, if English text is not found and complain in console.error', () => {});
  //   `Cookie consent: Missing translation: ${key}:${lang}`
  // it('should throw an error if language key is not found in language file', () => {});
  // -------------------------------------------------------------------------------------------------------------------
  // MARK: Visual issues
  // - Do the checkboxes in banner describe the accepted categories?
  // it('should have same checkbox checked values with cookie string', () => {});

  // - Does the banner hide footer?
  // it('should have footer element offsetTop not overlapping with banner', () => {});
});
