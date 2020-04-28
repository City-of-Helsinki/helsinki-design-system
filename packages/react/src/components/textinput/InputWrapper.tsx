import React, { ChangeEvent } from 'react';

import classNames from '../../utils/classNames';
import Tooltip from '../tooltip/Tooltip';
import { IconLock } from '../../icons';
import styles from './InputWrapper.module.css';

export type InputWrapperProps = {
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

const InputWrapper: React.FC<InputWrapperProps> = ({
  id,
  labelText = undefined,
  alternative = false,
  className = '',
  disabled = false,
  helperText = undefined,
  hideLabel = false,
  invalid = false,
  invalidText = undefined,
  readOnly = false,
  tooltipLabel = undefined,
  tooltipText = undefined,
  tooltipOpenButtonLabelText = undefined,
  tooltipCloseButtonLabelText = undefined,
  children,
}) => {
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
        {children}
        {inputIcon}
      </div>
      {helper}
      {invalidMsg}
    </div>
  );
};

export default InputWrapper;
