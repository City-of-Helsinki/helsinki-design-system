import React, { PropsWithChildren, useEffect } from 'react';

import {
  LanguageOption,
  useActiveLanguage,
  useSetAvailableLanguages,
  useSetLanguage,
} from '../../../../context/languageContext';
import classNames from '../../../../utils/classNames';
import { withDefaultPrevented } from '../../../../utils/useCallback';
import { HeaderActionBarItemWithDropdown } from '../headerActionBarItem';
import { IconAngleDown, IconAngleUp, IconGlobe } from '../../../../icons';
import classes from './NavigationLanguageSelector.module.scss';
import { useHeaderContext } from '../../HeaderContext';

export type LanguageSelectorProps = PropsWithChildren<{
  languages: LanguageOption[];
}>;

const LanguageButton = ({ language }) => {
  const activeLanguage = useActiveLanguage();
  const setLanguage = useSetLanguage();
  const className = classNames(classes.item, { [classes.activeItem]: activeLanguage === language.value });
  const selectLanguage = withDefaultPrevented(() => setLanguage(language.value));

  return (
    <button key={language.value} onClick={selectLanguage} type="button" className={className}>
      <span>{language.label}</span>
    </button>
  );
};

const renderLanguageNode = (language: LanguageOption) => <LanguageButton key={language.value} language={language} />;

export const NavigationLanguageSelector = ({ children, languages }: LanguageSelectorProps) => {
  const setAvailableLanguages = useSetAvailableLanguages();
  const { isNotLargeScreen } = useHeaderContext();

  useEffect(() => {
    setAvailableLanguages(languages);
  }, [languages]);

  const languageNodes = languages.map(renderLanguageNode);

  return (
    <div className={classes.languageSelector}>
      {!isNotLargeScreen && languageNodes}

      <HeaderActionBarItemWithDropdown
        id="language-selection-more"
        iconClassName={classes.languageSelectorDropdownIcon}
        dropdownClassName={classes.languageSelectorDropdown}
        label={<IconAngleDown />}
        closeLabel={<IconAngleUp />}
        icon={IconGlobe}
        closeIcon={IconGlobe}
      >
        {isNotLargeScreen && languageNodes}
        {children}
      </HeaderActionBarItemWithDropdown>
    </div>
  );
};
