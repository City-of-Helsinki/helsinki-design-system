import React, { cloneElement, isValidElement, useContext, useEffect } from 'react';

import styles from './NavigationRow.module.css';
import classNames from '../../../utils/classNames';
import { NavigationContext } from '../NavigationContext';
import { NavigationRowDisplay } from '../Navigation.interface';

export type NavigationRowProps = React.PropsWithChildren<{
  /**
   * Defines where the navigation row will be displayed.
   * Supported values:
   *
   * `subNav` - items will be displayed beneath the header (default)
   *
   * `inline` - items will be displayed in the header
   */
  display?: NavigationRowDisplay;
}>;

export const NavigationRow = ({ display = 'subNav', children }: NavigationRowProps) => {
  const { dispatch } = useContext(NavigationContext);

  useEffect(() => dispatch({ type: 'NAVIGATION_ROW', value: display }), [dispatch, display]);

  // add classnames to children
  const childrenWithClassName = React.Children.map(children, (child) => {
    const isActive = (child as React.ReactElement)?.props?.active;

    return isValidElement(child)
      ? cloneElement(child, {
          className: classNames(styles.navigationItem, isActive && styles.active),
        })
      : child;
  });

  return (
    <nav className={classNames(styles.navigation, display === 'subNav' && styles.subNav)}>{childrenWithClassName}</nav>
  );
};
NavigationRow.componentName = 'NavigationRow';
