import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { DivElementProps } from '../types';
import { DataHandlers } from '../../dataProvider/DataContext';
import { useContextDataHandlers } from '../../dataProvider/hooks';

function createComponentProps(props: React.PropsWithChildren<unknown>, tools: DataHandlers): DivElementProps {
  const { getData } = tools;
  const { error } = getData();
  return {
    ...props,
    className: classNames(styles.root, styles.container, error && styles.error),
  };
}

export const SelectionsAndListsContainer = (props: React.PropsWithChildren<unknown>) => {
  const tools = useContextDataHandlers();
  const { children, ...attr } = createComponentProps(props, tools);
  return <div {...attr}>{children}</div>;
};
