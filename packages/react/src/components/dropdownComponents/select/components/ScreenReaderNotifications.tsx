import React from 'react';

import styles from '../Select.module.scss';
import { useSelectDataHandlers } from '../hooks/useSelectDataHandlers';
import { GenericScreenReaderNotifications, ScreenReaderConfig } from '../../shared';

export function ScreenReaderNotifications() {
  const dataHandlers = useSelectDataHandlers();

  const config: ScreenReaderConfig = {
    className: styles.screenReaderNotifications,
    testId: 'hds-select-screen-reader-notifications',
    dataHandlers,
  };

  return <GenericScreenReaderNotifications config={config} />;
}
