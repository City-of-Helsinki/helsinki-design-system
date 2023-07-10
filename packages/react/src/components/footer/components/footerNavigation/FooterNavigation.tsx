import React from 'react';

// import base styles
import '../../../../styles/base.css';

import styles from './FooterNavigation.module.scss';

export const FooterNavigation = ({ children }) => {
  return <div className={styles.navigation}>{children}</div>;
};

FooterNavigation.componentName = 'FooterNavigation';
