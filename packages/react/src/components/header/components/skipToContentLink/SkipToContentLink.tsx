import React from 'react';

// import core base styles
import 'hds-core';
import styles from './SkipToContentLink.module.scss';

export type SkipToProps = {
  /**
   * ID of the element which reached by clicking "skip to content" shortcut
   */
  skipTo?: string;
  /**
   * Label for skip to content shortcut
   */
  label?: string;
};
export const SkipToContentLink = ({ skipTo, label }: SkipToProps) => {
  const href = skipTo?.startsWith('#') ? skipTo : `#${skipTo}`;

  return (
    <a href={href} className={styles.skipToContent}>
      <span>{label}</span>
    </a>
  );
};
