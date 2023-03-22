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
   * aria-label for describing universal bar.
   */
  ariaLabel?: string;
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
   */
  primaryLinkHref: string;
  /**
   * Link text for the primary link.
   */
  primaryLinkText?: string;
}>;

export const HeaderUniversalBar = ({
  ariaLabel,
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
    <nav role="navigation" aria-label={ariaLabel} id={id} className={classNames(styles.headerUniversalBar, className)}>
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
    </nav>
  );
};
