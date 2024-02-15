import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { DivElementProps } from '..';

export const containerGroupId = 'container';

export const Container = (props: Partial<DivElementProps>) => {
  const { children, ...rest } = props;
  return (
    <div {...rest} className={classNames(styles.wrapper)}>
      {children}
    </div>
  );
};
