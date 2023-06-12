import React from 'react';

// import base styles
import '../../styles/base.css';

import styles from './Header.module.scss';
import classNames from '../../utils/classNames';
import { HeaderContext, HeaderContextProps } from './HeaderContext';
import { useMediaQueryLessThan } from '../../hooks/useMediaQuery';
import { HeaderUniversalBar } from './components/headerUniversalBar';
import { HeaderNavigationMenu } from './components/headerNavigationMenu';
import { NavigationLink } from './components/navigationLink';
import { SkipToContentLink } from './components/skipToContentLink';

export type HeaderProps = React.PropsWithChildren<{
  /**
   * Additional class names to apply to the header.
   */
  className?: string;
  /**
   * ID of the header element.
   */
  id?: string;
  /**
   * ID of the element which reached by clicking "skip to content" shortcut
   */
  skipToId?: string;
  /**
   * 	Label for skip to content shortcut
   */
  skipToLabel?: string;
}>;

export const Header = ({ children, className, id, skipToId, skipToLabel }: HeaderProps) => {
  const isSmallScreen = useMediaQueryLessThan('m');
  const isMediumScreen = useMediaQueryLessThan('l');
  const context: HeaderContextProps = { isSmallScreen, isMediumScreen };

  return (
    <HeaderContext.Provider value={context}>
      <header id={id} className={classNames(styles.header, className)}>
        {skipToId && skipToLabel && <SkipToContentLink skipTo={skipToId} label={skipToLabel} />}
        <div className={styles.headerBackgroundWrapper}>{children}</div>
      </header>
    </HeaderContext.Provider>
  );
};

Header.UniversalBar = HeaderUniversalBar;
Header.NavigationMenu = HeaderNavigationMenu;
Header.NavigationLink = NavigationLink;
