import React from 'react';

import { useCookieConsentLanguage } from '../CookieConsentContext';
import { Navigation } from '../../navigation/Navigation';
import styles from '../CookieConsent.module.scss';

function LanguageSwitcher(): React.ReactElement {
  const { current, languageOptions, languageSelectorAriaLabel, onLanguageChange } = useCookieConsentLanguage();
  const setLanguage = (code: string, e: React.MouseEvent) => {
    e.preventDefault();
    onLanguageChange(code);
  };
  const currentOption = languageOptions.find((option) => option.code === current);
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
          active={current === option.code}
          key={option.code}
          lang={option.code}
        />
      ))}
    </Navigation.LanguageSelector>
  );
}
export default LanguageSwitcher;
