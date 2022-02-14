import React from 'react';

import styles from './NavigationActions.module.scss';

export const NavigationActions = ({ children }: React.PropsWithChildren<Record<string, unknown>>) => (
  <div className={styles.navigationActions}>{children}</div>
);
NavigationActions.componentName = 'NavigationActions';
