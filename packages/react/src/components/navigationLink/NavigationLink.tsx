import React from 'react';

// import core base styles
import 'hds-core';
import styles from './NavigationLink.module.scss';
import classNames from '../../utils/classNames';
import { Link } from '../link';

export type NavigationLinkProps = React.PropsWithChildren<{
  /**
   * Indicator for active link. This is used in HeaderNavigationMenu.
   */
  active?: boolean;
  /**
   * Link content.
   */
  children: string;
  /**
   * Additional class names to apply.
   */
  className?: string;
  /**
   * Hypertext Reference of the link.
   */
  href: string;
  /**
   * Size of the link.
   */
  size?: 'S' | 'M' | 'L';
}>;

export const NavigationLink = ({ children, className, href, size, ...rest }: NavigationLinkProps) => {
  return (
    <Link className={classNames(styles.navigationLink, className)} href={href} size={size} {...rest}>
      {children}
    </Link>
  );
};
