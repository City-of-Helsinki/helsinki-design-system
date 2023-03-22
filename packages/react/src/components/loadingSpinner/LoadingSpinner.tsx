import React from 'react';

// import base styles
import '../../styles/base.css';

import styles from './LoadingSpinner.module.scss';
import classNames from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';
import { useNotificationArea } from './useNotificationArea';

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
   * Text to show for screen readers when spinner is visible.
   * @default "Page is loading"
   */
  loadingText?: string;
  /**
   * Text to show for screen readers when spinner is removed.
   * @default "Page has finished loading"
   */
  loadingFinishedText?: string;
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
  loadingText = 'Page is loading',
  loadingFinishedText = 'Page has finished loading',
  ...rest
}: LoadingSpinnerProps) => {
  const customThemeClass = useTheme<LoadingSpinnerCustomTheme>(styles.loadingSpinner, theme);

  useNotificationArea(loadingText, loadingFinishedText);

  return (
    <div
      className={classNames(
        styles.loadingSpinner,
        small && styles.small,
        multicolor && styles.multicolor,
        customThemeClass,
        className,
      )}
      {...rest}
    >
      <div />
      <div />
      <div />
    </div>
  );
};
