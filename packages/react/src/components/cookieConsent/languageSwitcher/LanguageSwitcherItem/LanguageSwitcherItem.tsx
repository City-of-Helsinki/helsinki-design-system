import React from 'react';

import styles from './LanguageSwitcherItem.module.scss';
import classNames from '../../../../utils/classNames';
import { MergeElementProps } from '../../../../common/types';
import { useMobile } from '../../../../hooks/useMobile';

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
   * Defines the button variant in mobile view.
   */
  variant?: 'primary' | 'secondary';
};

type SupplementaryItemProps = Omit<ItemProps, 'variant'> & {
  variant: 'supplementary';
  icon: React.ReactNode;
};

export type LanguageSwitcherItemProps<Element extends React.ElementType = 'a'> = {
  /**
   * Element type
   */
  as?: Element;
} & MergeElementProps<Element, ItemProps | SupplementaryItemProps>;

export const LanguageSwitcherItem = <T extends React.ElementType = 'a'>({
  active,
  as,
  children,
  className,
  icon,
  label,
  variant,
  ...rest
}: LanguageSwitcherItemProps<T>) => {
  const isMobile = useMobile();
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

LanguageSwitcherItem.defaultProps = {
  as: 'a',
};
