import path from 'path';

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

// import core base styles
import 'hds-core';
import composeAriaDescribedBy from '../../utils/composeAriaDescribedBy';
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
   * A comma-separated list of unique file type specifiers describing file types to allow. If present, the filename extension or filetype property is validated against the list. If the file(s) do not match the acceptance criteria, the component will not add the file(s), and it will show an error message with the file name.
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
   * Maximum file size in bytes. If present, the file size is compared to this property. Maximum file size in bytes. If present, the file size is compared to this property. If the file(s) size property is larger than the max size, the component will not add the file(s), and it will show an error message with the file name.
   */
  maxSize?: number;
  /**
   * Additional class names to apply to the file input
   */
  className?: string;
  /**
   * If `true`, the file input will be disabled
   */
  disabled?: boolean;
  /**
   * The success text content that will be shown below the input
   */
  successText?: string;
  /**
   * The error text content that will be shown below the input
   */
  errorText?: string;
  /**
   * The helper text content that will be shown below the input
   */
  helperText?: string;
  /**
   * The info text content that will be shown below the input
   */
  infoText?: string;
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
  return `${sizeUnitIndex < 2 || sizeInUnit % 1 === 0 ? Math.round(sizeInUnit) : sizeInUnit.toFixed(1)} ${
    sizeUnits[sizeUnitIndex]
  }`;
};

