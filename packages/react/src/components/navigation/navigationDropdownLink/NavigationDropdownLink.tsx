import React, { MouseEventHandler } from 'react';

import { MenuButton, MenuButtonProps } from '../../../internal/menuButton/MenuButton';
import { NavigationItem } from '../navigationItem/NavigationItem';

export type NavigationDropdownLinkProps = MenuButtonProps & {
  /**
   * If `true`, the item will be marked as active
   */
  active?: boolean;

  /**
   * Dropdown Link url
   */
  href?: string;

  /**
   * OnClick for the link
   */
  onClick?: MouseEventHandler;
};

export const NavigationDropdownLink = ({ label, href, children, onClick, ...rest }: NavigationDropdownLinkProps) => (
  <MenuButton hoverAndClick label={<NavigationItem label={label} href={href} onClick={onClick} />} {...rest}>
    {children}
  </MenuButton>
);
NavigationDropdownLink.componentName = 'NavigationDropdownLink';
