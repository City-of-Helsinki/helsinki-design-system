import React from 'react';

import GroupChild from '../../group/GroupChild';
import { DefaultGroupElementProps } from '../../group/utils';

export function AssistiveText(props: DefaultGroupElementProps & { groupId: string }) {
  return <GroupChild {...props} renderOnlyWithChildren />;
}
