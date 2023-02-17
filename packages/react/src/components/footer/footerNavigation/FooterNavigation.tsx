import React from 'react';

// import base styles
import '../../../styles/base.css';

import styles from './FooterNavigation.module.scss';

export type FooterNavigationProps = React.PropsWithChildren<{
  /**
   * Description of the navigation for screen readers.
   */
  ariaLabel?: string;
}>;

export const FooterNavigation = ({ children, ariaLabel }: FooterNavigationProps) => {
  return (
    <nav className={styles.navigation} aria-label={ariaLabel}>
      {children}
    </nav>
  );
};

FooterNavigation.componentName = 'FooterNavigation';
