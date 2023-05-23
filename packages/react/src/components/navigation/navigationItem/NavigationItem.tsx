import React, { useContext } from 'react';

import classNames from '../../../utils/classNames';
import styles from './NavigationItem.module.scss';
import { NavigationContext } from '../NavigationContext';
import { MergeElementProps } from '../../../common/types';

type ItemProps = {
  /**
   * If `true`, the item will be marked as active
   */
  active?: boolean;
  /**
   * Icon placed on the left side of the item label
   */
  icon?: React.ReactNode;
  /**
   * The label for the item. Optionally, children can be passed
   */
  label?: React.ReactNode;
  /**
   * Defines the button variant in mobile view. Intended to be used within the `NavigationUser` component
   */
  variant?: 'primary' | 'secondary';
};

type SupplementaryItemProps = Omit<ItemProps, 'variant'> & {
  variant: 'supplementary';
  icon: React.ReactNode;
};

export type NavigationItemProps<Element extends React.ElementType = 'a'> = {
  /**
   * Element type
   */
  as?: Element;
} & MergeElementProps<Element, ItemProps | SupplementaryItemProps>;

/**
 * NavigationItem will be removed in the next major release. Upcoming Header component will provide the replacement component.
 * @deprecated
 */
export const NavigationItem = <T extends React.ElementType = 'a'>({
  active,
  as,
  children,
  className,
  icon,
  label,
  variant,
  ...rest
}: NavigationItemProps<T>) => {
  const { isMobile } = useContext(NavigationContext);
  const Item: React.ElementType = as;

  return (
    // @ts-ignore
    <Item
      className={classNames(isMobile && styles[variant], className)}
      {...(active && { 'aria-current': 'page' })}
      {...rest}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>
        {label}
        {children}
      </span>
    </Item>
  );
};

NavigationItem.defaultProps = {
  as: 'a',
};
