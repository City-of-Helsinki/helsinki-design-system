import React, { cloneElement, Fragment, isValidElement } from 'react';

import '../../../../styles/base.module.css';
import styles from './FooterNavigation.module.scss';
import { getChildElementsEvenIfContainersInbetween } from '../../../../utils/getChildren';
import { FooterVariant } from '../../Footer.interface';

export type FooterNavigationProps = React.PropsWithChildren<{
  /**
   * aria-label for describing Footer.Navigation.
   */
  ariaLabel?: string;
  /**
   * ARIA role to describe the contents.
   */
  role?: string;
}>;
export const FooterNavigation = ({ ariaLabel, children, role }: FooterNavigationProps) => {
  const childElements = getChildElementsEvenIfContainersInbetween(children);
  return (
    <div className={styles.navigation} aria-label={ariaLabel} role={role}>
      {childElements.map((child, childIndex) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={childIndex}>
            {isValidElement(child)
              ? cloneElement(child as React.ReactElement, {
                  variant: FooterVariant.Navigation,
                })
              : child}
          </Fragment>
        );
      })}
    </div>
  );
};

FooterNavigation.componentName = 'FooterNavigation';