const getNoFilesAddedMessage = (language: Language): string => {
  return {
    en: 'No file(s) selected.',
    fi: 'Yhtään tiedostoa ei ole valittu.',
    sv: 'No file(s) selected.',
  }[language];
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

const getFileListAriaLabel = (language: Language, totalAddedFiles: number): string => {
  return {
    en: `${totalAddedFiles === 0 ? '1 file' : `${totalAddedFiles} files`} added.`,
    fi: `${totalAddedFiles === 0 ? '1 tiedosto' : `${totalAddedFiles} tiedostoa`} added.`,
    sv: `${totalAddedFiles === 0 ? '1 file' : `${totalAddedFiles} files`} added.`,
  }[language];
};

const getRemoveSuccessMessage = (language: Language): string => {
  return {
    en: 'File removed.',
    fi: 'Tiedosto poistettu.',
    sv: 'Filen borttagen.',
  }[language];
};

const getAddSuccessMessage = (language: Language, numberOfAdded: number, numberOfTotal: number): string => {
  const partOfTotalStr = numberOfAdded === numberOfTotal ? numberOfAdded : `${numberOfAdded}/${numberOfTotal}`;

  return {
    en: `${partOfTotalStr} file(s) added.`,
    fi: `${partOfTotalStr} tiedosto(a) lisätty.`,
    sv: `${partOfTotalStr} file(s) added.`,
  }[language];
};

const getMaxSizeMessage = (language: Language, maxSize: number): string => {
  const formattedMaxSize = formatBytes(maxSize);

  return {
    en: `Max file size is ${formattedMaxSize}.`,
    fi: `Suurin sallittu tiedostokoko on ${formattedMaxSize}.`,
    sv: `Max file size is ${formattedMaxSize}.`,
  }[language];
};

const getAcceptString = (accept: string, conjunction: string): string => {
  const acceptList = accept.split(',');

  if (acceptList.length === 1) {
    return acceptList.toString();
  }
  const last = acceptList.pop();
  return `${acceptList.join(', ')} ${conjunction} ${last}`;
};

const getAcceptMessage = (language: Language, accept: string): string => {
  return {
    en: `Only ${getAcceptString(accept, 'and')} files.`,
    fi: `Vain ${getAcceptString(accept, 'ja')} tiedostoja.`,
    sv: `Only ${getAcceptString(accept, 'and')} files.`,
  }[language];
};

const getFailedValidationTitle = (language: Language, numberOfFailed: number, numberOfTotal: number): string => {
  const partOfTotalStr = `${numberOfFailed}/${numberOfTotal}`;

  return {
    en: `File processing failed for ${partOfTotalStr} files:\n`,
    fi: `Tiedostonlisäys epäonnistui ${partOfTotalStr} tiedoston kohdalla:\n`,
    sv: `File processing failed for ${partOfTotalStr} files:\n`,
  }[language];
};

const getAcceptErrorMessage = (language: Language, file: File, accept: string): string => {
  const acceptMessage = getAcceptMessage(language, accept);

  return {
    en: `File, ${file.name}, did not match the accepted file types. ${acceptMessage}`,
    fi: `Tiedoston, ${file.name}, tyyppi ei vastaa hyväksyttyjä tiedostotyppejä. ${acceptMessage}`,
    sv: `File, ${file.name}, did not match the accepted file types. ${acceptMessage}`,
  }[language];
};

const getMaxSizeErrorMessage = (language: Language, file: File, maxSize: number): string => {
  const fileSize = formatBytes(file.size);
  const maxSizeString = formatBytes(maxSize);

  return {
    en: `File, ${file.name}, is too large (${fileSize}). Max size is ${maxSizeString}.`,
    fi: `Tiedosto, ${file.name} on liian suuri (${fileSize}). Suurin sallittu koko on ${maxSizeString}.`,
    sv: `File, ${file.name}, is too large (${fileSize}). Max size is ${maxSizeString}.`,
  }[language];
};

enum ValidationErrorType {
  maxSize = 'maxSize',
}

type ValidationError = {
  type: ValidationErrorType;
  text: string;
};

const validateAccept = (language: Language, accept: string) => (file: File): true | ValidationError => {
  const extension = path.extname(file.name);
  const acceptedExtensions = accept.split(',').map((str) => str.trim());
  const isMatchingType = !!acceptedExtensions.find(
    (acceptExtension) =>
      acceptExtension.includes(file.type) || acceptExtension.includes(`${file.type.split('/')[0]}/*`),
  );
  const hasMatchingFileExtension = !!acceptedExtensions.find((acceptExtension) => acceptExtension === extension);

  return (
    isMatchingType ||
    hasMatchingFileExtension || {
      type: ValidationErrorType.maxSize,
      text: getAcceptErrorMessage(language, file, accept),
    }
  );
};

const validateMaxSize = (language: Language, maxSize: number) => (file: File): true | ValidationError => {
  return (
    file.size < maxSize || {
      type: ValidationErrorType.maxSize,
      text: getMaxSizeErrorMessage(language, file, maxSize),
    }
  );
};

export const FileInput = ({
  id,
  label,
  buttonLabel,
  language = 'fi',
  disabled,
  dragAndDrop,
  maxSize,
  className = '',
  successText,
  errorText,
  helperText,
  infoText,
  onChange,
  required,
  style,
  accept,
  multiple,
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [inputStateText, setInputStateText] = useState<string | undefined>(
    disabled ? undefined : getNoFilesAddedMessage(language),
  );
  const [invalidText, setInvalidText] = useState<string | undefined>();
  const [processSuccessText, setProcessSuccessText] = useState<string | undefined>();
  const hasFilesSelected = selectedFiles && selectedFiles.length > 0;
  const fileListId = `${id}-list`;
  const fileListRef = useRef<HTMLUListElement>(null);
  const fileListFocusIndexRef = useRef<number>();
  const hasDragAndDrop = !!dragAndDrop && !!dragAndDrop.label && !!dragAndDrop.helperText;
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const [isDragOverDrop, setIsDragOverDrop] = useState<boolean>(false);
  const instructionsText = [
    accept && getAcceptMessage(language, accept),
    maxSize && getMaxSizeMessage(language, maxSize),
  ]
    .filter((t) => !!t)
    .join(' ');
  const helperTextToUse = helperText || instructionsText;
  const successTextToUse = successText || processSuccessText;
  const errorTextToUse = errorText || invalidText;
  const infoTextToUse = infoText || inputStateText;

  const wrapperProps = {
    className,
    helperText: helperTextToUse,
    successText: successTextToUse,
    errorText: errorTextToUse,
    infoText: infoTextToUse,
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

  const clearNotificationTexts = () => {
    setProcessSuccessText(undefined);
    setInputStateText(undefined);
    setInvalidText(undefined);
  };

  const validationFns: ((file: File) => true | ValidationError)[] = [
    accept ? validateAccept(language, accept) : undefined,
    maxSize ? validateMaxSize(language, maxSize) : undefined,
  ].filter((fn) => !!fn);

  const runValidations = (files: File[]): { validFiles: File[]; validationErrors: ValidationError[][] } => {
    if (validationFns.length === 0) {
      return { validFiles: files, validationErrors: [] };
    }
    return files.reduce(
      (acc: { validFiles: File[]; validationErrors: ValidationError[][] }, file) => {
        const errors = validationFns.map((fn) => fn(file)).filter((r) => r !== true) as ValidationError[];
        if (errors.length > 0) {
          return { ...acc, validationErrors: [...acc.validationErrors, errors] };
        }
        return { ...acc, validFiles: [...acc.validFiles, file] };
      },
      { validFiles: [], validationErrors: [] },
    );
  };

  const getValidationErrorsMessage = (errors: (ValidationError | ValidationError[])[], totalNumberOfFiles: number) =>
    `${getFailedValidationTitle(language, errors.length, totalNumberOfFiles)}${errors
      .map((errorSet) => `- ${errorSet[0].text}`)
      .join('\n')}`;

  const handleSingleFileChange = (files: File[]) => {
    if (files.length > 0) {
      const { validFiles, validationErrors } = runValidations(files);
      if (validationErrors.length > 0) {
        setInvalidText(getValidationErrorsMessage(validationErrors, 1));
      } else {
        setSelectedFiles(validFiles);
        setProcessSuccessText(getAddSuccessMessage(language, 1, 1));
      }
    }
  };

  const handleMultipleChange = (files: File[]) => {
    if (files.length > 0) {
      const { validFiles, validationErrors } = runValidations(files);

      const [replacedFiles, newFiles] = validFiles.reduce(
        (acc: [File[], File[]], file: File) => {
          if (findDuplicateByNameAndType(selectedFiles, file)) {
            return [[...acc[0], file], acc[1]];
          }
          return [acc[0], [...acc[1], file]];
        },
        [[], []],
      );

      if (validationErrors.length > 0) {
        setInvalidText(getValidationErrorsMessage(validationErrors, files.length));
      }

      if (validFiles.length > 0) {
        const selectedWithoutReplacedFiles = selectedFiles.filter(
          (selectedFile: File) => !findDuplicateByNameAndType(replacedFiles, selectedFile),
        );
        setSelectedFiles([...selectedWithoutReplacedFiles, ...replacedFiles, ...newFiles]);
        setProcessSuccessText(getAddSuccessMessage(language, validFiles.length, files.length));
      }
    }
  };

  const onFilesChange = (files: File[]) => {
    clearNotificationTexts();

    if (multiple) {
      handleMultipleChange(files);
    } else {
      handleSingleFileChange(files);
    }
  };

  const onRemoveFileFromList = (fileToRemove: File, index: number) => {
    clearNotificationTexts();

    const selectedFilesWithoutRemoved = selectedFiles.filter(
      (file: File) => !isEqualFileBy(['name', 'type', 'size', 'lastModified'], file, fileToRemove),
    );
    setSelectedFiles(selectedFilesWithoutRemoved);
    setInputStateText(getRemoveSuccessMessage(language));

    if (selectedFilesWithoutRemoved.length > 0) {
      fileListFocusIndexRef.current = index > 0 ? index - 1 : 0;
      setInputStateText(getRemoveSuccessMessage(language));
    } else if (fileListRef.current) {
      fileListRef.current.focus();
      setInputStateText(getNoFilesAddedMessage(language));
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
    composeAriaDescribedBy(id, helperTextToUse, errorTextToUse, successText, infoTextToUse),
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
        aria-label={
          hasFilesSelected ? getFileListAriaLabel(language, selectedFiles.length) : getNoFilesAddedMessage(language)
        }
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
