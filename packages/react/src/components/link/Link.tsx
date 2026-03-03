import React from 'react';

import '../../styles/base.module.css';
import styles from './Link.module.scss';
import { IconLinkExternal } from '../../icons';
import classNames from '../../utils/classNames';
import { getPlainTextContent } from '../../utils/getPlainTextContent';
import { AllElementPropsWithoutRef, MergeAndOverrideProps } from '../../utils/elementTypings';

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
     * Element placed on the start side of the link text
     */
    iconStart?: React.ReactNode;
    /**
     * Element placed on the end side of the link text
     */
    iconEnd?: React.ReactNode;
    /**
     * Boolean indicating whether the link will open in new tab or not.
     */
    openInNewTab?: boolean;
    /**
     * Visible label appended when the link opens in a new tab (default: '(avautuu uudessa välilehdessä)').
     */
    openInNewTabLabel?: string;
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
      iconEnd,
      openInNewTab = false,
      openInExternalDomainAriaLabel,
      openInNewTabLabel,
      style = {},
      size,
      useButtonStyles = false,
      ...rest
    }: LinkProps,
    ref: React.Ref<HTMLAnchorElement>,
  ) => {
    const composeAriaLabel = () => {
      let childrenText = ariaLabel || getPlainTextContent(children);
      const externalText = external ? openInExternalDomainAriaLabel || 'Siirtyy toiseen sivustoon.' : '';

      if (childrenText && childrenText.slice(-1) !== '.') {
        childrenText = `${childrenText}.`;
      }

      return [childrenText, externalText].filter((text) => text).join(' ');
    };

    const newTabLabel = openInNewTabLabel ?? 'avautuu uudessa välilehdessä';

    const renderChildren = () => {
      if (!openInNewTab) {
        return useButtonStyles ? <span className={styles.buttonLabel}>{children}</span> : children;
      }
      if (typeof children === 'string' && children.endsWith(')')) {
        const lastParen = children.lastIndexOf(')');
        const modified = `${children.slice(0, lastParen)}, ${newTabLabel}${children.slice(lastParen)}`;
        return useButtonStyles ? <span className={styles.buttonLabel}>{modified}</span> : modified;
      }
      const newTabFragment = <span style={{ whiteSpace: 'pre' }}> {`(${newTabLabel})`}</span>;
      return useButtonStyles ? (
        <span className={styles.buttonLabel}>
          {children}
          {newTabFragment}
        </span>
      ) : (
        <>
          {children}
          {newTabFragment}
        </>
      );
    };

    const linkStyles = classNames(
      styles.link,
      size ? styles[`link-${size}`] : '',
      disableVisitedStyles ? styles.disableVisitedStyles : '',
      iconStart ? styles.hasIconStart : '',
      iconEnd || external ? styles.hasIconEnd : '',
    );

    const resolvedAriaLabel = external ? composeAriaLabel() : ariaLabel ?? undefined;

    return (
      <a
        className={classNames(!useButtonStyles ? linkStyles : styles.button, className)}
        href={href}
        style={style}
        {...(openInNewTab && { target: '_blank', rel: 'noopener' })}
        {...(resolvedAriaLabel && { 'aria-label': resolvedAriaLabel })}
        ref={ref}
        {...rest}
      >
        {iconStart ? (
          <div style={{ display: 'contents' }} aria-hidden>
            {iconStart}
          </div>
        ) : null}
        {renderChildren()}
        {external || iconEnd ? (
          <div style={{ display: 'contents' }} aria-hidden>
            {external ? <IconLinkExternal /> : iconEnd}
          </div>
        ) : null}
      </a>
    );
  },
);
