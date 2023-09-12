import React, { PropsWithChildren, MouseEventHandler, useMemo } from 'react';

import { styleBoundClassNames } from '../../../../utils/classNames';
import { Logo } from '../../../logo';
import { LinkItem, LinkProps } from '../../../../internal/LinkItem';
import { HeaderActionBarNavigationMenu } from './HeaderActionBarNavigationMenu';
import { HeaderLanguageSelectorConsumer, getLanguageSelectorComponentProps } from '../headerLanguageSelector';
import { useCallbackIfDefined, useEnterOrSpacePressCallback } from '../../../../utils/useCallback';
import { HeaderActionBarMenuItem } from '../headerActionBarItem';
import styles from './HeaderActionBar.module.scss';
import HeaderActionBarLogo from './HeaderActionBarLogo';
import { getChildElementsEvenIfContainersInbetween } from '../../../../utils/getChildren';

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
   * Label for front page link in mobile navigation menu.
   */
  frontPageLabel: string;
  /**
   * Logo to use
   */
  logo: React.ReactElement<typeof Logo>;
  /**
   * The aria-label for the logo to screen reader users.
   */
  logoAriaLabel?: string;
  /**
   * Link for the logo.
   */
  logoHref?: string;
  /**
   * The aria-label for the menu button to screen reader users.
   */
  menuButtonAriaLabel?: string;
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
   * Callback fired when the title is clicked.
   */
  onTitleClick?: MouseEventHandler;
  /**
   * ARIA role to describe the contents.
   */
  role?: string;
  /**
   * Service name that is displayed next to the Helsinki logo.
   */
  title: string;
  /**
   * The aria-label for the title describing the service to screen reader users.
   */
  titleAriaLabel?: string;
  /**
   * Link for the title.
   */
  titleHref: string;
  /**
   * Style for title.
   */
  titleStyle?: TitleStyleType;
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
  frontPageLabel,
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
  const { children: lsChildren, props: lsProps, componentExists } = getLanguageSelectorComponentProps(children);
  const languageSelectorChildren = useMemo(() => {
    return lsChildren ? getChildElementsEvenIfContainersInbetween(lsChildren) : null;
  }, [lsChildren]);
  return (
    <>
      <div className={styles.headerActionBarContainer}>
        <div className={classNames(styles.headerActionBar, className)} role={role} aria-label={ariaLabel}>
          <HeaderActionBarLogo logo={logo} logoProps={logoProps} />
          {title && (
            <LinkItem {...titleProps}>
              <span className={classNames(styles.title)}>{title}</span>
            </LinkItem>
          )}
          <div className={styles.headerActions}>
            {componentExists && (
              <HeaderLanguageSelectorConsumer {...lsProps}>{languageSelectorChildren}</HeaderLanguageSelectorConsumer>
            )}
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
      <HeaderActionBarNavigationMenu
        frontPageLabel={frontPageLabel}
        titleHref={titleHref}
        logo={logo}
        logoProps={logoProps}
      />
      {componentExists && (
        <HeaderLanguageSelectorConsumer {...lsProps} fullWidthForMobile>
          {languageSelectorChildren}
        </HeaderLanguageSelectorConsumer>
      )}
    </>
  );
};

HeaderActionBar.defaultProps = {
  titleStyle: TitleStyleType.Normal,
};
