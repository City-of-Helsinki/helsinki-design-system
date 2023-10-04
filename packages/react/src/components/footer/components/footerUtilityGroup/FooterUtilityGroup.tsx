import React, { Fragment, cloneElement, isValidElement } from 'react';

// import base styles
import '../../../../styles/base.css';

import styles from './FooterUtilityGroup.module.scss';
import classNames from '../../../../utils/classNames';
import { getChildElementsEvenIfContainersInbetween } from '../../../../utils/getChildren';
import { FooterVariant } from '../../Footer.interface';

type FooterUtilityGroupProps = React.PropsWithChildren<{
  /**
   * Additional class names to apply.
   */
  className?: string;
  /**
   * ID of the group element.
   */
  id?: string;
  /**
   * FooterGroupHeading component to display at the top of the group.
   * @example
   * ```ts
   * headingLink={<Footer.GroupHeading
        href="https://yourpath.com"
        label="Main Page"
      />}
    ```
   */
  headingLink?: React.ReactNode;
}>;
export const FooterUtilityGroup = ({ className, children, id, headingLink }: FooterUtilityGroupProps) => {
  const childElements = getChildElementsEvenIfContainersInbetween(children);
  return (
    <div id={id} className={classNames(styles.utilityGroup, className)}>
      <div className={styles.utilityGroup}>
        {isValidElement(headingLink)
          ? cloneElement(headingLink as React.ReactElement, {
              variant: FooterVariant.Utility,
            })
          : headingLink}
        {childElements.map((child, childIndex) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={childIndex}>
              {isValidElement(child)
                ? cloneElement(child as React.ReactElement, {
                    variant: FooterVariant.Utility,
                  })
                : child}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
FooterUtilityGroup.componentName = 'FooterUtilityGroup';
