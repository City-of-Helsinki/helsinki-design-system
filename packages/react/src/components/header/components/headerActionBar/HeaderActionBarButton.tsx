// make a component which uses Header.ActionBartItemButton but without excessive props

import React, { FC } from 'react';

import {
  HeaderActionBarItemButton,
  HeaderActionBarItemButtonProps,
} from '../headerActionBarItem/HeaderActionBarItemButton';

export const HeaderActionBarButton: FC<
  Omit<
    HeaderActionBarItemButtonProps,
    'activeStateIcon' | 'activeStateLabel' | 'avatar' | 'hasSubItems' | 'isActive' | 'preventButtonResize'
  >
> = (props) => {
  return <HeaderActionBarItemButton {...props} />;
};
