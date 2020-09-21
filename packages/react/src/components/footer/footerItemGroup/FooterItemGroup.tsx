import React from 'react';

// import core base styles
import 'hds-core';
import styles from './FooterItemGroup.module.scss';

export const FooterItemGroup = ({ children }: React.PropsWithChildren<{}>) => (
  <div className={styles.itemGroup}>{children}</div>
);
