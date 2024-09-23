import React, { SyntheticEvent } from 'react';

import '../../styles/base.module.css';
import styles from './TextInput.module.css';
import { InputWrapper } from '../../internal/input-wrapper/InputWrapper';
import classNames from '../../utils/classNames';
import composeAriaDescribedBy from '../../utils/composeAriaDescribedBy';
import { IconCrossCircle } from '../../icons';
import { AllElementPropsWithoutRef, MergeAndOverrideProps } from '../../utils/elementTypings';

export type TextInputProps = MergeAndOverrideProps<
  AllElementPropsWithoutRef<'input'>,
  {
    /**
     * Additional class names to apply to the text input
     */
    className?: string;
    /**
     * The aria-label for the clear button.
     * @default 'Clear'
     */
    clearButtonAriaLabel?: string;
    /**
     * Use clear button
     */
    clearButton?: boolean;
    /**
     * Additional children to render after the input.
     */
    children?: React.ReactNode;
    /**
     * The default input element value. Use when the component is not controlled
     */
    defaultValue?: string;
    /**
     * If `true`, the input will be disabled
     */
    disabled?: boolean;
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
    /**
     * The label for the input
     */
    label?: string | React.ReactNode;
    /**
     * The label for the input
     */
    labelId?: string;
    /**
     * Callback fired when the state is changed
     */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    /**
     * Button click callback
     */
    onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
    /**
     * Short hint displayed in the input before the user enters a value
     */
    placeholder?: string;
    /**
     * If `true`, prevents the user from changing the value of the field (not from interacting with the field)
     */
    readOnly?: boolean;
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
     * Type of the input element
     */
    type?: string;
    /**
     * The value of the input element, required for a controlled component
     */
    value?: string;
    /**
     * The `ref` is forwarded to the native input element.
     */
    ref?: React.Ref<HTMLInputElement>;
    /**
     * Button icon
     */
    buttonIcon?: React.ReactNode;
    /**
     * Button aria-label
     */
    buttonAriaLabel?: string;
  }
>;

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      buttonAriaLabel,
      buttonIcon,
      children,
      className = '',
      clearButtonAriaLabel = 'Clear',
      clearButton = false,
      defaultValue,
      disabled = false,
      errorText,
      helperText,
      hideLabel,
      id,
      infoText,
      invalid,
      label,
      labelId,
      onButtonClick,
      onChange = () => null,
      required,
      style,
      successText,
      tooltipButtonLabel,
      tooltipLabel,
      tooltipText,
      type = 'text',
      ...rest
    }: TextInputProps,
    ref?: React.Ref<HTMLInputElement>,
  ) => {
    const wrapperProps = {
      className,
      errorText,
      helperText,
      hideLabel,
      id,
      infoText,
      invalid,
      label,
      labelId,
      required,
      style,
      successText,
      tooltipButtonLabel,
      tooltipLabel,
      tooltipText,
    };

    const innerWrapperRef = React.useRef<HTMLDivElement>(null);

    // Compose aria-describedby attribute
    const ariaDescribedBy = composeAriaDescribedBy(id, helperText, errorText, successText, infoText);
    const hasButton = Boolean(buttonIcon && onButtonClick);
    const hasClearButton = Boolean(clearButton || type === 'search');

    const innerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e);
      if (!hasClearButton) return;
      const inputElement = e.target;
      const innerValue = inputElement.value;
      if (hasClearButton && innerValue.length > 0) {
        innerWrapperRef.current.setAttribute('data-hds-textinput-filled', 'true');
      } else {
        innerWrapperRef.current.removeAttribute('data-hds-textinput-filled');
      }
    };

    const onClearButtonClick = (e: SyntheticEvent) => {
      const input = innerWrapperRef.current.querySelector('input') as HTMLInputElement;
      input.value = '';
      input.focus();
      innerOnChange(e as React.ChangeEvent<HTMLInputElement>);
    };

    if (defaultValue?.length > 0 && hasClearButton) {
      wrapperProps['data-hds-textinput-filled'] = true;
    }

    return (
      <InputWrapper {...wrapperProps} ref={innerWrapperRef}>
        <input
          aria-describedby={ariaDescribedBy}
          className={classNames(styles.input, hasButton && styles.hasButton, hasClearButton && styles.hasClearButton)}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          onChange={innerOnChange}
          ref={ref}
          required={required}
          type={type}
          {...rest}
        />
        {(hasButton || hasClearButton) && (
          <div className={styles.buttonWrapper}>
            {hasClearButton && (
              <button
                aria-label={clearButtonAriaLabel}
                className={classNames(styles.button, styles.clearButton)}
                disabled={disabled}
                onClick={onClearButtonClick}
                type="button"
              >
                <IconCrossCircle />
              </button>
            )}
            {buttonIcon && onButtonClick && (
              <button
                aria-label={buttonAriaLabel}
                className={styles.button}
                disabled={disabled}
                onClick={onButtonClick}
                type="button"
              >
                {buttonIcon}
              </button>
            )}
          </div>
        )}
        {children}
      </InputWrapper>
    );
  },
);
