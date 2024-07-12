import React from 'react';

import styles from '../Select.module.scss';
import { DivElementProps } from '../types';
import { useTextProvider } from '../hooks/useTextProvider';

function createAssistiveTextProps(): DivElementProps & { children: string | null } {
  const assistive = useTextProvider('assistive');
  return {
    className: styles.assistiveText,
    children: assistive || null,
  };
}

export function AssistiveText() {
  const { children, ...attr } = createAssistiveTextProps();
  return children ? <div {...attr}>{children}</div> : null;
}
