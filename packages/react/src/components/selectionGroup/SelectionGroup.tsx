import React, { isValidElement, useEffect } from 'react';

import '../../styles/base.module.css';
import styles from './SelectionGroup.module.scss';
import classNames from '../../utils/classNames';
import { RequiredIndicator } from '../../internal/required-indicator/RequiredIndicator';
import { Tooltip } from '../tooltip';
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
     */
    tooltipLabel?: string;
    /**
     * Aria-label text for the tooltip trigger button
     */
    tooltipButtonLabel?: string;
    /**
     * The text content of the tooltip
     */
    tooltipText?: string;
    /**
     * Additional class names
     */
    className?: string;
  }
>;

export const SelectionGroup = ({
  label,
  direction = 'vertical',
  errorText,
  helperText,
  required,
  tooltipLabel,
  tooltipButtonLabel,
  tooltipText,
  children,
  className,
  ...fieldSetProps
}: SelectionGroupProps) => {
  const childElements = getChildrenAsArray(children);

  useEffect(() => {
    let hasRadios = false;
    let hasCheckedRadios = false;
    childElements.forEach((child) => {
      const reactElement = child as React.ReactElement;
      const { displayName } = reactElement.type as React.FunctionComponent;
      if (displayName === 'RadioButton') {
        hasRadios = true;
        if (reactElement.props.checked === true) {
          hasCheckedRadios = true;
        }
      }
    });
    if (hasRadios && !hasCheckedRadios) {
      // eslint-disable-next-line no-console
      console.warn(
        'All radio buttons in a SelectionGroup are unchecked. One radio button should be checked by default.',
      );
    }
  }, [children]);
  return (
    <fieldset className={classNames(styles.selectionGroup, className)} {...fieldSetProps}>
      <legend className={styles.label}>
        {label} {required && <RequiredIndicator />}
      </legend>
      {tooltipText && (
        <Tooltip buttonClassName={styles.tooltipButton} tooltipLabel={tooltipLabel} buttonLabel={tooltipButtonLabel}>
          {tooltipText}
        </Tooltip>
      )}
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
