import React, { Children, cloneElement } from 'react';

// import core base styles
import 'hds-core';
import styles from './FooterUtilityGroup.module.scss';
import { getChildElementsEvenIfContainerInbetween } from '../../../utils/getChildren';
import classNames from '../../../utils/classNames';
import { FooterVariant } from '../Footer.interface';

type FooterUtilityGroupProps = React.PropsWithChildren<{
  /**
   * aria-label for describing FooterUtilityGroup.
   */
  ariaLabel?: string;
  className?: string;
  /**
   * ID of the navigation element.
   */
  id?: string;
}>;
export const FooterUtilityGroup = ({ ariaLabel, className, children, id }: FooterUtilityGroupProps) => {
  const childElements = getChildElementsEvenIfContainerInbetween(children);

  return (
    <nav role="navigation" aria-label={ariaLabel} id={id} className={classNames(styles.utilityGroup, className)}>
      <ul className={styles.utilityGroupList}>
        {Children.map(childElements, (child, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} className={styles.utilityGroupLinkContainer}>
              {cloneElement(child, {
                variant: FooterVariant.Utility,
              })}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
FooterUtilityGroup.componentName = 'FooterUtilityGroup';
