import React from 'react';

// import base styles
import '../../../../styles/base.css';

import { useMediaQueryLessThan } from '../../../../hooks/useMediaQuery';
import styles from './FooterNavigationGroup.module.scss';
import classNames from '../../../../utils/classNames';

type FooterNavigationGroupProps = React.PropsWithChildren<{
  /**
   * Additional class names to apply.
   */
  className?: string;
  /**
   * ID of the navigation group element.
   */
  id?: string;
  /**
   * FooterGroupHeading component to display at the top of the group. On smaller screens only this will be displayed.
   * @example
   * ```ts
   * headingLink={<Footer.GroupHeading
            href="https://yourpath.com"
            label="Main Page"
            variant={FooterVariant.Navigation}
          />}
    ```
   */
  headingLink: React.ReactNode;
}>;
export const FooterNavigationGroup = ({ className, children, id, headingLink }: FooterNavigationGroupProps) => {
  // Show only main links in smaller screens
  const shouldRenderOnlyMainLinks = useMediaQueryLessThan('l');

  // Return headingLink inside a Fragment to avoid erronous return type 'Element | { headingLink: ReactNode; }'.
  return shouldRenderOnlyMainLinks ? (
    <>{headingLink}</>
  ) : (
    <div id={id} className={classNames(styles.navigationGroup, className)}>
      <div className={styles.navigationGroupList}>
        {headingLink}
        {children}
      </div>
    </div>
  );
};
FooterNavigationGroup.componentName = 'FooterNavigationGroup';
