import React, { PropsWithChildren, createContext, useContext, useState } from 'react';

export type LanguageType = 'fi' | 'sv' | 'en' | 'ru';

export type LanguageContextProps = {
  activeLanguage: LanguageType;
  availableLanguages: Array<LanguageType>;
};

const LanguageContext = createContext<LanguageContextProps>({
  activeLanguage: 'en',
  availableLanguages: [],
});

const LanguageDispatchContext = createContext<(ln?: LanguageType) => void>(() => null);

export function LanguageProvider({
  children,
  defaultLanguage = 'en',
  availableLanguages = [],
}: PropsWithChildren<{
  defaultLanguage: LanguageType;
  availableLanguages: Array<LanguageType>;
}>) {
  const [activeLanguage, setActiveLanguage] = useState(defaultLanguage);

  const setLanguage = (language: LanguageType) => {
    if (availableLanguages.indexOf(language) === -1) throw new TypeError('Language not found in available languages');
    setActiveLanguage(language);
  };

  return (
    <LanguageContext.Provider
      value={{
        activeLanguage,
        availableLanguages,
      }}
    >
      <LanguageDispatchContext.Provider value={setLanguage}>{children}</LanguageDispatchContext.Provider>
    </LanguageContext.Provider>
  );
}

export function useActiveLanguage() {
  const { activeLanguage } = useContext(LanguageContext);
  return activeLanguage;
}

export function useSetLanguage() {
  return useContext(LanguageDispatchContext);
}
