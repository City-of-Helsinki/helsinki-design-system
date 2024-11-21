import React from 'react';

import { CookieConsentContextProvider } from '../contexts/CookieConsentContext';
import { CookieConsentReactProps } from '../hooks/useCookieConsent';
import { CookieBanner } from './CookieBanner';
import { CookieSettingsPage } from './CookieSettingsPage';

/*
 * This component is just to provide component for the CookieConsent.stories.tsx
 * export default {
 *   component: StoryComponent
 */

export const StoryComponent = (props: CookieConsentReactProps) => {
  return (
    <CookieConsentContextProvider {...props}>
      <CookieSettingsPage />
      <CookieBanner />
    </CookieConsentContextProvider>
  );
};
