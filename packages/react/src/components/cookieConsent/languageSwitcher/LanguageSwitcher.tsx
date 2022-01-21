import React from 'react';

import { useCookieConsentContent } from '../CookieConsentContext';
import { Navigation } from '../../navigation/Navigation';
import styles from '../CookieConsent.module.scss';

function LanguageSwitcher(): React.ReactElement {
  const { onLanguageChange, language, languageOptions, languageSelectorAriaLabel } = useCookieConsentContent();
  const setLanguage = (code: string, e: React.MouseEvent) => {
    e.preventDefault();
    onLanguageChange(code);
  };
  const currentOption = languageOptions.find((option) => option.code === language);
  return (
    <Navigation.LanguageSelector
      label={currentOption.label}
      buttonAriaLabel={languageSelectorAriaLabel}
      className={styles['language-selector-override']}
      id="cookie-consent-language-selector"
    >
      {languageOptions.map((option) => (
        <Navigation.Item
          href="#"
          onClick={(e: React.MouseEvent) => setLanguage(option.code, e)}
          label={option.label}
          active={language === option.code}
          key={option.code}
          lang={option.code}
        />
      ))}
    </Navigation.LanguageSelector>
  );
}
export default LanguageSwitcher;
