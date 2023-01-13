import React from 'react';

// import core base styles
import 'hds-core';
import styles from './FooterNavigationHeading.module.scss';
import { MergeElementProps } from '../../../common/types';
import classNames from '../../../utils/classNames';
import { FooterVariant } from '../Footer.interface';

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
   * Id for the heading element.
   */
  id?: string;
  /**
   * The label for the heading.
   */
  label?: string | React.ReactNode;
  /**
   * Internal variant to change styles based on context.
   * @internal
   */
  variant?: FooterVariant.Navigation | FooterVariant.Utility;
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
  variant,
  ...rest
}: FooterNavigationHeadingProps<T>) => {
  const Item: React.ElementType = as || (href ? 'a' : 'span');
  return (
    <Item className={classNames(styles.navigationHeading, variant && styles[variant], className)} href={href} {...rest}>
      {label && label}
      {children}
    </Item>
  );
};
FooterNavigationHeading.componentName = 'FooterNavigationHeading';
