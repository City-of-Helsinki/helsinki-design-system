import _pick from 'lodash.pick';
import _isObject from 'lodash.isobject';
import _isUndefined from 'lodash.isundefined';

import cookieControllerModule, { CookieSetOptions } from './cookieController';

export type ConsentList = string[];

export type ConsentObject = { [x: string]: boolean };

export type ConsentStorage = {
  required: ConsentObject;
  optional: ConsentObject;
  unknown?: ConsentObject;
};

export type ConsentControllerProps = {
  requiredConsents?: ConsentList;
  optionalConsents?: ConsentList;
  cookieDomain?: string;
};

export type ConsentController = {
  getRequired: () => ConsentObject;
  getOptional: () => ConsentObject;
  update: (key: string, value: boolean) => void;
  approveRequired: () => void;
  approveAll: () => void;
  rejectAll: () => void;
  getUnhandledConsents: () => string[];
  getRequiredWithoutConsent: () => string[];
  save: () => ConsentObject;
};

export const COOKIE_NAME = 'city-of-helsinki-cookie-consents';
export const COOKIE_EXPIRATION_TIME = 60 * 60 * 24 * 365;

export const commonConsents = {
  matomo: 'matomo',
  tunnistamo: 'tunnistamo',
  language: 'language',
  marketing: 'marketing',
  preferences: 'preferences',
};

function convertStringArrayToKeyConsentObject(array: string[]): ConsentObject {
  return array.reduce((current, key) => {
    // eslint-disable-next-line no-param-reassign
    current[key] = false;
    return current;
  }, {} as ConsentObject);
}

function mergeConsents(set1: ConsentObject, set2: ConsentObject, set3?: ConsentObject): ConsentObject {
  return { ...set1, ...set2, ...set3 };
}

function parseConsents(jsonString: string | undefined): ConsentObject {
  if (!jsonString || jsonString.length < 2 || jsonString.charAt(0) !== '{') {
    return {};
  }
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return {};
  }
}

function createConsentsString(consents: ConsentObject): string {
  if (!_isObject(consents)) {
    return '{}';
  }
  return JSON.stringify(consents);
}

function createCookieController(
  cookieDomain?: string,
): {
  get: () => string;
  set: (data: string) => void;
} {
  const defaultCookieSetOptions: CookieSetOptions = {
    path: '/',
    secure: false,
    sameSite: 'strict',
    maxAge: COOKIE_EXPIRATION_TIME,
  };

  const getCookieDomainFromUrl = (): string => window.location.hostname.split('.').slice(-2).join('.');

  const createCookieOptions = (): CookieSetOptions => ({
    ...defaultCookieSetOptions,
    domain: cookieDomain || getCookieDomainFromUrl(),
  });

  const get = (): string => cookieControllerModule.get(COOKIE_NAME) || '';

  const set = (data: string): void => {
    cookieControllerModule.set(COOKIE_NAME, data, createCookieOptions());
  };
  return {
    get,
    set,
  };
}

export function createStorage(
  initialValues: ConsentStorage,
): {
  getAll: () => ConsentStorage;
  getConsentByName: (consentName: string) => boolean;
  approve: (keys: string[]) => ConsentStorage;
  reject: (keys: string[]) => ConsentStorage;
} {
  let storage: ConsentStorage = { ...initialValues };

  const getStorage = () => storage;

  const copyStorage = (): ConsentStorage => ({
    optional: { ...storage.optional },
    required: { ...storage.required },
    unknown: { ...storage.unknown },
  });

  const updateStorage = (newStorage: ConsentStorage): void => {
    storage = newStorage;
  };

  const findConsentSource = (consentName: string, targetStorage: ConsentStorage): ConsentObject | undefined => {
    if (!_isUndefined(targetStorage.required[consentName])) {
      return targetStorage.required;
    }
    if (!_isUndefined(targetStorage.optional[consentName])) {
      return targetStorage.optional;
    }
    return undefined;
  };

  const updateConsent = (targetStorage: ConsentStorage, consentName: string, value: boolean): void => {
    const target = findConsentSource(consentName, targetStorage);
    if (!target) {
      throw new Error(`Unknown consent ${consentName}`);
    }
    target[consentName] = value;
  };

  const setConsents = (keys: string[], value: boolean): ConsentStorage => {
    const copiedStorage = copyStorage();
    keys.forEach((key) => {
      updateConsent(copiedStorage, key, value);
    });
    updateStorage(copiedStorage);
    return copiedStorage;
  };

  const getConsentByName = (consentName: string): boolean => {
    const target = findConsentSource(consentName, getStorage());
    if (!target) {
      return false;
    }
    return target[consentName];
  };

  const approve = (keys: string[]): ConsentStorage => setConsents(keys, true);

  const reject = (keys: string[]): ConsentStorage => setConsents(keys, false);

  return {
    getAll: () => getStorage(),
    getConsentByName,
    approve,
    reject,
  };
}

function verifyConsentProps({ optionalConsents, requiredConsents }: ConsentControllerProps) {
  if (!requiredConsents || !optionalConsents) {
    return;
  }
  requiredConsents.forEach((consent) => {
    if (optionalConsents.includes(consent)) {
      throw new Error(`optional consent '${consent}' found in requiredConsents.`);
    }
  });
}

export default function createConsentController(props: ConsentControllerProps): ConsentController {
  verifyConsentProps(props);
  const { optionalConsents = [], requiredConsents = [] } = props;
  const allConsents = [...optionalConsents, ...requiredConsents];
  const cookieController = createCookieController(props.cookieDomain);
  const currentConsentsInCookie = parseConsents(cookieController.get());

  const required = mergeConsents(
    convertStringArrayToKeyConsentObject(requiredConsents),
    _pick(currentConsentsInCookie, requiredConsents),
  );

  const optional = mergeConsents(
    convertStringArrayToKeyConsentObject(optionalConsents),
    _pick(currentConsentsInCookie, optionalConsents),
  );

  const unknownConsentKeys = Object.keys(currentConsentsInCookie).filter((key) => !allConsents.includes(key));

  const unknown = unknownConsentKeys.length ? _pick(currentConsentsInCookie, unknownConsentKeys) : undefined;

  const storage = createStorage({ required, optional, unknown });

  const getConsents = () => storage.getAll();

  const save = () => {
    const currentVersion = getConsents();
    const consents = mergeConsents(currentVersion.required, currentVersion.optional, currentVersion.unknown);
    cookieController.set(createConsentsString(consents));
    return consents;
  };

  const rejectAll = () => {
    storage.reject(allConsents);
  };

  const approveRequired = () => {
    storage.approve(requiredConsents);
  };

  const approveAll = () => {
    storage.approve(allConsents);
  };

  const update = (consentName: string, value: boolean) => {
    const arr = [consentName];
    if (value) {
      storage.approve(arr);
    } else {
      storage.reject(arr);
    }
  };

  return {
    getRequired: () => storage.getAll().required,
    getOptional: () => storage.getAll().optional,
    update,
    approveAll,
    approveRequired,
    getRequiredWithoutConsent: () => requiredConsents.filter((key) => storage.getConsentByName(key) !== true),
    rejectAll,
    getUnhandledConsents: () => {
      const storedCookies = parseConsents(cookieController.get());
      return allConsents.filter((key) => _isUndefined(storedCookies[key]));
    },
    save,
  };
}
