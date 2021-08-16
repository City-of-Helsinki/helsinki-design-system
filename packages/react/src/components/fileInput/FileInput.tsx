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
   * The id of the input element
   */
  id: string;
  /**
   * A text which is shown after successful file add
   */
  successMessage: string;
  /**
   * The label for the input
   */
  label: string;
  /**
   * The label for the file button
   */
  buttonLabel: string;
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
   * Callback fired when the list of files changes
   */
  onChange?: (files: File[]) => void;
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
};

export const FileInput = ({
  id,
  label,
  buttonLabel,
  successMessage,
  className = '',
  errorText,
  helperText,
  onChange,
  required,
  style,
  accept,
  multiple,
}: FileInputProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [successText, setSuccessText] = useState<string | undefined>();
  const hasFilesSelected = selectedFiles && selectedFiles.length > 0;
  const fileListId = `${id}-list`;

  const wrapperProps = {
    className,
    helperText,
    successText,
    errorText,
    id,
    label,
    required,
    style,
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  useEffect(() => {
    if (selectedFiles && selectedFiles.length > 0) {
      if (onChange) {
        onChange(selectedFiles);
      }
      setSuccessText(successMessage);
    } else {
      setSuccessText(undefined);
    }
  }, [selectedFiles, onChange, successMessage, setSuccessText]);

  return (
    <>
      <InputWrapper {...wrapperProps}>
        <div className={styles.fileInputWrapper}>
          <label className={classNames(styles.label, buttonStyles.button, buttonStyles.secondary)} htmlFor={id}>
            <IconPlus aria-hidden className={classNames(styles.icon, buttonStyles.icon)} />
            <span className={buttonStyles.label}>{buttonLabel}</span>
            <input
              type="file"
              id={id}
              onChange={handleChange}
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
          {selectedFiles.map((file: File) => (
            <li key={file.name} className={styles.fileListItem}>
              <IconPhoto aria-hidden />
              <span className={styles.fileListItemLabel}>{file.name}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
