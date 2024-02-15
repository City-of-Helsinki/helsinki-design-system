import React from 'react';

import { SelectData } from '../index';
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
  };
}

export function ErrorNotification(props: Partial<NotificationProps>) {
  const { children, ...elProps } = errorPropCreator(props);
  return children ? <Notification {...elProps}>{children}</Notification> : null;
}
