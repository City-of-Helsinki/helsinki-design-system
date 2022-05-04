import cookie from 'cookie';

type Options = Record<string, string | boolean | Date | number>;

export type MockedDocumentCookieActions = {
  init: (keyValuePairs: Record<string, string>) => void;
  add: (keyValuePairs: Record<string, string>) => void;
  getCookie: () => string;
  getCookieOptions: (key: string) => Options;
  extractCookieOptions: (cookieStr: string, keyToRemove: string) => Options;
  restore: () => void;
  clear: () => void;
  mockGet: jest.Mock;
  mockSet: jest.Mock;
};

export default function mockDocumentCookie(): MockedDocumentCookieActions {
  const COOKIE_OPTIONS_DELIMETER = ';';
  const globalDocument = global.document;
  const oldDocumentCookie = globalDocument.cookie;
  const current = new Map<string, string>();
  const cookieWithOptions = new Map<string, string | undefined>();

  const getter = jest.fn((): string => {
    return Array.from(current.entries())
      .map(([k, v]) => `${k} = ${v}${COOKIE_OPTIONS_DELIMETER}`)
      .join(' ');
  });

  const setter = jest.fn((cookieData: string): void => {
    const [key, value] = cookieData.split('=');
    const trimmedKey = key.trim();
    if (!trimmedKey) {
      return;
    }
    const newValue = String(value.split(COOKIE_OPTIONS_DELIMETER)[0]).trim();
    current.set(trimmedKey, newValue);
    cookieWithOptions.set(trimmedKey, cookieData);
  });

  Reflect.deleteProperty(globalDocument, 'cookie');
  Reflect.defineProperty(globalDocument, 'cookie', {
    configurable: true,
    get: () => getter(),
    set: (newValue) => setter(newValue),
  });

  const setWithObject = (keyValuePairs: Record<string, string>) =>
    Object.entries(keyValuePairs).forEach(([k, v]) => {
      setter(`${k}=${v}`);
    });

  const extractCookieOptions = (cookieStr: string, keyToRemove: string): Options => {
    const fullCookie = cookie.parse(cookieStr);
    const options: Partial<Options> = {};
    if (cookieStr.includes('HttpOnly')) {
      options.httpOnly = true;
    }
    if (cookieStr.includes('Secure')) {
      options.secure = true;
    }
    return Object.entries(fullCookie).reduce((returnObj, [objectKey, objectValue]) => {
      /* eslint-disable no-param-reassign */
      /*
      The object from cookie.parse() includes also cookieName:cookieValue
      remove those from options
      */
      if (objectKey === keyToRemove) {
        return returnObj;
      }
      if (objectKey === 'Max-Age') {
        returnObj.maxAge = Number(objectValue);
      } else if (objectKey === 'Expires') {
        returnObj.expires = new Date(objectValue);
      } else if (objectKey === 'SameSite') {
        returnObj.sameSite = objectValue.toLowerCase();
      } else if (objectKey === 'Secure') {
        returnObj.secure = true;
      } else {
        returnObj[objectKey.toLowerCase()] = objectValue;
      }
      /* eslint-enable no-param-reassign */
      return returnObj;
    }, options) as Options;
  };

  return {
    add: (keyValuePairs) => setWithObject(keyValuePairs),
    getCookie: () => {
      return getter();
    },
    getCookieOptions: (key) => {
      return extractCookieOptions(cookieWithOptions.get(key), key);
    },
    extractCookieOptions,
    restore: () => {
      globalDocument.cookie = oldDocumentCookie;
    },
    clear: () => {
      current.clear();
      cookieWithOptions.clear();
      getter.mockClear();
      setter.mockClear();
    },
    init: (keyValuePairs) => {
      setWithObject(keyValuePairs);
      setter.mockClear();
    },
    mockGet: getter,
    mockSet: setter,
  };
}
