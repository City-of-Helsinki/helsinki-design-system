import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { DivElementProps, SelectDataHandlers } from '../types';
import { useSelectDataHandlers } from '../hooks/useSelectDataHandlers';

function createComponentProps(
  props: React.PropsWithChildren<unknown>,
  { getData }: SelectDataHandlers,
): DivElementProps {
  const { open } = getData();
  return {
    ...props,
    className: classNames(styles.selectAndListContainer, open && styles.open),
  };
}

export const SelectionsAndListsContainer = (props: React.PropsWithChildren<unknown>) => {
  const { children, ...attr } = createComponentProps(props, useSelectDataHandlers());
  return <div {...attr}>{children}</div>;
};
