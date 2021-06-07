import React from 'react';

// import core base styles
import 'hds-core';
import styles from './ToggleButton.module.scss';
import { FieldLabel } from '../../internal/field-label/FieldLabel';
import classNames from '../../utils/classNames';
import { IconCrossCircleFill, IconCheckCircleFill } from '../../icons';

export type ToggleButtonProps = {
  /**
   * The id of the button element
   */
  id: string;
  /**
   * The label for the input
   */
  label: string | React.ReactNode;
  /**
   * The value of the toggle button
   */
  value: boolean;
  /**
   * If `true`, the button will be disabled
   */
  disabled?: boolean;
  /**
   * Callback fired when the value is changed
   */
  onChange?: (boolean) => void;
  /**
   * Hides the label above the input
   */
  hideLabel?: boolean;
  /**
   * Aria-label text for the tooltip
   */
  tooltipLabel?: string;
  /**
   * Aria-label text for the tooltip trigger button
   */
  tooltipButtonLabel?: string;
  /**
   * The text content of the tooltip
   */
  tooltipText?: string;
};

export const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (
    {
      id,
      label,
      value,
      disabled,
      onChange,
      hideLabel,
      tooltipLabel,
      tooltipButtonLabel,
      tooltipText,
    }: ToggleButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const labelId = `${id}-label`;
    const [checked, setChecked] = React.useState<boolean>(value);

    return (
      <div className={styles.toggleButtonContainer}>
        <FieldLabel
          id={labelId}
          inputId={id}
          hidden={hideLabel}
          label={label}
          tooltipLabel={tooltipLabel}
          tooltipButtonLabel={tooltipButtonLabel}
          tooltipText={tooltipText}
        />
        <button
          id={id}
          ref={ref}
          disabled={disabled}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-labelledby={labelId}
          className={styles.toggleButton}
          onClick={() => {
            const newValue = !checked;
            setChecked(newValue);
            if (onChange) {
              onChange(newValue);
            }
          }}
        >
          <div className={classNames(styles.toggleButtonIcon, styles.offIcon)}>
            <IconCrossCircleFill size="m" aria-hidden="true" />
          </div>
          <div className={classNames(styles.toggleButtonIcon, styles.onIcon)}>
            <IconCheckCircleFill size="m" aria-hidden="true" />
          </div>
        </button>
      </div>
    );
  },
);
