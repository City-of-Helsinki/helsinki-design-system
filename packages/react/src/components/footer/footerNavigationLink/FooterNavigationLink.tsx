import React from 'react';

// import base styles
import '../../../styles/base.css';

import styles from './FooterNavigationLink.module.scss';
import { MergeElementProps } from '../../../common/types';
import classNames from '../../../utils/classNames';
import { IconAngleRight } from '../../../icons';
import { FooterVariant } from '../Footer.interface';

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
  /**
   * Internal variant to change styles based on context.
   * @internal
   */
  variant?: FooterVariant.Navigation | FooterVariant.Utility;
}>;

export type FooterNavigationLinkProps<Element extends React.ElementType = 'a'> = MergeElementProps<
  Element,
  ItemProps<Element>
>;

export const FooterNavigationLink = <T extends React.ElementType = 'a'>({
  as,
  className,
  icon,
  label,
  subItem = false,
  variant,
  ...rest
}: FooterNavigationLinkProps<T>) => {
  const Item: React.ElementType = as;

  return (
    // @ts-ignore
    <Item
      className={classNames(styles.item, subItem && styles.subItem, variant && styles[variant], className)}
      {...rest}
    >
      {icon}
      {subItem && <IconAngleRight className={styles.subItemIcon} />}
      {label && <span>{label}</span>}
    </Item>
  );
};

FooterNavigationLink.defaultProps = {
  as: 'a',
};
