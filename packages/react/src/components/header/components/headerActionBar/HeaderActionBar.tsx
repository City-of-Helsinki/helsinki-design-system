import React, { EventHandler, PropsWithChildren, MouseEvent, KeyboardEvent } from 'react';
import classNames from 'classnames';

import 'hds-core';
import styles from './HeaderActionBar.module.scss';
import { Logo } from '../../../logo';
import { LinkItem, LinkProps } from '../../../../internal/LinkItem';
import { useActiveLanguage } from '../../../../context/languageContext';
import { HeaderActionBarNavigationMenu } from './HeaderActionBarNavigationMenu';
import { useCallbackIfDefined, useEnterOrSpacePressCallback } from '../../../../utils/useCallback';
import { HeaderActionBarMenuItem } from '../headerActionBarItem';

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
   * Style for the service name that is displayed next to the Helsinki logo.
   */
  titleStyle: TitleStyleType;

  /**
   * The aria-label for the title describing the logo and service to screen reader users.
   */
  titleAriaLabel?: string;

  /**
   * Callback fired when the title or logo is clicked
   */
  onTitleClick?: EventHandler<MouseEvent | KeyboardEvent>;

  /**
   * The aria-label for the menu button to screen reader users.
   */
  menuButtonAriaLabel?: string;

  /**
   * Callback fired when the menu button is clicked.
   * Call event.stopPropagation() to disable calling
   * the default menu toggling function.
   */
  onMenuButtonClick?: EventHandler<MouseEvent>;

  /**
   * URL to navigate to when the logo or title is clicked
   */
  titleUrl?: string;
}>;

type TitleLogoAreaProps = {
  children: string;
  titleStyle: TitleStyleType;
  href?: string;
  ariaLabel?: string;
  onClick?: EventHandler<MouseEvent | KeyboardEvent>;
};

const Title = ({ children }: { children: string }) => <span className={classNames(styles.title)}>{children}</span>;

const TitleLogoArea = ({ children, titleStyle, href, ariaLabel, onClick }: TitleLogoAreaProps) => {
  const language = useActiveLanguage();
  const handleClick = useCallbackIfDefined(onClick);
  const handleKeyPress = useEnterOrSpacePressCallback(onClick);

  const props: LinkProps = {
    href,
    'aria-label': ariaLabel,
    className: classNames(styles.titleAndLogoContainer, styles[titleStyle]),
  };

  if (!(href || onClick)) {
    props.role = ariaLabel && 'img';
  } else {
    props.onKeyPress = handleKeyPress;
    props.onClick = handleClick;
  }

  return (
    <LinkItem {...props}>
      <Logo className={styles.logo} language={language} aria-hidden />
      {children && <Title>{children}</Title>}
    </LinkItem>
  );
};

export const HeaderActionBar = (props: HeaderActionBarProps) => {
  const {
    title,
    titleStyle = 'normal',
    titleAriaLabel,
    titleUrl,
    onTitleClick,

    menuButtonAriaLabel,
    onMenuButtonClick,

    children,
  } = props;

  const titleProps = {
    titleStyle: TitleStyleType[titleStyle],
    onClick: onTitleClick,
    href: titleUrl,
    ariaLabel: titleAriaLabel,
  };

  const menuButtonProps = {
    ariaLabel: menuButtonAriaLabel,
    onClick: onMenuButtonClick,
  };

  return (
    <>
      <div className={styles.headerActionBar}>
        <TitleLogoArea {...titleProps}>{title}</TitleLogoArea>
        <div className={styles.headerActions}>
          {children}
          <HeaderActionBarMenuItem {...menuButtonProps} />
        </div>
      </div>
      <HeaderActionBarNavigationMenu />
    </>
  );
};

HeaderActionBar.defaultProps = {
  titleStyle: TitleStyleType.normal,
};
