import React, { PropsWithChildren } from 'react';

import { LanguageOption, useActiveLanguage, useAvailableLanguages, useSetLanguage } from '../../LanguageContext';
import classNames from '../../../../utils/classNames';
import { withDefaultPrevented } from '../../../../utils/useCallback';
import { HeaderActionBarItemWithDropdown } from '../headerActionBarItem';
import { IconAngleDown, IconAngleUp, IconGlobe } from '../../../../icons';
import classes from './HeaderLanguageSelector.module.scss';
import { useHeaderContext } from '../../HeaderContext';
import { getComponentFromChildren } from '../../../../utils/getChildren';

type LanguageSelectorComponentProps = {
  /**
   * Aria-label attribute for the dropdown button.
   */
  ariaLabel?: string;
};

export type LanguageSelectorProps = PropsWithChildren<LanguageSelectorComponentProps>;

type LanguageSelectorConsumerProps = LanguageSelectorProps & {
  /**
   * Mobile mode.
   * @internal
   */
  // eslint-disable-next-line react/no-unused-prop-types
  fullWidthForMobile?: boolean;
};

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

export function HeaderLanguageSelector(props: LanguageSelectorProps) {
  // This is a dummy component used for passing language selector props and children.
  // Those are extracted in <HeaderActionBar /> and rendered with <HeaderLanguageSelectorConsumer />

  // use props in some way to avoid ts-error
  return props ? null : null;
}

HeaderLanguageSelector.componentName = 'HeaderLanguageSelector';

export const HeaderLanguageSelectorConsumer = ({
  children,
  ariaLabel,
  fullWidthForMobile = false,
}: LanguageSelectorConsumerProps) => {
  const { isNotLargeScreen } = useHeaderContext();
  const languageNodes = useAvailableLanguages().map(renderLanguageNode);
  // when its not large screen fullWidthForMobile -version can be used
  const show =
    ((isNotLargeScreen && fullWidthForMobile) || (!isNotLargeScreen && !fullWidthForMobile)) &&
    Array.isArray(languageNodes) &&
    languageNodes.length > 0;

  if (!show) {
    return null;
  }
  return (
    <div className={classNames(classes.languageSelector, { [classes.fullWidthForMobile]: fullWidthForMobile })}>
      <div className={classNames(classes.languageNodes)}>{languageNodes}</div>
      {children && Array.isArray(children) && children.length ? (
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
          {children}
        </HeaderActionBarItemWithDropdown>
      ) : (
        <></>
      )}
    </div>
  );
};

const getLanguageSelectorComponent = (childList?: React.ReactNode): React.ReactNode | undefined => {
  const component = getComponentFromChildren(childList, HeaderLanguageSelector.componentName);
  return component[0] && component[0][0];
};

export const getLanguageSelectorComponentProps = (
  childList?: React.ReactNode,
): { props?: LanguageSelectorComponentProps; children?: React.ReactNode; componentExists: boolean } => {
  const component = getLanguageSelectorComponent(childList) as React.ReactElement<LanguageSelectorProps>;
  const { children, ...props } = (component && component.props) || {};
  return {
    children,
    props,
    componentExists: !!component,
  };
};
