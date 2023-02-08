import React, { PropsWithChildren, MouseEventHandler } from 'react';

import { Logo } from '../../../logo';
import { LinkItem, LinkProps } from '../../../../internal/LinkItem';
import { useActiveLanguage } from '../../../../context/languageContext';
import { HeaderActionBarNavigationMenu } from './HeaderActionBarNavigationMenu';
import { useCallbackIfDefined, useEnterOrSpacePressCallback } from '../../../../utils/useCallback';
import { HeaderActionBarMenuItem } from '../headerActionBarItem';
import classNames from '../../../../utils/classNames';
import styles from './HeaderActionBar.module.scss';

import 'hds-core';

export enum TitleStyleType {
  normal = 'normal',
  bold = 'bold',
  black = 'black',
}

export type HeaderActionBarProps = PropsWithChildren<{
  /**
   * Additional class names to apply.
   */
  className?: string;

  /**
   * Service name that is displayed next to the Helsinki logo.
   */
  title: string;

  /**
   * Service name that is displayed next to the Helsinki logo.
   */
  titleStyle: TitleStyleType;

  /**
   * The aria-label for the title describing the logo and service to screen reader users.
   */
  titleAriaLabel?: string;
  logoAriaLabel?: string;

  /**
   * Callback fired when the title or logo is clicked
   */
  onTitleClick?: MouseEventHandler;
  onLogoClick?: MouseEventHandler;

  /**
   * The aria-label for the menu button to screen reader users.
   */
  menuButtonAriaLabel?: string;

  /**
   * Callback fired when the title or logo is clicked
   */
  onMenuButtonClick?: MouseEventHandler;

  /**
   * URL to navigate to when the logo or title is clicked
   */
  titleUrl?: string;
  logoUrl?: string;
}>;

export const HeaderActionBar = (props: HeaderActionBarProps) => {
  const {
    title,
    titleStyle = 'normal',
    titleAriaLabel,
    logoAriaLabel,
    menuButtonAriaLabel,
    titleUrl,
    logoUrl,
    onTitleClick,
    onLogoClick,
    onMenuButtonClick,
    children,
  } = props;
  const language = useActiveLanguage();
  const handleClick = useCallbackIfDefined(onTitleClick);
  const handleLogoClick = useCallbackIfDefined(onLogoClick);
  const handleKeyPress = useEnterOrSpacePressCallback(handleClick);
  const handleLogoKeyPress = useEnterOrSpacePressCallback(handleLogoClick);

  const logoProps: LinkProps = {
    'aria-label': logoAriaLabel,
    href: logoUrl,
    className: classNames(styles.titleAndLogoContainer, styles.logo),
    onClick: handleLogoClick,
    onKeyPress: handleLogoKeyPress,
  };

  const titleProps: LinkProps = {
    'aria-label': titleAriaLabel,
    href: titleUrl,
    className: classNames(styles.titleAndLogoContainer, styles.title, styles[titleStyle]),
    onClick: onTitleClick,
    onKeyPress: handleLogoKeyPress,
  };

  if (!(titleProps.href || titleProps.onClick)) {
    titleProps.role = titleAriaLabel && 'img';
  } else {
    titleProps.onKeyPress = handleKeyPress;
    titleProps.onClick = handleClick;
  }

  return (
    <>
      <div className={styles.headerActionBar}>
        <LinkItem {...logoProps}>
          <Logo className={styles.logo} language={language} aria-hidden />
        </LinkItem>
        {title && (
          <LinkItem {...titleProps}>
            <span className={classNames(styles.title)}>{title}</span>
          </LinkItem>
        )}
        <div className={styles.headerActions}>
          {children}
          <HeaderActionBarMenuItem onClick={onMenuButtonClick} ariaLabel={menuButtonAriaLabel} />
        </div>
      </div>
      <HeaderActionBarNavigationMenu />
    </>
  );
};

HeaderActionBar.defaultProps = {
  titleStyle: 'normal',
};
