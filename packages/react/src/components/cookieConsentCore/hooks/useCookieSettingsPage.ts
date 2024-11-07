import { useEffect } from 'react';

import { useCookieContentContext } from '../contexts/CookieConsentContext';
import { CookieConsentReactType } from './useCookieConsent';

export type CookieSettingsPageProps = { settingsPageSelector?: string };
export type CookieSettingsPageReturnType = Pick<CookieConsentReactType, 'isReady' | 'consents' | 'settingsPageId'>;
export function useCookieSettingsPage({
  settingsPageSelector,
}: CookieSettingsPageProps = {}): CookieSettingsPageReturnType {
  const { isReady, renderPage, consents, settingsPageId, language, removePage } = useCookieContentContext();

  useEffect(() => {
    if (isReady) {
      renderPage(settingsPageSelector);
    }
    return () => {
      removePage();
    };
  }, [isReady, renderPage, settingsPageSelector, language]);

  return {
    isReady,
    consents,
    settingsPageId,
  };
}
