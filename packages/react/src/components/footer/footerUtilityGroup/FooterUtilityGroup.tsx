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
  /**
   * FooterGroupHeading component to display at the top of the group.
   * @example
   * ```ts
   * headingLink={<Footer.GroupHeading
            href="https://yourpath.com"
            label="Main Page"
            variant={FooterVariant.Utility}
          />}
    ```
   */
  headingLink?: React.ReactNode;
}>;
export const FooterUtilityGroup = ({ ariaLabel, className, children, id, headingLink }: FooterUtilityGroupProps) => {
  return (
    <div aria-label={ariaLabel} id={id} className={classNames(styles.utilityGroup, className)}>
      <div className={styles.utilityGroup}>
        {headingLink}
        {children}
      </div>
    </div>
  );
};
FooterUtilityGroup.componentName = 'FooterUtilityGroup';
