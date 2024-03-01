import React from 'react';

import styles from '../Select.module.scss';
import { DivElementProps, SelectDataHandlers } from '../types';
import { useSelectDataHandlers } from '../hooks/useSelectDataHandlers';

function createAssistiveTextProps({ getData }: SelectDataHandlers): DivElementProps {
  const { assistiveText } = getData();
  return {
    className: styles.assistiveText,
    children: assistiveText || '',
  };
}

export function AssistiveText() {
  const { children, ...attr } = createAssistiveTextProps(useSelectDataHandlers());
  return children ? <div {...attr}>{children}</div> : null;
}
