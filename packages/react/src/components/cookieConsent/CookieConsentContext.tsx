import React, { createContext, useContext, useMemo, useState } from 'react';

import createConsentController, { ConsentController, ConsentList, ConsentObject } from './cookieConsentController';
import { ContentSource, createContent } from './content.builder';
import { CookieConsentActionListener } from './types';

export type Description = {
  title: string;
  text: string;
};

export type TableData = {
  name: string;
  hostName: string;
  description: string;
  expiration: string;
};

export type CookieData = TableData & {
  id: string;
};

export type CookieGroup = Description & {
  expandAriaLabel: string;
  checkboxAriaDescription?: string;
  cookies: CookieData[];
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

export type Category = Description & {
  checkboxAriaDescription?: string;
  groups: CookieGroup[];
};

export type SupportedLanguage = 'fi' | 'sv' | 'en';

export type Content = {
  requiredCookies?: Category;
  optionalCookies?: Category;
  texts: {
    sections: SectionTexts;
    ui: UiTexts;
    tableHeadings: TableData;
  };
  language: {
    languageOptions: { code: SupportedLanguage; label: string }[];
    current: SupportedLanguage;
    languageSelectorAriaLabel: string;
    onLanguageChange: (newLanguage: string) => void;
  };
  onAllConsentsGiven?: (consents: ConsentObject) => void;
  onConsentsParsed?: (consents: ConsentObject, hasUserHandledAllConsents: boolean) => void;
};

export type CookieConsentContextType = {
  hasUserHandledAllConsents: () => boolean;
  content: Content;
  onAction: CookieConsentActionListener;
  countApprovedOptional: () => number;
  areGroupConsentsApproved: (consents: CookieData[]) => boolean;
};

type CookieConsentContextProps = {
  cookieDomain?: string;
  children: React.ReactNode | React.ReactNode[] | null;
  contentSource: ContentSource;
};

export const CookieConsentContext = createContext<CookieConsentContextType>({
  hasUserHandledAllConsents: () => false,
  content: {} as Content,
  onAction: () => undefined,
  countApprovedOptional: () => 0,
  areGroupConsentsApproved: () => false,
});

export const getConsentsFromCookieGroup = (groups: CookieGroup[]): ConsentList => {
  return groups.reduce((ids, currentGroup) => {
    currentGroup.cookies.forEach((consentData) => {
      ids.push(consentData.id);
    });
    return ids;
  }, []);
};

export const Provider = ({ cookieDomain, children, contentSource }: CookieConsentContextProps): React.ReactElement => {
  const language = contentSource.currentLanguage;
  const content = useMemo(() => {
    return createContent(contentSource);
  }, [language]);
  const requiredConsents = content.requiredCookies
    ? getConsentsFromCookieGroup(content.requiredCookies.groups)
    : undefined;
  const optionalConsents = content.optionalCookies
    ? getConsentsFromCookieGroup(content.optionalCookies.groups)
    : undefined;
  const consentController = useMemo(
    () => createConsentController({ requiredConsents, optionalConsents, cookieDomain }),
    [],
  );
  const hasUserHandledAllConsents = () =>
    consentController.getRequiredWithoutConsent().length === 0 && consentController.getUnhandledConsents().length === 0;

  const mergeConsents = () => ({
    ...consentController.getRequired(),
    ...consentController.getOptional(),
  });

  const [, forceUpdate] = useState<number>(0);
  const reRender = () => {
    forceUpdate((p) => p + 1);
  };

  const save = () => {
    consentController.save();
  };
  const notifyOnAllConsentsGiven = () => {
    if (content.onAllConsentsGiven && hasUserHandledAllConsents()) {
      content.onAllConsentsGiven(mergeConsents());
    }
  };
  const update: ConsentController['update'] = (key, value) => {
    consentController.update(key, value);
  };
  const setOptional = (approved: boolean) => {
    Object.keys(consentController.getOptional()).forEach((optionalConsent) => {
      update(optionalConsent, approved);
    });
  };
  const deselectOptional = () => {
    setOptional(false);
  };
  const selectOptional = () => {
    setOptional(true);
  };
  const approveRequiredAndSaveAllGivenConsents = () => {
    consentController.approveRequired();
    save();
    notifyOnAllConsentsGiven();
  };
  const approveAllAndSave: ConsentController['approveAll'] = () => {
    consentController.approveAll();
    save();
    notifyOnAllConsentsGiven();
  };
  const approveOnlyRequiredAndSave: ConsentController['approveRequired'] = () => {
    deselectOptional();
    consentController.approveRequired();
    save();
    notifyOnAllConsentsGiven();
  };

  const onAction: CookieConsentContextType['onAction'] = (action, consents, value) => {
    if (action === 'approveAll') {
      approveAllAndSave();
    } else if (action === 'approveRequired') {
      approveOnlyRequiredAndSave();
    } else if (action === 'approveSelectedAndRequired') {
      approveRequiredAndSaveAllGivenConsents();
    } else if (action === 'changeCookieGroupConsents') {
      consents.forEach((consent) => {
        update(consent, value);
      });
    } else if (action === 'approveOptional') {
      selectOptional();
    } else if (action === 'unapproveOptional') {
      deselectOptional();
    }
    reRender();
  };

  const countApprovedOptional: CookieConsentContextType['countApprovedOptional'] = () => {
    let counter = 0;
    let approved = 0;
    Object.values(consentController.getOptional()).forEach((isApproved) => {
      counter += 1;
      if (isApproved) {
        approved += 1;
      }
    });
    return approved / counter;
  };

  const areGroupConsentsApproved: CookieConsentContextType['areGroupConsentsApproved'] = (consentData) => {
    const optionalConsentList = consentController.getOptional();
    return !consentData.reduce((hasUnApprovedConsent, consent) => {
      return hasUnApprovedConsent || optionalConsentList[consent.id] !== true;
    }, false);
  };

  const contextData: CookieConsentContextType = {
    hasUserHandledAllConsents,
    content,
    onAction,
    countApprovedOptional,
    areGroupConsentsApproved,
  };
  if (content.onConsentsParsed) {
    content.onConsentsParsed(mergeConsents(), hasUserHandledAllConsents());
  }
  return <CookieConsentContext.Provider value={contextData}>{children}</CookieConsentContext.Provider>;
};

export const useCookieConsentContext = (): CookieConsentContextType => {
  return useContext(CookieConsentContext);
};

export const getCookieConsentContent = (context: CookieConsentContextType): Content => {
  return context.content;
};

export const useCookieConsentContent = (): Content => {
  const cookieConsentContext = useContext(CookieConsentContext);
  return getCookieConsentContent(cookieConsentContext);
};

export const useCookieConsentActions = (): CookieConsentContextType['onAction'] => {
  const cookieConsentContext = useContext(CookieConsentContext);
  return cookieConsentContext.onAction;
};

export const useCookieConsentUiTexts = (): UiTexts => {
  const content = useCookieConsentContent();
  return content.texts.ui;
};

export const useCookieConsentSectionTexts = (section: keyof SectionTexts): Description => {
  const content = useCookieConsentContent();
  return content.texts.sections[section];
};

export const useCookieConsentTableData = (): TableData => {
  const content = useCookieConsentContent();
  return content.texts.tableHeadings;
};

export const useCookieConsentLanguage = (): Content['language'] => {
  const content = useCookieConsentContent();
  return content.language;
};
