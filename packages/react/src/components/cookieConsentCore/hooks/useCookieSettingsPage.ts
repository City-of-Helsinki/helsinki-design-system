import { useEffect } from 'react';

import { useCookieContentContext } from '../contexts/ConsentContext';
import { CookieConsentReactType } from './useCookieConsent';

export type CookieSettingsPageProps = { settingsPageSelector?: string };
export type CookieSettingsPageReturnType = Pick<CookieConsentReactType, 'isReady' | 'consents' | 'settingsPageId'>;
export function useCookieSettingsPage({
  settingsPageSelector,
}: CookieSettingsPageProps = {}): CookieSettingsPageReturnType {
  const { isReady, renderPage, consents, settingsPageId, language } = useCookieContentContext();

  useEffect(() => {
    if (isReady) {
      renderPage(settingsPageSelector);
    }
  }, [isReady, renderPage, settingsPageSelector, language]);

  return {
    isReady,
    consents,
    settingsPageId,
  };
}
