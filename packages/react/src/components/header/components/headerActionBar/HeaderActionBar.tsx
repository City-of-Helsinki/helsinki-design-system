import React, { EventHandler, PropsWithChildren, MouseEvent, KeyboardEvent } from 'react';

import 'hds-core';
import styles from './HeaderActionBar.module.scss';
import { Logo } from '../../../logo';
import { useActiveLanguage } from '../../../../context/languageContext';
import { HeaderActionBarNavigationMenu } from './HeaderActionBarNavigationMenu';
import { useHeaderContext, useSetHeaderContext } from '../../HeaderContext';
import { IconCross, IconMenuHamburger } from '../../../../icons';
import { useCallbackIfDefined, useEnterOrSpacePressCallback } from '../../../../utils/useCallback';

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

export type HeaderActionBarMenuButtonProps = {
  ariaLabel?: string;
  onClick?: EventHandler<MouseEvent>;
};

const HeaderActionBarMenuButton = ({ ariaLabel, onClick }: HeaderActionBarMenuButtonProps) => {
  const { hasNavigationContent, mobileMenuOpen, isSmallScreen } = useHeaderContext();
  const { setMobileMenuOpen } = useSetHeaderContext();
  const Icon = mobileMenuOpen ? IconCross : IconMenuHamburger;
  const aria = {
    'aria-label': ariaLabel,
    'aria-haspopup': true,
    'aria-expanded': mobileMenuOpen,
  };
  if (mobileMenuOpen) aria['aria-controls'] = 'hds-mobile-menu';

  const handleClick = (event) => {
    if (typeof onClick === 'function') onClick(event);
    else setMobileMenuOpen(!mobileMenuOpen);
  };

  if (!hasNavigationContent || !isSmallScreen) return null;

  return (
    <button {...aria} type="button" className={styles.actionItem} onClick={handleClick}>
      <span className={styles.actionItemIcon}>
        <Icon aria-hidden />
      </span>
      <span className={styles.actionItemTitle}>Menu</span>
    </button>
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
  const language = useActiveLanguage();
  const handleClick = useCallbackIfDefined(onTitleClick);
  const handleKeyPress = useEnterOrSpacePressCallback(onTitleClick);
  const logoLanguage = language === 'sv' ? 'sv' : 'fi';
  const isTitleLink = titleUrl || onTitleClick;

  const renderLogoAndTitle = () => {
    return (
      <>
        <Logo className={styles.logo} language={logoLanguage} aria-hidden />
        {title && <span className={styles.title}>{title}</span>}
      </>
    );
  };

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
            {renderLogoAndTitle()}
          </a>
        ) : (
          <div
            className={styles.titleAndLogoContainer}
            aria-label={titleAriaLabel}
            role={titleAriaLabel ? 'img' : null}
          >
            {renderLogoAndTitle()}
          </div>
        )}
        <div className={styles.headerActions}>
          {children}
          <HeaderActionBarMenuButton ariaLabel={menuButtonAriaLabel} onClick={onMenuButtonClick} />
        </div>
      </div>
      <HeaderActionBarNavigationMenu />
    </>
  );
};
