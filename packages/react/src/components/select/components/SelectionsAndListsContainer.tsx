import React, { RefObject } from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { DivElementProps, SelectDataHandlers } from '../types';
import { useSelectDataHandlers } from '../hooks/useSelectDataHandlers';

function createComponentProps(
  props: React.PropsWithChildren<unknown>,
  { getData, getMetaData }: SelectDataHandlers,
): DivElementProps & { ref: RefObject<HTMLDivElement> } {
  const { invalid, open } = getData();
  const { refs } = getMetaData();
  return {
    ...props,
    ref: refs.selectionsAndListContainer,
    className: classNames(styles.selectAndListContainer, invalid && styles.invalid, open && styles.open),
  };
}

export const SelectionsAndListsContainer = (props: React.PropsWithChildren<unknown>) => {
  const { children, ...attr } = createComponentProps(props, useSelectDataHandlers());
  return <div {...attr}>{children}</div>;
};
