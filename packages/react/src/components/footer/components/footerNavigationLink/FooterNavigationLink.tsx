import React from 'react';

// import base styles
import '../../../../styles/base.css';

import styles from './FooterNavigationLink.module.scss';
import { Link } from '../../../link';
import { MergeElementProps } from '../../../../common/types';
import classNames from '../../../../utils/classNames';
import { IconAngleRight, IconLinkExternal } from '../../../../icons';
import { FooterVariant } from '../../Footer.interface';

type ItemProps<Element> = React.PropsWithChildren<{
  /**
   * aria-label for providing detailed information for screen readers about a link.
   */
  ariaLabel?: string;
  /**
   * Element type
   */
  as?: Element;
  /**
   * Boolean indicating whether the link will lead user to external domain.
   */
  external?: boolean;
  /**
   * Icon placed on the left side of the item label
   */
  icon?: React.ReactNode;
  /**
   * The label for the item.
   */
  label?: string;
  /**
   * Boolean indicating whether the link will open in new tab or not.
   */
  openInNewTab?: boolean;
  /**
   * The aria-label for opening link in a new tab
   */
  openInNewTabAriaLabel?: string;
  /**
   * The aria-label for opening link in an external domain
   */
  openInExternalDomainAriaLabel?: string;
  /**
   * Set this if this item appears in footer navigation group.
   * @internal
   */
  subItem?: boolean;
  /**
   * Defines the FooterNavigationLink variant.
   * @internal
   */
  variant?: FooterVariant.Navigation | FooterVariant.Utility | FooterVariant.Base;
}>;

export type FooterNavigationLinkProps<Element extends React.ElementType = 'a'> = MergeElementProps<
  Element,
  ItemProps<Element>
>;

export const FooterNavigationLink = <T extends React.ElementType = 'a'>({
  ariaLabel,
  as: LinkComponent,
  className,
  icon,
  external = false,
  label,
  subItem = false,
  variant,
  ...rest
}: FooterNavigationLinkProps<T>) => {
  const Item = React.isValidElement(LinkComponent) ? LinkComponent.type : LinkComponent;

  return (
    <Item
      aria-label={ariaLabel}
      className={classNames(styles.item, subItem && styles.subItem, variant && styles[variant], className)}
      {...rest}
    >
      {icon}
      {subItem && <IconAngleRight className={styles.subItemIcon} aria-hidden />}
      {label && <span>{label}</span>}
      {external && label && (
        <IconLinkExternal size={variant === FooterVariant.Base ? 'xs' : 's'} className={styles.icon} aria-hidden />
      )}
    </Item>
  );
};

FooterNavigationLink.defaultProps = {
  as: Link,
};
