import React, { cloneElement, Fragment, isValidElement } from 'react';

import '../../../../styles/base.module.css';
import styles from './FooterNavigationGroup.module.scss';
import { FooterVariant } from '../../Footer.interface';
import { useMediaQueryLessThan } from '../../../../hooks/useMediaQuery';
import classNames from '../../../../utils/classNames';
import { getChildElementsEvenIfContainersInbetween } from '../../../../utils/getChildren';
import { AllElementPropsWithoutRef } from '../../../../utils/elementTypings';

export type FooterNavigationGroupProps = React.PropsWithChildren<
  AllElementPropsWithoutRef<'div'> & {
    /**
     * Additional class names to apply.
     */
    className?: string;
    /**
     * ID of the navigation group element.
     */
    id?: string;
    /**
   * Footer.GroupHeading component to display at the top of the group. On smaller screens only this will be displayed.
   * @example
   * ```ts
   * headingLink={<Footer.GroupHeading
        href="https://yourpath.com"
        label="Main Page"
      />}
    ```
   */
    headingLink: React.ReactNode;
  }
>;
export const FooterNavigationGroup = ({ className, children, headingLink, ...rest }: FooterNavigationGroupProps) => {
  // Show only main links in smaller screens
  const shouldRenderOnlyMainLinks = useMediaQueryLessThan('l');
  const childElements = getChildElementsEvenIfContainersInbetween(children);

  const renderHeading = () => {
    if (isValidElement(headingLink)) {
      return cloneElement(headingLink as React.ReactElement, {
        variant: FooterVariant.Navigation,
      });
    }
    return headingLink;
  };
  // Return headingLink inside a Fragment to avoid erronous return type 'Element | { headingLink: ReactNode; }'.
  return shouldRenderOnlyMainLinks ? (
    <>{renderHeading()}</>
  ) : (
    <div {...rest} className={classNames(styles.navigationGroup, className)}>
      <div className={styles.navigationGroupList}>
        {renderHeading()}
        {childElements.map((child, childIndex) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={childIndex}>
              {isValidElement(child)
                ? cloneElement(child as React.ReactElement, {
                    variant: FooterVariant.Navigation,
                    subItem: true,
                  })
                : child}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
FooterNavigationGroup.componentName = 'FooterNavigationGroup';
