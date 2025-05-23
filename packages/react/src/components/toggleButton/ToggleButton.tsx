import React, { ReactElement } from 'react';

import '../../styles/base.module.css';
import styles from './ToggleButton.module.scss';
import classNames from '../../utils/classNames';
import { IconCrossCircleFill, IconCheckCircleFill } from '../../icons';
import { Tooltip, TooltipProps } from '../tooltip/Tooltip';
import { useTheme } from '../../hooks/useTheme';
import { IconSize } from '../../icons/Icon.interface';
import { AllElementPropsWithoutRef } from '../../utils/elementTypings';

export type ToggleButtonVariant = 'default' | 'inline';

export interface ToggleButtonCustomTheme {
  '--toggle-button-color'?: string;
  '--toggle-button-hover-color'?: string;
}

export type ToggleButtonProps = AllElementPropsWithoutRef<'button'> & {
  /**
   * The id of the button element
   */
  id: string;
  /**
   * The label for the input
   */
  label: string | React.ReactNode;
  /**
   * The state of the toggle button
   */
  checked: boolean;
  /**
   * If `true`, the button will be disabled
   */
  disabled?: boolean;
  /**
   * Callback fired when the toggle button is clicked. Should switch the value.
   */
  onChange: (boolean) => void;
  /**
   * Aria-label text for the tooltip
   * @deprecated Use `tooltip` prop with a Tooltip component instead
   */
  tooltipLabel?: string;
  /**
   * Aria-label text for the tooltip trigger button
   * @deprecated Use `tooltip` prop with a Tooltip component instead
   */
  tooltipButtonLabel?: string;
  /**
   * The text content of the tooltip
   * @deprecated Use `tooltip` prop with a Tooltip component instead
   */
  tooltipText?: string;
  /**
   * Tooltip
   */
  tooltip?: ReactElement<TooltipProps, typeof Tooltip>;
  /**
   * Defines the toggle button variant
   */
  variant?: ToggleButtonVariant;
  /**
   * Custom theme styles
   */
  theme?: ToggleButtonCustomTheme;
};

export const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (
    {
      id,
      label,
      checked,
      disabled,
      onChange,
      tooltipLabel,
      tooltipButtonLabel,
      tooltipText,
      tooltip,
      variant = 'default',
      theme,
      className,
      ...rest
    }: ToggleButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const labelId = `${id}-label`;
    const customThemeClass = useTheme<ToggleButtonCustomTheme>(styles.toggleButtonContainer, theme);

    return (
      <div
        className={classNames(
          styles.toggleButtonContainer,
          variant === 'inline' && styles.toggleButtonContainerInlineVariant,
          customThemeClass,
        )}
      >
        <div className={styles.labelContainer}>
          <label id={labelId} htmlFor={id} className={styles.label}>
            {label}
          </label>
          {tooltip && <Tooltip {...tooltip.props} buttonClassName={styles.tooltipButton} />}
          {tooltipText && (
            <Tooltip
              buttonClassName={styles.tooltipButton}
              tooltipLabel={tooltipLabel}
              buttonLabel={tooltipButtonLabel}
            >
              {tooltipText}
            </Tooltip>
          )}
        </div>
        <button
          {...rest}
          id={id}
          ref={ref}
          disabled={disabled}
          type="button"
          aria-pressed={checked}
          aria-labelledby={labelId}
          className={classNames(styles.toggleButton, className)}
          onClick={() => {
            onChange(checked);
          }}
        >
          <div className={classNames(styles.toggleButtonIcon, styles.offIcon)}>
            <IconCrossCircleFill size={IconSize.Medium} />
          </div>
          <div className={classNames(styles.toggleButtonIcon, styles.onIcon)}>
            <IconCheckCircleFill size={IconSize.Medium} />
          </div>
        </button>
      </div>
    );
  },
);
