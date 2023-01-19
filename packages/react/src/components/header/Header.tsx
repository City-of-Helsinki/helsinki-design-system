import React from 'react';

// import base styles
import '../../styles/base.css';

import styles from './Header.module.scss';
import classNames from '../../utils/classNames';
import { HeaderContextProvider } from './HeaderContext';
import { HeaderUniversalBar } from './components/headerUniversalBar';
import { HeaderActionBar } from './components/headerActionBar';
import { HeaderNavigationMenu } from './components/headerNavigationMenu';
import { NavigationLink } from './components/navigationLink';

export type HeaderProps = React.PropsWithChildren<{
  /**
   * Additional class names to apply to the header.
   */
  className?: string;
  /**
   * ID of the header element.
   */
  id?: string;
}>;

export const Header = ({ children, className, id }: HeaderProps) => {
  return (
    <HeaderContextProvider>
      <header id={id} className={classNames(styles.header, className)}>
        <div className={styles.headerBackgroundWrapper}>{children}</div>
      </header>
    </HeaderContextProvider>
  );
};

Header.UniversalBar = HeaderUniversalBar;
Header.ActionBar = HeaderActionBar;
Header.NavigationMenu = HeaderNavigationMenu;
Header.NavigationLink = NavigationLink;
