import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Breadcrumb.module.scss';

export type BreadcrumbProps = React.PropsWithChildren<{}>;

export const Breadcrumb = ({ children }: BreadcrumbProps) => {
  return <div className={styles.breadcrumb}>{children}</div>;
};
