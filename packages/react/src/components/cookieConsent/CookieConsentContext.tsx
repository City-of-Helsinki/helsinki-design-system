import React, { createContext, useContext, useMemo, useState } from 'react';

import create, { ConsentController, ConsentList, ConsentObject } from './cookieConsentController';

export type Description = {
  title: string;
  text: string;
};

export type TableData = {
  name: string;
  hostName: string;
  path: string;
  description: string;
  expiration: string;
};

export type ConsentData = TableData & {
  id: string;
};

export type ConsentGroup = Description & {
  expandAriaLabel: string;
  checkboxAriaLabel: string;
  consents: ConsentData[];
};

export type UiTexts = {
  showSettings: string;
  hideSettings: string;
  approveAllConsents: string;
  approveRequiredAndSelectedConsents: string;
  approveOnlyRequiredConsents: string;
  settingsSaved: string;
};

export type SectionTexts = {
  main: Description;
  details: Description;
};

export type RequiredOrOptionalConsentGroups = Description & {
  groupId: 'required' | 'optional';
  checkboxAriaLabel: string;
  groupList: ConsentGroup[];
};

export type Content = {
  requiredConsents?: RequiredOrOptionalConsentGroups;
  optionalConsents?: RequiredOrOptionalConsentGroups;
  texts: {
    sections: SectionTexts;
    ui: UiTexts;
    tableHeadings: TableData;
  };
  language: {
    languageOptions: { code: string; label: string }[];
    current: string;
    languageSelectorAriaLabel: string;
    onLanguageChange: (newLanguage: string) => void;
  };
};

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

type CookieConsentContextProps = {
  cookieDomain?: string;
  children: React.ReactNode | React.ReactNode[] | null;
  content: Content;
  onAllConsentsGiven?: (consents: ConsentObject) => void;
  onConsentsParsed?: (consents: ConsentObject, hasUserHandledAllConsents: boolean) => void;
  onLanguageChange: (newLanguage: string) => void;
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

const getConsentsFromConsentGroup = (groups: ConsentGroup[]): ConsentList => {
  return groups.reduce((ids, currentGroup) => {
    currentGroup.consents.forEach((consentData) => {
      ids.push(consentData.id);
    });
    return ids;
  }, []);
};

export const Provider = ({
  cookieDomain,
  onAllConsentsGiven = () => undefined,
  onConsentsParsed = () => undefined,
  children,
  content,
}: CookieConsentContextProps): React.ReactElement => {
  const requiredConsents = getConsentsFromConsentGroup(content.requiredConsents.groupList);
  const optionalConsents = getConsentsFromConsentGroup(content.optionalConsents.groupList);
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
