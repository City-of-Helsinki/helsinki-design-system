import React from 'react';

// import core base styles
import 'hds-core';
import styles from './FooterSoMe.module.scss';

export type FooterSoMeProps = React.PropsWithChildren<{}>;

export const FooterSoMe = ({ children }: FooterSoMeProps) => {
  return <div className={styles.soMe}>{children}</div>;
};
