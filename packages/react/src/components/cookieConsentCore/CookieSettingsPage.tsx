import React from 'react';

import { useCookieSettingsPage } from './hooks/useCookieSettingsPage';

export const CookieSettingsPage = () => {
  const { settingsPageId } = useCookieSettingsPage();

  return <div id={settingsPageId} />;
};
