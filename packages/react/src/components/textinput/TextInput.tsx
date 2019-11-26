import React, { ChangeEvent, useState } from 'react';

import IconLock from '../../icons/IconLock';
import IconTooltip from '../../icons/IconTooltip';
import styles from './TextInput.module.css';
import TextInputTooltip from './TextInputTooltip';

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
}: TextInputProps) => {
  const [tooltipOpen, toggleTooltip] = useState(false);

  const label: JSX.Element = labelText ? (
    <label htmlFor={id} className={`${styles.label} ${hideLabel ? styles.hiddenLabel : ''}`}>
      {labelText}
    </label>
  ) : null;

  const tooltipIcon: JSX.Element = tooltipText ? (
    <button type="button" className={styles.buttonTooltip} onClick={() => toggleTooltip(!tooltipOpen)}>
      <IconTooltip />
      <span className={styles.buttonTooltipText}>show tooltip</span>
    </button>
  ) : null;

  const tooltip: JSX.Element = tooltipText ? (
    <TextInputTooltip
      open={tooltipOpen}
      alternative={alternative}
      labelText={tooltipLabel}
      onClickClose={() => toggleTooltip(false)}
    >
      {tooltipText}
    </TextInputTooltip>
  ) : null;

  const helper: JSX.Element = helperText ? <div className={styles.helperText}>{helperText}</div> : null;

  const invalidMsg: JSX.Element = invalidText ? <div className={styles.invalidText}>{invalidText}</div> : null;

  const inputIcon = readOnly ? (
    <div className={styles.inputIcon}>
      <IconLock />
    </div>
  ) : null;

  return (
    <div
      className={[
        styles.root,
        alternative && styles.alternative,
        disabled && styles.disabled,
        readOnly && styles.readOnly,
        invalid && styles.invalid,
        className,
      ]
        .filter(e => e)
        .join(' ')}
    >
      {label}
      {tooltipIcon}
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
