import React from 'react';

// import core base styles
import 'hds-core';
import styles from './FooterUtilityGroup.module.scss';
import classNames from '../../../utils/classNames';

type FooterUtilityGroupProps = React.PropsWithChildren<{
  /**
   * Description of the utility link group for screen readers.
   */
  ariaLabel?: string;
  /**
   * Additional class names to apply.
   */
  className?: string;
  /**
   * ID of the group element.
   */
  id?: string;
}>;
export const FooterUtilityGroup = ({ ariaLabel, className, children, id }: FooterUtilityGroupProps) => {
  return (
    <div aria-label={ariaLabel} id={id} className={classNames(styles.utilityGroup, className)}>
      <div className={styles.utilityGroup}>{children}</div>
    </div>
  );
};
FooterUtilityGroup.componentName = 'FooterUtilityGroup';
