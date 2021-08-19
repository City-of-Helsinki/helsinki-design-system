import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

// import core base styles
import 'hds-core';
import classNames from '../../utils/classNames';
import { Button } from '../button';
import { IconPlus, IconPhoto, IconCross, IconDocument, IconUpload } from '../../icons';
import { InputWrapper } from '../../internal/input-wrapper/InputWrapper';
import styles from './FileInput.module.scss';

type FileProperty = keyof File;

const isEqualFileBy = (givenProperties: FileProperty[], a: File, b: File): boolean => {
  const sameProps: FileProperty[] = givenProperties.filter((property: FileProperty) => a[property] === b[property]);
  return sameProps.length === givenProperties.length;
};

const findDuplicateByNameAndType = (files: File[], fileToCompare: File): File | undefined =>
  files.find((file: File) => isEqualFileBy(['name', 'type'], file, fileToCompare));

type DragAndDropProps = {
  label: string;
  helperText: string;
};

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
   * The label for the file remove button in the files list
   */
  removeButtonLabel: string;
  /**
   * The aria-label for the file remove button in the file list. A function that has the name string as argument.
   */
  removeButtonAriaLabel: (name: string) => string;
  /**
   * A text which is shown after successful file remove from the files list.
   */
  removeSuccessMessage: string;
  /**
   * Callback fired when the list of files changes
   */
  onChange: (files: File[]) => void;
  /**
   * A comma separated list of unique file type specifiers describing file types to allow
   */
  accept?: string;
  /**
   * A Boolean that indicates that more than one file can be chosen
   */
  multiple?: boolean;
  /**
   * Drag and Drop area properties. If present, a drag and drop area with helper labels will render with file input.
   */
  dragAndDrop?: DragAndDropProps;
  /**
   * Additional class names to apply to the file input
   */
  className?: string;
  /**
   * If `true`, the file input will be disabled
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
   * If `true`, the label is displayed as required and the `input` element will be required
   */
  required?: boolean;
  /**
   * Override or extend the styles applied to the component
   */
  style?: React.CSSProperties;
};

const formatBytes = (bytes: number): string => {
  if (bytes === 0) {
    return '0 bytes';
  }

  const sizeUnits: string[] = ['B', 'kB', 'MB', 'GB', 'TB'];
  const sizeUnitIndex = Math.floor(Math.log(bytes) / Math.log(1024));
  const sizeInUnit = bytes / 1024 ** sizeUnitIndex;
  return `${sizeUnitIndex < 2 ? Math.round(sizeInUnit) : sizeInUnit.toFixed(1)} ${sizeUnits[sizeUnitIndex]}`;
};

export const FileInput = ({
  id,
  label,
  buttonLabel,
  removeButtonLabel,
  removeButtonAriaLabel,
  removeSuccessMessage,
  successMessage,
  disabled,
  dragAndDrop,
  className = '',
  errorText,
  helperText,
  onChange,
  required,
  style,
  accept,
  multiple,
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [successText, setSuccessText] = useState<string | undefined>();
  const hasFilesSelected = selectedFiles && selectedFiles.length > 0;
  const buttonId = `${id}-button`;
  const fileListId = `${id}-list`;
  const hasDragAndDrop = !!dragAndDrop;
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const [isDragOverDrop, setIsDragOverDrop] = useState<boolean>(false);

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

  const passButtonClickToInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const resetFileInputValue = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleSingleFileChange = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFiles(files);
      setSuccessText(successMessage);
    } else {
      setSuccessText(undefined);
    }
  };

  const handleMultipleChange = (files: File[]) => {
    if (files.length > 0) {
      const [replacedFiles, newFiles] = files.reduce(
        (acc: [File[], File[]], file: File) => {
          if (findDuplicateByNameAndType(selectedFiles, file)) {
            return [[...acc[0], file], acc[1]];
          }
          return [acc[0], [...acc[1], file]];
        },
        [[], []],
      );

      const selectedWithoutReplacedFiles = selectedFiles.filter(
        (selectedFile: File) => !findDuplicateByNameAndType(replacedFiles, selectedFile),
      );
      setSelectedFiles([...selectedWithoutReplacedFiles, ...replacedFiles, ...newFiles]);
      setSuccessText(successMessage);
    } else {
      setSuccessText(undefined);
    }
  };

  const onFilesChange = (files: File[]) => {
    if (multiple) {
      handleMultipleChange(files);
    } else {
      handleSingleFileChange(files);
    }
  };

  const removeFileFromList = (fileToRemove: File) => {
    const selectedFilesWithoutRemoved = selectedFiles.filter(
      (file: File) => !isEqualFileBy(['name', 'type', 'size', 'lastModified'], file, fileToRemove),
    );
    setSelectedFiles(selectedFilesWithoutRemoved);
    setSuccessText(removeSuccessMessage);
  };

  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOverDrop(true);
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOverDrop(false);
  };

  useEffect(() => {
    if (onChange) {
      onChange(selectedFiles);
    }
    // Clear input value on every change to ensure it triggers a onChange event when files are added
    resetFileInputValue();
  }, [selectedFiles, onChange]);

  return (
    <>
      <InputWrapper {...wrapperProps}>
        <div className={styles.fileInputContainer}>
          {hasDragAndDrop && (
            <>
              <div
                aria-hidden
                onDragEnter={onDragEnter}
                onDragOver={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={(event: React.DragEvent<HTMLDivElement>) => {
                  const { dataTransfer }: { dataTransfer: DataTransfer } = event;
                  onDragLeave(event);
                  onFilesChange(Array.from(dataTransfer.files));
                }}
                className={classNames(styles.dragAndDrop, isDragOverDrop && styles.dragAndDropActive)}
                ref={dropAreaRef}
              >
                <div className={styles.dragAndDropLabel}>
                  <IconUpload aria-hidden />
                  <span className={styles.dragAndDropLabelText}>{dragAndDrop.label}</span>
                </div>
              </div>
              <div className={styles.dragAndDropHelperText}>{dragAndDrop.helperText}</div>
            </>
          )}
          <div className={styles.fileInputWrapper}>
            <Button
              id={buttonId}
              variant="secondary"
              iconLeft={<IconPlus aria-hidden />}
              onClick={() => passButtonClickToInput()}
              disabled={disabled}
            >
              {buttonLabel}
            </Button>
            <input
              type="file"
              ref={inputRef}
              id={id}
              aria-labelledby={buttonId}
              disabled={disabled}
              required={required}
              className={styles.fileInput}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onFilesChange(Array.from(event.target.files));
              }}
              {...(accept ? { accept } : {})}
              {...(multiple ? { multiple } : {})}
              {...(hasFilesSelected ? { 'aria-describedby': fileListId } : {})}
            />
          </div>
        </div>
      </InputWrapper>
      {hasFilesSelected && (
        <ul id={fileListId} className={styles.fileList}>
          {selectedFiles.map((file: File) => (
            <li key={file.name} className={styles.fileListItem}>
              {file.type.startsWith('image') ? <IconPhoto aria-hidden /> : <IconDocument aria-hidden />}
              <div className={styles.fileListItemTitle}>
                <span className={styles.fileListItemName}>{file.name}</span>
                <span className={styles.fileListItemSize}>({formatBytes(file.size)})</span>
              </div>
              <button
                type="button"
                onClick={() => removeFileFromList(file)}
                className={styles.fileListItemButton}
                aria-label={removeButtonAriaLabel(file.name)}
              >
                <IconCross aria-hidden />
                <span className={styles.fileListItemButtonLabel}>{removeButtonLabel}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
