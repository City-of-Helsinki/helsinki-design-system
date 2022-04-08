import { getConsentsFromCookie } from './cookieConsentController';

export function getConsentStatus(consent: string, cookieDomain?: string): boolean | undefined {
  const cookies = getConsentsFromCookie(cookieDomain);
  return cookies[consent];
}

export function hasHandledAllConsents(
  requiredConsents: string[],
  optionalConsents: string[],
  cookieDomain?: string,
): boolean | undefined {
  const cookies = getConsentsFromCookie(cookieDomain);
  const requiredWithoutConsent = requiredConsents.filter((consent) => cookies[consent] !== true);
  const unhandledOptionalConsents = optionalConsents.filter((consent) => cookies[consent] !== true);
  return requiredWithoutConsent.length === 0 && unhandledOptionalConsents.length === 0;
}
