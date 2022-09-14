import { useCookieConsentContext } from './contexts/ConsentContext';
import { useCookieContentContext } from './contexts/ContentContext';

export function useModalRenderChecker() {
  const consentContext = useCookieConsentContext();
  const contentContext = useCookieContentContext();
  const hasOnlyRequiredConsents = !contentContext.optionalCookies || contentContext.optionalCookies.groups.length === 0;
  return !hasOnlyRequiredConsents && !consentContext.hasUserHandledAllConsents();
}
