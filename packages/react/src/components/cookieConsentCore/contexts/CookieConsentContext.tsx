import React, { createContext, useContext } from 'react';

import { useCookieConsent, CookieConsentReactProps, CookieConsentReactType } from '../hooks/useCookieConsent';

export type ContentContextType = CookieConsentReactType;

export type CookieConsentContextProps = CookieConsentReactProps & {
  children: React.ReactNode | React.ReactNode[] | null;
};

export const ContentContext = createContext<ContentContextType>({
  isReady: false,
  instance: null,
  consents: [],
  openBanner: () => Promise.reject(new Error("'openBanner' not initialized")),
  openBannerIfNeeded: () => Promise.reject(new Error("'openBannerIfNeeded' not initialized")),
  renderPage: () => Promise.reject(new Error("'renderPage' not initialized")),
  settingsPageId: '',
  language: '',
});

export const Provider = ({ children, ...rest }: CookieConsentContextProps): React.ReactElement => {
  const contextData = useCookieConsent({ ...rest });

  return <ContentContext.Provider value={contextData}>{contextData.isReady ? children : null}</ContentContext.Provider>;
};

export const useCookieContentContext = (): ContentContextType => {
  return useContext(ContentContext);
};

export const useCookieConsentsInstance = (): unknown => {
  const context = useCookieContentContext();
  return context.instance;
};

export const useCookieConsents = (): Array<{ group: string; consented: boolean }> => {
  const context = useCookieContentContext();
  return context.consents;
};

export const useGroupConsent = (groupName: string): boolean => {
  const consents = useCookieConsents();
  const groupConsent = consents.find((consent) => consent.group === groupName);
  return !!groupConsent && groupConsent.consented === true;
};
