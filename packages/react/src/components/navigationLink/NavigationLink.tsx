import React from 'react';

// import core base styles
import 'hds-core';
import styles from './NavigationLink.module.scss';
import classNames from '../../utils/classNames';
import { Link } from '../link';

export type NavigationLinkProps = Omit<
  React.ComponentPropsWithoutRef<'a'>,
  'target' | 'href' | 'onPointerEnterCapture' | 'onPointerLeaveCapture' | 'aria-label'
> & {
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
  href?: string;
  /**
   * Size of the link.
   */
  size?: 'S' | 'M' | 'L';
};

export const NavigationLink = ({ active, children, className, href, size, ...rest }: NavigationLinkProps) => {
  return (
    <Link
      className={classNames(styles.navigationLink, className)}
      href={href}
      size={size}
      {...rest}
      {...(active && { active: 'true' })}
    >
      {children}
    </Link>
  );
};
