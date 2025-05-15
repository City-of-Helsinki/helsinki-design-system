import React, { FocusEvent } from 'react';

import styles from '../../components/textInput/TextInput.module.css';
import classNames from '../../utils/classNames';
import { FieldLabel, FieldLabelProps } from '../field-label/FieldLabel';
import { AllElementPropsWithoutRef } from '../../utils/elementTypings';

export type InputWrapperProps = AllElementPropsWithoutRef<'div'> &
  Pick<FieldLabelProps, 'tooltipLabel' | 'tooltipButtonLabel' | 'tooltipText' | 'tooltip'> & {
    /**
     * Additional children to render after the input.
     */
    children?: React.ReactNode;
    /**
     * Additional class names to apply to the input
     */
    className?: string;
    /**
     * The error text content that will be shown below the input
     */
    errorText?: string;
    /**
     * The helper text content that will be shown below the input
     */
    helperText?: string;
    /**
     * Hides the label above the input
     */
    hideLabel?: boolean;
    /**
     * The id of the input element
     */
    id: string;
    /**
     * If `true`, the input will be displayed in an invalid state.
     */
    invalid?: boolean;
    isAriaLabelledBy?: boolean;
    /**
     * The label for the input
     */
    label?: string | React.ReactNode;
    labelId?: string;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    /**
     * If `true`, the label is displayed as required and the `input` element will be required
     */
    required?: boolean;
    /**
     * Override or extend the styles applied to the component
     */
    style?: React.CSSProperties;
    /**
     * The success text content that will be shown below the input
     */
    successText?: string;
    /**
     * The info text content that will be shown below the input
     */
    infoText?: string;
    ref?: React.Ref<HTMLDivElement>;
  };

export const InputWrapper = React.forwardRef<HTMLDivElement, InputWrapperProps>(
  (
    {
      children,
      className = '',
      errorText,
      helperText,
      hideLabel = false,
      id,
      invalid = false,
      isAriaLabelledBy = false,
      label,
      labelId,
      onBlur,
      required = false,
      style,
      successText,
      infoText,
      tooltipLabel,
      tooltipText,
      tooltipButtonLabel,
      tooltip,
      ...rest
    }: InputWrapperProps,
    ref?: React.Ref<HTMLDivElement>,
  ) => {
    const inputWrapperProps = {
      className: classNames(styles.root, invalid && styles.invalid, successText && styles.success, className),
      onBlur,
      style,
    };
    return (
      <div {...inputWrapperProps} {...rest} ref={ref}>
        {label && (
          <FieldLabel
            id={labelId}
            inputId={id}
            isAriaLabelledBy={isAriaLabelledBy}
            hidden={hideLabel}
            label={label}
            required={required}
            tooltipLabel={tooltipLabel}
            tooltipButtonLabel={tooltipButtonLabel}
            tooltipText={tooltipText}
            tooltip={tooltip}
          />
        )}
        <div className={classNames(styles.inputWrapper)}>{children}</div>
        {errorText && (
          <div className={styles.errorText} id={`${id}-error`}>
            {errorText}
          </div>
        )}
        {successText && (
          <div className={styles.successText} id={`${id}-success`}>
            {successText}
          </div>
        )}
        {infoText && (
          <div className={styles.infoText} id={`${id}-info`}>
            {infoText}
          </div>
        )}
        {helperText && (
          <div className={styles.helperText} id={`${id}-helper`}>
            {helperText}
          </div>
        )}
      </div>
    );
  },
);
