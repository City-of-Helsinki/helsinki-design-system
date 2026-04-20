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
  tooltip,
}: Pick<SelectionGroupProps, 'label' | 'required' | 'tooltip'>) => {
  if (!tooltip) {
    return <Legend label={label} required={required} />;
  }
  return (
    <div className={styles.legendAndToolTipWrapper}>
      <Legend label={label} required={required} />
      <Tooltip {...tooltip.props} buttonClassName={styles.tooltipButton} />
    </div>
  );
};

export const SelectionGroup = ({
  label,
  direction = 'vertical',
  errorText,
  helperText,
  required,
  tooltip,
  children,
  className,
  ...fieldSetProps
}: SelectionGroupProps) => {
  const childElements = getChildrenAsArray(children);
  const labelAndToolTipProps = {
    label,
    required,
    tooltip,
  };

  return (
    <fieldset className={classNames(styles.selectionGroup, className)} {...fieldSetProps}>
      <LegendAndToolTip {...labelAndToolTipProps} />
      <div className={classNames(styles.items, styles[direction])}>
        {childElements.map(
          (child) =>
            isValidElement(child) && (
              <div key={(child.props as { id?: string }).id} className={styles.item}>
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
