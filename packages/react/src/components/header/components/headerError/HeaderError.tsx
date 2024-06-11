import React from 'react';

import { Notification } from '../../../notification';
import { useHeaderContext } from '../../HeaderContext';
import { HeaderErrorUsageType, useHeaderError } from './useHeaderError';

export const HeaderError = () => {
  const { error } = useHeaderContext();
  const { elementProps } = useHeaderError({
    usage: HeaderErrorUsageType.Notification,
  });

  if (!error) {
    return null;
  }

  const { label, text, closeButtonAriaLabel, notificationPosition = 'top-right' } = error;

  return (
    <Notification
      {...elementProps}
      label={label}
      dismissible
      type="error"
      position={notificationPosition}
      closeButtonLabelText={closeButtonAriaLabel}
    >
      {text}
    </Notification>
  );
};
