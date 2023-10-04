import React from 'react';

import { useContentLanguage } from '../contexts/ContentContext';
import styles from '../CookieConsent.module.scss';
import classNames from '../../../utils/classNames';
import { MenuButton } from '../../../internal/menuButton/MenuButton';
import { LanguageSwitcherItem } from './LanguageSwitcherItem/LanguageSwitcherItem';

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
    <MenuButton
      className={classNames(styles.languageDropdown)}
      id={languageSelectorId}
      label={currentOption.label}
      menuOffset={10}
      buttonAriaLabel={languageSelectorAriaLabel}
      closeOnItemClick
    >
      {languageOptions.map((option) => (
        <LanguageSwitcherItem
          href="#"
          onClick={(e: React.MouseEvent) => setLanguage(option.code, e)}
          label={option.label}
          active={current === option.code}
          key={option.code}
          lang={option.code}
          data-testid={`cookie-consent-language-option-${option.code}`}
        />
      ))}
    </MenuButton>
  );
}
