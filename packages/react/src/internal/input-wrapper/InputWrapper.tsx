import React, { FocusEvent } from 'react';

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
  isAriaLabelledBy?: boolean;
  label?: string | React.ReactNode;
  labelId?: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  style?: React.CSSProperties;
  successText?: string;
  infoText?: string;
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
  isAriaLabelledBy = false,
  label,
  labelId,
  onBlur,
  required = false,
  style,
  successText,
  infoText,
  tooltipLabel,
  tooltipText,
  tooltipButtonLabel,
}: InputWrapperProps) => (
  <div
    onBlur={onBlur}
    className={classNames(styles.root, invalid && styles.invalid, successText && styles.success, className)}
    style={style}
  >
    {label && (
      <FieldLabel
        id={labelId}
        inputId={id}
        isAriaLabelledBy={isAriaLabelledBy}
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
    {infoText && (
      <div className={styles.infoText} id={`${id}-info`}>
        {infoText}
      </div>
    )}
    {helperText && (
      <div className={styles.helperText} id={`${id}-helper`}>
        {helperText}
      </div>
    )}
  </div>
);
