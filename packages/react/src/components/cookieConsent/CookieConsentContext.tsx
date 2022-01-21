import React, { createContext, useContext, useMemo, useState } from 'react';

import create, { ConsentController, ConsentList, ConsentObject } from './cookieConsentController';

export type CookieConsentContextType = {
  getRequired: () => ConsentObject;
  getOptional: () => ConsentObject;
  update: ConsentController['update'];
  approveRequired: ConsentController['approveRequired'];
  approveAll: ConsentController['approveAll'];
  save: ConsentController['save'];
  willRenderCookieConsentDialog: boolean;
  hasUserHandledAllConsents: () => boolean;
  content: Content;
};

export type Content = {
  mainTitle: string;
  mainText: string;
  detailsTitle: string;
  detailsText: string;
  requiredConsentsTitle: string;
  requiredConsentsText: string;
  optionalConsentsTitle: string;
  optionalConsentsText: string;
  showSettings: string;
  hideSettings: string;
  approveAllConsents: string;
  approveRequiredAndSelectedConsents: string;
  approveOnlyRequiredConsents: string;
  settingsSaved: string;
  languageOptions: { code: string; label: string }[];
  language: string;
  languageSelectorAriaLabel: string;
  onLanguageChange: (newLanguage: string) => void;
  consents: {
    [x: string]: string;
  };
};

type CookieConsentContextProps = {
  optionalConsents?: ConsentList;
  requiredConsents?: ConsentList;
  cookieDomain?: string;
  children: React.ReactNode | React.ReactNode[] | null;
  content: Content;
  onAllConsentsGiven?: (consents: ConsentObject) => void;
  onConsentsParsed?: (consents: ConsentObject, hasUserHandledAllConsents: boolean) => void;
};

export const CookieConsentContext = createContext<CookieConsentContextType>({
  getRequired: () => ({}),
  getOptional: () => ({}),
  update: () => undefined,
  approveRequired: () => undefined,
  approveAll: () => undefined,
  save: () => ({}),
  hasUserHandledAllConsents: () => false,
  willRenderCookieConsentDialog: false,
  content: {} as Content,
});

export const Provider = ({
  optionalConsents,
  requiredConsents,
  cookieDomain,
  onAllConsentsGiven = () => undefined,
  onConsentsParsed = () => undefined,
  children,
  content,
}: CookieConsentContextProps): React.ReactElement => {
  const consentController = useMemo(() => create({ requiredConsents, optionalConsents, cookieDomain }), [
    requiredConsents,
    optionalConsents,
    cookieDomain,
  ]);

  const hasUserHandledAllConsents = () =>
    consentController.getRequiredWithoutConsent().length === 0 && consentController.getUnhandledConsents().length === 0;

  const [willRenderCookieConsentDialog, setWillRenderCookieConsentDialog] = useState<boolean>(
    !hasUserHandledAllConsents(),
  );

  const mergeConsents = () => ({
    ...consentController.getRequired(),
    ...consentController.getOptional(),
  });

  const contextData: CookieConsentContextType = {
    getRequired: () => consentController.getRequired(),
    getOptional: () => consentController.getOptional(),
    update: (key, value) => consentController.update(key, value),
    approveRequired: () => consentController.approveRequired(),
    approveAll: () => consentController.approveAll(),
    save: () => {
      const savedData = consentController.save();
      if (hasUserHandledAllConsents()) {
        setWillRenderCookieConsentDialog(false);
        onAllConsentsGiven(mergeConsents());
      }
      return savedData;
    },
    willRenderCookieConsentDialog,
    hasUserHandledAllConsents,
    content,
  };
  onConsentsParsed(mergeConsents(), hasUserHandledAllConsents());
  return <CookieConsentContext.Provider value={contextData}>{children}</CookieConsentContext.Provider>;
};

export const getCookieConsentContent = (context: CookieConsentContextType): Content => {
  return context.content;
};

export const useCookieConsentContent = (): Content => {
  const cookieConsentContext = useContext(CookieConsentContext);
  return getCookieConsentContent(cookieConsentContext);
};

export const useCookieConsentData = (): ((key: string, prop: 'title' | 'text') => string) => {
  const content = useCookieConsentContent();
  return (key, prop) => {
    const textKey = prop === 'title' ? `${key}Title` : `${key}Text`;
    return content.consents[textKey] || textKey;
  };
};
