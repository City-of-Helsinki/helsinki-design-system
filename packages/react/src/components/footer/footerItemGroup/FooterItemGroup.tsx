import React from 'react';

// import core base styles
import 'hds-core';
import styles from './FooterItemGroup.module.scss';

export type FooterItemGroupProps = React.PropsWithChildren<{}>;

export const FooterItemGroup = ({ children }: FooterItemGroupProps) => (
  <div className={styles.itemGroup}>{children}</div>
);
