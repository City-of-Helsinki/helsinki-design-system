import { useContext } from 'react';

import { CookieConsentContext } from './CookieConsentContext';

export function useModalRenderChecker() {
  const cookieConsentContext = useContext(CookieConsentContext);
  const hasOnlyRequiredConsents =
    !cookieConsentContext.content.optionalCookies || cookieConsentContext.content.optionalCookies.groups.length === 0;
  return !hasOnlyRequiredConsents && !cookieConsentContext.hasUserHandledAllConsents();
}
