import React, { cloneElement, isValidElement } from 'react';

// import base styles
import '../../../../styles/base.css';

import styles from './FooterUtilities.module.scss';
import classNames from '../../../../utils/classNames';

export type FooterUtilitiesProps = {
  /**
   * Description of the navigation links for screen readers.
   */
  ariaLabel?: string;
  /**
   * Children elements to render.
   */
  children: React.ReactNode;
  /**
   * List of Footer.NavigationLink components to display in the social media section.
   */
  soMeLinks?: React.ReactNode[];
  /**
   * Props that will be passed to the native `<section>` element.
   * Can be used to pass aria attributes that describes the SoMe section to screen reader users.
   */
  soMeSectionProps?: React.ComponentPropsWithoutRef<'section'>;
};

export const FooterUtilities = ({ ariaLabel, children, soMeLinks, soMeSectionProps }: FooterUtilitiesProps) => {
  return (
    <div className={styles.utilities} aria-label={ariaLabel}>
      <hr className={styles.divider} aria-hidden />
      <div className={classNames(styles.links, !soMeLinks && styles.widerLinks)}>{children}</div>
      {soMeLinks && (
        <section className={styles.soMe} {...soMeSectionProps}>
          {soMeLinks.map((link, index) => {
            if (isValidElement(link)) {
              /* Set variant to null just in case user set it. It should be null for SoMelinks so it doesn't mess with the styles. */
              return cloneElement(link, { variant: null, key: index });
            }
            return null;
          })}
        </section>
      )}
    </div>
  );
};
