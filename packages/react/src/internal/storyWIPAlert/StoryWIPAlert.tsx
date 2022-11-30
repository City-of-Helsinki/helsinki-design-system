import React from 'react';

import { Notification } from '../../components/notification/Notification';

export const StoryWIPAlert = () => (
  <Notification label="Work in progress" type="alert" style={{ width: 400, marginBottom: 40 }}>
    This component is still in development and we do not recommend implementing it until we advertise it in the release
    notes.
  </Notification>
);
