import React, { ReactElement } from 'react';

import '../../styles/base.module.css';
import styles from './Fieldset.module.scss';
import classNames from '../../utils/classNames';
import { Tooltip, TooltipProps } from '../tooltip';
import { AllElementPropsWithoutRef } from '../../utils/elementTypings';

export type FieldsetProps = AllElementPropsWithoutRef<'fieldset'> & {
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
   * Tooltip
   */
  tooltip?: ReactElement<TooltipProps, typeof Tooltip>;
};

export const Fieldset = ({
  heading,
  border,
  className,
  helperText,
  tooltip,
  children,
  ...fieldSetProps
}: FieldsetProps) => (
  <fieldset className={classNames(styles.fieldset, border && styles.border, className)} {...fieldSetProps}>
    <legend className={tooltip ? styles.legendWithTooltip : styles.legend}>
      {heading}
      {tooltip && <Tooltip {...tooltip.props} buttonClassName={styles.tooltipButton} />}
    </legend>
    {children}
    {helperText && <div className={styles.helperText}>{helperText}</div>}
  </fieldset>
);
