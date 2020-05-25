import React, { FC, ReactNode } from 'react';

import styles from './FieldLabel.module.css';
import RequiredIndicator from '../required-indicator/RequiredIndicator';

type FieldLabelProps = {
  hidden?: boolean;
  inputId: string;
  label: string | ReactNode;
  required?: boolean;
};

const FieldLabel: FC<FieldLabelProps> = ({ hidden, inputId, label, required, ...rest }) => (
  <label htmlFor={inputId} className={`${styles.label} ${hidden ? styles.hidden : ''}`} {...rest}>
    {label}
    {required && <RequiredIndicator />}
  </label>
);

export default FieldLabel;
