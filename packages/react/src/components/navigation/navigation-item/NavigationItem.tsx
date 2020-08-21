import React, { ComponentPropsWithoutRef, ElementType, ReactNode, useContext } from 'react';

import classNames from '../../../utils/classNames';
import styles from './NavigationItem.module.css';
import NavigationContext from '../NavigationContext';

// utility type
type MergeElementProps<T extends ElementType, P extends object = {}> = Omit<ComponentPropsWithoutRef<T>, keyof P> & P;

type ItemProps = {
  /**
   * If `true`, the item will be marked as active
   */
  active?: boolean;
  /**
   * The label for the item. Optionally, children can be passed
   */
  label?: string | ReactNode;
  /**
   * Defines the button variant in mobile view. Intended to be used for user items
   */
  variant?: 'primary' | 'secondary' | 'supplementary';
};

type NavigationItemProps<Element extends ElementType = 'a'> = {
  as?: Element;
} & MergeElementProps<Element, ItemProps>;

const NavigationItem = <T extends ElementType = 'a'>({
  active,
  as,
  children,
  className,
  label,
  variant,
  ...rest
}: NavigationItemProps<T>) => {
  const { isMobile } = useContext(NavigationContext);
  const Item: ElementType = as;
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

export default NavigationItem;
