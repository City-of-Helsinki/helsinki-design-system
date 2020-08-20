import React, { ComponentPropsWithoutRef, ElementType, ReactNode, useContext } from 'react';

import classNames from '../../../utils/classNames';
import styles from './NavigationItem.module.css';
import NavigationContext from '../NavigationContext';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type Prefer<P, T> = P & Omit<T, keyof P>;

type ElementPropsWithoutRef<T extends ElementType> = Pick<
  ComponentPropsWithoutRef<T>,
  keyof ComponentPropsWithoutRef<T>
>;

export type OverwritableType<OwnProps, Type extends ElementType> = Prefer<OwnProps, ElementPropsWithoutRef<Type>>;

export interface NavigationDropdownOptionProps<T> {
  active?: boolean;
  as: T;
  label?: string | ReactNode;
  variant?: 'primary' | 'secondary' | 'supplementary';
}

const NavigationItem = <T extends ElementType = 'a'>({
  active,
  as,
  children,
  className,
  label,
  variant,
  ...rest
}: OverwritableType<NavigationDropdownOptionProps<T>, T>) => {
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
