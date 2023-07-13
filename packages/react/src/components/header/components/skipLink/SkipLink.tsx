import React from 'react';

// import core base styles
import '../../../../styles/base.css';
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
  /**
   * Aria label for skip link shortcut (alternative text for screen reader)
   */
  ariaLabel?: string;
};
export const SkipLink = ({ skipTo, label, ariaLabel }: SkipLinkProps) => {
  const href = skipTo.startsWith('#') ? skipTo : `#${skipTo}`;

  return (
    <a href={href} aria-label={ariaLabel} className={styles.skipLink}>
      <span className={styles.skipLinkLabel}>{label}</span>
    </a>
  );
};
