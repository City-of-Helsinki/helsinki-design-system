import React, { CSSProperties, FC, ReactNode } from 'react';

import styles from '../../components/text-input/TextInput.module.css';
import { Tooltip } from '../../components/tooltip';
import classNames from '../../utils/classNames';
import FieldLabel from '../field-label/FieldLabel';

type InputWrapperProps = {
  children?: ReactNode;
  className?: string;
  helperText?: string;
  hideLabel?: boolean;
  id: string;
  invalid?: boolean;
  label?: string | ReactNode;
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
  label,
  labelText,
  required = false,
  style,
  tooltipLabel,
  tooltipText,
  tooltipOpenButtonLabelText,
  tooltipCloseButtonLabelText,
}: InputWrapperProps) => (
  <div className={classNames(styles.root, invalid && styles.invalid, className)} style={style}>
    {(label || labelText) && (
      <FieldLabel inputId={id} hidden={hideLabel} label={label || labelText} required={required} />
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
