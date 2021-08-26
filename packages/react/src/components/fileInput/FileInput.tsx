import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

// import core base styles
import 'hds-core';
import comboseAriaDescribedBy from '../../utils/comboseAriaDescribedBy';
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

type Language = 'en' | 'fi' | 'sv';

type FileInputProps = {
  /**
   * The id of the input element
   */
  id: string;
  /**
   * The label for the input
   */
  label: string;
  /**
   * The label for the file button. The button is not visible for assistive technology
   */
  buttonLabel: string;
  /**
   * The language of the component. It affects which language is used to present component-specific messages, labels, and aria-labels
   *
   * @default "en"
   */
  language?: Language;
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
   * Drag and Drop area properties. If present, a drag and drop area with helper labels will render with file input. The area is not visible for assistive technology
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

const getRemoveButtonLabel = (language: Language): string => {
  return {
    en: 'Remove',
    fi: 'Poista',
    sv: 'Ta bort',
  }[language];
};

const getRemoveButtonAriaLabel = (language: Language, fileName: string): string => {
  return {
    en: `Remove ${fileName} from the added files list.`,
    fi: `Poista tiedosto ${fileName} lisättyjen tiedostojen listasta.`,
    sv: `Ta bort ${fileName} tillagda filen från fillistan.`,
  }[language];
};

const getFileListAriaLabel = (language: Language): string => {
  return {
    en: 'Added files',
    fi: 'Lisätyt tiedostot',
    sv: 'Tillagda filerna',
  }[language];
};

const getRemoveSuccessMessage = (language: Language): string => {
  return {
    en: 'File removed.',
    fi: 'Tiedosto poistettu.',
    sv: 'Filen borttagen.',
  }[language];
};

const getAddSuccessMessage = (language: Language): string => {
  return {
    en: 'File added.',
    fi: 'Tiedosto lisätty.',
    sv: 'Filen har blivit tillagd.',
  }[language];
};

export const FileInput = ({
  id,
  label,
  buttonLabel,
  language = 'en',
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
  const fileListId = `${id}-list`;
  const fileListRef = useRef<HTMLUListElement>(null);
  const fileListFocusIndexRef = useRef<number>();
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
      setSuccessText(getAddSuccessMessage(language));
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
      setSuccessText(getAddSuccessMessage(language));
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

  const onRemoveFileFromList = (fileToRemove: File, index: number) => {
    const selectedFilesWithoutRemoved = selectedFiles.filter(
      (file: File) => !isEqualFileBy(['name', 'type', 'size', 'lastModified'], file, fileToRemove),
    );
    setSelectedFiles(selectedFilesWithoutRemoved);
    setSuccessText(getRemoveSuccessMessage(language));

    if (selectedFilesWithoutRemoved.length > 0) {
      fileListFocusIndexRef.current = index > 0 ? index - 1 : 0;
    } else if (fileListRef.current) {
      fileListRef.current.focus();
    }
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

  // Compose aria-describedby attribute
  const ariaDescribedBy: string = [
    comboseAriaDescribedBy(id, helperText, errorText, successText),
    hasFilesSelected && fileListId,
  ]
    .filter((text) => !!text)
    .join(' ');

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
              aria-hidden
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
              disabled={disabled}
              required={required}
              aria-describedby={ariaDescribedBy}
              className={styles.fileInput}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onFilesChange(Array.from(event.target.files));
              }}
              {...(accept ? { accept } : {})}
              {...(multiple ? { multiple } : {})}
            />
          </div>
        </div>
      </InputWrapper>
      <ul
        id={fileListId}
        ref={fileListRef}
        tabIndex={-1}
        className={styles.fileList}
        aria-label={getFileListAriaLabel(language)}
      >
        {selectedFiles.map((file: File, index: number) => (
          <li
            key={file.name}
            className={styles.fileListItem}
            tabIndex={-1}
            ref={(el) => {
              if (el && fileListRef.current && fileListFocusIndexRef.current === index) {
                el.focus();
              }
            }}
          >
            {file.type.startsWith('image') ? <IconPhoto aria-hidden /> : <IconDocument aria-hidden />}
            <div className={styles.fileListItemTitle}>
              <span className={styles.fileListItemName}>{file.name}</span>
              <span className={styles.fileListItemSize}>({formatBytes(file.size)})</span>
            </div>
            <Button
              onClick={() => onRemoveFileFromList(file, index)}
              variant="supplementary"
              size="small"
              theme="black"
              iconLeft={<IconCross />}
              aria-label={getRemoveButtonAriaLabel(language, file.name)}
              className={styles.fileListItemButton}
            >
              {getRemoveButtonLabel(language)}
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};
