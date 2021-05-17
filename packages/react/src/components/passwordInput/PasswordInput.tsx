import React, { useState } from 'react';

// import core base styles
import 'hds-core';
import styles from './PasswordInput.module.scss';
import { TextInput, TextInputProps } from '../textInput';
import { IconEye, IconEyeCrossed } from '../../icons';

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
   * Aria label for reveal password button
   */
  revealPasswordButtonAriaLabel?: string;
  /**
   * Aria label for conceal password button
   */
  concealPasswordButtonAriaLabel?: string;
  /**
   * Type of the password input. Only applied when includeShowPasswordButton is false.
   * Use this if you wish to not have show password button, or you wish to apply external show password button.
   */
  type?: string;
};

type textInputProps = {
  type: string;
  buttonIcon?: React.ReactNode;
  buttonAriaLabel?: string;
  onButtonClick?: () => {};
};

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      concealPasswordButtonAriaLabel,
      disabled = false,
      includeShowPasswordButton = true,
      initiallyRevealed = false,
      revealPasswordButtonAriaLabel,
      type,
      ...passwordInputProps
    }: PasswordInputProps,
    ref?: React.Ref<HTMLInputElement>,
  ) => {
    let revealPassword;
    let setRevealPassword;
    if (includeShowPasswordButton) {
      [revealPassword, setRevealPassword] = useState<boolean>(initiallyRevealed);
    }

    const getTextInputProps = (): textInputProps => {
      if (includeShowPasswordButton) {
        return {
          type: revealPassword ? 'text' : 'password',
          buttonIcon: revealPassword ? (
            <IconEyeCrossed aria-hidden className={disabled ? styles.disabledShowPasswordButton : ''} />
          ) : (
            <IconEye aria-hidden className={disabled ? styles.disabledShowPasswordButton : ''} />
          ),
          buttonAriaLabel: revealPassword ? concealPasswordButtonAriaLabel : revealPasswordButtonAriaLabel,
          onButtonClick: () => setRevealPassword(!revealPassword),
        };
      }
      return {
        type: type || 'password',
      };
    };

    return <TextInput {...passwordInputProps} {...getTextInputProps()} disabled={disabled} ref={ref} />;
  },
);
