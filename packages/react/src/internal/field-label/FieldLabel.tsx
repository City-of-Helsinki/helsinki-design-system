import React from 'react';

import styles from './FieldLabel.module.css';
import { RequiredIndicator } from '../required-indicator/RequiredIndicator';

type FieldLabelProps = {
  hidden?: boolean;
  inputId: string;
  label: string | React.ReactNode;
  required?: boolean;
};

export const FieldLabel = ({ hidden, inputId, label, required, ...rest }: FieldLabelProps) => (
  <label htmlFor={inputId} className={`${styles.label} ${hidden ? styles.hidden : ''}`} {...rest}>
    {label}
    {required && <RequiredIndicator />}
  </label>
);
