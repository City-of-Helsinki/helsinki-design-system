import React, { useRef } from 'react';

import { SearchDataHandlers } from '../types';
import { DivElementProps } from '../../modularOptionList/types';
import { getTextFromDataHandlers } from '../texts';
import { useSearchDataHandlers } from '../hooks/useSearchDataHandlers';
import { eventIds } from '../events';
import {
  addOrUpdateScreenReaderNotificationByType,
  createScreenReaderNotification,
} from '../../shared/utils/screenReader';

function createErrorProps(dataHandlers: SearchDataHandlers): DivElementProps & { children: string | null } {
  const { invalid } = dataHandlers.getData();
  const error = getTextFromDataHandlers('error', dataHandlers);
  return {
    children: invalid && error ? error : null,
    className: 'hds-search-error',
  };
}

export function ErrorNotification() {
  const dataHandlers = useSearchDataHandlers();
  const { children, ...attr } = createErrorProps(dataHandlers);
  const previousErrorRef = useRef<string | null>(children);
  if (children && children !== previousErrorRef.current) {
    addOrUpdateScreenReaderNotificationByType(createScreenReaderNotification(eventIds.error, children), dataHandlers);
    previousErrorRef.current = children;
  }
  return children ? <div {...attr}>{children}</div> : null;
}
