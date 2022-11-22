import React, { Children, cloneElement, useCallback, useContext } from 'react';

// import core base styles
import 'hds-core';
import styles from './HeaderUniversalBar.module.scss';
import { NavigationLink } from '../navigationLink';
import { HeaderContext } from '../header/HeaderContext';
import classNames from '../../utils/classNames';

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
  primaryLinkHref,
  primaryLinkText,
}: HeaderUniversalBarProps) => {
  const { isSmallScreen } = useContext(HeaderContext);
  if (isSmallScreen) return null;
  const arrayChildren = Children.toArray(children);
  const childrenHasContainer = arrayChildren.length === 1 && Array.isArray(arrayChildren[0]);
  /* If user gives a container element, we dig out the child links in order to have correct styles for them. */
  const getChildElements = useCallback(() => {
    if (childrenHasContainer && React.isValidElement(arrayChildren[0])) {
      return Children.toArray(arrayChildren[0].props.children);
    }
    return arrayChildren;
  }, [arrayChildren, childrenHasContainer]);

  return (
    <nav role="navigation" aria-label={ariaLabel} className={styles.headerUniversalBar}>
      <ul className={styles.headerUniversalBarList}>
        <li className={styles.universalBarMainLinkContainer}>
          <NavigationLink href={primaryLinkHref} className={styles.universalBarLink}>
            {primaryLinkText}
          </NavigationLink>
        </li>
        {Children.map(getChildElements(), (child) => {
          if (React.isValidElement(child)) {
            return (
              <>
                <li className={styles.universalBarSecondaryLinkContainer}>
                  {cloneElement(child, {
                    className: classNames(child.props.className, styles.universalBarLink),
                  })}
                </li>
              </>
            );
          }
          return null;
        })}
      </ul>
    </nav>
  );
};
