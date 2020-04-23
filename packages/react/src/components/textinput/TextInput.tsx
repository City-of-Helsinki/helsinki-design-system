import React, { ChangeEvent } from 'react';

import classNames from '../../utils/classNames';
import Tooltip from '../tooltip/Tooltip';
import styles from './TextInput.module.css';

export type TextInputProps = {
  id: string;
  labelText?: string;
  labelledBy?: string;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  helperText?: string;
  hideLabel?: boolean;
  invalid?: boolean;
  invalidText?: string;
  onChange?: (event: ChangeEvent) => void;
  placeholder?: string;
  readOnly?: boolean;
  tooltipLabel?: string;
  tooltipText?: string;
  tooltipOpenButtonLabelText?: string;
  tooltipCloseButtonLabelText?: string;
  type?: string;
  value?: string;
};

const TextInput: React.FC<TextInputProps> = React.forwardRef(
  (
    {
      id,
      labelText = undefined,
      labelledBy = undefined,
      className = '',
      defaultValue = undefined,
      disabled = false,
      helperText = undefined,
      hideLabel = false,
      invalid = false,
      invalidText = undefined,
      onChange = () => null,
      placeholder = '',
      readOnly = false,
      tooltipLabel = undefined,
      tooltipText = undefined,
      type = 'text',
      value = undefined,
      tooltipOpenButtonLabelText = undefined,
      tooltipCloseButtonLabelText = undefined,
    }: TextInputProps,
    ref: React.RefObject<HTMLInputElement>,
  ) => {
    const label: JSX.Element = labelText ? (
      <label htmlFor={id} className={`${styles.label} ${hideLabel ? styles.hiddenLabel : ''}`}>
        {labelText}
      </label>
    ) : null;

    const tooltip: JSX.Element = tooltipText ? (
      <Tooltip
        labelText={tooltipLabel}
        closeButtonLabelText={tooltipCloseButtonLabelText}
        openButtonLabelText={tooltipOpenButtonLabelText}
      >
        {tooltipText}
      </Tooltip>
    ) : null;

    const helper: JSX.Element = helperText ? <div className={styles.helperText}>{helperText}</div> : null;

    const invalidMsg: JSX.Element = invalidText ? <div className={styles.invalidText}>{invalidText}</div> : null;

    return (
      <div className={classNames(styles.root, readOnly && styles.readOnly, invalid && styles.invalid, className)}>
        {label}
        {tooltip && tooltip}
        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            defaultValue={defaultValue}
            aria-labelledby={labelledBy}
            disabled={disabled}
            id={id}
            readOnly={readOnly}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            value={value}
          />
        </div>
        {helper}
        {invalidMsg}
      </div>
    );
  },
);

export default TextInput;
