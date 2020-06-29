import React, { PropsWithChildren } from 'react';

import styles from './NavigationActions.module.css';

export type NavigationActionsProps = PropsWithChildren<{}>;

const NavigationActions = ({ children }: NavigationActionsProps) => (
  <div className={styles.navigationActions}>{children}</div>
);

export default NavigationActions;
