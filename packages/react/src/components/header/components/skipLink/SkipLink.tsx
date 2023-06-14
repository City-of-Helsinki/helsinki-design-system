import React from 'react';

// import core base styles
import 'hds-core';
import styles from './SkipLink.module.scss';

export type SkipToProps = {
  /**
   * ID of the element which is reached by clicking "skip link" shortcut
   */
  skipTo?: string;
  /**
   * Label for skip link shortcut
   */
  label?: string;
};
export const SkipLink = ({ skipTo, label }: SkipToProps) => {
  const href = skipTo?.startsWith('#') ? skipTo : `#${skipTo}`;

  return (
    <a href={href} className={styles.skipLink}>
      <span>{label}</span>
    </a>
  );
};
