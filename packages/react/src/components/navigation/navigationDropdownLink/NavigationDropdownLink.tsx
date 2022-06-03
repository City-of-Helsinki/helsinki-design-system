import React from 'react';

import { MenuButton, MenuButtonProps } from '../../../internal/menuButton/MenuButton';
import { NavigationItem } from '../navigationItem/NavigationItem';

export type NavigationDropdownLinkProps = MenuButtonProps & {
  /**
   * If `true`, the item will be marked as active
   */
  active?: boolean;

  href?: string;
};

export const NavigationDropdownLink = ({ label, href, children, ...rest }: NavigationDropdownLinkProps) => (
  <MenuButton hoverAndClick label={<NavigationItem label={label} href={href} />} {...rest}>
    {children}
  </MenuButton>
);
NavigationDropdownLink.componentName = 'NavigationDropdownLink';
