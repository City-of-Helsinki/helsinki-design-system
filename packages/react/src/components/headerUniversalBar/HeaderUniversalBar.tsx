import React, { useContext } from 'react';

// import core base styles
import 'hds-core';
import styles from './HeaderUniversalBar.module.scss';
import { NavigationLink } from '../navigationLink';
import { HeaderContext } from '../header/HeaderContext';

export type HeaderUniversalBarProps = React.PropsWithChildren<{
  /**
   * Additional class names to apply.
   */
  className?: string;
  /**
   * Hypertext reference of the primary link.
   */
  primaryLinkHref: string;
  /**
   * Link text for the primary link.
   */
  primaryLinkText: string;
}>;

export const HeaderUniversalBar = ({ children, primaryLinkHref, primaryLinkText }: HeaderUniversalBarProps) => {
  const { isSmallScreen } = useContext(HeaderContext);
  if (isSmallScreen) return null;
  return (
    <div className={styles.headerUniversalBar}>
      <NavigationLink href={primaryLinkHref}>{primaryLinkText}</NavigationLink>
      <div className={styles.headerUniversalBarSecondaryLinksContainer}>{children}</div>
    </div>
  );
};
