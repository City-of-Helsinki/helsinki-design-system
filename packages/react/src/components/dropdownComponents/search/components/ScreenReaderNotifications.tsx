import React from 'react';

import styles from '../Search.module.scss';
import { useSearchDataHandlers } from '../hooks/useSearchDataHandlers';
import { GenericScreenReaderNotifications, ScreenReaderConfig } from '../../shared';

export function ScreenReaderNotifications() {
  const dataHandlers = useSearchDataHandlers();

  const config: ScreenReaderConfig = {
    className: styles.screenReaderNotifications,
    testId: 'hds-search-screen-reader-notifications',
    dataHandlers,
  };

  return <GenericScreenReaderNotifications config={config} />;
}
