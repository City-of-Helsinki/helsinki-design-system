import React, { useRef } from 'react';

import styles from '../Select.module.scss';
import { DivElementProps, SelectDataHandlers } from '../types';
import { useTextProvider } from '../hooks/useTextProvider';
import { useSelectDataHandlers } from '../hooks/useSelectDataHandlers';
import { addOrUpdateScreenReaderNotificationByType, createScreenReaderNotification } from '../utils';
import { eventIds } from '../events';

function createErrorProps({ getData }: SelectDataHandlers): DivElementProps & { children: string | null } {
  const { invalid } = getData();
  const error = useTextProvider('error');
  return {
    children: invalid && error ? error : null,
    className: styles.errorText,
  };
}

export function ErrorNotification() {
  const dataHandlers = useSelectDataHandlers();
  const { children, ...attr } = createErrorProps(dataHandlers);
  const previousErrorRef = useRef<string | null>(children);
  if (children && children !== previousErrorRef.current) {
    addOrUpdateScreenReaderNotificationByType(createScreenReaderNotification(eventIds.error, children), dataHandlers);
    previousErrorRef.current = children;
  }
  return children ? <div {...attr}>{children}</div> : null;
}
