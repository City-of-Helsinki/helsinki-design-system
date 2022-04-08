import React, { createContext, useContext, useMemo, useState } from 'react';

import create, { ConsentController, ConsentList, ConsentObject } from './cookieConsentController';
import { CookieConsentActionListener } from './types';

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
  onAllConsentsGiven?: (consents: ConsentObject) => void;
  onConsentsParsed?: (consents: ConsentObject, hasUserHandledAllConsents: boolean) => void;
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
  onAction: CookieConsentActionListener;
  countApprovedOptional: () => number;
  areGroupConsentsApproved: (consents: ConsentData[]) => boolean;
};

type CookieConsentContextProps = {
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
  onAction: () => undefined,
  countApprovedOptional: () => 0,
  areGroupConsentsApproved: () => false,
});

export const getConsentsFromConsentGroup = (groups: ConsentGroup[]): ConsentList => {
  return groups.reduce((ids, currentGroup) => {
    currentGroup.consents.forEach((consentData) => {
      ids.push(consentData.id);
    });
    return ids;
  }, []);
};

export const Provider = ({ cookieDomain, children, content }: CookieConsentContextProps): React.ReactElement => {
  const requiredConsents = getConsentsFromConsentGroup(content.requiredConsents.groupList);
  const optionalConsents = getConsentsFromConsentGroup(content.optionalConsents.groupList);
  const consentController = useMemo(() => create({ requiredConsents, optionalConsents, cookieDomain }), []);

  const hasUserHandledAllConsents = () =>
    consentController.getRequiredWithoutConsent().length === 0 && consentController.getUnhandledConsents().length === 0;

  const [willRenderCookieConsentDialog, setWillRenderCookieConsentDialog] = useState<boolean>(
    !hasUserHandledAllConsents(),
  );

  const mergeConsents = () => ({
    ...consentController.getRequired(),
    ...consentController.getOptional(),
  });

  const [, forceUpdate] = useState<number>(0);
  const reRender = () => {
    forceUpdate((p) => p + 1);
  };

  const save = () => {
    const savedData = consentController.save();
    if (hasUserHandledAllConsents()) {
      setWillRenderCookieConsentDialog(false);
      if (content.onAllConsentsGiven) {
        content.onAllConsentsGiven(mergeConsents());
      }
      // setShowScreenReaderSaveNotification(true);
    }
    return savedData;
  };

  const getRequired: CookieConsentContextType['getRequired'] = () => consentController.getRequired();
  const getOptional: CookieConsentContextType['getOptional'] = () => consentController.getOptional();
  const update: CookieConsentContextType['update'] = (key, value) => {
    consentController.update(key, value);
  };
  const approveSelectedAndRequired = () => {
    consentController.approveRequired();
    save();
  };
  const approveAll: CookieConsentContextType['approveAll'] = () => {
    consentController.approveAll();
    save();
  };
  const approveRequired: CookieConsentContextType['approveRequired'] = () => {
    Object.keys(getOptional()).forEach((optionalConsent) => {
      update(optionalConsent, false);
    });
    approveRequired();
    save();
  };
  const setOptional = (approved: boolean) => {
    Object.keys(getOptional()).forEach((optionalConsent) => {
      update(optionalConsent, approved);
    });
  };

  const onAction: CookieConsentContextType['onAction'] = (action, consents, value) => {
    console.log('onAction:', action, consents, value);
    if (action === 'approveAll') {
      approveAll();
    } else if (action === 'approveRequired') {
      approveRequired();
    } else if (action === 'approveSelectedAndRequired') {
      approveSelectedAndRequired();
    } else if (action === 'changeConsentGroup') {
      consents.forEach((consent) => {
        update(consent, value);
      });
    } else if (action === 'approveOptional') {
      setOptional(true);
    } else if (action === 'unapproveOptional') {
      setOptional(false);
    }
    reRender();
  };

  const countApprovedOptional: CookieConsentContextType['countApprovedOptional'] = () => {
    let counter = 0;
    let approved = 0;
    Object.values(getOptional()).forEach((isApproved) => {
      counter += 1;
      if (isApproved) {
        approved += 1;
      }
    });
    return approved / counter;
  };

  const areGroupConsentsApproved: CookieConsentContextType['areGroupConsentsApproved'] = (consentData) => {
    // consentData
    const optionalConsentList = consentController.getOptional();
    return !consentData.reduce((hasUnApprovedConsent, consent) => {
      return hasUnApprovedConsent || optionalConsentList[consent.id] !== true;
    }, false);
  };

  const contextData: CookieConsentContextType = {
    getOptional,
    getRequired,
    approveAll,
    approveRequired,
    update,
    save,
    willRenderCookieConsentDialog,
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
