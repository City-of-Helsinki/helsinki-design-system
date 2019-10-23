import React from 'react';

import styles from './Button.module.css';

type Props = React.PropsWithChildren<{}>;

export default ({ children }: Props) => {
  return <div className={styles.button}>{children}</div>;
};
