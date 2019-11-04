import React, { ChangeEvent } from 'react';

import IconLock from '../../icons/IconLock';
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
  tooltipText?: string;
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
  tooltipText = undefined,
  type = 'text',
  value = undefined,
}: TextInputProps) => {
  const label = labelText ? (
    <label htmlFor={id} className={`${styles.label} ${hideLabel ? styles.hiddenLabel : ''}`}>
      {labelText}
    </label>
  ) : null;

  const tooltip = tooltipText ? <div> {tooltipText}</div> : null;

  const helper = helperText ? <div className={styles.helperText}>{helperText}</div> : null;

  const invalidMsg = invalidText ? <div className={styles.invalidText}>{invalidText}</div> : null;

  const inputIcon = readOnly ? (
    <div className={styles.inputIcon}>
      <IconLock />
    </div>
  ) : null;

  return (
    <div
      className={`
      ${styles.root}
      ${alternative && !invalid ? styles.alternative : ''}
      ${disabled ? styles.disabled : ''}
      ${readOnly ? styles.readOnly : ''}
      ${invalid ? styles.invalid : ''}
      ${className}
      `}
    >
      {label}
      {tooltip}
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
