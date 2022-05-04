import cookie, { CookieSerializeOptions } from 'cookie';

export type CookieSetOptions = CookieSerializeOptions;

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

function createCookieController(
  options: CookieSetOptions,
  cookieName: string,
): {
  get: () => string;
  set: (data: string) => void;
} {
  const defaultCookieSetOptions: CookieSetOptions = {
    path: '/',
    secure: false,
    sameSite: 'strict',
    maxAge: undefined,
  };

  const cookieOptions: CookieSetOptions = {
    ...defaultCookieSetOptions,
    ...options,
  };

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
