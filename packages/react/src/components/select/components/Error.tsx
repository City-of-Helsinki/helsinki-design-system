import React from 'react';

import styles from '../Select.module.scss';
import { DivElementProps, SelectDataHandlers } from '../types';
import { useTextProvider } from '../hooks/useTextProvider';
import { useSelectDataHandlers } from '../hooks/useSelectDataHandlers';

function createErrorProps({ getData }: SelectDataHandlers): DivElementProps & { children: string | null } {
  const { invalid } = getData();
  const error = useTextProvider('error');
  return {
    children: invalid && error ? error : null,
    className: styles.errorText,
  };
}

export function ErrorNotification() {
  const { children, ...attr } = createErrorProps(useSelectDataHandlers());
  return children ? <div {...attr}>{children}</div> : null;
}
