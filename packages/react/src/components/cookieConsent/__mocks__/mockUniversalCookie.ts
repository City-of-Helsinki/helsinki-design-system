import { CookieSetOptions } from 'universal-cookie';

type CookieData = string | Record<string, string | unknown | null | number>;
type UniversalCookieMocking = {
  createMockedModule: () => unknown;
  mockGet: () => string;
  mockSet: (name: string, value: string, options: CookieSetOptions) => void;
  reset: () => void;
  setStoredCookie: (objectToStringify: CookieData) => void;
  getSetCookieArguments: (
    index?: number,
  ) => {
    cookieName: string;
    data: string;
    options: CookieSetOptions;
  };
};

export function createUniversalCookieMockHelpers(): UniversalCookieMocking {
  let cookieValue = '';

  const getter = jest.fn(() => cookieValue);

  // eslint-disable-next-line no-unused-vars
  const setter = jest.fn((name: string, value: string, options: CookieSetOptions) => {
    cookieValue = value;
  });

  const setStoredCookie = (data: CookieData) => {
    cookieValue = typeof data === 'string' ? data : JSON.stringify(data);
  };

  const reset = () => {
    getter.mockClear();
    setter.mockClear();
    cookieValue = '';
  };

  const createMockedModule = () => ({
    get: getter,
    set: setter,
  });

  const getSetCookieArguments = (
    index = -1,
  ): {
    cookieName: string;
    data: string;
    options: CookieSetOptions;
  } => {
    const pos = index > -1 ? index : setter.mock.calls.length - 1;
    const callArgs = setter.mock.calls[pos];
    return {
      cookieName: callArgs[0],
      data: callArgs[1],
      options: callArgs[2],
    };
  };

  return {
    createMockedModule,
    mockGet: getter,
    mockSet: setter,
    reset,
    setStoredCookie,
    getSetCookieArguments,
  };
}
