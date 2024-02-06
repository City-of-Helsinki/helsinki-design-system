import React from 'react';

import GroupChild from '../../group/GroupChild';
import { DefaultGroupElementProps } from '../../group/utils';

export function AssistiveText(props: DefaultGroupElementProps) {
  return <GroupChild {...props} renderOnlyWithChildren />;
}
