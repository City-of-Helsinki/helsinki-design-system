import React from 'react';

import '../../../../styles/base.module.css';
import styles from './FooterCustom.module.scss';
import classNames from '../../../../utils/classNames';
import { AllElementPropsWithoutRef } from '../../../../utils/elementTypings';

export type FooterCustomProps = React.PropsWithChildren<
  AllElementPropsWithoutRef<'div'> & {
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
  }
>;

export const FooterCustom = ({ children, className, ...rest }: FooterCustomProps) => {
  return (
    <div {...rest} className={classNames(styles.custom, className)}>
      <hr className={styles.divider} aria-hidden />
      {children}
    </div>
  );
};
