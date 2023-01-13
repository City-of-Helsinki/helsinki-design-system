import React from 'react';

// import core base styles
import 'hds-core';
import styles from './FooterCustom.module.scss';
import classNames from '../../../utils/classNames';

export type FooterCustomProps = React.PropsWithChildren<{
  /**
   * The aria-label for the custom section.
   */
  ariaLabel?: string;
  className?: string;
  id?: string;
}>;

export const FooterCustom = ({ ariaLabel, children, className, id }: FooterCustomProps) => {
  return (
    <div aria-label={ariaLabel} className={classNames(styles.custom, className)} id={id}>
      <hr className={styles.divider} aria-hidden />
      {children}
    </div>
  );
};
