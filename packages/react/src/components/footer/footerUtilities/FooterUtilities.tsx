import React, { Children, cloneElement } from 'react';

// import base styles
import '../../../styles/base.css';

import styles from './FooterUtilities.module.scss';
import { getComponentFromChildren, getChildElementsEvenIfContainerInbetween } from '../../../utils/getChildren';
import { FCWithName } from '../../../common/types';

export type FooterUtilitiesProps = {
  /**
   * Description of the navigation links for screen readers.
   */
  ariaLabel?: string;
  /**
   * Children elements to render.
   */
  children: React.ReactNode;
};

export const FooterUtilities = ({ ariaLabel, children }: FooterUtilitiesProps) => {
  // filter out the SoMe group, so that other utils can be wrapped in a separate div
  const [soMeGroup, childrenWithoutSoMeGroup] = getComponentFromChildren(children, 'FooterSoMe');
  const groups = getChildElementsEvenIfContainerInbetween(childrenWithoutSoMeGroup).filter(
    (child) => (child.type as FCWithName).componentName === 'FooterUtilityGroup',
  );

  return (
    <div className={styles.utilities}>
      <hr className={styles.divider} aria-hidden />
      {groups && groups.length > 0 ? (
        <div className={styles.groups}>
          {Children.map(groups, (child, index) => {
            return cloneElement(child as React.ReactElement, {
              key: index,
            });
          })}
        </div>
      ) : (
        <nav aria-label={ariaLabel} className={styles.links}>
          {childrenWithoutSoMeGroup}
        </nav>
      )}
      {soMeGroup}
    </div>
  );
};
