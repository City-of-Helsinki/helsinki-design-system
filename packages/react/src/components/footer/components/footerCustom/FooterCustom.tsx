import React from 'react';

import '../../../../styles/base.module.css';
import styles from './FooterCustom.module.scss';
import classNames from '../../../../utils/classNames';
import { AllElementPropsWithoutRef } from '../../../../utils/elementTypings';

export type FooterCustomProps = React.PropsWithChildren<
  AllElementPropsWithoutRef<'div'> & {
    /**
     * aria-label for describing Footer.Custom.
     * @deprecated Will be replaced in the next major release with "aria-label"
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
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
  }
>;

export const FooterCustom = ({ ariaLabel, children, className, ...rest }: FooterCustomProps) => {
  return (
    <div {...rest} className={classNames(styles.custom, className)} aria-label={ariaLabel}>
      <hr className={styles.divider} aria-hidden />
      {children}
    </div>
  );
};
