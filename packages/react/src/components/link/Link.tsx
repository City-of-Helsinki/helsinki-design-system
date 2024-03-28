import React from 'react';

import '../../styles/base.module.css';
import styles from './Link.module.scss';
import { IconLinkExternal } from '../../icons';
import classNames from '../../utils/classNames';
import { getTextFromReactChildren } from '../../utils/getTextFromReactChildren';

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
  /**
   * Style the link as a button
   */
  useButtonStyles?: boolean;
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
      useButtonStyles = false,
      ...rest
    }: LinkProps,
    ref: React.Ref<HTMLAnchorElement>,
  ) => {
    const composeAriaLabel = () => {
      let childrenText = ariaLabel || getTextFromReactChildren(children);
      const newTabText = openInNewTab ? openInNewTabAriaLabel || 'Avautuu uudessa välilehdessä.' : '';
      const externalText = external ? openInExternalDomainAriaLabel || 'Siirtyy toiseen sivustoon.' : '';

      if (childrenText && childrenText.slice(-1) !== '.') {
        childrenText = `${childrenText}.`;
      }

      return [childrenText, newTabText, externalText].filter((text) => text).join(' ');
    };

    const mapLinkSizeToExternalIconSize: LinkToIconSizeMappingType = {
      L: 'l',
      M: 's',
      S: 'xs',
    };
    const mapLinkSizeToIconVerticalStyling = {
      L: styles.verticalAlignBigIcon,
      M: styles.verticalAlignMediumIcon,
      S: styles.verticalAlignSmallIcon,
    };

    const linkStyles = classNames(
      styles.link,
      styles[`link${size}`],
      disableVisitedStyles ? styles.disableVisitedStyles : '',
    );

    return (
      <a
        aria-label={ariaLabel}
        className={classNames(!useButtonStyles ? linkStyles : styles.button, className)}
        href={href}
        style={style}
        {...(openInNewTab && { target: '_blank', rel: 'noopener' })}
        {...((openInNewTab || external || ariaLabel) && { 'aria-label': composeAriaLabel() })}
        ref={ref}
        {...rest}
      >
        {iconLeft && (
          <span className={styles.iconLeft} aria-hidden="true">
            {iconLeft}
          </span>
        )}
        {useButtonStyles ? <span className={styles.buttonLabel}>{children}</span> : children}
        {external && (
          <IconLinkExternal
            size={mapLinkSizeToExternalIconSize[size]}
            className={classNames(styles.icon, mapLinkSizeToIconVerticalStyling[size])}
            aria-hidden
          />
        )}
      </a>
    );
  },
);
