import React, { cloneElement, Fragment, isValidElement } from 'react';

// import base styles
import '../../../../styles/base.css';

import styles from './FooterUtilities.module.scss';
import classNames from '../../../../utils/classNames';
import { getChildElementsEvenIfContainersInbetween } from '../../../../utils/getChildren';
import { FooterVariant } from '../../Footer.interface';

export type FooterUtilitiesProps = {
  /**
   * aria-label for describing Footer.Utilities.
   */
  ariaLabel?: string;
  /**
   * Children elements to render.
   */
  children: React.ReactNode;
  /**
   * List of Link components to display in the social media section.
   */
  soMeLinks?: React.ReactNode[];
  /**
   * Props that will be passed to the native `<section>` element.
   * Can be used to pass aria attributes that describes the SoMe section to screen reader users.
   */
  soMeSectionProps?: React.ComponentPropsWithoutRef<'section'>;
  /**
   * ARIA role to describe the contents.
   */
  role?: string;
};

export const FooterUtilities = ({ ariaLabel, children, soMeLinks, soMeSectionProps, role }: FooterUtilitiesProps) => {
  const childElements = getChildElementsEvenIfContainersInbetween(children);
  return (
    <div className={styles.utilities} aria-label={ariaLabel} role={role}>
      <hr className={styles.divider} aria-hidden />
      <div className={classNames(styles.links, !soMeLinks && styles.widerLinks)}>
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
      {soMeLinks && (
        <section className={styles.soMe} {...soMeSectionProps}>
          {soMeLinks.map((link, index) => {
            if (isValidElement(link)) {
              /* Set variant to null just in case user set it. It should be null for SoMelinks so it doesn't mess with the styles. */
              // eslint-disable-next-line react/no-array-index-key
              return cloneElement(link, { variant: null, key: index });
            }
            return null;
          })}
        </section>
      )}
    </div>
  );
};
