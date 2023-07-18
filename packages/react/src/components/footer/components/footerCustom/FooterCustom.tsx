import React from 'react';

// import base styles
import '../../../../styles/base.css';

import styles from './FooterCustom.module.scss';
import classNames from '../../../../utils/classNames';

export type FooterCustomProps = React.PropsWithChildren<{
  /**
   * Additional class names to apply.
   */
  className?: string;
  /**
   * ID of the navigation element.
   */
  id?: string;
}>;

export const FooterCustom = ({ children, className, id }: FooterCustomProps) => {
  return (
    <div className={classNames(styles.custom, className)} id={id}>
      <hr className={styles.divider} aria-hidden />
      {children}
    </div>
  );
};
