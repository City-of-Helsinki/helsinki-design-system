import React from 'react';

// import base styles
import '../../styles/base.css';

import styles from './Login.module.scss';

export type LoginProps = React.PropsWithChildren<{}>;

export const Login = ({ children }: LoginProps) => {
  return <div className={styles.login}>{children}</div>;
};
