import { useEffect } from 'react';

import { useCookieConsentContext } from '../contexts/CookieConsentContext';
import { CookieConsentReactType } from './useCookieConsent';

export type CookieSettingsPageProps = { settingsPageSelector?: string };
export type CookieSettingsPageReturnType = Pick<CookieConsentReactType, 'isReady' | 'consents' | 'settingsPageId'>;
export function useCookieSettingsPage({
  settingsPageSelector,
}: CookieSettingsPageProps = {}): CookieSettingsPageReturnType {
  const { isReady, renderPage, consents, settingsPageId, language, removePage, theme } = useCookieConsentContext();

  useEffect(() => {
    if (isReady) {
      renderPage(settingsPageSelector);
    }
    return () => {
      removePage();
    };
  }, [isReady, renderPage, settingsPageSelector, language, theme]);

  return {
    isReady,
    consents,
    settingsPageId,
  };
}
