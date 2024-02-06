import React from 'react';

import { ChangeHandlerProps } from '.';
import { eventTypes } from '../../select';

export function createOnClickListener(props: ChangeHandlerProps) {
  const { id, controller } = props;
  return {
    onClick: (originalEvent: React.MouseEvent) => {
      controller.triggerChange({ id, type: eventTypes.click, payload: { originalEvent } });
    },
  };
}

export function createInputOnChangeListener(props: ChangeHandlerProps) {
  const { id, controller } = props;
  return {
    onChange: (originalEvent: React.KeyboardEvent<HTMLInputElement>) => {
      controller.triggerChange({
        id,
        type: eventTypes.change,
        payload: { value: originalEvent.currentTarget.value, originalEvent },
      });
    },
  };
}
