import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { DivElementProps } from '../types';
import { Tools } from '../../dataContext/DataContext';
import { useContextTools } from '../../dataContext/hooks';

function createComponentProps(props: React.PropsWithChildren<unknown>, tools: Tools): DivElementProps {
  const { getData } = tools;
  const { error } = getData();
  return {
    ...props,
    className: classNames(styles.root, styles.container, error && styles.error),
  };
}

export const SelectionsAndListsContainer = (props: React.PropsWithChildren<unknown>) => {
  const tools = useContextTools();
  const { children, ...attr } = createComponentProps(props, tools);
  return <div {...attr}>{children}</div>;
};
