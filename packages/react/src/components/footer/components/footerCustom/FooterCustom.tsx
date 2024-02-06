import React from 'react';

import '../../../../styles/base.module.css';
import styles from './FooterCustom.module.scss';
import classNames from '../../../../utils/classNames';

export type FooterCustomProps = React.PropsWithChildren<{
  /**
   * aria-label for describing Footer.Custom.
   */
  ariaLabel?: string;
  /**
   * Additional class names to apply.
   */
  className?: string;
  /**
   * ID of the navigation element.
   */
  id?: string;
  /**
   * ARIA role to describe the contents.
   */
  role?: string;
}>;

export const FooterCustom = ({ ariaLabel, children, className, id, role }: FooterCustomProps) => {
  return (
    <div className={classNames(styles.custom, className)} id={id} aria-label={ariaLabel} role={role}>
      <hr className={styles.divider} aria-hidden />
      {children}
    </div>
  );
};
