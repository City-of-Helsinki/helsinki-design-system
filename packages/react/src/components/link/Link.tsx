import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Link.module.scss';
import { IconLinkExternal } from '../../icons';
import classNames from '../../utils/classNames';
import { getTextFromReactChildren } from '../../utils/getTextFromReactChildren';

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

type LinkToIconSizeMappingType = {
  L: 'l';
  M: 's';
  S: 'xs';
};

export const Link = ({
  children,
  className,
  disableVisitedStyles = false,
  external = false,
  href,
  openInNewTab = false,
  openInExternalDomainAriaLabel,
  openInNewTabAriaLabel,
  style = {},
  size = 'S',
  ...rest
}: LinkProps) => {
  const comboseAriaLabel = () => {
    let childrenText = getTextFromReactChildren(children);
    const newTabText = openInNewTab ? openInNewTabAriaLabel || 'Avautuu uudessa välilehdessä.' : '';
    const externalText = external ? openInExternalDomainAriaLabel || 'Avautuu uuteen domainiin.' : '';

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

  return (
    <a
      className={classNames(
        styles.link,
        styles[`link${size}`],
        disableVisitedStyles ? styles.disableVisitedStyles : '',
        className,
      )}
      href={href}
      style={style}
      {...(openInNewTab && { target: '_blank' })}
      {...((openInNewTab || external) && { 'aria-label': comboseAriaLabel() })}
      {...rest}
    >
      {children}
      {external && (
        <IconLinkExternal
          size={mapLinkSizeToExternalIconSize[size]}
          className={classNames(
            styles.icon,
            styles[size === 'L' ? 'verticalAlignBigIcon' : 'verticalAlignSmallOrMediumIcon'],
          )}
          aria-hidden
        />
      )}
    </a>
  );
};
