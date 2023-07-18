import React, { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from 'react';

export const DEFAULT_LANGUAGE = 'fi';

export type LanguageType = string;
export type LanguageOption = {
  label: string;
  value: LanguageType;
};
export type LanguageContextType = {
  activeLanguage: LanguageType;
  availableLanguages: Array<LanguageType>;
};

export type LanguageDispatchContextType = {
  setLanguage: (ln?: LanguageType) => void;
  setAvailableLanguages: (languages: LanguageOption[]) => void;
};
export type LanguageProviderProps = PropsWithChildren<{
  defaultLanguage?: LanguageType;
  onDidChangeLanguage?: (string) => void;
}>;

const LanguageContext = createContext<LanguageContextType>({
  activeLanguage: DEFAULT_LANGUAGE,
  availableLanguages: [],
});
const LanguageDispatchContext = createContext<LanguageDispatchContextType>({
  setLanguage: () => null,
  setAvailableLanguages: () => null,
});

export function LanguageProvider({ children, defaultLanguage, onDidChangeLanguage }: LanguageProviderProps) {
  const [activeLanguage, setActiveLanguage] = useState(defaultLanguage);
  const [languageOptions, setAvailableLanguages] = useState<LanguageOption[]>([]);
  const availableLanguages = useRef<LanguageType[]>([]);

  useEffect(() => {
    availableLanguages.current = languageOptions.map((option) => option.value);
  }, [languageOptions]);

  useEffect(() => {
    if (onDidChangeLanguage) onDidChangeLanguage(activeLanguage);
  }, [activeLanguage]);

  const setLanguage = (language: LanguageType) => {
    if (availableLanguages.current.indexOf(language) === -1)
      throw new TypeError('Language not found in available languages');
    setActiveLanguage(language);
  };

  const languageContextValue = {
    activeLanguage,
    availableLanguages: availableLanguages.current,
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
