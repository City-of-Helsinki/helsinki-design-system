import React from 'react';

import '../../styles/base.module.css';
import styles from '../textInput/TextInput.module.css';
import { InputWrapper } from '../../internal/input-wrapper/InputWrapper';
import composeAriaDescribedBy from '../../utils/composeAriaDescribedBy';
import { AllElementPropsWithoutRef, MergeAndOverrideProps } from '../../utils/elementTypings';

export type TextAreaProps = MergeAndOverrideProps<
  AllElementPropsWithoutRef<'textarea'>,
  {
    /**
     * Additional class names to apply to the textarea
     */
    className?: string;
    /**
     * The error text content that will be shown below the textarea
     */
    errorText?: string;
    /**
     * The helper text content that will be shown below the textarea
     */
    helperText?: string;
    /**
     * Hides the label above the textarea
     */
    hideLabel?: boolean;
    /**
     * The id of the textarea element
     */
    id: string;
    /**
     * If `true`, the textarea and `helperText` will be displayed in an invalid state.
     */
    invalid?: boolean;
    /**
     * The label for the textarea
     */
    label?: string | React.ReactNode;
    /**
     * Short hint displayed in the textarea before the user enters a value
     */
    placeholder?: string;
    /**
     * If `true`, the label is displayed as required and the `textarea` element will be required
     */
    required?: boolean;
    /**
     * Override or extend the styles applied to the component. See text field [tokens](https://city-of-helsinki.github.io/helsinki-design-system/components/text-field#tokens) for available CSS variables
     */
    style?: React.CSSProperties;
    /**
     * The success text content that will be shown below the text area
     */
    successText?: string;
    /**
     * The info text content that will be shown below the text area
     */
    infoText?: string;
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
     * The `ref` is forwarded to the native textarea element.
     */
    ref?: React.Ref<HTMLTextAreaElement>;
  }
>;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className = '',
      errorText,
      helperText,
      hideLabel,
      invalid,
      id,
      label,
      required,
      style,
      successText,
      infoText,
      tooltipLabel,
      tooltipText,
      tooltipButtonLabel,
      ...rest
    }: TextAreaProps,
    ref: React.Ref<HTMLTextAreaElement>,
  ) => {
    const wrapperProps = {
      className,
      errorText,
      helperText,
      hideLabel,
      id,
      invalid,
      label,
      required,
      style,
      successText,
      infoText,
      tooltipLabel,
      tooltipText,
      tooltipButtonLabel,
    };

    // Compose aria-describedby attribute
    const ariaDescribedBy = composeAriaDescribedBy(id, helperText, errorText, successText, infoText);

    return (
      <InputWrapper {...wrapperProps}>
        <textarea
          className={styles.input}
          id={id}
          ref={ref}
          required={required}
          aria-describedby={ariaDescribedBy}
          {...rest}
        />
      </InputWrapper>
    );
  },
);
