import React from 'react';

// import base styles
import '../../styles/base.css';

import styles from './Link.module.scss';
import { IconLinkExternal } from '../../icons';
import classNames from '../../utils/classNames';
import { getTextFromReactChildren } from '../../utils/getTextFromReactChildren';
import getLinkAriaLabel from '../../utils/getLinkAriaLabel';

export type LinkProps = {
  /**
   * aria-label for providing detailed information for screen readers about a link text.
   */
  ariaLabel?: string;
  /**
   * Link content
   */
  children: React.ReactNode;
  /**
   * Boolean indicating whether visited styles of the link are applied
   */
  disableVisitedStyles?: boolean;
  /**
   * Boolean indicating whether the link will lead user to external domain.
   */
  external?: boolean;
  /**
   * Hypertext Reference of the link.
   */
  href: string;
  /**
   * Element placed on the left side of the link text
   */
  iconLeft?: React.ReactNode;
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
   * Size of the link
   */
  size?: 'S' | 'M' | 'L';
  /**
   * Additional styles
   */
  style?: React.CSSProperties;
} & Omit<
  React.ComponentPropsWithoutRef<'a'>,
  'target' | 'href' | 'onPointerEnterCapture' | 'onPointerLeaveCapture' | 'aria-label'
>;

type LinkToIconSizeMappingType = {
  L: 'l';
  M: 's';
  S: 'xs';
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      ariaLabel,
      children,
      className,
      disableVisitedStyles = false,
      external = false,
      href,
      iconLeft,
      openInNewTab = false,
      openInExternalDomainAriaLabel,
      openInNewTabAriaLabel,
      style = {},
      size = 'M',
      ...rest
    }: LinkProps,
    ref: React.Ref<HTMLAnchorElement>,
  ) => {
    const composedAriaLabel = getLinkAriaLabel(
      ariaLabel,
      getTextFromReactChildren(children),
      openInNewTabAriaLabel,
      openInExternalDomainAriaLabel,
      external,
      openInNewTab,
    );

    const mapLinkSizeToExternalIconSize: LinkToIconSizeMappingType = {
      L: 'l',
      M: 's',
      S: 'xs',
    };

    return (
      <a
        aria-label={ariaLabel}
        className={classNames(
          styles.link,
          styles[`link${size}`],
          disableVisitedStyles ? styles.disableVisitedStyles : '',
          className,
        )}
        href={href}
        style={style}
        {...(openInNewTab && { target: '_blank', rel: 'noopener' })}
        {...((openInNewTab || external || ariaLabel) && { 'aria-label': composedAriaLabel })}
        ref={ref}
        {...rest}
      >
        {iconLeft && (
          <span className={styles.iconLeft} aria-hidden="true">
            {iconLeft}
          </span>
        )}
        {children}
        {external && (
          <IconLinkExternal
            size={mapLinkSizeToExternalIconSize[size]}
            className={classNames(
              styles.icon,
              size === 'L' ? styles.verticalAlignBigIcon : styles.verticalAlignSmallOrMediumIcon,
            )}
            aria-hidden
          />
        )}
      </a>
    );
  },
);
