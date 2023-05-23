import React from 'react';

import { MenuButton, MenuButtonProps } from '../../../internal/menuButton/MenuButton';

export type NavigationDropdownProps = MenuButtonProps & {
  /**
   * If `true`, the item will be marked as active
   */
  active?: boolean;
};

/**
 * NavigationDropdown will be removed in the next major release. Upcoming Header component will provide the replacement component.
 * @deprecated
 */
export const NavigationDropdown = ({ label, children, ...rest }: NavigationDropdownProps) => (
  <MenuButton label={label} {...rest}>
    {children}
  </MenuButton>
);
NavigationDropdown.componentName = 'NavigationDropdown';
