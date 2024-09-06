import React, { cloneElement, Fragment, isValidElement } from 'react';

import '../../../../styles/base.module.css';
import styles from './FooterNavigation.module.scss';
import { getChildElementsEvenIfContainersInbetween } from '../../../../utils/getChildren';
import { FooterVariant } from '../../Footer.interface';
import { AllElementPropsWithoutRef } from '../../../../utils/elementTypings';
import classNames from '../../../../utils/classNames';

export type FooterNavigationProps = React.PropsWithChildren<
  AllElementPropsWithoutRef<'div'> & {
    /**
     * ARIA role to describe the contents.
     */
    role?: string;
  }
>;
export const FooterNavigation = ({ children, className, ...rest }: FooterNavigationProps) => {
  const childElements = getChildElementsEvenIfContainersInbetween(children);
  return (
    <div {...rest} className={classNames(styles.navigation, className)}>
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
