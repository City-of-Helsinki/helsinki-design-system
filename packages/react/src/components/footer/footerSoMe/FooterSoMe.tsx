import React from 'react';

// import core base styles
import 'hds-core';
import styles from './FooterSoMe.module.scss';

export type FooterSoMeProps = React.PropsWithChildren<{
  /**
   * Props that will be passed to the native `<section>` element.
   * Can be used to pass aria attributes that describes the SoMe section to screen reader users.
   */
  soMeSectionProps?: React.ComponentPropsWithoutRef<'section'>;
}>;

export const FooterSoMe = ({ children, soMeSectionProps }: FooterSoMeProps) => (
  <section className={styles.soMe} {...soMeSectionProps}>
    {children}
  </section>
);
FooterSoMe.componentName = 'FooterSoMe';
