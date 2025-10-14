import React from 'react';

import { ChangeEvent } from '../../../dataProvider/DataContext';
import { eventTypes } from '../events/utils';

/**
 * Props for DOM event handler creators
 */
export type DomHandlerProps = {
  id: string;
  type?: string;
  trigger: (event: ChangeEvent) => void;
};

/**
 * Creates an onClick handler that triggers a change event
 * @param props - Handler configuration
 * @returns Object with onClick handler
 */
export function createOnClickListener(props: DomHandlerProps) {
  const { id, type = eventTypes.click, trigger } = props;
  return {
    onClick: (originalEvent: React.MouseEvent) => {
      trigger({ id, type, payload: { originalEvent } });
    },
  };
}

/**
 * Creates an onChange handler for input elements that triggers a change event
 * @param props - Handler configuration
 * @returns Object with onChange handler
 */
export function createInputOnChangeListener(props: DomHandlerProps) {
  const { id, type = eventTypes.change, trigger } = props;
  return {
    onChange: (originalEvent: React.ChangeEvent<HTMLInputElement>) => {
      trigger({
        id,
        type,
        payload: { value: originalEvent.currentTarget.value, originalEvent },
      });
    },
  };
}
