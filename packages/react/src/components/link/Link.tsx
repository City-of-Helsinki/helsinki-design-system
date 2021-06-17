import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Link.module.scss';
import { IconLinkExternal } from '../../icons';
import classNames from '../../utils/classNames';

export type LinkProps = Omit<
  React.ComponentPropsWithoutRef<'a'>,
  'target' | 'href' | 'onPointerEnterCapture' | 'onPointerLeaveCapture' | 'aria-label'
> & {
  /**
   * Link content
   */
  children: string;
  /**
   * Boolean indicating whether visited styles of the link are applied
   */
  enableVisitedStyles?: boolean;
  /**
   * Boolean indicating whether the link will lead user to external domain.
   */
  external?: boolean;
  /**
   * Hypertext Reference of the link.
   */
  href: string;
  /**
   * Boolean indicating whether the link will open in new tab or not.
   */
  openInNewTab?: boolean;
  /**
   * Aria label for opening link in a new tab
   */
  openInNewTabAriaLabel?: string;
  /**
   * Aria label for opening link in an external domain
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
};

export const Link = ({
  children,
  className,
  enableVisitedStyles = true,
  external = false,
  href,
  openInNewTab = false,
  openInExternalDomainAriaLabel,
  openInNewTabAriaLabel,
  style = {},
  size = 'S',
  ...rest
}: LinkProps) => {
  return (
    <a
      className={classNames(
        styles.link,
        styles[`link${size}`],
        enableVisitedStyles ? styles.visitedLink : '',
        className,
      )}
      href={href}
      style={style}
      {...(openInNewTab && { target: '_blank', 'aria-label': openInNewTabAriaLabel || 'Avautuu uudessa välilehdessä' })}
      {...rest}
    >
      {children}
      {external && (
        <IconLinkExternal
          className={classNames(styles.icon, styles[`icon${size}`])}
          aria-label={openInExternalDomainAriaLabel || 'Avautuu uuteen domainiin.'}
        />
      )}
    </a>
  );
};
