import React from 'react';

import { LanguageType, useActiveLanguage, useSetLanguage } from '../../../../context/languageContext';
import classNames from '../../../../utils/classNames';
import styles from './NavigationLanguageSelector.module.scss';

export type LanguageOption = {
  label: string;
  value: LanguageType;
};

export const NavigationLanguageSelector = ({ languages }: { languages: LanguageOption[] }) => {
  const activeLanguage = useActiveLanguage();
  const setLanguage = useSetLanguage();

  return (
    <div className={styles.languageSelector}>
      {languages.map((language) => {
        const className = classNames(styles.item, activeLanguage === language.value ? styles.activeItem : '');
        const selectLanguage = () => setLanguage(language.value);

        return (
          <button key={language.value} onClick={selectLanguage} type="button" className={className}>
            <span>{language.label}</span>
          </button>
        );
      })}
    </div>
  );
};
