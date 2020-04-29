import React, { FC, ReactNode } from 'react';

import styles from '../../components/textinput/TextInput.module.css';
import Tooltip from '../../components/tooltip/Tooltip';
import classNames from '../../utils/classNames';

type InputWrapperProps = {
  children?: ReactNode;
  className?: string;
  helperText?: string;
  hideLabel?: boolean;
  id: string;
  invalid?: boolean;
  labelText?: string;
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
  tooltipLabel,
  tooltipText,
  tooltipOpenButtonLabelText,
  tooltipCloseButtonLabelText,
}: InputWrapperProps) => {
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

  return (
    <div className={classNames(styles.root, invalid && styles.invalid, className)}>
      {label}
      {tooltip && tooltip}
      <div className={classNames(styles.inputWrapper)}>{children}</div>
      {helper}
    </div>
  );
};

export default InputWrapper;
