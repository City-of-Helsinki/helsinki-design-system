import { useEffect } from 'react';

import { useCookieConsentContext } from '../contexts/CookieConsentContext';
import { CookieConsentReactType } from './useCookieConsent';

export type CookieModalReturnType = Pick<CookieConsentReactType, 'isReady' | 'consents'>;

export function useCookieBanner(): CookieModalReturnType {
  const { isReady, openBannerIfNeeded, consents, language, theme } = useCookieConsentContext();
  useEffect(() => {
    if (isReady) {
      openBannerIfNeeded();
    }
  }, [isReady, openBannerIfNeeded, language, theme]);

  return {
    isReady,
    consents,
  };
}
