import React, { useContext } from 'react';

import classNames from '../../../utils/classNames';
import styles from './NavigationItem.module.css';
import { NavigationContext } from '../NavigationContext';

// utility type
type MergeElementProps<T extends React.ElementType, P extends object = {}> = Omit<
  React.ComponentPropsWithoutRef<T>,
  keyof P
> &
  P;

type ItemProps = {
  /**
   * If `true`, the item will be marked as active
   */
  active?: boolean;
  /**
   * The label for the item. Optionally, children can be passed
   */
  label?: string | React.ReactNode;
  /**
   * Defines the button variant in mobile view. Intended to be used for user items
   */
  variant?: 'primary' | 'secondary' | 'supplementary';
};

export type NavigationItemProps<Element extends React.ElementType = 'a'> = {
  /**
   * Element type
   */
  as?: Element;
} & MergeElementProps<Element, ItemProps>;

export const NavigationItem = <T extends React.ElementType = 'a'>({
  active,
  as,
  children,
  className,
  label,
  variant,
  ...rest
}: NavigationItemProps<T>) => {
  const { isMobile } = useContext(NavigationContext);
  const Item: React.ElementType = as;
  return (
    <Item
      className={classNames(isMobile && styles[variant], className)}
      {...(active && { 'aria-current': 'page' })}
      {...rest}
    >
      {label}
      {children}
    </Item>
  );
};

NavigationItem.defaultProps = {
  as: 'a',
};
