import React, { Children, cloneElement } from 'react';

// import base styles
import '../../../styles/base.css';

import styles from './FooterNavigation.module.scss';
import classNames from '../../../utils/classNames';
import { getChildElementsEvenIfContainerInbetween } from '../../../utils/getChildren';
import { FCWithName } from '../../../common/types';
import { useMediaQueryLessThan } from '../../../hooks/useMediaQuery';

export type FooterNavigationProps = React.PropsWithChildren<{
  /**
   * The aria-label for the `<nav>` element. Describes the navigation to screen reader users.
   */
  navigationAriaLabel?: string;
}>;

export const FooterNavigation = ({ children, navigationAriaLabel }: FooterNavigationProps) => {
  const isMediumScreen = useMediaQueryLessThan('m');
  const groups = getChildElementsEvenIfContainerInbetween(children).filter(
    (child) => (child.type as FCWithName).componentName === 'FooterNavigationGroup',
  );
  const hasGroups = groups && groups.length > 0;

  return (
    <nav
      className={classNames(styles.navigation, hasGroups && !isMediumScreen && styles.sitemap)}
      aria-label={navigationAriaLabel}
    >
      {hasGroups && !isMediumScreen && (
        <div className={styles.groups}>
          {Children.map(groups, (child, index) => {
            return cloneElement(child, {
              key: index,
              hasSubNavLinks: true,
              headingClassName: styles.groupHeading,
            });
          })}
        </div>
      )}
      {hasGroups &&
        isMediumScreen &&
        Children.map(groups, (group, index) => {
          return cloneElement(group.props.children[0], {
            key: index,
            className: styles.link,
          });
        })}
      {!hasGroups && children}
    </nav>
  );
};

FooterNavigation.componentName = 'FooterNavigation';
