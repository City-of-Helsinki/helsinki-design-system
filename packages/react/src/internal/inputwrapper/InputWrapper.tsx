import React, { CSSProperties, FC, ReactNode } from 'react';

import styles from '../../components/textinput/TextInput.module.css';
import Tooltip from '../../components/tooltip/Tooltip';
import classNames from '../../utils/classNames';
import RequiredIndicator from '../requiredindicator/RequiredIndicator';

type InputWrapperProps = {
  children?: ReactNode;
  className?: string;
  helperText?: string;
  hideLabel?: boolean;
  id: string;
  invalid?: boolean;
  labelText?: string;
  required?: boolean;
  style?: CSSProperties;
  tooltipLabel?: string;
  tooltipText?: string;
  tooltipOpenButtonLabelText?: string;
  tooltipCloseButtonLabelText?: string;
};

const InputWrapper: FC<InputWrapperProps> = ({
  children,
  className = '',
  helperText,
  hideLabel = false,
  id,
  invalid = false,
  labelText,
  required = false,
  style,
  tooltipLabel,
  tooltipText,
  tooltipOpenButtonLabelText,
  tooltipCloseButtonLabelText,
}: InputWrapperProps) => (
  <div className={classNames(styles.root, invalid && styles.invalid, className)} style={style}>
    {labelText && (
      <label htmlFor={id} className={`${styles.label} ${hideLabel ? styles.hiddenLabel : ''}`}>
        {labelText}
        {required && <RequiredIndicator />}
      </label>
    )}
    {tooltipText && (
      <Tooltip
        labelText={tooltipLabel}
        closeButtonLabelText={tooltipCloseButtonLabelText}
        openButtonLabelText={tooltipOpenButtonLabelText}
      >
        {tooltipText}
      </Tooltip>
    )}
    <div className={classNames(styles.inputWrapper)}>{children}</div>
    {helperText && <div className={styles.helperText}>{helperText}</div>}
  </div>
);

export default InputWrapper;
