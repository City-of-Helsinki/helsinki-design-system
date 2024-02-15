import React from 'react';

import { DivElementProps, SelectData } from '../types';
import { useContextTools } from '../../dataContext/hooks';

function assitiveTextPropCreator(props: DivElementProps) {
  const { getData } = useContextTools();
  const { assistiveText } = getData() as SelectData;
  return {
    ...props,
    children: assistiveText || '',
  };
}

export function AssistiveText(props: DivElementProps) {
  const { children, ...attr } = assitiveTextPropCreator(props);
  return children ? <div {...attr}>{children}</div> : null;
}
