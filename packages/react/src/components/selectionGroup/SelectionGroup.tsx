import React, { useEffect } from 'react';

// import core base styles
import 'hds-core';
import styles from './SelectionGroup.module.scss';
import classNames from '../../utils/classNames';
import { RequiredIndicator } from '../../internal/required-indicator/RequiredIndicator';
import { Tooltip } from '../tooltip';

export type Direction = 'vertical' | 'horizontal';

export type SelectionGroupProps = React.PropsWithChildren<
  {
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
  } & React.HTMLProps<HTMLFieldSetElement>
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
  useEffect(() => {
    let hasRadios = false;
    let hasCheckedRadios = false;
    React.Children.forEach(children, (child) => {
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
        <div>
          {label} {required && <RequiredIndicator />}
        </div>
        {helperText && (
          <div className={styles.helperText} id={`${new Date().getTime()}-helper`}>
            {helperText}
          </div>
        )}
      </legend>
      {tooltipText && (
        <Tooltip buttonClassName={styles.tooltipButton} tooltipLabel={tooltipLabel} buttonLabel={tooltipButtonLabel}>
          {tooltipText}
        </Tooltip>
      )}
      <div className={classNames(styles.items, styles[direction])}>
        {React.Children.map(children, (child) => (
          <div className={styles.item}>{child}</div>
        ))}
      </div>
      {errorText && <div className={styles.errorText}>{errorText}</div>}
    </fieldset>
  );
};
