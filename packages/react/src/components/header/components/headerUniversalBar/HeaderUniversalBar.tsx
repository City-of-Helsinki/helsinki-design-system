import React, { cloneElement, useContext } from 'react';

// import core base styles
import 'hds-core';
import styles from './HeaderUniversalBar.module.scss';
import { NavigationLink } from '../navigationLink';
import { HeaderContext } from '../../HeaderContext';
import classNames from '../../../../utils/classNames';

export type HeaderUniversalBarProps = {
  /**
   * aria-label for describing universal bar.
   */
  ariaLabel?: string;
  /**
   * Additional class names to apply.
   */
  className?: string;
  /**
   * Items are expected to be NavigationLink components.
   */
  items?: React.ReactNode[];
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
};

export const HeaderUniversalBar = ({
  ariaLabel,
  items,
  id,
  primaryLinkHref,
  primaryLinkText,
}: HeaderUniversalBarProps) => {
  const { isSmallScreen } = useContext(HeaderContext);
  if (isSmallScreen) return null;

  return (
    <nav role="navigation" aria-label={ariaLabel} id={id} className={styles.headerUniversalBar}>
      <ul className={styles.headerUniversalBarList}>
        <li className={styles.universalBarMainLinkContainer}>
          <NavigationLink href={primaryLinkHref} label={primaryLinkText} className={styles.universalBarLink} />
        </li>
        {items &&
          items.map((child, index) => {
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
