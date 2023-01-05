import React from 'react';

// import base styles
import '../../../styles/base.css';

import styles from './FooterNavigationLink.module.scss';
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
   * @internal
   */
  subItem?: boolean;
}>;

export type FooterNavigationLinkProps<Element extends React.ElementType = 'a'> = MergeElementProps<
  Element,
  ItemProps<Element>
>;

export const FooterNavigationLink = <T extends React.ElementType = 'a'>({
  as,
  children,
  className,
  icon,
  label,
  subItem = false,
  ...rest
}: FooterNavigationLinkProps<T>) => {
  const Item: React.ElementType = as;

  return (
    // @ts-ignore
    <Item className={classNames(styles.item, subItem && styles.subItem, className)} {...rest}>
      {icon}
      {subItem && <IconAngleRight className={styles.subItemIcon} />}
      {label && <span>{label}</span>}
      {children}
    </Item>
  );
};

FooterNavigationLink.defaultProps = {
  as: 'a',
};
