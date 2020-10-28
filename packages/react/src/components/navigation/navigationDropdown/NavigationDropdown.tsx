import React from 'react';

import { MenuButton, MenuButtonProps } from '../../../internal/menuButton/MenuButton';

export type NavigationDropdownProps = MenuButtonProps & {
  /**
   * If `true`, the item will be marked as active
   */
  active?: boolean;
};

export const NavigationDropdown = ({ label, children, ...rest }: NavigationDropdownProps) => (
  <MenuButton label={label} {...rest}>
    {children}
  </MenuButton>
);
NavigationDropdown.componentName = 'NavigationDropdown';
