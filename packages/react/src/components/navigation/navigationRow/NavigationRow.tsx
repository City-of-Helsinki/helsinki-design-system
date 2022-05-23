import React, { cloneElement, isValidElement, useContext, useEffect } from 'react';

import styles from './NavigationRow.module.scss';
import itemStyles from '../navigationItem/NavigationItem.module.scss';
import classNames from '../../../utils/classNames';
import { NavigationVariant } from '../Navigation.interface';
import { FCWithName } from '../../../common/types';
import { NavigationContext } from '../NavigationContext';

export type NavigationRowProps = React.PropsWithChildren<{
  /**
   * Defines where the navigation row will be displayed.
   * Supported values:
   *
   * `default` - items will be displayed beneath the header
   *
   * `inline` - items will be displayed in the header
   */
  variant?: NavigationVariant;
}>;

export const NavigationRow = ({ variant = 'default', children }: NavigationRowProps) => {
  const { setNavigationVariant } = useContext(NavigationContext);

  useEffect(() => setNavigationVariant(variant), [setNavigationVariant, variant]);

  // add classnames to children
  const childrenWithClassName = React.Children.map(children, (child) => {
    const reactElement = child as React.ReactElement;
    const isActive = reactElement.props.active;
    const isDropdown = (reactElement.type as FCWithName).componentName === 'NavigationDropdown';
    const isShelved = variant === 'inlineShelf';

    return isValidElement(child)
      ? cloneElement(child, {
          className: classNames(
            !isDropdown && itemStyles.rowItem,
            isDropdown && itemStyles.dropdownItem,
            isActive && itemStyles.active,
            isShelved && itemStyles.shelved,
            child.props.className || '',
          ),
        })
      : child;
  });

  return (
    <nav
      className={classNames(
        styles.navigation,
        variant === 'default' && styles.subNav,
        variant === 'inlineShelf' && styles.shelf,
      )}
    >
      {childrenWithClassName}
    </nav>
  );
};
NavigationRow.componentName = 'NavigationRow';
