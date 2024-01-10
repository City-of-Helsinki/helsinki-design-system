import { CookieSerializeOptions, parse } from 'cookie';

import {
  CookieConsentData,
  createCookieController,
  setNamedCookie,
  defaultCookieSetOptions,
  parseConsents,
} from './cookieController';

export type CookieSetOptions = CookieSerializeOptions;

const COOKIE_DELIMETER = ';';
const CURRENT_VERSION = 1;
const VERSION_INDICATOR = 'hds-data-version-';
const versionPickerRegExp = /hds-data-version-(\d+)/;

// the old version how default cookie domain was picked
function getCookieDomainFromUrlForMultiDomains(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.location.hostname.split('.').slice(-2).join('.');
}

// the new version how to pick default cookie domain
export function getCookieDomainFromUrlForSubDomain(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.location.hostname;
}

export function addVersionNumber(data: Record<string, boolean>, versionNumber = CURRENT_VERSION) {
  return {
    ...data,
    [`${VERSION_INDICATOR}${versionNumber}`]: true,
  };
}

/**
 * This is a proxy between 'cookieConsentController' and 'cookieController'. It mimics the 'cookieController'.
 * The purpose of this controller is to convert old cookie consents to the new version after the cookie consent default domain has changed.
 * This handles the uncontrollable scenario where old users have consents stored to '*.hel.fi' and new version stores them to '<subdomain>.hel.fi'.
 * The 'document.cookie' would contain both versions in uncertain order. The 'cookie.parse()' returns only the first, which can be either.
 * This controller should fix all overlaps and always finds the last version user saved.
 * This can be removed later when old versions cookies have expired. The consent cookie has maxAge of one year, so a Q2/2025 is pretty safe quess.
 * This can be removed by replacing it with 'cookieController' in the 'cookieConsentController' and defining the domain passed to 'cookieController'.
 */

function createCookieFilterer(
  ...args: Parameters<typeof createCookieController>
): ReturnType<typeof createCookieController> {
  const [options, cookieName] = args;
  const domain = options.domain || getCookieDomainFromUrlForSubDomain();
  const cookieController = createCookieController({ ...options, domain }, cookieName);

  const isConsentCookie = (cookieData: string) => {
    return String(cookieData).trim().startsWith(cookieName);
  };

  const getConsentCookies = (): string[] => {
    const cookies = document.cookie || '';
    if (!cookies || cookies.indexOf('=') < 0) {
      return [];
    }
    const list = cookies.split(COOKIE_DELIMETER);
    return list
      .filter((cookieData) => isConsentCookie(cookieData))
      .map((cookieData) => decodeURIComponent(cookieData.trim()));
  };

  const getCookieDataVersions = (cookies: string[]): number[] => {
    return cookies.map((cookieData) => {
      const versionExecResult = String(cookieData).match(versionPickerRegExp) || [];
      const version = parseInt(versionExecResult[1] || '0', 10);
      return Number.isNaN(version) ? 0 : version;
    });
  };

  const clearedDomains = new Set();

  const clearCookie = (cookieDomain: string) => {
    if (clearedDomains.has(cookieDomain)) {
      return;
    }
    clearedDomains.add(cookieDomain);
    setNamedCookie(cookieName, '', {
      ...defaultCookieSetOptions,
      ...options,
      domain: cookieDomain,
      expires: new Date(0),
      maxAge: undefined,
    });
  };

  // Logic of the cookie filtering:
  // The old domain was by default *.hel.fi
  // If a custom domain has been used, it can only be <subdomain>.hel.fi
  // This is also the new default.
  // If a custom domain has been added/removed after cookies with old default domain are set, there might be two existing versions returned already; before even the new default was added.
  // If this is the case there are two cookies without version numbering in neither.
  // As a fail-safe, cookie in custom domain will be removed and versionless cookies are ignored, because there is no way to know which consents are newer.
  // In this case cookie consents are asked again.

  // Old version and new version cannot co-exist when this filterer is used. Old version is always converted to a new one immediately, if an old one without version numbering is found.
  // There should not be a scenario where old and new versions exist together, but that scenario is handled anyway.

  // Unhandled scenario: 'options.path' has been used. Cannot determine the used path and all possible variations should be removed. Cookies set with path should be removed manually.

  const consentCookies = getConsentCookies();
  const hasMultipleVersions = consentCookies.length > 1;
  const consentVersions = getCookieDataVersions(consentCookies);
  const currentVersionConsents = consentVersions.filter((v) => v === CURRENT_VERSION);
  const hasCurrentVersionConsents = currentVersionConsents.length > 0;
  const hasOldVersion = (consentVersions.length === 1 && !hasCurrentVersionConsents) || hasMultipleVersions;
  const hasConflictingVersions =
    hasMultipleVersions && (currentVersionConsents.length > 1 || currentVersionConsents.length === 0);
  const shouldConvertOld = !hasCurrentVersionConsents && hasOldVersion && !hasConflictingVersions; // two old versions are both removed, because cannot tell which one is newer
  const shouldRemoveOld = shouldConvertOld || (hasCurrentVersionConsents && hasOldVersion);
  const oldDefaultDomain = getCookieDomainFromUrlForMultiDomains();

  const getDataFromOldVersion = (): string => {
    const oldConsentsData = consentCookies.filter((data, index) => consentVersions[index] !== CURRENT_VERSION)[0];
    const data = oldConsentsData ? parse(`${oldConsentsData}${COOKIE_DELIMETER}`.trim()) : {};
    return data[cookieName] || '';
  };

  const convertOldConsentsToVersioned = () => {
    const consentData = getDataFromOldVersion();
    const dataWithVersion = addVersionNumber(parseConsents(consentData));
    cookieController.set(dataWithVersion);
  };

  if (hasConflictingVersions) {
    clearCookie(oldDefaultDomain);
    clearCookie(domain);
    if (options.domain) {
      clearCookie(options.domain);
    }
  } else if (shouldRemoveOld) {
    clearCookie(oldDefaultDomain);
  }

  if (shouldConvertOld) {
    // old is taken from 'consentVersions' array
    // so removing before this does not matter.
    convertOldConsentsToVersioned();
  }

  return {
    get: () => cookieController.get(),
    set: (data: CookieConsentData | string) => {
      const filteredData = typeof data === 'object' ? addVersionNumber(data, CURRENT_VERSION) : data;
      cookieController.set(filteredData);
    },
  };
}

export { createCookieFilterer };
