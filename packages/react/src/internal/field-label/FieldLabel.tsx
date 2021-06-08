import React from 'react';

import styles from './FieldLabel.module.scss';
import { RequiredIndicator } from '../required-indicator/RequiredIndicator';
import { Tooltip } from '../../components/tooltip';

type FieldLabelProps = {
  hidden?: boolean;
  inputId: string;
  label: string | React.ReactNode;
  required?: boolean;
  tooltipLabel?: string;
  tooltipButtonLabel?: string;
  tooltipText?: string;
  id?: string;
};

export const FieldLabel = ({
  hidden,
  inputId,
  label,
  required,
  tooltipLabel,
  tooltipButtonLabel,
  tooltipText,
  ...rest
}: FieldLabelProps) => (
  <>
    <label htmlFor={inputId} className={`${styles.label} ${hidden ? styles.hidden : ''}`} {...rest}>
      {label}
      {required && <RequiredIndicator />}
    </label>
    {tooltipText && (
      <Tooltip buttonClassName={styles.tooltipButton} tooltipLabel={tooltipLabel} buttonLabel={tooltipButtonLabel}>
        {tooltipText}
      </Tooltip>
    )}
  </>
);
