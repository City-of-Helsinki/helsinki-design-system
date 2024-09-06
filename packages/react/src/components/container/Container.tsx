import React from 'react';

import '../../styles/base.module.css';
import styles from './Container.module.scss';
import classNames from '../../utils/classNames';
import { AllElementPropsWithoutRef } from '../../utils/elementTypings';

export type ContainerProps = React.PropsWithChildren<AllElementPropsWithoutRef<'div'>> & {
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
