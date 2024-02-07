import React, { MouseEventHandler, useState } from 'react';
import { uniqueId } from 'lodash';

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
   * id
   */
  id?: string;
};

/**
 * NavigationDropdownLink will be removed in the next major release. Upcoming Header component will provide the replacement component.
 * @deprecated
 */
export const NavigationDropdownLink = ({
  label,
  href,
  children,
  onClick,
  id,
  active,
  ...rest
}: NavigationDropdownLinkProps) => {
  // Create a unique id if not provided via prop
  const [dropdownLinkId] = useState(id || uniqueId('dropdownlink-'));

  return (
    <MenuButton
      hoverAndClick
      label={<NavigationItem label={label} href={href} onClick={onClick} id={dropdownLinkId} active={active} />}
      buttonAriaLabelledby={dropdownLinkId}
      {...rest}
    >
      {children}
    </MenuButton>
  );
};

NavigationDropdownLink.componentName = 'NavigationDropdownLink';
