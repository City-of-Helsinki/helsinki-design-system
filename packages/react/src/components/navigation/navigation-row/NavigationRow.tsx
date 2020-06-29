import React, { Children, cloneElement, isValidElement, ReactElement, useContext, useEffect } from 'react';

import styles from './NavigationRow.module.css';
import classNames from '../../../utils/classNames';
import NavigationContext from '../NavigationContext';
import { NavigationRowDisplay } from '../Navigation.interface';

export type NavigationRowProps = React.PropsWithChildren<{
  /**
   * Defines how the navigation row will be displayed.
   * Supported values:
   * fullWidth (default) - items will be displayed beneath the header
   * inline - items will be displayed in the header
   */
  display?: NavigationRowDisplay;
}>;

const NavigationRow = ({ display = 'fullWidth', children }: NavigationRowProps) => {
  const { dispatch } = useContext(NavigationContext);

  useEffect(() => dispatch({ type: 'NAVIGATION_ROW', value: display }), [dispatch, display]);

  const childrenWithClassName = Children.map(children, (child) => {
    const isActive = (child as ReactElement)?.props?.active;

    return isValidElement(child)
      ? cloneElement(child, {
          className: classNames(styles.navigationItem, isActive && styles.active),
        })
      : child;
  });

  return (
    <nav className={classNames(styles.navigation, display === 'fullWidth' && styles.fullWidth)}>
      {childrenWithClassName}
    </nav>
  );
};

export default NavigationRow;
