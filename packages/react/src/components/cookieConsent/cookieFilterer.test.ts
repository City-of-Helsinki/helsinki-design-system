/* eslint-disable jest/no-mocks-import */
import { CookieSerializeOptions } from 'cookie';

import mockDocumentCookie from './__mocks__/mockDocumentCookie';
import mockWindowLocation from './__mocks__/mockWindowLocation';
import { CookieSetOptions, defaultCookieSetOptions, getAll } from './cookieController';
import { addVersionNumber, createCookieFilterer } from './cookieFilterer';
import { COOKIE_NAME } from './cookieConsentController';
import { getMockCalls } from '../../utils/testHelpers';

describe(`cookieFilterer.ts`, () => {
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
    domain: windowDomain,
    path: '/',
  };

  const baseConsentData = {
    version0Consent: false,
    version1Consent: false,
    consentX: false,
    consentY: true,
    [COOKIE_NAME]: true,
  };
  describe('createCookieFilterer creates a proxy for cookieController', () => {
    const createCookieData = (versionNumber = 0, modifiedDataNumber = 0) => {
      const data = { ...baseConsentData };
      data[`version${modifiedDataNumber}Consent`] = true;
      if (!versionNumber) {
        return JSON.stringify(data);
      }
      return JSON.stringify(addVersionNumber(data, versionNumber));
    };

    const cookieWithoutVersion = {
      [COOKIE_NAME as string]: createCookieData(0, 0),
    };
    const cookieWithoutVersionAfterConversion = {
      [COOKIE_NAME as string]: createCookieData(1, 0),
    };
    const cookieVersion1 = {
      [COOKIE_NAME as string]: createCookieData(1, 1),
    };

    const cookiesWithoutVersions = {
      ...otherCookiesList,
      ...cookieWithoutVersion,
    };

    const getConsentCookieCountInCookie = () => document.cookie.split(`${COOKIE_NAME}=`).length - 1;
    const getCookieWriteCount = () => getMockCalls(mockedCookieControls.mockSet).length;
    const getCookieReadCount = () => getMockCalls(mockedCookieControls.mockGet).length;

    const initTests = (extraOptions: CookieSetOptions = {}) => {
      const options: CookieSetOptions = {
        ...defaultCookieSetOptions,
        ...extraOptions,
      };
      return createCookieFilterer(options, COOKIE_NAME);
    };

    it('Does no filtering or conversion, if no old nor new consents are found.', () => {
      mockedCookieControls.add(otherCookiesList);
      const writeCountBeforeInit = getCookieWriteCount();
      const readCountBeforeInit = getCookieReadCount();
      const cookiesBefore = document.cookie;
      expect(getCookieReadCount()).toBe(readCountBeforeInit + 1);
      const filterer = initTests();
      expect(getCookieReadCount()).toBe(readCountBeforeInit + 2);
      expect(getConsentCookieCountInCookie()).toBe(0);
      expect(getCookieReadCount()).toBe(readCountBeforeInit + 3);

      const consents = filterer.get();
      expect(getCookieReadCount()).toBe(readCountBeforeInit + 4);

      const result = getAll();
      expect(getCookieReadCount()).toBe(readCountBeforeInit + 5);

      expect(consents).toEqual('');
      expect(result).toMatchObject(otherCookiesList);
      expect(getCookieWriteCount()).toBe(writeCountBeforeInit);
      expect(document.cookie).toBe(cookiesBefore);
    });

    it('Does no filtering or conversion when there is a single cookie with correct version', () => {
      mockedCookieControls.add(cookieVersion1);
      const writeCountBeforeInit = getCookieWriteCount();
      const readCountBeforeInit = getCookieReadCount();
      const cookiesBefore = document.cookie;
      const filterer = initTests();
      expect(getConsentCookieCountInCookie()).toBe(1);
      const consents = filterer.get();
      expect(consents).toEqual(cookieVersion1[COOKIE_NAME]);
      const result = getAll();
      expect(result).toMatchObject(cookieVersion1);
      expect(result[COOKIE_NAME]).toEqual(cookieVersion1[COOKIE_NAME]);
      expect(getCookieWriteCount()).toBe(writeCountBeforeInit);
      expect(getCookieReadCount()).toBe(readCountBeforeInit + 5);
      expect(document.cookie).toBe(cookiesBefore);
    });

    it('Converts old cookie without version to a new one with a version. Old one is removed, new is added.', () => {
      mockedCookieControls.add(cookiesWithoutVersions, cookieOptionsForMultiDomain);
      const expectedResult = {
        ...cookiesWithoutVersions,
        ...cookieWithoutVersionAfterConversion,
      };
      const writeCountBeforeInit = getCookieWriteCount();
      const readCountBeforeInit = getCookieReadCount();
      const filterer = initTests();
      expect(getConsentCookieCountInCookie()).toBe(1);
      const consents = filterer.get();
      expect(consents).toEqual(cookieWithoutVersionAfterConversion[COOKIE_NAME]);
      const result = getAll();
      expect(result).toMatchObject(expectedResult);
      expect(result[COOKIE_NAME]).toEqual(expectedResult[COOKIE_NAME]);
      // one write for removing old cookie, one for adding new version
      expect(getCookieWriteCount()).toBe(writeCountBeforeInit + 2);
      expect(getCookieReadCount()).toBe(readCountBeforeInit + 4);
    });

    it('Returns cookie data with current version number when there are two cookies with given name. Old cookie is removed.', () => {
      mockedCookieControls.add(cookiesWithoutVersions, cookieOptionsForMultiDomain);
      mockedCookieControls.add(cookieVersion1, cookieOptionsForSubDomain);
      const expectedResult = {
        ...cookiesWithoutVersions,
        ...cookieVersion1,
      };
      const writeCountBeforeInit = getCookieWriteCount();
      const readCountBeforeInit = getCookieReadCount();
      const filterer = initTests();
      // the second cookie is deleted, so only 1 exists
      expect(getConsentCookieCountInCookie()).toBe(1);
      const consents = filterer.get();
      expect(consents).toEqual(cookieVersion1[COOKIE_NAME]);
      const result = getAll();

      expect(result).toMatchObject(expectedResult);
      expect(result[COOKIE_NAME]).toEqual(cookieVersion1[COOKIE_NAME]);
      // one write for removing old cookie
      expect(getCookieWriteCount()).toBe(writeCountBeforeInit + 1);
      expect(getCookieReadCount()).toBe(readCountBeforeInit + 4);
    });
    it('When a cookie is removed both "maxAge" and "expires" should not be set. "expires" is set to 1970.', () => {
      mockedCookieControls.add(cookiesWithoutVersions, cookieOptionsForMultiDomain);
      mockedCookieControls.add(cookieVersion1, cookieOptionsForSubDomain);
      const writeCountBeforeInit = getCookieWriteCount();
      initTests();
      // one write for removing old cookie
      expect(getCookieWriteCount()).toBe(writeCountBeforeInit + 1);
      const cookieOptions = mockedCookieControls.getCookieOptions(COOKIE_NAME, cookieOptionsForMultiDomain, true);
      expect(cookieOptions.maxAge).toBeUndefined();
      expect((cookieOptions.expires as Date).getFullYear()).toBe(1970);
    });

    it('Returns no cookie data when there are two cookies with given name but neither has a version. Both are removed.', () => {
      mockedCookieControls.add(cookiesWithoutVersions, cookieOptionsForMultiDomain);
      mockedCookieControls.add(cookiesWithoutVersions, cookieOptionsForSubDomain);
      const writeCountBeforeInit = getCookieWriteCount();
      const readCountBeforeInit = getCookieReadCount();
      const filterer = initTests({ domain: windowDomain });
      expect(getConsentCookieCountInCookie()).toBe(0);
      const consents = filterer.get();
      expect(consents).toEqual('');

      // check removed cookies have correct options.domain
      const deleteMultiDomainCookieOptions = mockedCookieControls.getCookieOptions(
        COOKIE_NAME,
        cookieOptionsForMultiDomain,
        true,
      );
      expect(deleteMultiDomainCookieOptions.domain).toBe(cookieOptionsForMultiDomain.domain);
      const deleteSubDomainCookieOptions = mockedCookieControls.getCookieOptions(
        COOKIE_NAME,
        cookieOptionsForSubDomain,
        true,
      );
      expect(deleteSubDomainCookieOptions.domain).toBe(cookieOptionsForSubDomain.domain);

      const result = getAll();
      expect(result).toMatchObject(otherCookiesList);
      // two cookies were removed
      expect(getCookieWriteCount()).toBe(writeCountBeforeInit + 2);
      filterer.set(baseConsentData);
      const newConsents = filterer.get();
      expect(JSON.parse(newConsents)).toEqual(addVersionNumber(baseConsentData, 1));
      // two cookies were removed, one added
      expect(getCookieWriteCount()).toBe(writeCountBeforeInit + 3);
      expect(getCookieReadCount()).toBe(readCountBeforeInit + 5);
    });

    it('Returns no cookie data when there are two cookies with versioning. Both are removed.', () => {
      const cookiesWithVersion1 = {
        ...otherCookiesList,
        ...cookieVersion1,
      };
      mockedCookieControls.add(cookiesWithVersion1, cookieOptionsForMultiDomain);
      mockedCookieControls.add(cookiesWithVersion1, cookieOptionsForSubDomain);
      const writeCountBeforeInit = getCookieWriteCount();
      initTests({ domain: windowDomain });
      expect(getConsentCookieCountInCookie()).toBe(0);
      // two cookies were removed
      expect(getCookieWriteCount()).toBe(writeCountBeforeInit + 2);
    });
  });
});
