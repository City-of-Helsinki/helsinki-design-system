import React from 'react';

import { Notification } from '../../notification/Notification';
import GroupChild from '../../group/GroupChild';
import { DefaultGroupElementProps } from '../../group/utils';

export function Error(props: DefaultGroupElementProps) {
  return <GroupChild {...props} renderOnlyWithChildren as={(elProps) => <Notification type="error" {...elProps} />} />;
}
