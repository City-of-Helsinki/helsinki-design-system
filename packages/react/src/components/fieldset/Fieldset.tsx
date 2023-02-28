import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Fieldset.module.scss';
import classNames from '../../utils/classNames';
import { Tooltip } from '../tooltip';

export type FieldsetProps = {
  /**
   * Heading text inside legend element
   */
  heading: string;
  /**
   * If `true` border will be drawn around the fieldset.
   */
  border?: boolean;
  /**
   * Additional class names to apply to the card.
   */
  className?: string;
  /*
   * The helper text content that will be shown below the radiobutton
   */
  helperText?: string;
  /**
   * Tooltip text for the fieldset
   */
  tooltipText?: string;
  /**
   * Aria-label text for the tooltip
   */
  tooltipLabel?: string;
  /**
   * Aria-label text for the tooltip trigger button
   */
  tooltipButtonLabel?: string;
} & React.HTMLProps<HTMLFieldSetElement>;

export const Fieldset = ({
  heading,
  border,
  className,
  helperText,
  tooltipText,
  tooltipLabel,
  tooltipButtonLabel,
  children,
  ...fieldSetProps
}: FieldsetProps) => (
  <fieldset className={classNames(styles.fieldset, border && styles.border, className)} {...fieldSetProps}>
    <legend className={tooltipText ? styles.legendWithTooltip : styles.legend}>
      {heading}
      {tooltipText && (
        <Tooltip className={styles.tooltipButton} tooltipLabel={tooltipLabel} buttonLabel={tooltipButtonLabel}>
          {tooltipText}
        </Tooltip>
      )}
    </legend>
    {children}
    {helperText && <div className={styles.helperText}>{helperText}</div>}
  </fieldset>
);
