import { CookieSerializeOptions, parse } from 'cookie';

import { isSsrEnvironment } from '../../utils/isSsrEnvironment';
import { createCookieController, setNamedCookie, defaultCookieSetOptions, getAll } from './cookieController';

export type CookieSetOptions = CookieSerializeOptions;

const COOKIE_DELIMETER = ';';
const CURRENT_VERSION = 1;
export const VERSION_COOKIE_NAME = 'city-of-helsinki-consent-version';

// the old version how default cookie domain was picked
function getCookieDomainForMultiDomainAccess(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.location.hostname.split('.').slice(-2).join('.');
}

// the new version how to pick default cookie domain
export function getCookieDomainForSubDomainAccess(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.location.hostname;
}

function getVersionNumber(cookies?: ReturnType<typeof parse>): number {
  const data = cookies || getAll();
  const version = data ? parseInt(data[VERSION_COOKIE_NAME], 10) : 0;
  return Number.isNaN(version) ? 0 : version;
}

/**
 * This is a proxy between 'cookieConsentController' and 'cookieController'. It mimics the 'cookieController'.
 * The purpose of this controller is to convert old cookie consents to the new version after the cookie consent default domain has changed.
 * This handles the uncontrollable scenario where old users have consents stored to '*.hel.fi' and new version stores them to '<subdomain>.hel.fi'.
 * The 'document.cookie' would contain both versions in uncertain order. The 'cookie.parse()' returns only the first, which can be either.
 * This proxy should fix all overlaps, because it moves old versions to new domain.
 */

export function createCookieStorageProxy(
  ...args: Parameters<typeof createCookieController>
): ReturnType<typeof createCookieController> {
  const [options, cookieName] = args;
  const domain = options.domain || getCookieDomainForSubDomainAccess();
  const controllerOptions = { ...options, domain };
  const cookieController = createCookieController(controllerOptions, cookieName);

  const isConsentCookie = (cookieData: unknown) => {
    return String(cookieData).trim().startsWith(cookieName);
  };

  const getConsentCookies = (): string[] => {
    if (isSsrEnvironment()) {
      return [];
    }
    const cookies = document.cookie || '';
    if (!cookies || cookies.indexOf('=') < 0) {
      return [];
    }
    return cookies.split(COOKIE_DELIMETER).filter((cookieData) => isConsentCookie(cookieData));
  };

  const getConsentData = (consentCookieList: string[]): string => {
    const consentData = consentCookieList[0];
    const data = consentData ? parse(`${consentData}${COOKIE_DELIMETER}`.trim()) : {};
    return data[cookieName] || '';
  };

  let hasVersionNumber = getVersionNumber() === CURRENT_VERSION;
  const storeVersionNumberIfNotSet = () => {
    if (hasVersionNumber) {
      return;
    }
    setNamedCookie(VERSION_COOKIE_NAME, String(CURRENT_VERSION), { ...defaultCookieSetOptions, ...controllerOptions });
    hasVersionNumber = true;
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

  const clearAllConsentCookieDomains = () => {
    clearCookie(getCookieDomainForMultiDomainAccess());
    clearCookie(getCookieDomainForSubDomainAccess());
    if (options.domain) {
      clearCookie(options.domain);
    }
  };

  // Logic of the cookie filtering:
  // The old domain was by default *.hel.fi
  // If a custom domain has been used, it can only be <subdomain>.hel.fi or still *.hel.fi
  // If a custom domain has been added/removed after cookies with old default domain are set, there might be two existing versions returned already; before even the new default was added.
  // If this is the case there are two cookies with consents.
  // As a fail-safe, if multiple consents are found they are all removed, because there is no way knowing which consents are latest.
  // In this case cookie consents are asked again.

  const consentCookies = getConsentCookies();
  const hasStoredConsents = consentCookies.length > 0;
  const hasMultipleVersions = consentCookies.length > 1;

  if (hasMultipleVersions) {
    clearAllConsentCookieDomains();
    cookieController.set('{}');
  } else if (!hasVersionNumber && hasStoredConsents) {
    clearCookie(getCookieDomainForMultiDomainAccess());
    if (hasStoredConsents) {
      const current = getConsentData(consentCookies);
      if (current) {
        cookieController.set(current);
      }
    }
  }

  return {
    get: () => cookieController.get(),
    set: (data: string) => {
      storeVersionNumberIfNotSet();
      cookieController.set(data);
    },
  };
}
