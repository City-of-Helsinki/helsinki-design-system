import React from 'react';

import styles from '../Select.module.scss';
import { DivElementProps, SelectDataHandlers } from '../types';
import { useSelectDataHandlers } from '../hooks/useSelectDataHandlers';
import { getTextKeyFromDataHandlers } from '../texts';

function createErrorProps(dataHandlers: SelectDataHandlers): DivElementProps {
  const error = getTextKeyFromDataHandlers('error', dataHandlers);
  return {
    children: error,
    className: styles.errorText,
  };
}

export function ErrorNotification() {
  const { children, ...attr } = createErrorProps(useSelectDataHandlers());
  return children ? <div {...attr}>{children}</div> : null;
}
