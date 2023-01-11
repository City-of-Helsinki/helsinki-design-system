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
   * aria-label for describing FooterNavigationGroup.
   */
  ariaLabel?: string;
  className?: string;
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
  id,
  linkClassName,
}: FooterNavigationGroupProps) => {
  const childElements = getChildElementsEvenIfContainerInbetween(children);
  return (
    <nav role="navigation" aria-label={ariaLabel} id={id} className={classNames(styles.navigationGroup, className)}>
      <ul className={classNames(styles.navigationGroupList, styles.denseList)}>
        {Children.map(childElements, (child, index) => {
          if (React.isValidElement(child)) {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>
                {cloneElement(child as React.ReactElement, {
                  className: classNames(child.props.className, styles.navigationGroupLink, linkClassName),
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
