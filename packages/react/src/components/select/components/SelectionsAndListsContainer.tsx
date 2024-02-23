import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { DivElementProps, SelectDataHandlers } from '../types';
import { useSelectDataHandlers } from '../typedHooks';

function createComponentProps(
  props: React.PropsWithChildren<unknown>,
  { getData }: SelectDataHandlers,
): DivElementProps {
  const { error, open } = getData();
  return {
    ...props,
    className: classNames(styles.root, styles.container, error && styles.error, open && styles.open),
  };
}

export const SelectionsAndListsContainer = (props: React.PropsWithChildren<unknown>) => {
  const { children, ...attr } = createComponentProps(props, useSelectDataHandlers());
  return <div {...attr}>{children}</div>;
};
