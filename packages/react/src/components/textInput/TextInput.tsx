import React, { SyntheticEvent } from 'react';

import '../../styles/base.module.css';
import styles from './TextInput.module.css';
import { InputWrapper, InputWrapperProps } from '../../internal/input-wrapper/InputWrapper';
import classNames from '../../utils/classNames';
import composeAriaDescribedBy from '../../utils/composeAriaDescribedBy';
import { IconCrossCircle } from '../../icons';
import { AllElementPropsWithoutRef, MergeAndOverrideProps } from '../../utils/elementTypings';

export type TextInputProps = MergeAndOverrideProps<
  AllElementPropsWithoutRef<'input'> & InputWrapperProps,
  {
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
     * The default input element value. Use when the component is not controlled
     */
    defaultValue?: string;
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
    /**
     * ID of the element controlled by the button (e.g., dropdown, dialog)
     */
    buttonAriaControlsId?: string;
    /**
     * Whether the controlled element is expanded/visible
     */
    buttonAriaExpanded?: boolean;
  }
>;

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      buttonAriaLabel,
      buttonAriaControlsId,
      buttonAriaExpanded,
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
      tooltip,
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
      tooltip,
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

    // Update clear button visibility when value prop changes
    React.useEffect(() => {
      if (!hasClearButton || !innerWrapperRef.current) return;

      const currentValue = rest.value || '';
      if (currentValue.length > 0) {
        innerWrapperRef.current.setAttribute('data-hds-textinput-filled', 'true');
      } else {
        innerWrapperRef.current.removeAttribute('data-hds-textinput-filled');
      }
    }, [rest.value, hasClearButton]);

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
                {...(buttonAriaControlsId
                  ? {
                      'aria-controls': buttonAriaControlsId,
                      'aria-expanded': buttonAriaExpanded,
                    }
                  : {})}
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
