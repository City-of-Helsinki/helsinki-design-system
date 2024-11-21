import React from 'react';

import '../../styles/base.module.css';
import styles from './Link.module.scss';
import { IconLinkExternal } from '../../icons';
import classNames from '../../utils/classNames';
import { getTextFromReactChildren } from '../../utils/getTextFromReactChildren';
import { AllElementPropsWithoutRef, MergeAndOverrideProps } from '../../utils/elementTypings';
import { IconSize } from '../../icons/Icon.interface';

export enum LinkSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type LinkProps = MergeAndOverrideProps<
  AllElementPropsWithoutRef<'a'>,
  {
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
    iconStart?: React.ReactNode;
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
    size?: LinkSize;
    /**
     * Additional styles
     */
    style?: React.CSSProperties;
    /**
     * Style the link as a button
     */
    useButtonStyles?: boolean;
  }
>;

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      // aria-label is picked from "...rest", because it is sometimes built from props
      // and "...rest"  would override the built one.
      'aria-label': ariaLabel,
      children,
      className,
      disableVisitedStyles = false,
      external = false,
      href,
      iconStart,
      openInNewTab = false,
      openInExternalDomainAriaLabel,
      openInNewTabAriaLabel,
      style = {},
      size = LinkSize.Medium,
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

    const mapLinkSizeToExternalIconSize = {
      [LinkSize.Large]: IconSize.Large,
      [LinkSize.Medium]: IconSize.Small,
      [LinkSize.Small]: IconSize.ExtraSmall,
    };
    const mapLinkSizeToIconVerticalStyling = {
      [LinkSize.Large]: styles.verticalAlignBigIcon,
      [LinkSize.Medium]: styles.verticalAlignMediumIcon,
      [LinkSize.Small]: styles.verticalAlignSmallIcon,
    };

    const linkStyles = classNames(
      styles.link,
      styles[`link-${size}`],
      disableVisitedStyles ? styles.disableVisitedStyles : '',
    );

    return (
      <a
        className={classNames(!useButtonStyles ? linkStyles : styles.button, className)}
        href={href}
        style={style}
        {...(openInNewTab && { target: '_blank', rel: 'noopener' })}
        {...((openInNewTab || external || ariaLabel) && { 'aria-label': composeAriaLabel() })}
        ref={ref}
        {...rest}
      >
        {iconStart && (
          <span className={styles.iconStart} aria-hidden="true">
            {iconStart}
          </span>
        )}
        {useButtonStyles ? <span className={styles.buttonLabel}>{children}</span> : children}
        {external && (
          <IconLinkExternal
            size={mapLinkSizeToExternalIconSize[size]}
            className={classNames(styles.icon, mapLinkSizeToIconVerticalStyling[size])}
          />
        )}
      </a>
    );
  },
);
