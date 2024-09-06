import React, { Fragment, cloneElement, isValidElement } from 'react';

import '../../../../styles/base.module.css';
import styles from './FooterUtilityGroup.module.scss';
import classNames from '../../../../utils/classNames';
import { getChildElementsEvenIfContainersInbetween } from '../../../../utils/getChildren';
import { FooterVariant } from '../../Footer.interface';
import { AllElementPropsWithoutRef } from '../../../../utils/elementTypings';
import { FooterLinkProps } from '../footerLink/FooterLink';

type FooterUtilityGroupProps = React.PropsWithChildren<
  AllElementPropsWithoutRef<'div'> & {
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
  }
>;
export const FooterUtilityGroup = ({ className, children, headingLink, ...rest }: FooterUtilityGroupProps) => {
  const childElements = getChildElementsEvenIfContainersInbetween(children);
  // Footer.Utilities force-feeds "variant" prop to all its children.
  // It will end up in HTML unless removed.
  if ((rest as unknown as FooterLinkProps).variant) {
    Reflect.deleteProperty(rest, 'variant');
  }
  return (
    <div className={classNames(styles.utilityGroup, className)} {...rest}>
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
