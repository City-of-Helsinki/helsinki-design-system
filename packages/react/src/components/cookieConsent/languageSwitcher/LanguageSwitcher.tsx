import React from 'react';

import { useContentLanguage } from '../contexts/ContentContext';
import { Navigation } from '../../navigation/Navigation';
import styles from '../CookieConsent.module.scss';

export function LanguageSwitcher(): React.ReactElement {
  const languageSelectorId = 'cookie-consent-language-selector';
  const { current, languageOptions, languageSelectorAriaLabel, onLanguageChange } = useContentLanguage();
  const setLanguage = (code: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (code === current) {
      const languageMenuButton = document.getElementById(`${languageSelectorId}-button`);
      if (languageMenuButton) {
        languageMenuButton.focus();
      }
      return;
    }
    onLanguageChange(code);
  };
  const currentOption = languageOptions.find((option) => option.code === current);
  return (
    <Navigation.LanguageSelector
      label={currentOption.label}
      buttonAriaLabel={languageSelectorAriaLabel}
      className={styles.languageSelectorOverride}
      id={languageSelectorId}
    >
      {languageOptions.map((option) => (
        <Navigation.Item
          href="#"
          onClick={(e: React.MouseEvent) => setLanguage(option.code, e)}
          label={option.label}
          active={current === option.code}
          key={option.code}
          lang={option.code}
          data-testid={`cookie-consent-language-option-${option.code}`}
        />
      ))}
    </Navigation.LanguageSelector>
  );
}
