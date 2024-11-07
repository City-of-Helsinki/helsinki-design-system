import { useEffect } from 'react';

import { useCookieContentContext } from '../contexts/CookieConsentContext';
import { CookieConsentReactType } from './useCookieConsent';

export type CookieModalReturnType = Pick<CookieConsentReactType, 'isReady' | 'consents'>;

export function useCookieBanner(): CookieModalReturnType {
  const { isReady, openBannerIfNeeded, consents, language } = useCookieContentContext();
  useEffect(() => {
    if (isReady) {
      openBannerIfNeeded();
    }
  }, [isReady, openBannerIfNeeded, language]);

  return {
    isReady,
    consents,
  };
}
