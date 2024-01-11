import cookie, { CookieSerializeOptions } from 'cookie';
import _isObject from 'lodash.isobject';

export type CookieSetOptions = CookieSerializeOptions;
export type CookieConsentData = { [x: string]: boolean };

export const defaultCookieSetOptions: CookieSetOptions = {
  path: '/',
  secure: false,
  sameSite: 'strict',
  maxAge: undefined,
};

function getAll() {
  return cookie.parse(document.cookie);
}

function getNamedCookie(name: string): string | undefined {
  const cookies = getAll();
  return cookies[name];
}

function setNamedCookie(name: string, value: string, options?: CookieSerializeOptions) {
  document.cookie = cookie.serialize(name, value, options);
}

function createConsentsString(consents: CookieConsentData): string {
  if (!_isObject(consents)) {
    return '{}';
  }
  return JSON.stringify(consents);
}

export function parseConsents(jsonString: string | undefined): CookieConsentData {
  if (!jsonString || jsonString.length < 2 || jsonString.charAt(0) !== '{') {
    return {};
  }
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return {};
  }
}

function createCookieController(
  options: CookieSetOptions,
  cookieName: string,
): {
  get: () => string;
  set: (data: CookieConsentData | string) => void;
} {
  const cookieOptions: CookieSetOptions = {
    ...defaultCookieSetOptions,
    ...options,
  };

  if (typeof window === 'undefined') {
    return {
      get: () => '',
      set: () => '',
    };
  }

  const getCookie = (): string => getNamedCookie(cookieName) || '';

  const setCookie = (data: CookieConsentData | string): void => {
    const storedValue = typeof data === 'string' ? data : createConsentsString(data);
    setNamedCookie(cookieName, storedValue, cookieOptions);
  };

  return {
    get: getCookie,
    set: setCookie,
  };
}

export { createCookieController, getAll, getNamedCookie, setNamedCookie };
