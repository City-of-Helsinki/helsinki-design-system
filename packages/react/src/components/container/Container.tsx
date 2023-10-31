import React from 'react';

// import base styles
import '../../styles/base.css';

import styles from './Container.module.scss';
import classNames from '../../utils/classNames';

export type ContainerProps = React.PropsWithChildren<React.HTMLProps<HTMLDivElement>> & {
  /**
   * Match the container's alignment and spacings with the HDS Header.
   */
  alignWithHeader?: boolean;
};

export const Container = ({ children, className, alignWithHeader, ...rest }: ContainerProps) => {
  return (
    <div className={classNames(styles.container, className, alignWithHeader && styles.alignWithHeader)} {...rest}>
      {children}
    </div>
  );
};
