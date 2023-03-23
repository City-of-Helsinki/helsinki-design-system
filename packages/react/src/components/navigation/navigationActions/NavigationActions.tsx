import React from 'react';

import styles from './NavigationActions.module.scss';

/**
 * NavigationActions will be removed in the next major release. Upcoming Header component will provide the replacement component.
 * @deprecated
 */
export const NavigationActions = ({ children }: React.PropsWithChildren<Record<string, unknown>>) => (
  <div className={styles.navigationActions}>{children}</div>
);
NavigationActions.componentName = 'NavigationActions';
