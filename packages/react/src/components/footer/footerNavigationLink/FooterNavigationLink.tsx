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
  ariaLabel,
  as,
  className,
  icon,
  external = false,
  openInNewTab = false,
  openInExternalDomainAriaLabel,
  openInNewTabAriaLabel,
  label,
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
      external={external}
      openInNewTab={openInNewTab}
      openInExternalDomainAriaLabel={openInExternalDomainAriaLabel}
      openInNewTabAriaLabel={openInNewTabAriaLabel}
      {...(openInNewTab && { target: '_blank', rel: 'noopener' })}
      {...((openInNewTab || external || ariaLabel) && { 'aria-label': composedAriaLabel })}
      {...rest}
    >
      {icon}
      {subItem && <IconAngleRight className={styles.subItemIcon} />}
      {label && <span>{label}</span>}
      {external && (
        <IconLinkExternal
          size="s"
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
