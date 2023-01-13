import React, { Children, cloneElement } from 'react';

// import core base styles
import 'hds-core';
import styles from './FooterNavigationGroup.module.scss';
import { getChildElementsEvenIfContainerInbetween } from '../../../utils/getChildren';
import classNames from '../../../utils/classNames';
import { FCWithName } from '../../../common/types';
import { FooterVariant } from '../Footer.interface';

type FooterNavigationGroupProps = React.PropsWithChildren<{
  /**
   * Description of the navigation group for screen readers.
   */
  ariaLabelledBy?: string;
  /**
   * Additional class names to apply.
   */
  className?: string;
  /**
   * ID of the navigation element.
   */
  id?: string;
}>;
export const FooterNavigationGroup = ({ ariaLabelledBy, className, children, id }: FooterNavigationGroupProps) => {
  const childElements = getChildElementsEvenIfContainerInbetween(children);
  return (
    <nav
      role="navigation"
      aria-labelledby={ariaLabelledBy}
      id={id}
      className={classNames(styles.navigationGroup, className)}
    >
      <ul className={classNames(styles.navigationGroupList, styles.denseList)}>
        {Children.map(childElements, (child, index) => {
          if (React.isValidElement(child)) {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>
                {cloneElement(child, {
                  ...((child.type as FCWithName).componentName !== 'FooterNavigationHeading' && {
                    subItem: true,
                  }),
                  variant: FooterVariant.Navigation,
                })}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </nav>
  );
};
FooterNavigationGroup.componentName = 'FooterNavigationGroup';
