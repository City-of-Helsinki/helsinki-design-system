import React from 'react';

import styles from './Button.module.css';
import classNames from '../../utils/classNames';

export type ButtonProps = React.PropsWithChildren<{
  children: string;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'tertiary' | 'supplementary';
  size?: 'default' | 'small';
}>;

export default ({ children, disabled = false, color = 'primary', size = 'default' }: ButtonProps) => {
  return (
    <div className={classNames(styles.button, styles[color], styles[size], disabled ? styles.disabled : '')}>
      {children}
    </div>
  );
};
