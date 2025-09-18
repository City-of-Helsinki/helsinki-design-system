import React, { useRef } from 'react';

import { DivElementProps } from '../../modularOptionList/types';
import { getTextFromDataHandlers } from '../texts';
import { useSearchDataHandlers } from '../hooks/useSearchDataHandlers';
import { addOrUpdateScreenReaderNotificationByType, createScreenReaderNotification } from '../utils';
import { eventIds } from '../events';
import { SearchDataHandlers } from '../types';

function createAssistiveTextProps(dataHandlers: SearchDataHandlers): DivElementProps & { children: string | null } {
  const assistive = getTextFromDataHandlers('assistive', dataHandlers);
  return {
    className: 'hds-search-assistive-text',
    children: assistive || null,
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
