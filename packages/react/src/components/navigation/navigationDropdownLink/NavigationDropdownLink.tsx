import React from 'react';

import { MenuButton, MenuButtonProps } from '../../../internal/menuButton/MenuButton';
import { NavigationItem } from '../navigationItem/NavigationItem';

export type NavigationDropdownLinkProps = MenuButtonProps & {
  /**
   * If `true`, the item will be marked as active
   */
  active?: boolean;
  // url
  href?: string;

  className?: string;
};

export const NavigationDropdownLink = ({ label, children, ...rest }: NavigationDropdownLinkProps) => {
  return (
    <>
      <MenuButton labelOutside label={<NavigationItem label={label} />} {...rest}>
        {children}
      </MenuButton>
    </>
  );
};
NavigationDropdownLink.componentName = 'NavigationDropdownLink';
