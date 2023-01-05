import React from 'react';

// import core base styles
import 'hds-core';
import styles from './FooterNavigationHeading.module.scss';
import { MergeElementProps } from '../../../common/types';
import classNames from '../../../utils/classNames';

type ItemProps<Element> = React.PropsWithChildren<{
  /**
   * Element type
   */
  as?: Element;
  /**
   * Hypertext Reference of the heading link.
   */
  href?: string;
  /**
   * The label for the heading.
   */
  label?: string | React.ReactNode;
}>;

export type FooterNavigationHeadingProps<Element extends React.ElementType = 'a'> = MergeElementProps<
  Element,
  ItemProps<Element>
>;

export const FooterNavigationHeading = <T extends React.ElementType = 'a'>({
  as,
  children,
  className,
  href,
  label,
  ...rest
}: FooterNavigationHeadingProps<T>) => {
  console.log(href);
  const Item: React.ElementType = as || (href ? 'a' : 'span');

  return (
    <Item
      className={classNames(styles.navigationHeading, href && styles.navigationHeadingLink, className)}
      href={href}
      {...rest}
    >
      {label && label}
      {children}
    </Item>
  );
};
FooterNavigationHeading.componentName = 'FooterNavigationHeading';
