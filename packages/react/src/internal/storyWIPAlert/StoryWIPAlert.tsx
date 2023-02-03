import React from 'react';

import { Notification } from '../../components/notification/Notification';

const style = {
  width: 400,
  marginTop: 20,
  marginLeft: 20,
  marginBottom: 40,
};

export const StoryWIPAlert = () => (
  <Notification label="Work in progress" type="alert" style={style}>
    This component is still in development and we do not recommend implementing it until we advertise it in the release
    notes.
  </Notification>
);
