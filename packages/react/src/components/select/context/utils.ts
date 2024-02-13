import React from 'react';

import { ChangeEvent } from './DataContext';

type DomHandlerProps = {
  id: string;
  type?: string;
  trigger: (event: ChangeEvent) => void;
};

export function createOnClickListener(props: DomHandlerProps) {
  const { id, type = 'click', trigger } = props;
  return {
    onClick: (originalEvent: React.MouseEvent) => {
      trigger({ id, type, payload: { originalEvent } });
    },
  };
}

export function createInputOnChangeListener(props: DomHandlerProps) {
  const { id, type = 'change', trigger } = props;
  return {
    onChange: (originalEvent: React.KeyboardEvent<HTMLInputElement>) => {
      trigger({
        id,
        type,
        payload: { value: originalEvent.currentTarget.value, originalEvent },
      });
    },
  };
}
