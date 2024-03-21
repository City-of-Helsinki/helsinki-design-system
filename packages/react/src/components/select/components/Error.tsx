import React from 'react';

import styles from '../Select.module.scss';
import { SelectDataHandlers } from '../types';
import { NotificationProps, Notification } from '../../notification/Notification';
import { useSelectDataHandlers } from '../hooks/useSelectDataHandlers';
import { getTextKeyFromDataHandlers } from '../texts';

function createErrorProps(dataHandlers: SelectDataHandlers): NotificationProps {
  const error = getTextKeyFromDataHandlers('error', dataHandlers);
  return {
    type: 'error',
    children: error,
    closeButtonLabelText: '',
    className: styles.errorNotification,
  };
}

export function ErrorNotification() {
  const { children, ...attr } = createErrorProps(useSelectDataHandlers());
  return children ? <Notification {...attr}>{children}</Notification> : null;
}
