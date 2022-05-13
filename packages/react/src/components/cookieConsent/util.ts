import { getConsentsFromCookieGroup, Category } from './CookieConsentContext';
import { getConsentsFromCookie } from './cookieConsentController';

export function getConsentStatus(consent: string, cookieDomain?: string): boolean | undefined {
  const cookies = getConsentsFromCookie(cookieDomain);
  return cookies[consent];
}

export function hasHandledAllConsents(
  requiredConsents: string[] | Category,
  optionalConsents: string[] | Category,
  cookieDomain?: string,
): boolean | undefined {
  const requiredConsentsAsArray: string[] = Array.isArray(requiredConsents)
    ? requiredConsents
    : getConsentsFromCookieGroup(requiredConsents.groups);
  const optionalConsentsAsArray: string[] = Array.isArray(optionalConsents)
    ? optionalConsents
    : getConsentsFromCookieGroup(optionalConsents.groups);
  const cookies = getConsentsFromCookie(cookieDomain);
  const requiredWithoutConsent = requiredConsentsAsArray.filter((consent) => cookies[consent] !== true);
  const unhandledOptionalConsents = optionalConsentsAsArray.filter((consent) => cookies[consent] === undefined);
  return requiredWithoutConsent.length === 0 && unhandledOptionalConsents.length === 0;
}
