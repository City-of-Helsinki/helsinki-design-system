import React from 'react';

import { ChangeHandlerProps } from '.';

export function createOnClickListener(props: ChangeHandlerProps, type = 'click') {
  const { id, controller } = props;
  return {
    onClick: (originalEvent: React.MouseEvent) => {
      controller.triggerChange({ id, type, payload: { originalEvent } });
    },
  };
}

export function createInputOnChangeListener(props: ChangeHandlerProps, type = 'change') {
  const { id, controller } = props;
  return {
    onChange: (originalEvent: React.KeyboardEvent<HTMLInputElement>) => {
      controller.triggerChange({
        id,
        type,
        payload: { value: originalEvent.currentTarget.value, originalEvent },
      });
    },
  };
}
