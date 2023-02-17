import React from 'react';

// import core base styles
import 'hds-core';
import { useMediaQueryLessThan } from '../../../hooks/useMediaQuery';
import styles from './FooterNavigationGroup.module.scss';
import classNames from '../../../utils/classNames';

type FooterNavigationGroupProps = React.PropsWithChildren<{
  /**
   * Description of the navigation group
   * for screen readers.
   */
  ariaLabel?: string;
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
   * headingLink={<Footer.GroupHeading
            href="https://yourpath.com"
            label="Main Page"
            variant={FooterVariant.Navigation}
          />}
   */
  headingLink: React.ReactNode;
}>;
export const FooterNavigationGroup = ({
  ariaLabel,
  className,
  children,
  id,
  headingLink,
}: FooterNavigationGroupProps) => {
  // Show only main links in smaller screens
  const shouldRenderOnlyMainLinks = useMediaQueryLessThan('l');

  // Return headingLink inside a Fragment to avoid erronous return type 'Element | { headingLink: ReactNode; }'.
  return shouldRenderOnlyMainLinks ? (
    <>{headingLink}</>
  ) : (
    <div aria-label={ariaLabel} id={id} className={classNames(styles.navigationGroup, className)}>
      <div className={styles.navigationGroupList}>
        {headingLink}
        {children}
      </div>
    </div>
  );
};
FooterNavigationGroup.componentName = 'FooterNavigationGroup';
