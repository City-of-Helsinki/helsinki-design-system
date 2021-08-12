import React, { ChangeEvent, useEffect, useState } from 'react';

// import core base styles
import 'hds-core';
import classNames from '../../utils/classNames';
import { IconPlus, IconPhoto } from '../../icons';
import { InputWrapper } from '../../internal/input-wrapper/InputWrapper';
import styles from './FileInput.module.scss';
import buttonStyles from '../button/Button.module.scss';

type FileInputProps = {
  /**
   * A comma separated list of unique file type specifiers describing file types to allow
   */
  accept?: string;
  /**
   * A Boolean that indicates that more than one file can be chosen
   */
  multiple?: boolean;
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
   * Callback fired when the fileList changes
   */
  onChange?: (FileList) => void;
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
      onChange,
      required,
      style,
      successText,
      accept,
      multiple,
    }: FileInputProps,
    ref?: React.Ref<HTMLInputElement>,
  ) => {
    const wrapperProps = {
      className,
      errorText,
      helperText,
      id,
      hideLabel: true,
      required,
      style,
      successText,
    };
    const [selectedFiles, setSelectedFiles] = useState<FileList | undefined>();
    const hasFilesSelected = selectedFiles && selectedFiles.length > 0;
    const fileListId = `${id}-list`;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSelectedFiles(event.target.files);
    };

    useEffect(() => {
      onChange && onChange(selectedFiles)
    }, [onChange, selectedFiles])

    return (
      <>
        <InputWrapper {...wrapperProps}>
          <div className={styles.fileInputWrapper}>
            <label className={classNames(styles.label, buttonStyles.button, buttonStyles.secondary)} htmlFor={id}>
              <IconPlus aria-hidden className={classNames(styles.icon, buttonStyles.icon)} />
              <span className={buttonStyles.label}>{label}</span>
              <input
                type="file"
                id={id}
                onChange={handleChange}
                ref={ref}
                className={styles.fileInput}
                {...(accept ? { accept } : {})}
                {...(multiple ? { multiple } : {})}
                {...(hasFilesSelected ? { 'aria-describedby': fileListId } : {})}
              />
            </label>
          </div>
        </InputWrapper>
        {hasFilesSelected && (
          <ul id={fileListId} className={styles.fileList}>
            {Array.from(selectedFiles).map((file: File) => (
              <li key={file.name} className={styles.fileListItem}>
                <IconPhoto aria-hidden />
                <span className={styles.fileListItemLabel}>{file.name}</span>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  },
);
