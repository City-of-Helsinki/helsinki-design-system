import React, { useContext, useEffect } from 'react';

// import core base styles
import 'hds-core';
import styles from './FooterNavigation.module.scss';
import { FooterContext } from '../FooterContext';
import { FooterNavigationVariant } from '../Footer.interface';
import classNames from '../../../utils/classNames';

export type FooterNavigationProps = React.PropsWithChildren<{
  /**
   * The aria-label for the `<nav>` element. Describes the navigation to screen reader users.
   */
  navigationAriaLabel: string;
  /**
   * todo
   */
  variant?: FooterNavigationVariant;
}>;

export const FooterNavigation = ({ children, navigationAriaLabel, variant }: FooterNavigationProps) => {
  const { dispatch } = useContext(FooterContext);

  useEffect(() => dispatch({ type: 'NAVIGATION_VARIANT', value: variant }), [dispatch, variant]);

  return (
    <nav className={classNames(styles.navigation, styles[variant])} aria-label={navigationAriaLabel}>
      {children}
    </nav>
  );
};
