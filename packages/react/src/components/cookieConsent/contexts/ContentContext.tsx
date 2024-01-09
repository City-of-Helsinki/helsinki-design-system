import React, { createContext, useContext, useMemo } from 'react';

import { CookieContentSource, createContent } from '../content.builder';
import { ConsentObject } from '../cookieConsentController';

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
  readMore: string;
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
  focusTargetSelector?: string;
};

export type ContentContextType = Content & {
  callbacks: Callbacks;
};

export type Callbacks = {
  onAllConsentsGiven?: (consents: ConsentObject) => void;
  onConsentsParsed?: (consents: ConsentObject, hasUserHandledAllConsents: boolean) => void;
};

/* eslint-disable */
type ConsentContextProps = {
  cookieDomain?: string;
  children: React.ReactNode | React.ReactNode[] | null;
  contentSource: CookieContentSource;
};
/* eslint-enable */

export const ContentContext = createContext<ContentContextType>({
  ...({ language: {}, texts: {} } as Content),
  callbacks: {},
});

export const forceFocusToElement = (elementSelector: string): void => {
  const focusTarget = document.querySelector(elementSelector) as HTMLElement;
  if (focusTarget && focusTarget.focus) {
    focusTarget.focus();
    if (document.activeElement !== focusTarget) {
      focusTarget.setAttribute('tabindex', '-1');
      focusTarget.focus();
    }
  }
};

export const Provider = ({ children, contentSource, cookieDomain }: ConsentContextProps): React.ReactElement => {
  const language = contentSource.currentLanguage;
  const contextData: ContentContextType = useMemo(() => {
    const content = createContent(contentSource, cookieDomain);
    const callbacks = {
      onAllConsentsGiven: contentSource.onAllConsentsGiven,
      onConsentsParsed: contentSource.onConsentsParsed,
    };
    return {
      ...content,
      callbacks,
    };
  }, [language]);

  return <ContentContext.Provider value={contextData}>{children}</ContentContext.Provider>;
};

export const useCookieContentContext = (): ContentContextType => {
  return useContext(ContentContext);
};

export const useUiTexts = (): UiTexts => {
  const content = useCookieContentContext();
  return content.texts.ui;
};

export const useSectionTexts = (section: keyof SectionTexts): Description => {
  const content = useCookieContentContext();
  return content.texts.sections[section];
};

export const useTableData = (): TableData => {
  const content = useCookieContentContext();
  return content.texts.tableHeadings;
};

export const useContentLanguage = (): Content['language'] => {
  const content = useCookieContentContext();
  return content.language;
};
