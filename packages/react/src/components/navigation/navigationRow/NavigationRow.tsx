import React, { cloneElement, isValidElement } from 'react';

import styles from './NavigationRow.module.scss';
import itemStyles from '../navigationItem/NavigationItem.module.scss';
import classNames from '../../../utils/classNames';
import { NavigationVariant } from '../Navigation.interface';
import { FCWithName } from '../../../common/types';

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
  // add classnames to children
  const childrenWithClassName = React.Children.map(children, (child) => {
    const reactElement = child as React.ReactElement;
    const isActive = reactElement.props.active;
    const isDropdown = (reactElement.type as FCWithName).componentName === 'NavigationDropdown';

    return isValidElement(child)
      ? cloneElement(child, {
          className: classNames(
            !isDropdown && itemStyles.rowItem,
            isDropdown && itemStyles.dropdownItem,
            isActive && itemStyles.active,
            child.props.className || '',
          ),
        })
      : child;
  });

  return (
    <nav className={classNames(styles.navigation, variant === 'default' && styles.subNav)}>{childrenWithClassName}</nav>
  );
};
NavigationRow.componentName = 'NavigationRow';
