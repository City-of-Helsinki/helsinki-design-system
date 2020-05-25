import React, { FC, ReactNode } from 'react';

import styles from './FieldLabel.module.css';
import RequiredIndicator from '../required-indicator/RequiredIndicator';

type FieldLabelProps = {
  hideLabel?: boolean;
  inputId: string;
  label: string | ReactNode;
  required?: boolean;
};

const FieldLabel: FC<FieldLabelProps> = ({ hideLabel, inputId, label, required, ...rest }) => (
  <label htmlFor={inputId} className={`${styles.label} ${hideLabel ? styles.hiddenLabel : ''}`} {...rest}>
    {label}
    {required && <RequiredIndicator />}
  </label>
);

export default FieldLabel;
