import React from 'react';

import styles from '../Select.module.scss';
import { DivElementProps, SelectData } from '../types';
import { useContextDataHandlers } from '../../dataProvider/hooks';

function assitiveTextPropCreator(props: DivElementProps): DivElementProps {
  const { getData } = useContextDataHandlers();
  const { assistiveText } = getData() as SelectData;
  return {
    ...props,
    className: styles.assistiveText,
    children: assistiveText || '',
  };
}

export function AssistiveText(props: DivElementProps) {
  const { children, ...attr } = assitiveTextPropCreator(props);
  return children ? <div {...attr}>{children}</div> : null;
}
