import React from 'react';

import { MenuButton, MenuButtonProps } from '../../../internal/menuButton/MenuButton';

export const NavigationDropdown = ({ label, children, ...rest }: MenuButtonProps) => (
  <MenuButton label={label} {...rest}>
    {children}
  </MenuButton>
);
NavigationDropdown.componentName = 'NavigationDropdown';
