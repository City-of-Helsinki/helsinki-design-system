import React from 'react';

// import core base styles
import '../../styles/base.css';
import styles from './SkipLink.module.scss';
import { useTheme } from '../../hooks/useTheme';
import classNames from '../../utils/classNames';

// custom theme for skip link position
export interface SkipLinkTheme {
  '--left'?: string;
  '--top'?: string;
}

export type SkipLinkProps = {
  /**
   * aria-label for describing SkipLink for screen readers.
   */
  ariaLabel?: string;
  /**
   * Label for the SkipLink.
   */
  label: string;
  /**
   * ID of the element where the SkipLink jumps to.
   */
  skipTo: string;
  /**
   * Custom styling for SkipLink.
   */
  theme?: SkipLinkTheme;
};
export const SkipLink = ({ ariaLabel, label, skipTo, theme }: SkipLinkProps) => {
  const href = skipTo.startsWith('#') ? skipTo : `#${skipTo}`;
  const customThemeClass = useTheme<SkipLinkTheme>(styles.skipLink, theme);

  return (
    <a href={href} aria-label={ariaLabel} className={classNames(styles.skipLink, customThemeClass)}>
      <span className={styles.skipLinkLabel}>{label}</span>
    </a>
  );
};

SkipLink.componentName = 'SkipLink';
