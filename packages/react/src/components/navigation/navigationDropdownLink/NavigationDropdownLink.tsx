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

  /**
   * Menu button label
   */
  buttonAriaLabel?: string;
};

export const NavigationDropdownLink = ({
  label,
  href,
  children,
  onClick,
  buttonAriaLabel,
  ...rest
}: NavigationDropdownLinkProps) => (
  <MenuButton
    hoverAndClick
    label={<NavigationItem label={label} href={href} onClick={onClick} />}
    buttonAriaLabel={buttonAriaLabel ?? `${label} dropdown`}
    {...rest}
  >
    {children}
  </MenuButton>
);
NavigationDropdownLink.componentName = 'NavigationDropdownLink';
