/* eslint-disable jest/no-mocks-import */
import mockDocumentCookie from './__mocks__/mockDocumentCookie';
import { getAll, setNamedCookie, getNamedCookie, createCookieController, CookieSetOptions } from './cookieController';

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

  describe('getAll', () => {
    it('Gets all cookies as an object from document.cookie', () => {
      mockedCookieControls.add(dummyCookieList);
      expect(getAll()).toEqual(dummyCookieList);
    });
    it('Returns an empty object if document.cookie is an empty string', () => {
      expect(getAll()).toEqual({});
    });
  });

  describe('getNamedCookie', () => {
    it('Gets cookie value by name from document.cookie', () => {
      mockedCookieControls.add(dummyCookieList);
      expect(getNamedCookie('cookieKey')).toEqual(dummyCookieList.cookieKey);
      expect(getNamedCookie('jsonCookie')).toEqual(dummyCookieList.jsonCookie);
      expect(getNamedCookie('objectStringCookie')).toEqual(dummyCookieList.objectStringCookie);
      expect(getNamedCookie('emptyCookie')).toEqual(dummyCookieList.emptyCookie);
    });
    it('returns undefined if cookie is not found', () => {
      mockedCookieControls.add(dummyCookieList);
      expect(getNamedCookie('doesnotExist')).toBeUndefined();
    });
  });

  describe('setNamedCookie', () => {
    it('stores a new cookie to document.cookie. Options are empty if not set', () => {
      const allCookies = { ...dummyCookieList, [dummyKey]: dummyValue };
      mockedCookieControls.add(dummyCookieList);
      setNamedCookie(dummyKey, dummyValue);
      expect(getNamedCookie(dummyKey)).toEqual(dummyValue);
      const cookies = getAll();
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
      expect(getNamedCookie(target)).toEqual(dummyCookieList.emptyCookie);
      setNamedCookie(target, newValue);
      expect(getNamedCookie(target)).toEqual(newValue);
    });

    it('passed value is encoded', () => {
      const target = 'specialChars';
      const newValue = '"+{}&!=%"[]:';
      setNamedCookie(target, newValue);
      expect(getNamedCookie(target)).toEqual(newValue);
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
      setNamedCookie(dummyKey, dummyValue, options);
      const optionsFromCookie = mockedCookieControls.getCookieOptions(dummyKey);
      expect(optionsFromCookie).toEqual(options);
    });

    it('passes also partial options to document.cookie', () => {
      const options: CookieSetOptions = {
        domain: 'domain.com',
        sameSite: 'none',
      };
      setNamedCookie(dummyKey, dummyValue, options);
      const optionsFromCookie = mockedCookieControls.getCookieOptions(dummyKey);
      expect(optionsFromCookie).toEqual(options);
    });
    it('throws when setting invalid options', () => {
      const options: CookieSetOptions = {
        expires: (1111 as unknown) as Date,
      };
      expect(() => setNamedCookie(dummyKey, dummyValue, options)).toThrow();
    });

    it('throws when setting an invalid cookie name', () => {
      expect(() => setNamedCookie(`${dummyKey}\n`, dummyValue)).toThrow();
    });
  });
  describe('createCookieController creates a controller for getting and setting cookies', () => {
    const cookieName = 'test-cookie';
    const cookieValue = JSON.stringify({ a: true, b: false });

    it('createCookieController.set saves a cookie with options passed to the controller on initialization', () => {
      const options: CookieSetOptions = {
        path: 'path',
        secure: true,
        sameSite: 'strict',
        maxAge: 1234567,
        domain: 'some-domain.com',
      };

      const controller = createCookieController(options, cookieName);

      controller.set(cookieValue);
      expect(getNamedCookie(cookieName)).toEqual(cookieValue);
      const passedOptions = mockedCookieControls.getCookieOptions(cookieName);
      expect(passedOptions).toEqual(options);
    });
    it('createCookieController.get gets a cookie with name passed to the controller on initialization', () => {
      const controller = createCookieController({}, cookieName);

      mockedCookieControls.add({ ...dummyCookieList, ...{ [cookieName]: cookieValue } });
      const gotCookie = controller.get();
      expect(gotCookie).toEqual(cookieValue);
    });
  });
});
