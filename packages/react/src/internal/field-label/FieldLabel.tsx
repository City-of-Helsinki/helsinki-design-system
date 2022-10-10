import React from 'react';

import styles from './FieldLabel.module.scss';
import { RequiredIndicator } from '../required-indicator/RequiredIndicator';
import { Tooltip } from '../../components/tooltip';

type FieldLabelProps = {
  hidden?: boolean;
  id?: string;
  inputId: string;
  isAriaLabelledBy?: boolean;
  label: string | React.ReactNode;
  required?: boolean;
  tooltipLabel?: string;
  tooltipButtonLabel?: string;
  tooltipText?: string;
};

export const FieldLabel = ({
  hidden,
  id,
  inputId,
  isAriaLabelledBy,
  label,
  required,
  tooltipLabel,
  tooltipButtonLabel,
  tooltipText,
  ...rest
}: FieldLabelProps) => (
  <>
    <label
      id={id}
      {...((!isAriaLabelledBy || !id) && { htmlFor: inputId })}
      className={`${styles.label} ${hidden ? styles.hidden : ''}`}
      {...rest}
    >
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
