import React, { useRef } from 'react';

import styles from '../Select.module.scss';
import { DivElementProps } from '../types';
import { useTextProvider } from '../hooks/useTextProvider';
import { useSelectDataHandlers } from '../hooks/useSelectDataHandlers';
import { addOrUpdateScreenReaderNotificationByType, createScreenReaderNotification } from '../utils';
import { eventIds } from '../events';

function createAssistiveTextProps(): DivElementProps & { children: string | null } {
  const assistive = useTextProvider('assistive');
  return {
    className: styles.assistiveText,
    children: assistive || null,
  };
}

export function AssistiveText() {
  const { children, ...attr } = createAssistiveTextProps();
  const dataHandlers = useSelectDataHandlers();
  const previousTextRef = useRef<string | null>(children);
  if (children && children !== previousTextRef.current) {
    addOrUpdateScreenReaderNotificationByType(
      createScreenReaderNotification(eventIds.assistive, children),
      dataHandlers,
    );
    previousTextRef.current = children;
  }
  return children ? <div {...attr}>{children}</div> : null;
}
