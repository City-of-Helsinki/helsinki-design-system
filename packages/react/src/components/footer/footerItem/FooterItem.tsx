import React from 'react';

// import core base styles
import 'hds-core';
import styles from './FooterItem.module.scss';
import { MergeElementProps } from '../../../common/types';
import classNames from '../../../utils/classNames';
import { IconAngleRight } from '../../../icons';

type ItemProps<Element> = React.PropsWithChildren<{
  /**
   * Element type
   */
  as?: Element;
  /**
   * Icon placed on the left side of the item label
   */
  icon?: React.ReactNode;
  /**
   * The label for the item. Optionally, children can be passed
   */
  label?: string | React.ReactNode;
  /**
   * Whether the item should be displayed as an sub item in a sitemap item group
   */
  subItem?: boolean;
}>;

export type FooterItemProps<Element extends React.ElementType = 'a'> = MergeElementProps<Element, ItemProps<Element>>;

export const FooterItem = <T extends React.ElementType = 'a'>({
  as,
  children,
  className,
  icon,
  label,
  subItem = false,
  ...rest
}: FooterItemProps<T>) => {
  const Item: React.ElementType = as;

  return (
    <Item className={classNames(styles.item, subItem && styles.subItem, className)} {...rest}>
      {icon}
      {subItem && <IconAngleRight className={styles.subItemIcon} />}
      {label && <span>{label}</span>}
      {children}
    </Item>
  );
};

FooterItem.defaultProps = {
  as: 'a',
};
