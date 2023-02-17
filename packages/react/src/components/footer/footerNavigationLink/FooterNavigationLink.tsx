import React from 'react';

// import base styles
import '../../../styles/base.css';

import styles from './FooterNavigationLink.module.scss';
import { MergeElementProps } from '../../../common/types';
import classNames from '../../../utils/classNames';
import getLinkAriaLabel from '../../../utils/getLinkAriaLabel';
import { IconAngleRight, IconLinkExternal } from '../../../icons';
import { FooterVariant } from '../Footer.interface';

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
   * The label for the item.
   */
  label?: string;
  /**
   * Set this to display a separating line before the link. Used in Footer.Base
   */
  separator?: boolean;
  /**
   * Set this if this item appears in footer navigation group.
   */
  subItem?: boolean;
  /**
   * Internal variant to change styles based on context.
   */
  variant?: FooterVariant.Navigation | FooterVariant.Utility | FooterVariant.Base;
}>;

export type FooterNavigationLinkProps<Element extends React.ElementType = 'a'> = MergeElementProps<
  Element,
  ItemProps<Element>
>;

export const FooterNavigationLink = <T extends React.ElementType = 'a'>({
  ariaLabel,
  as,
  className,
  icon,
  external = false,
  label,
  openInNewTab = false,
  openInExternalDomainAriaLabel,
  openInNewTabAriaLabel,
  separator,
  subItem = false,
  variant,
  ...rest
}: FooterNavigationLinkProps<T>) => {
  const Item: React.ElementType = as;
  const composedAriaLabel = getLinkAriaLabel(
    ariaLabel,
    label,
    openInNewTabAriaLabel,
    openInExternalDomainAriaLabel,
    external,
    openInNewTab,
  );

  return (
    // @ts-ignore
    <Item
      aria-label={ariaLabel}
      className={classNames(styles.item, subItem && styles.subItem, variant && styles[variant], className)}
      {...(openInNewTab && { target: '_blank', rel: 'noopener' })}
      {...((openInNewTab || external || ariaLabel) && { 'aria-label': composedAriaLabel })}
      {...rest}
    >
      {separator && <span className={styles.separator}>|</span>}
      {icon}
      {subItem && <IconAngleRight className={styles.subItemIcon} />}
      {label && <span>{label}</span>}
      {external && (
        <IconLinkExternal
          size={variant === FooterVariant.Base ? 'xs' : 's'}
          className={classNames(styles.icon, styles.verticalAlignSmallOrMediumIcon)}
          aria-hidden
        />
      )}
    </Item>
  );
};

FooterNavigationLink.defaultProps = {
  as: 'a',
};
