import React from 'react';

import styles from '../Select.module.scss';
import { SelectData } from '../types';
import { useContextTools } from '../../dataContext/hooks';
import { NotificationProps, Notification } from '../../notification/Notification';

function errorPropCreator(props: Partial<NotificationProps>): NotificationProps {
  const { getData } = useContextTools();
  const { error } = getData() as SelectData;
  return {
    ...props,
    type: 'error',
    children: error || '',
    closeButtonLabelText: '',
    className: styles.errorNotification,
  };
}

export function ErrorNotification(props: Partial<NotificationProps>) {
  const { children, ...elProps } = errorPropCreator(props);
  return children ? <Notification {...elProps}>{children}</Notification> : null;
}
