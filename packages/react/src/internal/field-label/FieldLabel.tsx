import React, { ReactElement } from 'react';

import styles from './FieldLabel.module.scss';
import { RequiredIndicator } from '../required-indicator/RequiredIndicator';
import { Tooltip, TooltipProps } from '../../components/tooltip';

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
  tooltip?: ReactElement<TooltipProps, typeof Tooltip>;
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
  tooltip,
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
    {tooltip && <Tooltip {...tooltip.props} buttonClassName={styles.tooltipButton} />}
    {tooltipText && (
      <Tooltip buttonClassName={styles.tooltipButton} tooltipLabel={tooltipLabel} buttonLabel={tooltipButtonLabel}>
        {tooltipText}
      </Tooltip>
    )}
  </>
);
