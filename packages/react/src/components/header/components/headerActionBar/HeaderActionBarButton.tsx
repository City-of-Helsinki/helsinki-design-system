// make a component which uses Header.ActionBartItemButton but without excessive props

import React, { FC } from 'react';

import {
  HeaderActionBarItemButton,
  HeaderActionBarItemButtonProps,
} from '../headerActionBarItem/HeaderActionBarItemButton';

// make a component which uses Header.ActionBartItemButton but without excessive props

export const HeaderActionBarButton: FC<
  Omit<
    HeaderActionBarItemButtonProps,
    | 'avatar'
    | 'closeIcon'
    | 'closeLabel'
    | 'hasSubItems'
    | 'activeStateIcon'
    | 'activeStateLabel'
    | 'isActive'
    | 'preventButtonResize'
  >
> = (props) => {
  return <HeaderActionBarItemButton {...props} />;
};

export const HeaderActionBarButton: FC<
  Omit<
    HeaderActionBarItemButtonProps,
    'activeStateIcon' | 'activeStateLabel' | 'avatar' | 'hasSubItems' | 'isActive' | 'preventButtonResize'
  >
> = (props) => {
  return <HeaderActionBarItemButton {...props} />;
};
