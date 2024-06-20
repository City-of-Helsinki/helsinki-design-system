/* eslint-disable jest/no-mocks-import */
import { fireEvent, waitFor } from '@testing-library/dom';
import fetchMock, { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';

import mockDocumentCookie from './__mocks__/mockDocumentCookie';
import { CookieConsentCore } from './cookieConsentCore';
import * as siteSettingsObjRaw from './example/helfi_sitesettings.json';

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

  const sleep = async (delay) => {
    return new Promise((r) => {
      setTimeout(r, delay);
    });
  };

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
    // TODO: Comment out these debug logs when the tests are stable
    jest.spyOn(console, 'log').mockImplementation((message) => {
      process.stdout.write(`console.log: ${message}\n`);
    });
    jest.spyOn(console, 'error').mockImplementation((message) => {
      process.stderr.write(`console.error: ${message}\n`);
    });
    jest.spyOn(console, 'warn').mockImplementation((message) => {
      process.stdout.write(`console.warn: ${message}\n`);
    });
    jest.spyOn(console, 'info').mockImplementation((message) => {
      process.stdout.write(`console.info: ${message}\n`);
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
  });

  afterAll(() => {
    disableFetchMocks();
    // @ts-ignore next-line
    global.ResizeObserverEntrySpy = undefined;
  });

  // `Cookie consent: Aria notification parent element '${this.#TARGET_SELECTOR}'  was not found`
  // `Cookie consent: targetSelector element '${this.#TARGET_SELECTOR}' was not found`
  // `Cookie consent: The spacerParentSelector element '${this.#SPACER_PARENT_SELECTOR}' was not found`
  // `Cookie consent: contentSelector element '${this.#PAGE_CONTENT_SELECTOR}' was not found`
  // `Cookie consent: Missing translation: ${key}:${lang}`

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
    await expect(CookieConsentCore.create(urls.siteSettingsNotJSON, { ...options })).rejects.toThrow(
      'Cookie consent: siteSettings JSON parsing failed: SyntaxError: Unexpected token T in JSON at position 0',
    );
  });

  /* eslint-disable jest/no-commented-out-tests */

  // // - If the banner is set for custom targets, are the selectors available on DOM?
  // it.only('should throw error if targetSelector is set but not found on DOM', async () => {
  //   // instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, { ...options, targetSelector: '#not-found' });
  //   await expect(
  //     // @ts-ignore
  //     await CookieConsentCore.create(urls.siteSettingsJsonUrl, { ...options, targetSelector: '#not-found' }),
  //   ).rejects.toThrow("Cookie consent: targetSelector element '#not-found' was not found");
  // });

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
    const banner = document.querySelector('.hds-cc__target');
    expect(banner).not.toBeNull();
  });

  // - When user accepts all cookies, the cookie should be written with all groups mentioned in settings.
  it('should add consentCookie with all groups when user consents to all groups', async () => {
    // @ts-ignore
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    const allButton = getShadowRoot().querySelector('button[data-approved="all"]');
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
    // @ts-ignore
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    const requiredButton = getShadowRoot().querySelector('button[data-approved="required"]');
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
    // @ts-ignore
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    const openAccordionButton = getShadowRoot().querySelector('.hds-cc__accordion-button--details');
    fireEvent.click(openAccordionButton as HTMLElement);

    // Approve essentials + statistics
    const statisticsCookiesCheckbox = getShadowRoot().querySelector('#statistics-cookies');
    fireEvent.click(statisticsCookiesCheckbox as HTMLElement);

    const selectedButton = getShadowRoot().querySelector('button[data-approved="selected"]');
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
    // @ts-ignore
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());
    // Accept all
    const allButton = getShadowRoot().querySelector('button[data-approved="all"]');
    fireEvent.click(allButton as HTMLElement);
    const cookiesAsString = mockedCookieControls.getCookie();
    const parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    const writtenCookieGroups = JSON.parse(parsed['helfi-cookie-consents'] as string)?.groups || '';
    const writtenKeys = Object.keys(writtenCookieGroups);
    const expectedGroups = [...siteSettingsObj.requiredGroups, ...siteSettingsObj.optionalGroups].map((e) => e.groupId);
    expect(writtenKeys).toEqual(expectedGroups);

    // All cookies accepted, now open banner and remove statistics
    const openAccordionButton = getShadowRoot().querySelector('.hds-cc__accordion-button--details');
    fireEvent.click(openAccordionButton as HTMLElement);

    // In testing the form doesn't update the checkboxes, it must be done
    // manually here. Checking all but statistics
    const checkboxes = getShadowRoot().querySelectorAll('.hds-checkbox input');
    checkboxes.forEach((box) => {
      const inputElement = box as HTMLInputElement;
      if (box.attributes['data-group'].value !== 'statistics' && !inputElement.disabled) {
        fireEvent.click(box);
      }
    });

    // Save changes
    const selectedButton = getShadowRoot().querySelector('button[data-approved="selected"]');
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
    // @ts-ignore
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    const openAccordionButton = getShadowRoot().querySelector('.hds-cc__accordion-button--details');
    fireEvent.click(openAccordionButton as HTMLElement);

    // Approve essentials + statistics
    const statisticsCookiesCheckbox = getShadowRoot().querySelector('#statistics-cookies');
    fireEvent.click(statisticsCookiesCheckbox as HTMLElement);

    const selectedButton = getShadowRoot().querySelector('button[data-approved="selected"]');
    fireEvent.click(selectedButton as HTMLElement);

    const cookiesAsString = mockedCookieControls.getCookie();
    const parsed = mockedCookieControls.extractCookieOptions(cookiesAsString, '');
    const writtenCookieGroups = JSON.parse(parsed['helfi-cookie-consents'] as string)?.groups || '';
    const writtenKeys = Object.keys(writtenCookieGroups);
    const expectedGroups = [...siteSettingsObj.requiredGroups].map((e) => e.groupId);
    expectedGroups.push('statistics');
    expect(writtenKeys).toEqual(expectedGroups);

    // Find a statistics cookie
    const statisticsCookies = siteSettingsObj.optionalGroups.find((e) => e.groupId === 'statistics');
    // @ts-ignore
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
    const checkboxes = getShadowRoot().querySelectorAll('.hds-checkbox input');
    checkboxes.forEach((box) => {
      if (box.attributes['data-group'].value === 'statistics') {
        fireEvent.click(box);
      }
    });

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

    await waitForConsole('log', "Cookie consent will delete consent withdrawn cookie(s): 'nmstat'");

    // Expect the cookie to be removed
    const statisticsCookieWrittenAfterRemoval = document.cookie.includes(firstCookieValues.name);
    expect(statisticsCookieWrittenAfterRemoval).toBeFalsy();
  });

  it('should remove localStorage items that were previously consented when user removes consent and it should not report them as illegal when monitoring', async () => {
    // @ts-ignore
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    localStorage.unallowed = 'delete this';
    expect(localStorage.unallowed).toBe('delete this');

    await waitForConsole('log', "Cookie consent will delete unapproved localStorage(s): 'unallowed'");

    expect(localStorage.unallowed).toBeFalsy();
  });

  it('should remove sessionStorage items that were previously consented when user removes consent and it should not report them as illegal when monitoring', async () => {
    // @ts-ignore
    instance = await CookieConsentCore.create(urls.siteSettingsJsonUrl, optionsEvent);
    await waitForRoot();
    addBoundingClientRect(getContainerElement());

    sessionStorage.unallowed = 'delete this';
    expect(sessionStorage.unallowed).toBe('delete this');

    await waitForConsole('log', "Cookie consent will delete unapproved sessionStorage(s): 'unallowed'");

    expect(sessionStorage.unallowed).toBeFalsy();
  });

  // These two API's don't seem to be supported
  // it('should remove indexedDb items that were previously consented when user removes consent and it should not report them as illegal when monitoring', async () => { });
  // it('should remove cache storage items that were previously consented when user removes consent and it should not report them as illegal when monitoring', async () => { });

  // - It should monitor and report items that have not been consented to if monitor interval parameter is set in siteSettings above 0
  // it('should monitor and report cookies that have not been consented to if monitor interval parameter is set in siteSettings above 0', () => {});
  // it('should monitor and report localStorage items that have not been consented to if monitor interval parameter is set in siteSettings above 0', () => {});
  // it('should monitor and report sessionStorage items that have not been consented to if monitor interval parameter is set in siteSettings above 0', () => {});
  // it('should monitor and report indexedDb items that have not been consented to if monitor interval parameter is set in siteSettings above 0', () => {});
  // it('should monitor and report cache storage items that have not been consented to if monitor interval parameter is set in siteSettings above 0', () => {});

  // - It should remove items that have not been consented to if remove parameter is set in siteSettings
  // it('should remove cookies that have not been consented to if remove parameter is set in siteSettings', () => {});
  // it('should remove localStorage items that have not been consented to if remove parameter is set in siteSettings', () => {});
  // it('should remove sessionStorage items that have not been consented to if remove parameter is set in siteSettings', () => {});
  // it('should remove indexedDb items that have not been consented to if remove parameter is set in siteSettings', () => {});
  // it('should remove cache storage items that have not been consented to if remove parameter is set in siteSettings', () => {});

  // -------------------------------------------------------------------------------------------------------------------
  // MARK: State changes
  // - If the settings file has changed, the banner should appear
  // it('should show banner if the hashes do not match in any consented group', () => {});

  // - If the settings are changed, the banner should recognize the changes
  // it('should remove only invalid (checksum mismatch) groups from cookie', () => {});

  // -------------------------------------------------------------------------------------------------------------------
  // MARK: Visual issues
  // - Do the checkboxes in banner describe the accepted categories?
  // it('should have same checkbox checked values with cookie string', () => {});

  // - Does the banner hide footer?
  // it('should have footer element offsetTop not overlapping with banner', () => {});
});
