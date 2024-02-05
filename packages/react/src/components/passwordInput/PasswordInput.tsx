import React, { useState } from 'react';

import '../../styles/base.module.css';
import styles from './PasswordInput.module.scss';
import { TextInputProps } from '../textInput';
import { IconEye, IconEyeCrossed } from '../../icons';
import { InputWrapper } from '../../internal/input-wrapper/InputWrapper';
import classNames from '../../utils/classNames';
import textInputStyles from '../textInput/TextInput.module.css';
import composeAriaDescribedBy from '../../utils/composeAriaDescribedBy';

export type PasswordInputProps = Omit<
  TextInputProps,
  'buttonIcon' | 'buttonAriaLabel' | 'onButtonClick' | 'children' | 'label' | 'type'
> & {
  /**
   * The label for the input
   */
  label: string;
  /**
   * Boolean value for whether the component will include show / hide password button. Defaults to true.
   */
  includeShowPasswordButton?: boolean;
  /**
   * Boolean value for whether the component will initially reveal the password or not.
   * Only applied when includeShowPasswordButton is true. Defaults to false.
   */
  initiallyRevealed?: boolean;
  /**
   * The aria-label for reveal password button
   */
  revealPasswordButtonAriaLabel?: string;
  /**
   * The aria-label for conceal password button
   */
  concealPasswordButtonAriaLabel?: string;
  /**
   * Type of the password input. Only applied when includeShowPasswordButton is false.
   * Use this if you wish to not have show password button, or you wish to apply external show password button.
   */
  type?: string;
};

type ButtonProps = {
  'aria-label': string;
  onClick: () => void;
};

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
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
      concealPasswordButtonAriaLabel,
      disabled = false,
      includeShowPasswordButton = true,
      initiallyRevealed = false,
      onBlur,
      revealPasswordButtonAriaLabel,
      type,
      ...passwordInputProps
    }: PasswordInputProps,
    ref?: React.Ref<HTMLInputElement>,
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

    let revealPassword;
    let setRevealPassword;
    if (includeShowPasswordButton) {
      [revealPassword, setRevealPassword] = useState<boolean>(initiallyRevealed);
    }

    const handleOnBlur = (event): void => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        if (includeShowPasswordButton) {
          if (revealPassword) {
            setRevealPassword(false);
          }
        }
      }
      if (typeof onBlur === 'function') {
        onBlur(event);
      }
    };

    const getButtonProps = (): ButtonProps => {
      if (revealPassword) {
        return {
          'aria-label': concealPasswordButtonAriaLabel,
          onClick: () => setRevealPassword(false),
        };
      }
      return {
        'aria-label': revealPasswordButtonAriaLabel,
        onClick: () => setRevealPassword(true),
      };
    };

    const resolveType = (): string => {
      if (includeShowPasswordButton) {
        if (revealPassword) {
          return 'text';
        }
        return 'password';
      }
      return type || 'password';
    };

    // Compose aria-describedby attribute
    const ariaDescribedBy = composeAriaDescribedBy(id, helperText, errorText, successText, infoText);

    return (
      <InputWrapper onBlur={handleOnBlur} {...wrapperProps}>
        <input
          className={classNames(textInputStyles.input, includeShowPasswordButton && textInputStyles.hasButton)}
          disabled={disabled}
          id={id}
          ref={ref}
          required={required}
          type={resolveType()}
          aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy : null}
          {...passwordInputProps}
        />
        {includeShowPasswordButton && (
          <div className={textInputStyles.buttonWrapper}>
            {/* eslint-disable-next-line react/button-has-type */}
            <button className={textInputStyles.button} type="button" disabled={disabled} {...getButtonProps()}>
              {revealPassword && (
                <IconEyeCrossed aria-hidden className={disabled ? styles.disabledShowPasswordButton : ''} />
              )}
              {!revealPassword && <IconEye aria-hidden className={disabled ? styles.disabledShowPasswordButton : ''} />}
            </button>
          </div>
        )}
      </InputWrapper>
    );
  },
);
