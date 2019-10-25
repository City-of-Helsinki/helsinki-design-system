import React from 'react';

import styles from './Button.module.css';

type Props = React.PropsWithChildren<{}>;

export default ({ children }: Props) => {
  return (
    <button type="button" className={styles.button}>
      {children}
    </button>
  );
};
