import React, { Children, cloneElement, useContext } from 'react';

// import core base styles
import 'hds-core';
import styles from './HeaderUniversalBar.module.scss';
import { NavigationLink } from '../navigationLink';
import { HeaderContext } from '../header/HeaderContext';
import classNames from '../../utils/classNames';
import { getChildElements } from '../../utils/getChildren';

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
  primaryLinkText: string;
}>;

export const HeaderUniversalBar = ({
  ariaLabel,
  children,
  id,
  primaryLinkHref,
  primaryLinkText,
}: HeaderUniversalBarProps) => {
  const { isSmallScreen } = useContext(HeaderContext);
  if (isSmallScreen) return null;
  const childElements = getChildElements(children);

  return (
    <nav role="navigation" aria-label={ariaLabel} id={id} className={styles.headerUniversalBar}>
      <ul className={styles.headerUniversalBarList}>
        <li className={styles.universalBarMainLinkContainer}>
          <NavigationLink href={primaryLinkHref} label={primaryLinkText} className={styles.universalBarLink} />
        </li>
        {Children.map(childElements, (child, index) => {
          if (React.isValidElement(child)) {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`secondary-link-${index}`} className={styles.universalBarSecondaryLinkContainer}>
                {cloneElement(child, {
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
