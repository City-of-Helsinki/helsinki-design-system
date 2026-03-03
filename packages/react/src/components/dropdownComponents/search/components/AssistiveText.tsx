import React, { useRef } from 'react';

import styles from '../Search.module.scss';
import { DivElementProps } from '../../modularOptionList/types';
import { getTextFromDataHandlers } from '../texts';
import { useSearchDataHandlers } from '../hooks/useSearchDataHandlers';
import { eventIds } from '../events';
import { SearchDataHandlers } from '../types';
import {
  addOrUpdateScreenReaderNotificationByType,
  createScreenReaderNotification,
} from '../../shared/utils/screenReader';

function createAssistiveTextProps(dataHandlers: SearchDataHandlers): DivElementProps & { children: string | null } {
  const assistive = getTextFromDataHandlers('assistive', dataHandlers);
  const { getMetaData } = useSearchDataHandlers();
  const { elementIds } = getMetaData();
  return {
    className: styles.assistiveText,
    children: assistive || null,
    id: elementIds.assistiveText,
  };
}

export function AssistiveText() {
  const dataHandlers = useSearchDataHandlers();
  const { children, ...attr } = createAssistiveTextProps(dataHandlers);
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
