import React from 'react';

// import core base styles
import 'hds-core';
import styles from './[-replace-name-capital-].module.scss';

export type [-replace-name-capital-]Props = React.PropsWithChildren<{}>;

export const [-replace-name-capital-] = ({ children }: [-replace-name-capital-]Props) => {
  return <div className={styles.[-replace-name-camel-]}>{children}</div>;
};
