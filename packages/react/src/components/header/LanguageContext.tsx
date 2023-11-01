import React, { PropsWithChildren, createContext, useContext, useState } from 'react';

export const DEFAULT_LANGUAGE = 'fi';

export type LanguageType = string;
export type LanguageOption = {
  label: string;
  value: LanguageType;
  isPrimary?: boolean;
};
export type LanguageContextType = {
  activeLanguage: LanguageType;
  availableLanguages: Array<LanguageOption>;
};

export type LanguageDispatchContextType = {
  setLanguage: (ln?: LanguageType) => void;
  setAvailableLanguages: (languages: LanguageOption[]) => void;
};
export type LanguageProviderProps = PropsWithChildren<{
  defaultLanguage?: LanguageType;
  onDidChangeLanguage?: (newLanguage: string) => void;
  languages?: LanguageOption[];
}>;

const LanguageContext = createContext<LanguageContextType>({
  activeLanguage: DEFAULT_LANGUAGE,
  availableLanguages: [],
});
const LanguageDispatchContext = createContext<LanguageDispatchContextType>({
  setLanguage: () => undefined,
  setAvailableLanguages: () => undefined,
});

export function LanguageProvider({ children, defaultLanguage, onDidChangeLanguage, languages }: LanguageProviderProps) {
  const [activeLanguage, setActiveLanguage] = useState(defaultLanguage);
  const [languageOptions, setLanguageOptions] = useState<LanguageOption[]>(languages || []);

  const setLanguage = (language: LanguageType) => {
    if (activeLanguage === language) {
      return;
    }
    if (languageOptions.map((option) => option.value).indexOf(language) === -1)
      throw new TypeError('Language not found in available languages');
    setActiveLanguage(language);
    if (onDidChangeLanguage) onDidChangeLanguage(language);
  };
  const setAvailableLanguages = (newLanguages: LanguageOption[]) => {
    setLanguageOptions(newLanguages);
  };

  const languageContextValue = {
    activeLanguage,
    availableLanguages: languageOptions,
  };

  return (
    <LanguageContext.Provider value={languageContextValue}>
      <LanguageDispatchContext.Provider value={{ setLanguage, setAvailableLanguages }}>
        {children}
      </LanguageDispatchContext.Provider>
    </LanguageContext.Provider>
  );
}

LanguageProvider.defaultProps = {
  defaultLanguage: DEFAULT_LANGUAGE,
};

/**
 * Hook for getting currently active language
 * @returns language code for the currently active language.
 */
export function useActiveLanguage() {
  const { activeLanguage } = useContext(LanguageContext);
  return activeLanguage;
}

/**
 * Hook for setting currently active language
 * @returns function for setting active language.
 */
export function useSetLanguage() {
  const { setLanguage } = useContext(LanguageDispatchContext);
  return setLanguage;
}

/**
 * Hook for setting available languages
 * @returns function for setting available languages.
 */
export function useSetAvailableLanguages() {
  const { setAvailableLanguages } = useContext(LanguageDispatchContext);
  return setAvailableLanguages;
}

/**
 * Hook for getting available languages
 * @returns
 */
export function useAvailableLanguages() {
  const { availableLanguages } = useContext(LanguageContext);
  return availableLanguages;
}
