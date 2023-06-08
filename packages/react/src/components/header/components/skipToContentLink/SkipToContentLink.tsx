import React from 'react';

// import core base styles
import 'hds-core';
import { useTheme } from '../../../../hooks/useTheme';
import styles from './SkipToContentLink.module.scss';
import classNames from '../../../../utils/classNames';
/**
 * Skip content link theme
 */
export interface SkipToTheme {
  '--background-color'?: string;
  '--border-color'?: string;
  '--border-width'?: string;
  '--text-color'?: string;
}
export type SkipToProps = {
  /**
   * ID of the element which reached by clicking "skip to content" shortcut
   */
  skipTo?: string;
  /**
   * Label for skip to content shortcut
   */
  label?: string;
  /**
   * Custom theme for skipToContentLink
   */
  theme?: SkipToTheme;
};
export const SkipToContentLink = ({ skipTo, label, theme }: SkipToProps) => {
  // set theme variables
  const customThemeClass = useTheme<SkipToTheme>(styles.skipToContent, theme || {});
  // eslint-disable-next-line no-console
  console.log(`MY LABEL ${label}`);

  const href = skipTo?.startsWith('#') ? skipTo : `#${skipTo}`;

  return (
    <a href={href} className={classNames(styles.skipToContent, customThemeClass)}>
      {label}
    </a>
  );
};
