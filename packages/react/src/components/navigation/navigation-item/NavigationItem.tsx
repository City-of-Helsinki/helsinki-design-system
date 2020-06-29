import React, { useContext } from 'react';

import classNames from '../../../utils/classNames';
import styles from './NavigationItem.module.css';
import NavigationContext from '../NavigationContext';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type Prefer<P, T> = P & Omit<T, keyof P>;

type ElementPropsWithoutRef<T extends React.ElementType> = Pick<
  React.ComponentPropsWithoutRef<T>,
  keyof React.ComponentPropsWithoutRef<T>
>;

export type OverwritableType<OwnProps, Type extends React.ElementType> = Prefer<OwnProps, ElementPropsWithoutRef<Type>>;

export interface NavigationDropdownOptionProps<T> {
  active?: boolean;
  variant?: 'primary' | 'secondary' | 'supplementary';
  as: T;
}

const NavigationItem = <T extends React.ElementType = 'a'>({
  active,
  as,
  className,
  variant,
  ...rest
}: OverwritableType<NavigationDropdownOptionProps<T>, T>) => {
  const { isMobile } = useContext(NavigationContext);
  const ElementType: React.ElementType = as;
  return (
    <ElementType
      className={classNames(isMobile && styles[variant], className)}
      {...(active && { 'aria-current': 'page' })}
      {...rest}
    />
  );
};

NavigationItem.defaultProps = {
  as: 'a',
};

export default NavigationItem;
