import React from 'react';

// import core base styles
import 'hds-core';
import classNames from '../../utils/classNames';
import { IconPlus } from './../../icons';
import { InputWrapper } from '../../internal/input-wrapper/InputWrapper';
import styles from './FileInput.module.scss';
import buttonStyles from '../button/Button.module.scss';

type FileInputProps = {
  /**
   * A comma separated list of unique file type specifiers describing file types to allow
   */
  accept?: string;
  /**
   * Additional class names to apply to the file input
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
   * The id of the input element
   */
  id: string;
  /**
   * The label for the input
   */
  label?: string | React.ReactNode;
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
   * The value of the input element, required for a controlled component
   */
  value?: string;
  /**
   * The `ref` is forwarded to the native input element.
   */
  ref?: React.Ref<HTMLInputElement>;
};

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      className = '',
      errorText,
      helperText,
      id,
      label = 'Add files',
      required,
      style,
      successText,
      accept,
    }: FileInputProps,
    ref?: React.Ref<HTMLInputElement>,
  ) => {
    const wrapperProps = {
      className,
      errorText,
      helperText,
      id,
      label,
      hideLabel: true,
      required,
      style,
      successText,
    };

    return (
      <InputWrapper {...wrapperProps}>
        <div className={styles.fileInputWrapper}>
          <label className={classNames(styles.label, buttonStyles.button, buttonStyles.secondary)} htmlFor={id}>
            <IconPlus aria-hidden className={classNames(styles.icon, buttonStyles.icon)} />
            <span className={buttonStyles.label}>{label}</span>
            <input ref={ref} type="file" id={id} className={styles.fileInput} {...(accept ? { accept } : {})} />
          </label>
        </div>
      </InputWrapper>
    );
  },
);
