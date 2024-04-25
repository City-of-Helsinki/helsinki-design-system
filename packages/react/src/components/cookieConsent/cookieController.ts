import cookie, { CookieSerializeOptions } from 'cookie';

import { isSsrEnvironment } from '../../utils/isSsrEnvironment';

export type CookieSetOptions = CookieSerializeOptions;

export const defaultCookieSetOptions: CookieSetOptions = {
  path: '/',
  secure: false,
  sameSite: 'strict',
  maxAge: undefined,
};

function getAll() {
  if (isSsrEnvironment()) {
    return {};
  }
  return cookie.parse(document.cookie);
}

function getNamedCookie(name: string): string | undefined {
  const cookies = getAll();
  return cookies[name];
}

function setNamedCookie(name: string, value: string, options?: CookieSerializeOptions) {
  if (!isSsrEnvironment()) {
    document.cookie = cookie.serialize(name, value, options);
  }
}

function createCookieController(
  options: CookieSetOptions,
  cookieName: string,
): {
  get: () => string;
  set: (data: string) => void;
} {
  const cookieOptions: CookieSetOptions = {
    ...defaultCookieSetOptions,
    ...options,
  };

  if (isSsrEnvironment()) {
    return {
      get: () => '',
      set: () => '',
    };
  }

  const getCookie = (): string => getNamedCookie(cookieName) || '';

  const setCookie = (data: string): void => {
    setNamedCookie(cookieName, data, cookieOptions);
  };

  return {
    get: getCookie,
    set: setCookie,
  };
}

export { createCookieController, getAll, getNamedCookie, setNamedCookie };
