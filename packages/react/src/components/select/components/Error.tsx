import React from 'react';

import styles from '../Select.module.scss';
import { SelectDataHandlers } from '../types';
import { NotificationProps, Notification } from '../../notification/Notification';
import { useSelectDataHandlers } from '../typedHooks';

function createErrorProps(props: Partial<NotificationProps>, { getData }: SelectDataHandlers): NotificationProps {
  const { error } = getData();
  return {
    ...props,
    type: 'error',
    children: error || '',
    closeButtonLabelText: '',
    className: styles.errorNotification,
  };
}

export function ErrorNotification(props: Partial<NotificationProps>) {
  const { children, ...attr } = createErrorProps(props, useSelectDataHandlers());
  return children ? <Notification {...attr}>{children}</Notification> : null;
}
