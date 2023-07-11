import React from 'react';

// import core base styles
import 'hds-core';
import styles from './SkipLink.module.scss';

export type SkipLinkProps = {
  /**
   * ID of the element which is reached by clicking "skip link" shortcut
   */
  skipTo: string;
  /**
   * Label for skip link shortcut
   */
  label: string;
};
export const SkipLink = ({ skipTo, label }: SkipLinkProps) => {
  const href = skipTo.startsWith('#') ? skipTo : `#${skipTo}`;

  return (
    <a href={href} className={styles.skipLink}>
      <span className={styles.skipLinkLabel}>{label}</span>
    </a>
  );
};
