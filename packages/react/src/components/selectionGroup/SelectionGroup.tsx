import React, { isValidElement, ReactElement } from 'react';

import '../../styles/base.module.css';
import styles from './SelectionGroup.module.scss';
import classNames from '../../utils/classNames';
import { RequiredIndicator } from '../../internal/required-indicator/RequiredIndicator';
import { Tooltip, TooltipProps } from '../tooltip';
import { getChildrenAsArray } from '../../utils/getChildren';
import { AllElementPropsWithoutRef } from '../../utils/elementTypings';

export type Direction = 'vertical' | 'horizontal';

export type SelectionGroupProps = React.PropsWithChildren<
  AllElementPropsWithoutRef<'fieldset'> & {
    /**
     * The label for the selection group.
     */
    label?: string;
    /**
     * The direction in which child components should be rendered in.
     */
    direction?: Direction;
    /**
     * The error text content that will be shown below the selection group
     */
    errorText?: string;
    /**
     * The helper text content that will be shown below the radiobutton
     */
    helperText?: string;
    /**
     * If `true`, the label is displayed as required.
     */
    required?: boolean;
    /**
     * Aria-label text for the tooltip
     * @deprecated Use `tooltip` prop instead
     */
    tooltipLabel?: string;
    /**
     * Aria-label text for the tooltip trigger button
     * @deprecated Use `tooltip` prop instead
     */
    tooltipButtonLabel?: string;
    /**
     * The text content of the tooltip
     * @deprecated Use `tooltip` prop instead
     */
    tooltipText?: string;
    /**
     * Tooltip
     */
    tooltip?: ReactElement<TooltipProps, typeof Tooltip>;
    /**
     * Additional class names
     */
    className?: string;
  }
>;

const Legend = ({ label, required }: Pick<SelectionGroupProps, 'label' | 'required'>) => {
  return (
    <legend className={styles.label}>
      {label} {required && <RequiredIndicator />}
    </legend>
  );
};

const LegendAndToolTip = ({
  label,
  required,
  tooltipText,
  tooltipLabel,
  tooltipButtonLabel,
  tooltip,
}: Pick<
  SelectionGroupProps,
  'label' | 'required' | 'tooltipLabel' | 'tooltipButtonLabel' | 'tooltipText' | 'tooltip'
>) => {
  if (!tooltipText && !tooltip) {
    return <Legend label={label} required={required} />;
  }
  return (
    <div className={styles.legendAndToolTipWrapper}>
      <Legend label={label} required={required} />
      {tooltip && <Tooltip {...tooltip.props} buttonClassName={styles.tooltipButton} />}
      {tooltipText ? (
        <Tooltip buttonClassName={styles.tooltipButton} tooltipLabel={tooltipLabel} buttonLabel={tooltipButtonLabel}>
          {tooltipText}
        </Tooltip>
      ) : null}
    </div>
  );
};

export const SelectionGroup = ({
  label,
  direction = 'vertical',
  errorText,
  helperText,
  required,
  tooltipLabel,
  tooltipButtonLabel,
  tooltipText,
  tooltip,
  children,
  className,
  ...fieldSetProps
}: SelectionGroupProps) => {
  const childElements = getChildrenAsArray(children);
  const labelAndToolTipProps = {
    label,
    required,
    tooltipLabel,
    tooltipButtonLabel,
    tooltipText,
    tooltip,
  };

  return (
    <fieldset className={classNames(styles.selectionGroup, className)} {...fieldSetProps}>
      <LegendAndToolTip {...labelAndToolTipProps} />
      <div className={classNames(styles.items, styles[direction])}>
        {childElements.map(
          (child) =>
            isValidElement(child) && (
              <div key={child.props.id} className={styles.item}>
                {child}
              </div>
            ),
        )}
      </div>
      {errorText && <div className={styles.errorText}>{errorText}</div>}
      {helperText && <div className={styles.helperText}>{helperText}</div>}
    </fieldset>
  );
};
