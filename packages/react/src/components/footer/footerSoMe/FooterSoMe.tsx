import React from 'react';

// import core base styles
import 'hds-core';
import styles from './FooterSoMe.module.scss';

export const FooterSoMe = ({ children }: React.PropsWithChildren<{}>) => <div className={styles.soMe}>{children}</div>;
FooterSoMe.componentName = 'FooterSoMe';
