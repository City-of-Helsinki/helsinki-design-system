import React from 'react';

import { useSearchDataHandlers } from '../hooks/useSearchDataHandlers';
import { GenericScreenReaderNotifications, ScreenReaderConfig } from '../../shared';

export function ScreenReaderNotifications() {
  const dataHandlers = useSearchDataHandlers();

  const config: ScreenReaderConfig = {
    className: 'hds-search-screen-reader-notifications',
    testId: 'hds-search-screen-reader-notifications',
    dataHandlers,
  };

  return <GenericScreenReaderNotifications config={config} />;
}
