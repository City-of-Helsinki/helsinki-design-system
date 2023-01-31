import React, { EventHandler, PropsWithChildren, MouseEvent, KeyboardEvent } from 'react';
import classNames from 'classnames';

import 'hds-core';
import styles from './HeaderActionBar.module.scss';
import { Logo } from '../../../logo';
import { LinkItem, LinkProps } from '../../../../internal/LinkItem';
import { useActiveLanguage } from '../../../../context/languageContext';
import { HeaderActionBarNavigationMenu } from './HeaderActionBarNavigationMenu';
import { useCallbackIfDefined, useEnterOrSpacePressCallback } from '../../../../utils/useCallback';
import { HeaderActionBarMenuItem } from './HeaderActionBarItem';

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

  /**
   * The aria-label for the menu button to screen reader users.
   */
  menuButtonAriaLabel?: string;

  /**
   * Callback fired when the title or logo is clicked
   */
  onTitleClick?: EventHandler<MouseEvent | KeyboardEvent>;

  /**
   * Callback fired when the title or logo is clicked
   */
  onMenuButtonClick?: EventHandler<MouseEvent>;

  /**
   * URL to navigate to when the logo or title is clicked
   */
  titleUrl?: string;
}>;

const TitleLogoArea = ({ title, titleStyle }) => {
  const language = useActiveLanguage();
  const logoLanguage = language === 'sv' ? 'sv' : 'fi';

  return (
    <>
      <Logo className={styles.logo} language={logoLanguage} aria-hidden />
      {title && <span className={classNames(styles.title)}>{title}</span>}
    </>
  );
};

const ellipsizeTitle = (title: string, titleStyle: TitleStyleType): string => {
  const maxChars = titleStyle === TitleStyleType.black ? 10 : 22;

  if (title.length > maxChars) return title.substring(0, maxChars - 1);
  return title;
};

export const HeaderActionBar = ({
  title,
  titleStyle,
  titleAriaLabel,
  menuButtonAriaLabel,
  titleUrl,
  onTitleClick,
  onMenuButtonClick,
  children,
}: HeaderActionBarProps) => {
  const handleClick = useCallbackIfDefined(onTitleClick);
  const handleKeyPress = useEnterOrSpacePressCallback(onTitleClick);

  const isTitleLink = titleUrl || onTitleClick;

  const linkProps: LinkProps = {
    'aria-label': titleAriaLabel,
    href: titleUrl,
    className: classNames(styles.titleAndLogoContainer, styles[titleStyle]),
  };

  if (!isTitleLink) {
    linkProps.role = titleAriaLabel && 'img';
  } else {
    linkProps.onKeyPress = handleKeyPress;
    linkProps.onClick = handleClick;
  }

  return (
    <>
      <div className={styles.headerActionBar}>
        <LinkItem {...linkProps}>
          <TitleLogoArea title={ellipsizeTitle(title, titleStyle)} titleStyle={titleStyle} />
        </LinkItem>
        <div className={styles.headerActions}>
          {children}
          <HeaderActionBarMenuItem ariaLabel={menuButtonAriaLabel} onClick={onMenuButtonClick} />
        </div>
      </div>
      <HeaderActionBarNavigationMenu />
    </>
  );
};

HeaderActionBar.defaultProps = {
  titleStyle: 'normal',
};
