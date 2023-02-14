import React, { PropsWithChildren, MouseEventHandler, ComponentType } from 'react';

import { styleBoundClassNames } from '../../../../utils/classNames';
import { Logo } from '../../../logo';
import { LinkItem, LinkProps } from '../../../../internal/LinkItem';
import { useActiveLanguage } from '../../../../context/languageContext';
import { HeaderActionBarNavigationMenu } from './HeaderActionBarNavigationMenu';
import { useCallbackIfDefined, useEnterOrSpacePressCallback } from '../../../../utils/useCallback';
import { HeaderActionBarMenuItem } from '../headerActionBarItem';
import styles from './HeaderActionBar.module.scss';

const classNames = styleBoundClassNames(styles);

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
   * The aria-label for the title describing the service to screen reader users.
   */
  titleAriaLabel?: string;

  /**
   * The aria-label for the logo to screen reader users.
   */
  logoAriaLabel?: string;

  /**
   * The aria-label for the menu button to screen reader users.
   */
  menuButtonAriaLabel?: string;

  /**
   * URL to navigate to when the title is clicked
   */
  titleUrl?: string;

  /**
   * URL to navigate to when the logo is clicked
   */
  logoUrl?: string;

  /**
   * Callback fired when the title is clicked
   */
  onTitleClick?: MouseEventHandler;

  /**
   * Callback fired when the logo is clicked
   */
  onLogoClick?: MouseEventHandler;

  /**
   * Callback fired when the menu button is clicked.
   * Call event.stopPropagation() to disable calling
   * the default menu toggling function.
   */
  onMenuButtonClick?: MouseEventHandler;
}>;

export const HeaderActionBar: ComponentType<HeaderActionBarProps> = (props) => {
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
    className,
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
      <div className={classNames(styles.headerActionBar, className)}>
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
