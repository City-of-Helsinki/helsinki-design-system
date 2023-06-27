import React, { PropsWithChildren, useEffect } from 'react';

import {
  LanguageOption,
  useActiveLanguage,
  useSetAvailableLanguages,
  useSetLanguage,
} from '../../../../context/languageContext';
import classNames from '../../../../utils/classNames';
import { getChildElementsEvenIfContainersInbetween } from '../../../../utils/getChildren';
import { withDefaultPrevented } from '../../../../utils/useCallback';
import { HeaderActionBarItemWithDropdown } from '../headerActionBarItem';
import { IconAngleDown, IconAngleUp, IconGlobe } from '../../../../icons';
import classes from './NavigationLanguageSelector.module.scss';
import { useHeaderContext, useSetHeaderContext } from '../../HeaderContext';

export type LanguageSelectorProps = PropsWithChildren<{
  /**
   * Array of languages as LanguageOption objects.
   */
  languages?: LanguageOption[];
  /**
   * Aria-label attribute for the dropdown button.
   */
  ariaLabel?: string;
  fullWidthForMobile?: boolean;
}>;

const LanguageButton = ({ language }) => {
  const activeLanguage = useActiveLanguage();
  const setLanguage = useSetLanguage();
  const className = classNames(classes.item, { [classes.activeItem]: activeLanguage === language.value });
  const selectLanguage = withDefaultPrevented(() => setLanguage(language.value));

  return (
    <button key={language.value} lang={language.value} onClick={selectLanguage} type="button" className={className}>
      <span>{language.label}</span>
    </button>
  );
};

const renderLanguageNode = (language: LanguageOption) => <LanguageButton key={language.value} language={language} />;

export const NavigationLanguageSelector = ({
  children,
  languages,
  ariaLabel,
  fullWidthForMobile = false,
}: LanguageSelectorProps) => {
  const setAvailableLanguages = useSetAvailableLanguages();
  const { isNotLargeScreen, languageSelectorContent } = useHeaderContext();
  const { setLanguageSelectorContent } = useSetHeaderContext();

  if (languages) {
    useEffect(() => {
      setAvailableLanguages(languages);
    }, [languages]);
  }

  if (children) {
    useEffect(() => {
      setLanguageSelectorContent(getChildElementsEvenIfContainersInbetween(children));
    }, [children]);
  }

  const languageNodes = languages ? languages.map(renderLanguageNode) : [];

  return (
    fullWidthForMobile === isNotLargeScreen && (
      <div className={classNames(classes.languageSelector, { [classes.fullWidthForMobile]: fullWidthForMobile })}>
        {languageNodes}

        <HeaderActionBarItemWithDropdown
          id="language-selection-more"
          iconClassName={classes.languageSelectorDropdownIcon}
          dropdownClassName={classes.languageSelectorDropdown}
          label={<IconAngleDown aria-hidden />}
          closeLabel={<IconAngleUp aria-hidden />}
          icon={IconGlobe}
          closeIcon={IconGlobe}
          fullWidth={isNotLargeScreen}
          ariaLabel={ariaLabel}
        >
          {languageSelectorContent}
        </HeaderActionBarItemWithDropdown>
      </div>
    )
  );
};
