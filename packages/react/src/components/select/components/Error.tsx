import React, { useRef } from 'react';

import styles from '../Select.module.scss';
import { DivElementProps, SelectDataHandlers } from '../types';
import { useSelectDataHandlers } from '../hooks/useSelectDataHandlers';
import { getTextKeyFromDataHandlers } from '../texts';
import { addOrUpdateScreenReaderNotificationByType, createScreenReaderNotification } from '../utils';

function createErrorProps(dataHandlers: SelectDataHandlers): DivElementProps & { children: string | null } {
  const error = getTextKeyFromDataHandlers('error', dataHandlers);
  return {
    children: error || null,
    className: styles.errorText,
  };
}

export function ErrorNotification() {
  const dataHandlers = useSelectDataHandlers();
  const { children, ...attr } = createErrorProps(dataHandlers);
  const previousErrorRef = useRef<string | null>(children);
  if (children && children !== previousErrorRef.current) {
    addOrUpdateScreenReaderNotificationByType(createScreenReaderNotification('error', children), dataHandlers);
    previousErrorRef.current = children;
  }
  return children ? <div {...attr}>{children}</div> : null;
}
