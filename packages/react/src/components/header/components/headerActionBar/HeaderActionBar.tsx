import React, { PropsWithChildren, MouseEventHandler } from 'react';

import { styleBoundClassNames } from '../../../../utils/classNames';
import { Logo } from '../../../logo';
import { LinkItem, LinkProps } from '../../../../internal/LinkItem';
import { HeaderActionBarNavigationMenu } from './HeaderActionBarNavigationMenu';
import { HeaderLanguageSelector } from '../headerLanguageSelector';
import { useCallbackIfDefined, useEnterOrSpacePressCallback } from '../../../../utils/useCallback';
import { HeaderActionBarMenuItem } from '../headerActionBarItem';
import styles from './HeaderActionBar.module.scss';

const classNames = styleBoundClassNames(styles);

export enum TitleStyleType {
  Normal = 'normal',
  Bold = 'bold',
}

export type HeaderActionBarProps = PropsWithChildren<{
  /**
   * Aria-label for describing ActionBar.
   */
  ariaLabel?: string;
  /**
   * Additional class names to apply.
   */
  className?: string;
  /**
   * Service name that is displayed next to the Helsinki logo.
   */
  title: string;
  /**
   * Style for title.
   */
  titleStyle?: TitleStyleType;
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
   * Link for the title.
   */
  titleHref?: string;
  /**
   * Logo to use
   */
  logo: React.ReactElement<typeof Logo>;
  /**
   * URL to navigate to when the logo is clicked
   */
  logoHref?: string;
  /**
   * Callback fired when the title is clicked.
   */
  onTitleClick?: MouseEventHandler;
  /**
   * Callback fired when the logo is clicked.
   */
  onLogoClick?: MouseEventHandler;
  /**
   * Callback fired when the menu button is clicked.
   * Call event.stopPropagation() to disable calling
   * the default menu toggling function.
   */
  onMenuButtonClick?: MouseEventHandler;
  /**
   * ARIA role to describe the contents.
   */
  role?: string;
}>;

export const HeaderActionBar = ({
  title,
  titleStyle,
  titleAriaLabel,
  logoAriaLabel,
  menuButtonAriaLabel,
  titleHref,
  logoHref,
  logo,
  onTitleClick,
  onLogoClick,
  onMenuButtonClick,
  children,
  className,
  ariaLabel,
  role,
}: HeaderActionBarProps) => {
  const handleClick = useCallbackIfDefined(onTitleClick);
  const handleLogoClick = useCallbackIfDefined(onLogoClick);
  const handleKeyPress = useEnterOrSpacePressCallback(handleClick);
  const handleLogoKeyPress = useEnterOrSpacePressCallback(handleLogoClick);

  const logoProps: LinkProps = {
    'aria-label': logoAriaLabel,
    href: logoHref,
    className: classNames(styles.titleAndLogoContainer, styles.logo),
    onClick: handleLogoClick,
    onKeyPress: handleLogoKeyPress,
  };

  const titleProps: LinkProps = {
    'aria-label': titleAriaLabel,
    href: titleHref,
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

  const childrenLeft = Array.isArray(children)
    ? children.filter((item) => React.isValidElement(item) && !item.props.fixedRightPosition)
    : [children];
  const childrenRight = Array.isArray(children)
    ? children.filter((item) => React.isValidElement(item) && !!item.props.fixedRightPosition)
    : [];

  return (
    <>
      <div className={styles.headerActionBarContainer}>
        <div className={classNames(styles.headerActionBar, className)} role={role} aria-label={ariaLabel}>
          <LinkItem {...logoProps}>
            {logoProps?.href ? <span className={styles.logoWrapper}>{logo}</span> : logo}
          </LinkItem>
          {title && (
            <LinkItem {...titleProps}>
              <span className={classNames(styles.title)}>{title}</span>
            </LinkItem>
          )}
          <div className={styles.headerActions}>
            <HeaderLanguageSelector />
            {childrenLeft}
            <HeaderActionBarMenuItem onClick={onMenuButtonClick} ariaLabel={menuButtonAriaLabel} />
            {childrenRight.length > 0 && (
              <>
                <hr />
                {childrenRight}
              </>
            )}
          </div>
        </div>
      </div>
      <HeaderLanguageSelector fullWidthForMobile />
      <HeaderActionBarNavigationMenu />
    </>
  );
};

HeaderActionBar.defaultProps = {
  titleStyle: TitleStyleType.Normal,
};
