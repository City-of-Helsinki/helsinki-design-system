import React from 'react';

import { ChangeHandlerProps } from '.';

export function createOnClickListener(props: ChangeHandlerProps) {
  const { id, controller } = props;
  return {
    onClick: (originalEvent: React.MouseEvent) => {
      controller.triggerChange({ id, type: 'click', payload: { originalEvent } });
    },
  };
}

export function createInputOnChangeListener(props: ChangeHandlerProps) {
  const { id, controller } = props;
  return {
    onChange: (originalEvent: React.KeyboardEvent<HTMLInputElement>) => {
      controller.triggerChange({
        id,
        type: 'change',
        payload: { value: originalEvent.currentTarget.value, originalEvent },
      });
    },
  };
}
