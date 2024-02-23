import React from 'react';

import styles from '../Select.module.scss';
import { DivElementProps, SelectDataHandlers } from '../types';
import { useSelectDataHandlers } from '../typedHooks';

function createAssistiveTextProps(props: DivElementProps, { getData }: SelectDataHandlers): DivElementProps {
  const { assistiveText } = getData();
  return {
    ...props,
    className: styles.assistiveText,
    children: assistiveText || '',
  };
}

export function AssistiveText(props: DivElementProps) {
  const { children, ...attr } = createAssistiveTextProps(props, useSelectDataHandlers());
  return children ? <div {...attr}>{children}</div> : null;
}
