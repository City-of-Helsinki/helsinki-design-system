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
  navigationAriaLabel?: string;
  /**
   * Defines how the navigation items will be displayed in the footer
   *
   * Supported values:
   *
   * `default` - Items will be displayed beneath the logo and title
   *
   * `minimal` - Items will be displayed inline with the logo and title. Intended to be used with 4 items or less.
   *
   * `sitemap` - Items will be displayed beneath the logo and title as groups with items and sub-items...
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

FooterNavigation.componentName = 'FooterNavigation';
