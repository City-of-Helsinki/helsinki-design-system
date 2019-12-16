import React, { ChangeEvent } from 'react';

import classNames from '../../utils/classNames';
import Tooltip from '../tooltip/Tooltip';
import { IconLock } from '../../icons';
import styles from './TextInput.module.css';

export type TextInputProps = {
  id: string;
  labelText?: string;
  labelledBy?: string;
  alternative?: boolean;
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

export default ({
  id,
  labelText = undefined,
  labelledBy = undefined,
  alternative = false,
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
}: TextInputProps) => {
  const label: JSX.Element = labelText ? (
    <label htmlFor={id} className={`${styles.label} ${hideLabel ? styles.hiddenLabel : ''}`}>
      {labelText}
    </label>
  ) : null;

  const tooltip: JSX.Element = tooltipText ? (
    <Tooltip
      alternative={alternative}
      labelText={tooltipLabel}
      closeButtonLabelText={tooltipCloseButtonLabelText}
      openButtonLabelText={tooltipOpenButtonLabelText}
    >
      {tooltipText}
    </Tooltip>
  ) : null;

  const helper: JSX.Element = helperText ? <div className={styles.helperText}>{helperText}</div> : null;

  const invalidMsg: JSX.Element = invalidText ? <div className={styles.invalidText}>{invalidText}</div> : null;

  const inputIcon = readOnly ? (
    <div className={styles.inputIcon}>
      <IconLock className={styles.iconLock} />
    </div>
  ) : null;

  return (
    <div
      className={classNames(
        styles.root,
        alternative && styles.alternative,
        disabled && styles.disabled,
        readOnly && styles.readOnly,
        invalid && styles.invalid,
        className,
      )}
    >
      {label}
      {tooltip && tooltip}
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
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
        {inputIcon}
      </div>
      {helper}
      {invalidMsg}
    </div>
  );
};
