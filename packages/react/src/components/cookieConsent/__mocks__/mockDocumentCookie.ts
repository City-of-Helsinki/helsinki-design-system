import cookie, { CookieSerializeOptions } from 'cookie';

type Options = Record<string, string | boolean | Date | number>;

export type MockedDocumentCookieActions = {
  add: (keyValuePairs: Record<string, string>) => void;
  getCookie: () => string;
  getCookieOptions: (key: string) => Options;
  restore: () => void;
  clear: () => void;
};

export default function mockDocumentCookie(): MockedDocumentCookieActions {
  const COOKIE_OPTIONS_DELIMETER = ';';
  const globalDocument = global.document;
  let oldDocumentCookie = globalDocument.cookie;
  const current = new Map<string, string>();
  const cookieWithOptions = new Map<string, string | undefined>();

  const getter = (): string => {
    return Array.from(current.entries())
      .map(([k, v]) => `${k} = ${v}${COOKIE_OPTIONS_DELIMETER}`)
      .join(' ');
  };

  const setter = (cookieData: string): void => {
    const [key, value] = cookieData.split('=');
    const trimmedKey = key.trim();
    if (!trimmedKey) {
      return;
    }
    const newValue = String(value.split(COOKIE_OPTIONS_DELIMETER)[0]).trim();
    current.set(trimmedKey, newValue);
    cookieWithOptions.set(trimmedKey, cookieData);
  };

  Reflect.deleteProperty(globalDocument, 'cookie');
  Reflect.defineProperty(globalDocument, 'cookie', {
    configurable: true,
    get: () => getter(),
    set: (newValue) => setter(newValue),
  });

  return {
    add: (keyValuePairs) => {
      Object.entries(keyValuePairs).forEach(([k, v]) => {
        setter(`${k}=${v}`);
      });
    },
    getCookie: () => {
      return getter();
    },
    getCookieOptions: (key) => {
      const cookieStr = cookieWithOptions.get(key);
      const fullCookie = cookie.parse(cookieStr);
      const options: Partial<Options> = {};
      if (cookieStr.includes('HttpOnly')) {
        options.httpOnly = true;
      }
      if (cookieStr.includes('Secure')) {
        options.secure = true;
      }
      return Object.entries(fullCookie).reduce((current, [objectKey, objectValue]) => {
        /* remove the cookie name and value from options*/
        if (objectKey === key) {
          return current;
        } else if (objectKey === 'Max-Age') {
          current.maxAge = Number(objectValue);
        } else if (objectKey === 'Expires') {
          current.expires = new Date(objectValue);
        } else if (objectKey === 'SameSite') {
          current.sameSite = objectValue.toLowerCase();
        } else {
          current[objectKey.toLowerCase()] = objectValue;
        }
        return current;
      }, options) as Options;
    },
    restore: () => {
      globalDocument.cookie = oldDocumentCookie;
    },
    clear: () => {
      current.clear();
      cookieWithOptions.clear();
    },
  };
}
