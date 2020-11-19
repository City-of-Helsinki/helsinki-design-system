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
  labelText?: string;
  required?: boolean;
  style?: React.CSSProperties;
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
  labelText,
  required = false,
  style,
  tooltipLabel,
  tooltipText,
  tooltipButtonLabel,
}: InputWrapperProps) => (
  <div className={classNames(styles.root, invalid && styles.invalid, className)} style={style}>
    {(label || labelText) && (
      <FieldLabel
        inputId={id}
        hidden={hideLabel}
        label={label || labelText}
        required={required}
        tooltipLabel={tooltipLabel}
        tooltipButtonLabel={tooltipButtonLabel}
        tooltipText={tooltipText}
      />
    )}
    <div className={classNames(styles.inputWrapper)}>{children}</div>
    {errorText && <div className={styles.errorText}>{errorText}</div>}
    {helperText && <div className={styles.helperText}>{helperText}</div>}
  </div>
);
