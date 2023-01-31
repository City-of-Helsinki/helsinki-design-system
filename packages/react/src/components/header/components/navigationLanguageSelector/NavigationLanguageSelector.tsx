import React, { useEffect } from 'react';

import {
  LanguageOption,
  useActiveLanguage,
  useSetAvailableLanguages,
  useSetLanguage,
} from '../../../../context/languageContext';
import classNames from '../../../../utils/classNames';
import { withDefaultPrevented } from '../../../../utils/useCallback';
import styles from './NavigationLanguageSelector.module.scss';

export const NavigationLanguageSelector = ({
  languages,
  onDidChangeLanguage,
}: {
  languages: LanguageOption[];
  onDidChangeLanguage?: (string) => void;
}) => {
  const activeLanguage = useActiveLanguage();
  const setAvailableLanguages = useSetAvailableLanguages();
  const setLanguage = useSetLanguage();

  useEffect(() => {
    setAvailableLanguages(languages);
  }, [languages]);

  useEffect(() => {
    if (onDidChangeLanguage) onDidChangeLanguage(activeLanguage);
  }, [activeLanguage]);

  return (
    <div className={styles.languageSelector}>
      {languages.map((language) => {
        const className = classNames(styles.item, { [styles.activeItem]: activeLanguage === language.value });
        const selectLanguage = withDefaultPrevented(() => setLanguage(language.value));

        return (
          <button key={language.value} onClick={selectLanguage} type="button" className={className}>
            <span>{language.label}</span>
          </button>
        );
      })}
    </div>
  );
};
