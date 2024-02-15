import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';

export const SelectionsAndListsContainer = (props) => {
  const { children } = props;
  return <div className={classNames(styles.root, styles.container)}>{children}</div>;
};
