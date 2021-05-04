import React, { useState } from 'react';

// import core base styles
import 'hds-core';
import styles from './PasswordInput.module.scss';
import { TextInput, TextInputProps } from '../textInput';
import { IconEye, IconEyeCrossed } from '../../icons';

export type PasswordInputProps = Omit<
  TextInputProps,
  'buttonIcon' | 'buttonAriaLabel' | 'onButtonClick' | 'children' | 'label' | 'placeholder'
> & {
  /**
   * The label for the input
   */
  label: string;
  /**
   * Boolean value for whether the component will include show / hide password button
   */
  includeShowPasswordButton?: boolean;
  /**
   * Aria label for reveal password button
   */
  revealPasswordButtonAriaLabel?: string;
  /**
   * Aria label for conceal password button
   */
  concealPasswordButtonAriaLabel?: string;
};

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      concealPasswordButtonAriaLabel,
      disabled = false,
      includeShowPasswordButton = true,
      revealPasswordButtonAriaLabel,
      type,
      ...passwordInputProps
    }: PasswordInputProps,
    ref?: React.Ref<HTMLInputElement>,
  ) => {
    let revealPassword;
    let setRevealPassword;
    if (includeShowPasswordButton) {
      [revealPassword, setRevealPassword] = useState<boolean>(false);
    }

    const getPasswordButtonAriaLabel = () => {
      if (revealPassword) {
        return concealPasswordButtonAriaLabel;
      }
      return revealPasswordButtonAriaLabel;
    };

    const renderPasswordButton = () => {
      if (revealPassword) {
        return <IconEyeCrossed aria-hidden className={disabled ? styles.disabledShowPasswordButton : ''} />;
      }
      return <IconEye aria-hidden className={disabled ? styles.disabledShowPasswordButton : ''} />;
    };

    const resolveType = () => {
      if (includeShowPasswordButton) {
        if (revealPassword) {
          return 'text';
        }
        return 'password';
      }
      if (type) {
        return type;
      }
      return 'password';
    };

    return (
      <TextInput
        {...passwordInputProps}
        buttonAriaLabel={includeShowPasswordButton ? getPasswordButtonAriaLabel() : undefined}
        buttonIcon={includeShowPasswordButton ? renderPasswordButton() : undefined}
        disabled={disabled}
        onButtonClick={includeShowPasswordButton ? () => setRevealPassword(!revealPassword) : undefined}
        ref={ref}
        type={resolveType()}
      />
    );
  },
);
