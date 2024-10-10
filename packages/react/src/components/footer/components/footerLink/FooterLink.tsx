import React from 'react';

import '../../../../styles/base.module.css';
import styles from './FooterLink.module.scss';
import { Link } from '../../../link';
import classNames from '../../../../utils/classNames';
import { IconAngleRight, IconLinkExternal } from '../../../../icons';
import { FooterVariant } from '../../Footer.interface';
import { IconSize } from '../../../../icons/Icon.interface';
import { AllElementPropsWithoutRef, MergeAndOverrideProps } from '../../../../utils/elementTypings';

type ItemProps<Element> = React.PropsWithChildren<{
  /**
   * Element or component to use instead of the default link.
   * @default Link
   * @example
   * ```ts
   * as={CustomLink}
   * ```
   */
  as?: Element;
  /**
   * Boolean indicating whether the link will lead user to external domain.
   */
  external?: boolean;
  /**
   * Icon placed on the left side of the item label.
   */
  icon?: React.ReactNode;
  /**
   * The label for the item.
   */
  label?: string;
  /**
   * Boolean indicating whether the link will open in new tab.
   */
  openInNewTab?: boolean;
  /**
   * The aria-label for opening link in a new tab.
   */
  openInNewTabAriaLabel?: string;
  /**
   * The aria-label for opening link in an external domain.
   */
  openInExternalDomainAriaLabel?: string;
  /**
   * Set this if this item appears in footer navigation group.
   * @internal
   */
  subItem?: boolean;
  /**
   * Defines the FooterLink variant.
   * @internal
   */
  variant?: FooterVariant.Navigation | FooterVariant.Utility | FooterVariant.Base;
}>;

export type FooterLinkProps<T extends React.ElementType = 'a'> = MergeAndOverrideProps<
  AllElementPropsWithoutRef<T>,
  ItemProps<T>
>;

export const FooterLink = <T extends React.ElementType = 'a'>({
  as: LinkComponent,
  className,
  icon,
  external = false,
  label,
  subItem = false,
  variant,
  ...rest
}: FooterLinkProps<T>) => {
  const Item = React.isValidElement(LinkComponent) ? LinkComponent.type : LinkComponent;
  return (
    <Item
      className={classNames(styles.item, subItem && styles.subItem, variant && styles[variant], className)}
      {...rest}
    >
      {icon}
      {subItem && <IconAngleRight className={styles.subItemIcon} />}
      {label && <span>{label}</span>}
      {external && label && (
        <IconLinkExternal
          size={variant === FooterVariant.Base ? IconSize.ExtraSmall : IconSize.Small}
          className={styles.icon}
        />
      )}
    </Item>
  );
};

FooterLink.defaultProps = {
  as: Link,
};
