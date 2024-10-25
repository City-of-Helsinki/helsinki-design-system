import cookie, { CookieSerializeOptions } from 'cookie';

type Options = Record<string, string | boolean | Date | number>;

export type MockedDocumentCookieActions = {
  init: (keyValuePairs: Record<string, string>) => void;
  add: (keyValuePairs: Record<string, string>, commonOptions?: CookieSerializeOptions) => void;
  createCookieData: (keyValuePairs: Record<string, string>) => string;
  getCookie: () => string;
  getCookieOptions: (key: string, storedOptions?: CookieSerializeOptions, getDeleted?: boolean) => Options;
  extractCookieOptions: (cookieStr: string, keyToRemove: string) => Options;
  getSerializeOptions: () => CookieSerializeOptions;
  restore: () => void;
  clear: () => void;
  mockGet: jest.Mock;
  mockSet: jest.Mock;
};

export default function mockDocumentCookie(
  serializeOptionsOverride: CookieSerializeOptions = {},
): MockedDocumentCookieActions {
  const COOKIE_OPTIONS_DELIMETER = ';';
  const globalDocument = global.document;
  const oldDocumentCookie = globalDocument.cookie;
  const current = new Map<string, string>();
  const cookieWithOptions = new Map<string, string | undefined>();
  const deletedActionSuffix = 'deleted!';
  const keyDelimeter = '___';
  const actionDelimeter = '>>>';
  const pathAndDomainDelimeter = '###';

  const serializeOptions: CookieSerializeOptions = {
    domain: 'default.domain.com',
    path: '/',
    ...serializeOptionsOverride,
  };

  const parseKeyValuePair = (cookieData: string): [string, string] => {
    const [key, value] = cookieData.split('=');
    const trimmedKey = key.trim();
    if (!trimmedKey) {
      return ['', ''];
    }
    const newValue = String(value.split(COOKIE_OPTIONS_DELIMETER)[0]).trim();
    return [trimmedKey, newValue];
  };

  const createKeyWithAllData = (key: string, path: string, domain: string, action?: string) => {
    const pathAndDomain = `${encodeURIComponent(domain)}${pathAndDomainDelimeter}${encodeURIComponent(path)}`;
    return `${key}${keyDelimeter}${pathAndDomain}${actionDelimeter}${action}`;
  };

  const splitKeyWithPathAndDomain = (source: string) => {
    const [key, pathAndDomainAction] = source.split(keyDelimeter);
    const [pathAndDomain, action] = String(pathAndDomainAction).split(actionDelimeter);
    const [encodedDomain, encodedPath] = String(pathAndDomain).split(pathAndDomainDelimeter);
    return {
      key,
      path: decodeURIComponent(encodedPath),
      domain: decodeURIComponent(encodedDomain),
      action,
    };
  };

  const createDeleteKey = (key: string, serializedData: string) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const { path, domain } = getDomainAndPath(serializedData);
    return createKeyWithAllData(key, path, domain, deletedActionSuffix);
  };

  const createStoredKey = (key: string, serializedData: string) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const { path, domain } = getDomainAndPath(serializedData);
    return createKeyWithAllData(key, path, domain);
  };

  const storedKeyToDeleteKey = (keyWitProps: string) => {
    const { path, domain, key } = splitKeyWithPathAndDomain(keyWitProps);

    return createKeyWithAllData(key, path, domain, deletedActionSuffix);
  };

  const getOriginalKey = (key: string) => {
    return key.split(keyDelimeter)[0];
  };

  const hasDeleteMatch = (keyWithAllProps: string) => {
    return current.has(storedKeyToDeleteKey(keyWithAllProps));
  };

  const isDeletedCookie = (key: string) => {
    return key.includes(deletedActionSuffix) || hasDeleteMatch(key);
  };

  const createData = (data: [string, string][]): string => {
    return data
      .filter(([k]) => !isDeletedCookie(k))
      .map(([k, v]) => `${getOriginalKey(k)}=${v}${COOKIE_OPTIONS_DELIMETER}`)
      .join(' ')
      .slice(0, -1); // cookies do not have the last ";"
  };

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

  const hasDeleteFormat = (cookieData: string) => {
    const { maxAge, expires } = extractCookieOptions(cookieData, '') as { maxAge: number; expires: Date };

    if (!Number.isNaN(maxAge) && maxAge < 1) {
      return true;
    }
    const time = expires && expires.getTime();
    if (!Number.isNaN(time) && time < Date.now()) {
      return true;
    }
    return false;
  };

  const getDomainAndPath = (serializedData: string): { path: string; domain: string } => {
    const { path = '', domain = '' } = { ...serializeOptions, ...extractCookieOptions(serializedData, '') };
    return { path, domain };
  };

  const getter = jest.fn((): string => {
    return createData(Array.from(current.entries()));
  });

  const setter = jest.fn((cookieData: string): void => {
    const [trimmedKey, newValue] = parseKeyValuePair(cookieData);
    if (!trimmedKey) {
      return;
    }
    if (hasDeleteFormat(cookieData)) {
      const deleteKey = createDeleteKey(trimmedKey, cookieData);
      current.set(deleteKey, newValue);
      cookieWithOptions.set(deleteKey, cookieData);
      return;
    }

    const keyWithPathAndDomain = createStoredKey(trimmedKey, cookieData);

    if (hasDeleteMatch(keyWithPathAndDomain)) {
      const deleteKeyToDelete = createDeleteKey(trimmedKey, cookieData);
      current.delete(deleteKeyToDelete);
      // Note: cookieWithOptions are not deleted!
      // This way it can be veried a cookie has been deleted at least once
    }
    current.set(keyWithPathAndDomain, newValue);
    cookieWithOptions.set(keyWithPathAndDomain, cookieData);
  });

  Reflect.deleteProperty(globalDocument, 'cookie');
  Reflect.defineProperty(globalDocument, 'cookie', {
    configurable: true,
    get: () => getter(),
    set: (newValue) => setter(newValue),
  });

  const setWithObject = (
    keyValuePairs: Record<string, string>,
    commonOptions: CookieSerializeOptions = serializeOptions,
  ) =>
    Object.entries(keyValuePairs).forEach(([k, v]) => {
      setter(cookie.serialize(k, v, commonOptions));
    });

  return {
    add: (keyValuePairs, commonOptions) => setWithObject(keyValuePairs, commonOptions),
    createCookieData: (keyValuePairs) => {
      const data = Object.entries(keyValuePairs).map(([k, v]) => {
        return parseKeyValuePair(`${k}=${v}`);
      });
      return createData(data);
    },
    getCookie: () => {
      return getter();
    },
    getCookieOptions: (key, storedOptions = serializeOptions, getDeleted = false) => {
      const storedKey = createKeyWithAllData(
        key,
        String(storedOptions.path),
        String(storedOptions.domain),
        getDeleted ? deletedActionSuffix : undefined,
      );
      const options = cookieWithOptions.get(storedKey) as string;
      if (!options) {
        throw new Error(`No options found for ${key}/${storedKey}`);
      }
      return extractCookieOptions(options, key);
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
    getSerializeOptions: () => serializeOptions,

    mockGet: getter,
    mockSet: setter,
  };
}
