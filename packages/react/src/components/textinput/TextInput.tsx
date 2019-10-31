import React, { ChangeEvent } from 'react';

import IconLock from '../../icons/IconLock';
import styles from './TextInput.module.css';

type Props = {
  id: string;
  labelText: string;
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
}: Props) => (
  <div
    className={`
      ${alternative ? styles.alternative : ''}
      ${disabled ? styles.disabled : ''}
      ${readOnly ? styles.readOnly : ''}
      ${invalid ? styles.invalid : ''}
      ${className}`}
  >
    {labelText && (
      <label htmlFor={id} className={`${styles.label} ${hideLabel ? styles.hiddenLabel : ''}`}>
        {labelText}
      </label>
    )}
    {tooltipText && <p>{tooltipText}</p>}
    <div className={styles.inputWrapper}>
      <input
        className={styles.input}
        defaultValue={defaultValue}
        disabled={disabled}
        id={id}
        readOnly={readOnly}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {readOnly && (
        <div className={styles.lock}>
          <IconLock fill={`var(${alternative ? '--hds-theme-color-secondary' : '--hds-ui-color-black-80'})`} />
        </div>
      )}
    </div>
    {helperText && <div className={styles.helperText}>{helperText}</div>}
    {invalid && <div className={styles.invalidText}>{invalidText}</div>}
  </div>
);
