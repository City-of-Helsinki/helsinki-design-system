import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { DivElementProps, SelectDataHandlers } from '../types';
import { useSelectDataHandlers } from '../hooks/useSelectDataHandlers';

function createComponentProps(
  props: React.PropsWithChildren<unknown>,
  { getData, getMetaData }: SelectDataHandlers,
): DivElementProps {
  const { error, open } = getData();
  const { elementIds } = getMetaData();
  return {
    ...props,
    className: classNames(styles.selectAndListContainer, error && styles.error, open && styles.open),
    id: elementIds.selectionsAndListsContainer,
  };
}

export const SelectionsAndListsContainer = (props: React.PropsWithChildren<unknown>) => {
  const { children, ...attr } = createComponentProps(props, useSelectDataHandlers());
  return <div {...attr}>{children}</div>;
};
