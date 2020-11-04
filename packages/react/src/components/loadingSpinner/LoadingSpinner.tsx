import React from 'react';

// import core base styles
import 'hds-core';
import styles from './LoadingSpinner.module.scss';
import classNames from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';
import getModulesClassName from '../../utils/getModulesClassName';

export interface LoadingSpinnerCustomTheme {
  '--spinner-color'?: string;
  '--spinner-color-stage1'?: string;
  '--spinner-color-stage2'?: string;
  '--spinner-color-stage3'?: string;
}

export type LoadingSpinnerProps = {
  /**
   * Additional class names for loading spinner.
   */
  className?: string;
  /**
   * If `true`, the multicolor variant is used.
   * @default false
   */
  multicolor?: boolean;
  /**
   * If `true`, the small variant is used.
   * @default false
   */
  small?: boolean;
  /**
   * Custom theme
   */
  theme?: LoadingSpinnerCustomTheme;
  /**
   * Value for aria-valuemax attribute.
   * @default 100
   */
  valuemax?: number;
  /**
   * Value for aria-valuemin attribute.
   * @default 0
   */
  valuemin?: number;
  /**
   * Value for aria-valuenow attribute. Required unless the loading status is indeterminate.
   */
  valuenow?: number;
} & React.HTMLProps<HTMLDivElement>;

export const LoadingSpinner = ({
  className,
  multicolor = false,
  small = false,
  theme,
  valuemax = 100,
  valuemin = 0,
  valuenow,
  ...rest
}: LoadingSpinnerProps) => {
  const customThemeClass = useTheme<LoadingSpinnerCustomTheme>(getModulesClassName(styles.loadingSpinner), theme);
  return (
    <div
      className={classNames(
        styles.loadingSpinner,
        small && styles.small,
        multicolor && styles.multicolor,
        customThemeClass,
        className,
      )}
      role="progressbar"
      aria-valuemin={valuemin}
      aria-valuemax={valuemax}
      aria-valuenow={valuenow}
      {...rest}
    >
      <div />
      <div />
      <div />
    </div>
  );
};
