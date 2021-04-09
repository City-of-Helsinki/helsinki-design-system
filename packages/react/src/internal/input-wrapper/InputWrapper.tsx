import React from 'react';

import styles from '../../components/textInput/TextInput.module.css';
import classNames from '../../utils/classNames';
import { FieldLabel } from '../field-label/FieldLabel';

type InputWrapperProps = {
  children?: React.ReactNode;
  className?: string;
  errorText?: string;
  helperText?: string;
  hideLabel?: boolean;
  id: string;
  invalid?: boolean;
  label?: string | React.ReactNode;
  required?: boolean;
  style?: React.CSSProperties;
  successText?: string;
  tooltipLabel?: string;
  tooltipText?: string;
  tooltipButtonLabel?: string;
};

export const InputWrapper = ({
  children,
  className = '',
  errorText,
  helperText,
  hideLabel = false,
  id,
  invalid = false,
  label,
  required = false,
  style,
  successText,
  tooltipLabel,
  tooltipText,
  tooltipButtonLabel,
}: InputWrapperProps) => (
  <div
    className={classNames(styles.root, invalid && styles.invalid, successText && styles.success, className)}
    style={style}
  >
    {label && (
      <FieldLabel
        inputId={id}
        hidden={hideLabel}
        label={label}
        required={required}
        tooltipLabel={tooltipLabel}
        tooltipButtonLabel={tooltipButtonLabel}
        tooltipText={tooltipText}
      />
    )}
    <div className={classNames(styles.inputWrapper)}>{children}</div>
    {errorText && (
      <div className={styles.errorText} id={`${id}-error`}>
        {errorText}
      </div>
    )}
    {successText && (
      <div className={styles.successText} id={`${id}-success`}>
        {successText}
      </div>
    )}
    {helperText && (
      <div className={styles.helperText} id={`${id}-helper`}>
        {helperText}
      </div>
    )}
  </div>
);
