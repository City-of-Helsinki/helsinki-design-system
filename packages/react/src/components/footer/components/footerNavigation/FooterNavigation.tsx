import React, { cloneElement, Fragment, isValidElement } from 'react';

// import base styles
import '../../../../styles/base.css';

import styles from './FooterNavigation.module.scss';
import { getChildElementsEvenIfContainersInbetween } from '../../../../utils/getChildren';
import { FooterVariant } from '../../Footer.interface';

export const FooterNavigation = ({ children }) => {
  const childElements = getChildElementsEvenIfContainersInbetween(children);
  return (
    <div className={styles.navigation}>
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
