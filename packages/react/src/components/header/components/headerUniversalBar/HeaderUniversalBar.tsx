import React, { cloneElement, useEffect } from 'react';

import '../../../../styles/base.module.css';
import styles from './HeaderUniversalBar.module.scss';
import { HeaderLink } from '../headerLink/HeaderLink';
import { useHeaderContext, useSetHeaderContext } from '../../HeaderContext';
import classNames from '../../../../utils/classNames';
import { getChildElementsEvenIfContainersInbetween } from '../../../../utils/getChildren';

export type HeaderUniversalBarProps = React.PropsWithChildren<{
  /**
   * Aria-label for describing UniversalBar.
   */
  ariaLabel?: string;
  /**
   * Additional class names to apply.
   */
  className?: string;
  /**
   * Children are expected to be HeaderLink components or a container with HeaderLink components inside.
   */
  children?: React.ReactNode;
  /**
   * ID of the header element.
   */
  id?: string;
  /**
   * Hypertext reference of the primary link.
   */
  primaryLinkHref?: string;
  /**
   * Link text for the primary link.
   */
  primaryLinkText?: string;
  /**
   * ARIA role to describe the contents.
   */
  role?: string;
}>;

export const HeaderUniversalBar = ({
  ariaLabel,
  className,
  children,
  id,
  primaryLinkHref,
  primaryLinkText,
  role,
}: HeaderUniversalBarProps) => {
  const { isNotLargeScreen } = useHeaderContext();
  const childElements = getChildElementsEvenIfContainersInbetween(children);
  const { setUniversalContent } = useSetHeaderContext();

  useEffect(() => {
    const universalContent = getChildElementsEvenIfContainersInbetween(children);
    setUniversalContent(universalContent);
  }, [children]);

  if (isNotLargeScreen) return null;

  return (
    <div className={styles.headerUniversalBarContainer}>
      <div role={role} aria-label={ariaLabel} id={id} className={classNames(styles.headerUniversalBar, className)}>
        <ul className={styles.headerUniversalBarList}>
          <li className={styles.universalBarMainLinkContainer}>
            <HeaderLink href={primaryLinkHref} label={primaryLinkText} className={styles.universalBarLink} />
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
