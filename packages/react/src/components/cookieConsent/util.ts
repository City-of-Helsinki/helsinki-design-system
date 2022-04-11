import { getConsentsFromConsentGroup, RequiredOrOptionalConsentGroups } from './CookieConsentContext';
import { getConsentsFromCookie } from './cookieConsentController';

export function getConsentStatus(consent: string, cookieDomain?: string): boolean | undefined {
  const cookies = getConsentsFromCookie(cookieDomain);
  return cookies[consent];
}

export function hasHandledAllConsents(
  requiredConsents: string[] | RequiredOrOptionalConsentGroups,
  optionalConsents: string[] | RequiredOrOptionalConsentGroups,
  cookieDomain?: string,
): boolean | undefined {
  const requiredConsentsAsArray: string[] = Array.isArray(requiredConsents)
    ? requiredConsents
    : getConsentsFromConsentGroup(requiredConsents.groupList);
  const optionalConsentsAsArray: string[] = Array.isArray(optionalConsents)
    ? optionalConsents
    : getConsentsFromConsentGroup(optionalConsents.groupList);
  const cookies = getConsentsFromCookie(cookieDomain);
  const requiredWithoutConsent = requiredConsentsAsArray.filter((consent) => cookies[consent] !== true);
  const unhandledOptionalConsents = optionalConsentsAsArray.filter((consent) => cookies[consent] === undefined);
  return requiredWithoutConsent.length === 0 && unhandledOptionalConsents.length === 0;
}
