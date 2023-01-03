import React from 'react';

// import base styles
import '../../../styles/base.css';

import styles from './FooterUtilities.module.scss';
import { getComponentFromChildren } from '../../../utils/getChildren';

export type FooterUtilitiesProps = {
  /**
   * Children elements to render.
   */
  children: React.ReactNode;
};

export const FooterUtilities = ({ children }: FooterUtilitiesProps) => {
  // filter out the SoMe group, so that other utils can be wrapped in a separate div
  const [soMeGroup, childrenWithoutSoMeGroup] = getComponentFromChildren(children, 'FooterSoMe');

  return (
    <div className={styles.utilities}>
      <hr className={styles.divider} aria-hidden />
      <div className={styles.links}>{childrenWithoutSoMeGroup}</div>
      {soMeGroup}
    </div>
  );
};
