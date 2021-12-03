/* eslint-disable jest/no-mocks-import */
import mockDocumentCookie from './__mocks__/mockDocumentCookie';
import cookie, { CookieSetOptions } from './cookieController';

describe(`cookieController.ts`, () => {
  const mockedCookieControls = mockDocumentCookie();

  afterEach(() => {
    mockedCookieControls.clear();
  });
  afterAll(() => {
    mockedCookieControls.restore();
  });

  const dummyCookieList = {
    cookieKey: 'cookie',
    jsonCookie: JSON.stringify({ json: true }),
    objectStringCookie: '{ obj: true }',
    emptyCookie: '',
  };

  const dummyValue = 'cookieValue';
  const dummyKey = 'cookieName';

  describe('cookie.getAll', () => {
    it('Gets all cookies as an object from document.cookie', () => {
      mockedCookieControls.add(dummyCookieList);
      expect(cookie.getAll()).toEqual(dummyCookieList);
    });
    it('Returns an empty object if document.cookie is an empty string', () => {
      expect(cookie.getAll()).toEqual({});
    });
  });

  describe('cookie.get', () => {
    it('Gets cookie value by name from document.cookie', () => {
      mockedCookieControls.add(dummyCookieList);
      expect(cookie.get('cookieKey')).toEqual(dummyCookieList.cookieKey);
      expect(cookie.get('jsonCookie')).toEqual(dummyCookieList.jsonCookie);
      expect(cookie.get('objectStringCookie')).toEqual(dummyCookieList.objectStringCookie);
      expect(cookie.get('emptyCookie')).toEqual(dummyCookieList.emptyCookie);
    });
    it('returns undefined if cookie is not found', () => {
      mockedCookieControls.add(dummyCookieList);
      expect(cookie.get('doesnotExist')).toBeUndefined();
    });
  });

  describe('cookie.set', () => {
    it('stores a new cookie to document.cookie. Options are empty if not set', () => {
      const allCookies = { ...dummyCookieList, [dummyKey]: dummyValue };
      mockedCookieControls.add(dummyCookieList);
      cookie.set(dummyKey, dummyValue);
      expect(cookie.get(dummyKey)).toEqual(dummyValue);
      const cookies = cookie.getAll();
      expect(cookies).toEqual(allCookies);
      const options = mockedCookieControls.getCookieOptions(dummyKey);
      expect(options).toEqual({});

      const cookiesAsString = mockedCookieControls.getCookie();
      Object.entries(allCookies).forEach(([key, value]) => {
        expect(cookiesAsString.includes(`${key} = ${value};`)).toBeTruthy();
      });
    });

    it('updates previous cookie', () => {
      const target = 'emptyCookie';
      const newValue = 'notEmpty';
      mockedCookieControls.add(dummyCookieList);
      expect(cookie.get(target)).toEqual(dummyCookieList.emptyCookie);
      cookie.set(target, newValue);
      expect(cookie.get(target)).toEqual(newValue);
    });

    it('passed value is encoded', () => {
      const target = 'specialChars';
      const newValue = '"+{}&!=%"[]:';
      cookie.set(target, newValue);
      expect(cookie.get(target)).toEqual(newValue);
      const cookiesAsString = mockedCookieControls.getCookie();
      expect(cookiesAsString).toEqual(`${target} = ${encodeURIComponent(newValue)};`);
    });

    it('passes also options to document.cookie', () => {
      const options: CookieSetOptions = {
        domain: 'domain.com',
        expires: new Date('Sun, 24 Dec 2050 12:12:12 GMT'),
        path: '/path',
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        maxAge: 100,
      };
      cookie.set(dummyKey, dummyValue, options);
      const optionsFromCookie = mockedCookieControls.getCookieOptions(dummyKey);
      expect(optionsFromCookie).toEqual(options);
    });

    it('passes also partial options to document.cookie', () => {
      const options: CookieSetOptions = {
        domain: 'domain.com',
        sameSite: 'none',
      };
      cookie.set(dummyKey, dummyValue, options);
      const optionsFromCookie = mockedCookieControls.getCookieOptions(dummyKey);
      expect(optionsFromCookie).toEqual(options);
    });
    it('throws when setting invalid options', () => {
      const options: CookieSetOptions = {
        expires: (1111 as unknown) as Date,
      };
      expect(() => cookie.set(dummyKey, dummyValue, options)).toThrow();
    });

    it('throws when setting an invalid cookie name', () => {
      expect(() => cookie.set(`${dummyKey}\n`, dummyValue)).toThrow();
    });
  });
});
