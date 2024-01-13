/* eslint-disable jest/no-mocks-import */
import { CookieSerializeOptions } from 'cookie';

import mockDocumentCookie from './__mocks__/mockDocumentCookie';
import mockWindowLocation from './__mocks__/mockWindowLocation';
import { CookieSetOptions, defaultCookieSetOptions, getAll } from './cookieController';
import { VERSION_COOKIE_NAME, createCookieStorageProxy } from './cookieStorageProxy';
import { COOKIE_NAME } from './cookieConsentController';
import { getMockCalls } from '../../utils/testHelpers';

describe(`cookieStorageProxy.ts`, () => {
  const mockedCookieControls = mockDocumentCookie();
  const mockedWindowControls = mockWindowLocation();

  afterEach(() => {
    mockedCookieControls.clear();
  });
  afterAll(() => {
    mockedCookieControls.restore();
    mockedWindowControls.restore();
  });

  const otherCookiesList = {
    cookieKey: COOKIE_NAME,
    jsonCookie: JSON.stringify({ json: true }),
    objectStringCookie: '{ obj: true }',
    emptyCookie: '',
  };

  const windowDomain = 'subdomain.hel.fi';

  mockedWindowControls.setUrl(`https://${windowDomain}`);

  const cookieOptionsForMultiDomain: CookieSerializeOptions = {
    domain: 'hel.fi',
    path: '/',
  };

  const cookieOptionsForSubDomain: CookieSerializeOptions = {
    ...cookieOptionsForMultiDomain,
    domain: windowDomain,
  };

  const baseConsentData = {
    'consent-name': false,
    'another-consent-name': true,
    consentX: false,
    consentY: true,
    [COOKIE_NAME]: true,
  };
  const versionCookie = { [VERSION_COOKIE_NAME]: '1' };
  describe('createcookieStorageProxy creates a proxy for cookieController', () => {
    const consentCookie = {
      [COOKIE_NAME as string]: JSON.stringify(baseConsentData),
    };

    const multipleCookiesWithConsentCookie = {
      ...otherCookiesList,
      ...consentCookie,
    };

    const getNumberOfStoredConsentCookies = () => document.cookie.split(`${COOKIE_NAME}=`).length - 1;
    const getCookieWriteCount = () => getMockCalls(mockedCookieControls.mockSet).length;
    const getCookieReadCount = () => getMockCalls(mockedCookieControls.mockGet).length;
    const storeCookieVersion = () => mockedCookieControls.add(versionCookie);
    const removeCookieVersion = (cookies: string) => {
      return cookies.replace(`; ${VERSION_COOKIE_NAME}=1`, '');
    };

    const getCookieOptionsDomain = (cookieName: string, writeOptions: CookieSetOptions, wasDeleted: boolean) => {
      return mockedCookieControls.getCookieOptions(cookieName, writeOptions, wasDeleted).domain;
    };
    const getAddedCookieOptionsDomain = (cookieName: string, writeOptions: CookieSetOptions) => {
      return getCookieOptionsDomain(cookieName, writeOptions, false);
    };
    const getDeletedCookieOptionsDomain = (cookieName: string, writeOptions: CookieSetOptions) => {
      return getCookieOptionsDomain(cookieName, writeOptions, true);
    };

    const initTests = (extraOptions: CookieSetOptions = {}) => {
      const options: CookieSetOptions = {
        ...defaultCookieSetOptions,
        ...extraOptions,
      };
      return createCookieStorageProxy(options, COOKIE_NAME);
    };

    it('Does not add or convert cookies, if no old nor new consents are found.', () => {
      mockedCookieControls.add(otherCookiesList);
      const cookiesBefore = document.cookie;
      const writeCountBeforeInit = getCookieWriteCount();
      const readCountBeforeInit = getCookieReadCount();
      const proxy = initTests();
      // consent cookie and version cookie are read
      expect(getCookieReadCount()).toBe(readCountBeforeInit + 2);
      expect(getNumberOfStoredConsentCookies()).toBe(0);
      expect(getCookieReadCount()).toBe(readCountBeforeInit + 3);

      const consents = proxy.get();
      expect(getCookieReadCount()).toBe(readCountBeforeInit + 4);

      const result = getAll();
      expect(getCookieReadCount()).toBe(readCountBeforeInit + 5);

      expect(consents).toEqual('');
      expect(result).toMatchObject(otherCookiesList);
      expect(getCookieWriteCount()).toBe(writeCountBeforeInit);
      expect(document.cookie).toBe(cookiesBefore);
    });

    it('Does not add or convert cookies, if there is a single consent cookie and version is stored.', () => {
      storeCookieVersion();
      mockedCookieControls.add(multipleCookiesWithConsentCookie);
      const cookiesBefore = document.cookie;
      expect(getNumberOfStoredConsentCookies()).toBe(1);
      const writeCountBeforeInit = getCookieWriteCount();
      const readCountBeforeInit = getCookieReadCount();
      const proxy = initTests();
      expect(getCookieReadCount()).toBe(readCountBeforeInit + 2);
      const consents = proxy.get();
      expect(consents).toEqual(multipleCookiesWithConsentCookie[COOKIE_NAME]);
      const result = getAll();
      expect(result).toMatchObject(multipleCookiesWithConsentCookie);
      expect(result[COOKIE_NAME]).toEqual(multipleCookiesWithConsentCookie[COOKIE_NAME]);
      expect(getCookieWriteCount()).toBe(writeCountBeforeInit);
      expect(getCookieReadCount()).toBe(readCountBeforeInit + 4);
      expect(document.cookie).toBe(cookiesBefore);
    });

    it('Stores also a version cookie when consents are stored for the first time.', () => {
      mockedCookieControls.add(otherCookiesList);
      const writeCountBeforeInit = getCookieWriteCount();
      const cookieData = consentCookie[COOKIE_NAME];
      const proxy = initTests();
      // consent cookie and version cookie are read
      expect(getNumberOfStoredConsentCookies()).toBe(0);
      expect(getCookieWriteCount()).toBe(writeCountBeforeInit);

      proxy.set(cookieData);
      expect(getCookieWriteCount()).toBe(writeCountBeforeInit + 2);
      const consents = proxy.get();

      expect(consents).toEqual(cookieData);
      const result = getAll();
      expect(result).toMatchObject({ ...otherCookiesList, ...consentCookie, ...versionCookie });
    });

    it('Moves old cookie to a new domain, if version is not found. New cookies have same domain. Version cookie is not set.', () => {
      mockedCookieControls.add(multipleCookiesWithConsentCookie, cookieOptionsForMultiDomain);
      const cookiesBefore = document.cookie;
      expect(getNumberOfStoredConsentCookies()).toBe(1);
      const writeCountBeforeInit = getCookieWriteCount();
      const readCountBeforeInit = getCookieReadCount();
      const proxy = initTests();
      const consents = proxy.get();
      expect(consents).toEqual(multipleCookiesWithConsentCookie[COOKIE_NAME]);
      const result = getAll();
      expect(result).toMatchObject(multipleCookiesWithConsentCookie);
      expect(result[COOKIE_NAME]).toEqual(multipleCookiesWithConsentCookie[COOKIE_NAME]);
      // one write for removing old cookie, one write for adding new
      expect(getCookieWriteCount()).toBe(writeCountBeforeInit + 2);
      expect(getCookieReadCount()).toBe(readCountBeforeInit + 4);
      expect(removeCookieVersion(document.cookie)).toBe(cookiesBefore);

      expect(getDeletedCookieOptionsDomain(COOKIE_NAME, cookieOptionsForMultiDomain)).toBe(
        cookieOptionsForMultiDomain.domain,
      );
      expect(getAddedCookieOptionsDomain(COOKIE_NAME, cookieOptionsForSubDomain)).toBe(
        cookieOptionsForSubDomain.domain,
      );

      expect(() => getAddedCookieOptionsDomain(VERSION_COOKIE_NAME, cookieOptionsForSubDomain)).toThrow();
    });

    it('If a custom domain is set, the consent cookie is moved, if the version cookie is not found. Version cookie is not set.', () => {
      const cookieOptions = cookieOptionsForMultiDomain;
      const commonDomainForAllCookies = cookieOptions.domain;
      mockedCookieControls.add(multipleCookiesWithConsentCookie, cookieOptions);
      const cookiesBefore = document.cookie;
      const writeCountBeforeInit = getCookieWriteCount();
      const proxy = initTests({ domain: commonDomainForAllCookies });
      expect(proxy.get()).toEqual(multipleCookiesWithConsentCookie[COOKIE_NAME]);
      expect(removeCookieVersion(document.cookie)).toBe(cookiesBefore);
      expect(getCookieWriteCount()).toBe(writeCountBeforeInit + 2);

      expect(getDeletedCookieOptionsDomain(COOKIE_NAME, cookieOptions)).toBe(commonDomainForAllCookies);
      expect(getAddedCookieOptionsDomain(COOKIE_NAME, cookieOptions)).toBe(commonDomainForAllCookies);
      expect(() => getAddedCookieOptionsDomain(VERSION_COOKIE_NAME, cookieOptionsForSubDomain)).toThrow();
    });
    it('Removes all consent cookies, if there are multiple consent cookies. Empty consent cookie is added.', () => {
      mockedCookieControls.add(multipleCookiesWithConsentCookie, cookieOptionsForMultiDomain);
      mockedCookieControls.add(multipleCookiesWithConsentCookie, cookieOptionsForSubDomain);
      const writeCountBeforeInit = getCookieWriteCount();
      expect(getNumberOfStoredConsentCookies()).toBe(2);
      const proxy = initTests();
      // empty consent cookie was added
      expect(getNumberOfStoredConsentCookies()).toBe(1);
      const consents = proxy.get();
      expect(consents).toEqual('{}');
      const result = getAll();

      expect(result).toMatchObject(otherCookiesList);
      // two writes for removing old cookies, one write for adding empty one
      expect(getCookieWriteCount()).toBe(writeCountBeforeInit + 3);
    });

    it('Does not add or convert cookies, if there are no consents, but version is stored.', () => {
      mockedCookieControls.add(otherCookiesList, cookieOptionsForMultiDomain);
      storeCookieVersion();
      const cookiesBefore = document.cookie;
      expect(getNumberOfStoredConsentCookies()).toBe(0);
      const writeCountBeforeInit = getCookieWriteCount();
      const readCountBeforeInit = getCookieReadCount();
      const proxy = initTests();
      expect(getCookieReadCount()).toBe(readCountBeforeInit + 2);
      const consents = proxy.get();
      expect(consents).toEqual('');
      const result = getAll();
      expect(result).toMatchObject(otherCookiesList);
      expect(getCookieWriteCount()).toBe(writeCountBeforeInit);
      expect(document.cookie).toBe(cookiesBefore);
    });

    it('When a cookie is removed both "maxAge" and "expires" should not be set. "expires" is set to year 1970.', () => {
      mockedCookieControls.add(multipleCookiesWithConsentCookie, cookieOptionsForMultiDomain);
      initTests();
      const multiDomainDeleteOptions = mockedCookieControls.getCookieOptions(
        COOKIE_NAME,
        cookieOptionsForMultiDomain,
        true,
      );
      expect(multiDomainDeleteOptions.maxAge).toBeUndefined();
      expect((multiDomainDeleteOptions.expires as Date).getFullYear()).toBe(1970);
    });
  });
});
