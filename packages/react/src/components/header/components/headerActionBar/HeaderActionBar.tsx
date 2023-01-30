import React, { EventHandler, PropsWithChildren, MouseEvent, KeyboardEvent } from 'react';

import 'hds-core';
import styles from './HeaderActionBar.module.scss';
import { Logo } from '../../../logo';
import { useActiveLanguage } from '../../../../context/languageContext';
import { HeaderActionBarNavigationMenu } from './HeaderActionBarNavigationMenu';
import { useCallbackIfDefined, useEnterOrSpacePressCallback } from '../../../../utils/useCallback';
import { HeaderActionBarMenuItem } from './HeaderActionBarItem';

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

const TitleLogoArea = ({ title }) => {
  const language = useActiveLanguage();
  const logoLanguage = language === 'sv' ? 'sv' : 'fi';

  return (
    <>
      <Logo className={styles.logo} language={logoLanguage} aria-hidden />
      {title && <span className={styles.title}>{title}</span>}
    </>
  );
};

export const HeaderActionBar = ({
  title,
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

  return (
    <>
      <div className={styles.headerActionBar}>
        {isTitleLink ? (
          <a
            className={styles.titleAndLogoContainer}
            href={titleUrl}
            aria-label={titleAriaLabel}
            onKeyPress={handleKeyPress}
            onClick={handleClick}
          >
            <TitleLogoArea title={title} />
          </a>
        ) : (
          <div
            className={styles.titleAndLogoContainer}
            aria-label={titleAriaLabel}
            role={titleAriaLabel ? 'img' : null}
          >
            <TitleLogoArea title={title} />
          </div>
        )}
        <div className={styles.headerActions}>
          {children}
          <HeaderActionBarMenuItem ariaLabel={menuButtonAriaLabel} onClick={onMenuButtonClick} />
        </div>
      </div>
      <HeaderActionBarNavigationMenu />
    </>
  );
};
