import React, { cloneElement } from 'react';

// import base styles
import '../../../../styles/base.css';
import styles from './HeaderUniversalBar.module.scss';
import { NavigationLink } from '../navigationLink';
import { useHeaderContext } from '../../HeaderContext';
import classNames from '../../../../utils/classNames';
import { getChildElementsEvenIfContainersInbetween } from '../../../../utils/getChildren';

export type HeaderUniversalBarProps = React.PropsWithChildren<{
  /**
   * Additional class names to apply.
   */
  className?: string;
  /**
   * Children are expected to be NavigationLink components or a container with NavigationLink components inside.
   */
  children?: React.ReactNode;
  /**
   * ID of the header element.
   */
  id?: string;
  /**
   * Hypertext reference of the primary link.
   * @default 'https://hel.fi'
   */
  primaryLinkHref?: string;
  /**
   * Link text for the primary link.
   * @default 'Helsingin kaupunki'
   */
  primaryLinkText?: string;
}>;

export const HeaderUniversalBar = ({
  className,
  children,
  id,
  primaryLinkHref,
  primaryLinkText,
}: HeaderUniversalBarProps) => {
  const { isNotLargeScreen } = useHeaderContext();
  if (isNotLargeScreen) return null;
  const childElements = getChildElementsEvenIfContainersInbetween(children);

  return (
    <div className={styles.headerUniversalBarContainer}>
      <div id={id} className={classNames(styles.headerUniversalBar, className)}>
        <ul className={styles.headerUniversalBarList}>
          <li className={styles.universalBarMainLinkContainer}>
            <NavigationLink href={primaryLinkHref} label={primaryLinkText} className={styles.universalBarLink} />
          </li>
          {childElements.map((child, index) => {
            if (React.isValidElement(child)) {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <li key={`secondary-link-${index}`} className={styles.universalBarSecondaryLinkContainer}>
                  {cloneElement(child as React.ReactElement, {
                    className: classNames(child.props.className, styles.universalBarLink),
                  })}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    </div>
  );
};
