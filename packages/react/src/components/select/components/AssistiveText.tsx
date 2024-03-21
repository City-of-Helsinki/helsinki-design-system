import React from 'react';

import styles from '../Select.module.scss';
import { DivElementProps, SelectDataHandlers } from '../types';
import { useSelectDataHandlers } from '../hooks/useSelectDataHandlers';
import { getTextKeyFromDataHandlers } from '../texts';

function createAssistiveTextProps(dataHandlers: SelectDataHandlers): DivElementProps {
  const assistive = getTextKeyFromDataHandlers('assistive', dataHandlers);
  return {
    className: styles.assistiveText,
    children: assistive,
  };
}

export function AssistiveText() {
  const { children, ...attr } = createAssistiveTextProps(useSelectDataHandlers());
  return children ? <div {...attr}>{children}</div> : null;
}
