import React from 'react';

import '../../../../styles/base.module.css';
import styles from './FooterGroupHeading.module.scss';
import { MergeElementProps } from '../../../../common/types';
import classNames from '../../../../utils/classNames';
import { FooterVariant } from '../../Footer.interface';

type ItemProps<T> = React.PropsWithChildren<{
  /**
   * Element or component to use instead of the default native link.
   */
  as?: T;
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

export type FooterGroupHeadingProps<T extends React.ElementType = 'a'> = MergeElementProps<T, ItemProps<T>>;

export const FooterGroupHeading = <T extends React.ElementType = 'a'>({
  as: LinkComponent,
  children,
  className,
  href,
  label,
  variant,
  ...rest
}: FooterGroupHeadingProps<T>) => {
  const Item = React.useMemo(() => {
    if (LinkComponent) {
      if (React.isValidElement(LinkComponent)) {
        return LinkComponent.type;
      }
      return LinkComponent;
    }
    if (href) {
      return 'a';
    }
    return 'span';
  }, [LinkComponent, href]);

  return (
    <Item className={classNames(styles.heading, variant && styles[variant], className)} href={href} {...rest}>
      {label && label}
      {children}
    </Item>
  );
};
FooterGroupHeading.componentName = 'FooterGroupHeading';
