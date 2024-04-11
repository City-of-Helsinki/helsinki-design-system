import React, { useRef } from 'react';

import styles from '../Select.module.scss';
import { DivElementProps, SelectDataHandlers } from '../types';
import { useSelectDataHandlers } from '../hooks/useSelectDataHandlers';
import { getTextKeyFromDataHandlers } from '../texts';
import { addOrUpdateScreenReaderNotificationByType, createScreenReaderNotification } from '../utils';

function createAssistiveTextProps(dataHandlers: SelectDataHandlers): DivElementProps & { children: string | null } {
  const assistive = getTextKeyFromDataHandlers('assistive', dataHandlers);
  return {
    className: styles.assistiveText,
    children: assistive || null,
  };
}

export function AssistiveText() {
  const dataHandlers = useSelectDataHandlers();
  const { children, ...attr } = createAssistiveTextProps(dataHandlers);
  const previousTextRef = useRef<string | null>(children);
  if (children && children !== previousTextRef.current) {
    addOrUpdateScreenReaderNotificationByType(createScreenReaderNotification('assistiveText', children), dataHandlers);
    previousTextRef.current = children;
  }
  return children ? <div {...attr}>{children}</div> : null;
}
