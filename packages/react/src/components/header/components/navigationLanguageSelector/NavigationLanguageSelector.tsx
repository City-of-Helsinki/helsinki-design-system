import React, { PropsWithChildren, useEffect } from 'react';

import {
  LanguageOption,
  useAvailableLanguages,
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
  /**
   * Mobile mode.
   * @internal
   */
  fullWidthForMobile?: boolean;
}>;

const LanguageButton = ({ value, label }: LanguageOption) => {
  const activeLanguage = useActiveLanguage();
  const setLanguage = useSetLanguage();
  const className = classNames(classes.item, { [classes.activeItem]: activeLanguage === value });
  const selectLanguage = withDefaultPrevented(() => setLanguage(value));

  return (
    <button key={value} lang={value} onClick={selectLanguage} type="button" className={className}>
      <span>{label}</span>
    </button>
  );
};

const renderLanguageNode = (language: LanguageOption) => {
  return <LanguageButton key={language.value} value={language.value} label={language.label} />;
};

export const NavigationLanguageSelector = ({
  children,
  languages,
  ariaLabel,
  fullWidthForMobile = false,
}: LanguageSelectorProps) => {
  const setAvailableLanguages = useSetAvailableLanguages();
  const { isNotLargeScreen, languageSelectorContent } = useHeaderContext();
  const { setLanguageSelectorContent } = useSetHeaderContext();

  const isRender = !languages;
  if (!isRender) {
    useEffect(() => {
      setAvailableLanguages(languages);
    }, [languages]);
  }

  if (children) {
    useEffect(() => {
      setLanguageSelectorContent(getChildElementsEvenIfContainersInbetween(children));
    }, [children]);
  }

  const languageNodes = (languages || useAvailableLanguages()).map(renderLanguageNode);
  // when its not large screen fullWidthForMobile -version can be used
  const show =
    isRender &&
    ((isNotLargeScreen && fullWidthForMobile) || (!isNotLargeScreen && !fullWidthForMobile)) &&
    Array.isArray(languageNodes) &&
    languageNodes.length;

  return (
    (show && (
      <div className={classNames(classes.languageSelector, { [classes.fullWidthForMobile]: fullWidthForMobile })}>
        <div className={classNames(classes.languageNodes)}>{languageNodes}</div>

        {languageSelectorContent && Array.isArray(languageSelectorContent) && languageSelectorContent.length ? (
          <HeaderActionBarItemWithDropdown
            id="language-selection-more"
            iconClassName={classes.languageSelectorDropdownIcon}
            dropdownClassName={classes.languageSelectorDropdown}
            label={<IconAngleDown aria-hidden />}
            closeLabel={<IconAngleUp aria-hidden />}
            icon={<IconGlobe aria-hidden />}
            closeIcon={<IconGlobe aria-hidden />}
            fullWidth={isNotLargeScreen}
            ariaLabel={ariaLabel}
            labelOnRight
          >
            {languageSelectorContent}
          </HeaderActionBarItemWithDropdown>
        ) : (
          <></>
        )}
      </div>
    )) || <></>
  );
};
