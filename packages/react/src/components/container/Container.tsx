import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Container.module.scss';
import classNames from '../../utils/classNames';

export type ContainerProps = React.PropsWithChildren<React.HTMLProps<HTMLDivElement>>;

export const Container = ({ children, className, ...rest }: ContainerProps) => {
  return (
    <div className={classNames(styles.container, className)} {...rest}>
      {children}
    </div>
  );
};
