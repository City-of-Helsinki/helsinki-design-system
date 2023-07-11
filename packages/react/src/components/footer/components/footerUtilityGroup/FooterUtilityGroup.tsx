import React from 'react';

// import base styles
import '../../../../styles/base.css';

import styles from './FooterUtilityGroup.module.scss';
import classNames from '../../../../utils/classNames';

type FooterUtilityGroupProps = React.PropsWithChildren<{
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
export const FooterUtilityGroup = ({ className, children, id, headingLink }: FooterUtilityGroupProps) => {
  return (
    <div id={id} className={classNames(styles.utilityGroup, className)}>
      <div className={styles.utilityGroup}>
        {headingLink}
        {children}
      </div>
    </div>
  );
};
FooterUtilityGroup.componentName = 'FooterUtilityGroup';
