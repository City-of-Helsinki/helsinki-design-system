import React, { Children, cloneElement } from 'react';

// import core base styles
import 'hds-core';
import styles from './FooterNavigationGroup.module.scss';
import { getChildElementsEvenIfContainerInbetween } from '../../../utils/getChildren';
import classNames from '../../../utils/classNames';
import { FCWithName } from '../../../common/types';

type FooterNavigationGroupProps = React.PropsWithChildren<{
  /**
   * aria-label for describing FooterNavigationGroup.
   */
  ariaLabel?: string;
  className?: string;
  /**
   * Does FooterNavigationGroup have sub links which will then be rendered differently.
   * @internal
   */
  hasSubNavLinks?: boolean;
  /**
   * Class name for heading item.
   * @internal
   */
  headingClassName?: string;
  /**
   * ID of the navigation element.
   */
  id?: string;
  /**
   * Class name for link item.
   * @internal
   */
  linkClassName?: string;
}>;
export const FooterNavigationGroup = ({
  ariaLabel,
  className,
  children,
  hasSubNavLinks,
  headingClassName,
  id,
  linkClassName,
}: FooterNavigationGroupProps) => {
  const childElements = getChildElementsEvenIfContainerInbetween(children);
  return (
    <nav role="navigation" aria-label={ariaLabel} id={id} className={classNames(styles.navigationGroup, className)}>
      <ul className={classNames(styles.navigationGroupList, hasSubNavLinks && styles.denseList)}>
        {Children.map(childElements, (child, index) => {
          if (React.isValidElement(child)) {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index} className={styles.navigationGroupLinkContainer}>
                {cloneElement(child as React.ReactElement, {
                  className: classNames(
                    child.props.className,
                    (child.type as FCWithName).componentName === 'FooterNavigationHeading' && headingClassName,
                    styles.navigationGroupLink,
                    linkClassName,
                  ),
                  ...(hasSubNavLinks && { subItem: true }),
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
