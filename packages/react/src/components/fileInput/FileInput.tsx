import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { uniqueId } from 'lodash';

import '../../styles/base.module.css';
import composeAriaDescribedBy from '../../utils/composeAriaDescribedBy';
import classNames from '../../utils/classNames';
import { Button } from '../button';
import { IconPlus, IconPhoto, IconCross, IconDocument, IconUpload } from '../../icons';
import { InputWrapper } from '../../internal/input-wrapper/InputWrapper';
import styles from './FileInput.module.scss';

type Language = 'en' | 'fi' | 'sv';

type FileInputProps = {
  /**
   * A comma-separated list of unique file type specifiers describing file types to allow. If present, the filename extension or filetype property is validated against the list. If the file(s) do not match the acceptance criteria, the component will not add the file(s), and it will show an error message with the file name.
   */
  accept?: string;
  /**
   * The label for the file button. Overrides default text. The button is not visible for assistive technology
   */
  buttonLabel?: string;
  /**
   * Additional class names to apply to the file input
   */
  className?: string;
  /**
   * Default selected files for the input
   */
  defaultValue?: File[];
  /**
   * If `true`, the file input will be disabled
   */
  disabled?: boolean;
  /**
   * If `true`, the file input will have a drag and drop area
   */
  dragAndDrop?: boolean;
  /**
   * Overrides default drag and drop area text
   */
  dragAndDropLabel?: string;
  /**
   * Overrides default label text between the drag and drop area and the input
   */
  dragAndDropInputLabel?: string;
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
   * The info text content that will be shown below the input
   */
  infoText?: string;
  /**
   * The label for the input
   */
  label: string;
  /**
   * The language of the component. It affects which language is used to present component-specific messages, labels, and aria-labels
   *
   * @default "fi"
   */
  language?: Language;
  /**
   * Maximum file size in bytes. If present, the file size is compared to this property. If the file(s) size property is larger than the max size, the component will not add the file(s), and it will show an error message with the file name.
   */
  maxSize?: number;
  /**
   * A Boolean that indicates that more than one file can be chosen
   */
  multiple?: boolean;
  /**
   * Callback fired when the list of files changes
   */
  onChange: (files: File[]) => void;
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
   * Aria-label text for the tooltip
   */
  tooltipLabel?: string;
  /**
   * Aria-label text for the tooltip trigger button
   */
  tooltipButtonLabel?: string;
  /**
   * The text content of the tooltip
   */
  tooltipText?: string;
};

type FileItem = {
  uiId: string;
  file: File;
};

const convertFileToFileItem = (file: File): FileItem => ({ file, uiId: uniqueId(file.name) });
const convertFileItemToFile = (fileItem: FileItem): File => fileItem.file;

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) {
    return '0 B';
  }

  const sizeUnits: string[] = ['B', 'KB', 'MB', 'GB', 'TB'];
  const sizeUnitIndex = Math.floor(Math.log(bytes) / Math.log(1024));
  const sizeInUnit = bytes / 1024 ** sizeUnitIndex;
  return `${sizeUnitIndex < 2 || sizeInUnit % 1 === 0 ? Math.round(sizeInUnit) : sizeInUnit.toFixed(1)} ${
    sizeUnits[sizeUnitIndex]
  }`;
};

const getButtonLabel = (language: Language, multiple: boolean): string => {
  return {
    en: `Add ${multiple ? 'files' : 'a file'}`,
    fi: `Lisää ${multiple ? 'tiedostoja' : 'tiedosto'}`,
    sv: `Välj ${multiple ? 'filer' : 'en fil'}`,
  }[language];
};

const getDragAndDropLabel = (language: Language): string => {
  return {
    en: 'Drag files here',
    fi: 'Raahaa tiedostot tähän',
    sv: 'Dra filerna hit',
  }[language];
};

const getDragAndDropInputLabel = (language: Language): string => {
  return {
    en: 'or browse from your device',
    fi: 'tai valitse tiedostot laitteeltasi',
    sv: 'eller välj filerna från din enhet',
  }[language];
};

const getNoFilesAddedMessage = (language: Language): string => {
  return {
    en: 'No file has been selected.',
    fi: 'Yhtään tiedostoa ei ole valittu.',
    sv: 'Ingen fil har valts.',
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
    en: `Remove ${fileName} from the added files.`,
    fi: `Poista tiedosto ${fileName} lisätyistä tiedostoista.`,
    sv: `Ta bort ${fileName} från filerna som lagts till.`,
  }[language];
};

const getFileListAriaLabel = (language: Language, totalAddedFiles: number): string => {
  return {
    en: `${totalAddedFiles === 0 ? '1 file' : `${totalAddedFiles} files`} added.`,
    fi: `${totalAddedFiles === 0 ? '1 tiedosto' : `${totalAddedFiles} tiedostoa`} added.`,
    sv: `${totalAddedFiles === 0 ? '1 fil' : `${totalAddedFiles} filer`} har lagts till.`,
  }[language];
};

const getRemoveSuccessMessage = (language: Language): string => {
  return {
    en: 'The file has been deleted.',
    fi: 'Tiedosto poistettu.',
    sv: 'Filen har tagits bort.',
  }[language];
};

const getAddSuccessMessage = (language: Language, numberOfAdded: number, numberOfTotal: number): string => {
  const partOfTotalStr = numberOfAdded === numberOfTotal ? numberOfAdded : `${numberOfAdded}/${numberOfTotal}`;

  return {
    en: `${partOfTotalStr} file(s) added.`,
    fi: `${partOfTotalStr} tiedosto(a) lisätty.`,
    sv: `${partOfTotalStr} fil(er) har lagts till.`,
  }[language];
};

const getMaxSizeMessage = (language: Language, maxSize: number): string => {
  const formattedMaxSize = formatBytes(maxSize);

  return {
    en: `The maximum file size is ${formattedMaxSize}.`,
    fi: `Suurin sallittu tiedostokoko on ${formattedMaxSize}.`,
    sv: `Den maximala filstorleken är ${formattedMaxSize}.`,
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
    sv: `Endast ${getAcceptString(accept, 'och')} filer.`,
  }[language];
};

const getFailedValidationTitle = (language: Language, numberOfFailed: number, numberOfTotal: number): string => {
  const partOfTotalStr = `${numberOfFailed}/${numberOfTotal}`;

  return {
    en: `File processing failed for ${partOfTotalStr} files:\n`,
    fi: `Tiedostonlisäys epäonnistui ${partOfTotalStr} tiedoston kohdalla:\n`,
    sv: `Filprocesseringen av filerna ${partOfTotalStr} misslyckades:\n`,
  }[language];
};

const getAcceptErrorMessage = (language: Language, file: File, accept: string): string => {
  const acceptMessage = getAcceptMessage(language, accept);

  return {
    en: `The file type, ${file.name}, is not supported. ${acceptMessage}`,
    fi: `Tiedoston, ${file.name}, tyyppi ei vastaa hyväksyttyjä tiedostotyppejä. ${acceptMessage}`,
    sv: `Filformatet, ${file.name}, stöds inte. ${acceptMessage}`,
  }[language];
};

const getMaxSizeErrorMessage = (language: Language, file: File, maxSize: number): string => {
  const fileSize = formatBytes(file.size);

  return {
    en: `File, ${file.name}, is too large (${fileSize}). ${getMaxSizeMessage(language, maxSize)}`,
    fi: `Tiedosto, ${file.name} on liian suuri (${fileSize}). ${getMaxSizeMessage(language, maxSize)}`,
    sv: `Filen, ${file.name}, är för stor (${fileSize}). ${getMaxSizeMessage(language, maxSize)}`,
  }[language];
};

// eslint-disable-next-line no-shadow
enum ValidationErrorType {
  accept = 'accept',
  maxSize = 'maxSize',
}

type ValidationError = {
  type: ValidationErrorType;
  text: string;
};

// Return the extension of the path, from the last '.' to end of string in the last portion of the path.
const getExtension = (path: string): string => {
  if (!path || typeof path !== 'string' || path === '') {
    // eslint-disable-next-line no-console
    console.warn(`FileInput: Path must be a non-empty string. Path is now ${JSON.stringify(path)}`);
    return '';
  }

  const lastDotIndex = path.lastIndexOf('.');
  if (lastDotIndex === -1) {
    // eslint-disable-next-line no-console
    console.warn('FileInput: File is missing extension');
    return '';
  }

  const extensionWithDot = path.substring(lastDotIndex);
  if (extensionWithDot.length <= 1) {
    // eslint-disable-next-line no-console
    console.warn('FileInput: File is missing extension');
    return '';
  }

  return extensionWithDot;
};

const validateAccept =
  (language: Language, accept: string) =>
  (file: File): true | ValidationError => {
    const extension: string = getExtension(file.name).toLocaleLowerCase();
    const fileType: string = file.type;
    const acceptedExtensions = accept.split(',').map((str) => str.trim().toLocaleLowerCase());
    const isMatchingType = !!acceptedExtensions.find(
      (acceptExtension) =>
        acceptExtension.includes(fileType) || acceptExtension.includes(`${fileType.split('/')[0]}/*`),
    );
    const hasMatchingFileExtension = !!acceptedExtensions.find((acceptExtension) => acceptExtension === extension);

    return (
      isMatchingType ||
      hasMatchingFileExtension || {
        type: ValidationErrorType.accept,
        text: getAcceptErrorMessage(language, file, accept),
      }
    );
  };

const validateMaxSize =
  (language: Language, maxSize: number) =>
  (file: File): true | ValidationError => {
    return (
      file.size <= maxSize || {
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
  defaultValue,
  disabled,
  dragAndDrop,
  dragAndDropLabel,
  dragAndDropInputLabel,
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
  tooltipLabel,
  tooltipButtonLabel,
  tooltipText,
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const didMountRef = useRef<boolean>(false);
  const [selectedFileItems, setSelectedFileItems] = useState<FileItem[]>([]);
  const [inputStateText, setInputStateText] = useState<string | undefined>();
  const [invalidText, setInvalidText] = useState<string | undefined>();
  const [processSuccessText, setProcessSuccessText] = useState<string | undefined>();
  const hasFileItems = selectedFileItems && selectedFileItems.length > 0;
  const fileListId = `${id}-list`;
  const fileListRef = useRef<HTMLUListElement>(null);
  const fileListFocusIndexRef = useRef<number>();
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
    infoText: disabled ? undefined : infoTextToUse,
    id,
    label,
    required,
    style,
    tooltipLabel,
    tooltipButtonLabel,
    tooltipText,
  };

  const passClickToInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const passFocusToInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const resetInputValue = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const clearState = () => {
    setProcessSuccessText(undefined);
    setInputStateText(undefined);
    setInvalidText(undefined);
    fileListFocusIndexRef.current = null;
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

  const afterFileItemsChange = (fileItems: FileItem[]) => {
    if (onChange) {
      const selectedFiles: File[] = fileItems.map(convertFileItemToFile);
      onChange(selectedFiles);
    }
    // Clear input value on every change to ensure it triggers a onChange event when files are added
    resetInputValue();
  };

  const handleSingleFileChange = (files: File[]) => {
    if (files.length > 0) {
      const { validFiles, validationErrors } = runValidations(files);
      if (validationErrors.length > 0) {
        setInvalidText(getValidationErrorsMessage(validationErrors, 1));
      } else {
        const newFileItems: FileItem[] = [convertFileToFileItem(validFiles[0])];
        setSelectedFileItems(newFileItems);
        setProcessSuccessText(getAddSuccessMessage(language, 1, 1));

        afterFileItemsChange(newFileItems);
      }
    }
  };

  const handleMultipleChange = (files: File[]) => {
    if (files.length > 0) {
      const { validFiles, validationErrors } = runValidations(files);

      if (validationErrors.length > 0) {
        setInvalidText(getValidationErrorsMessage(validationErrors, files.length));
      }

      if (validFiles.length > 0) {
        const newFileItems: FileItem[] = validFiles.map(convertFileToFileItem);
        const allFileItems: FileItem[] = [...selectedFileItems, ...newFileItems];
        setSelectedFileItems(allFileItems);
        setProcessSuccessText(getAddSuccessMessage(language, validFiles.length, files.length));

        afterFileItemsChange(allFileItems);
      }
    }
  };

  const onFilesChange = (files: File[]) => {
    clearState();

    if (multiple) {
      handleMultipleChange(files);
    } else {
      handleSingleFileChange(files);
    }
  };

  const onRemoveFileFromList = (fileItemToRemove: FileItem, indexToRemove: number) => {
    clearState();

    const selectedFileItemsWithoutRemoved: FileItem[] = selectedFileItems.filter(
      (fileItem: FileItem) => fileItem.uiId !== fileItemToRemove.uiId,
    );
    setSelectedFileItems(selectedFileItemsWithoutRemoved);

    if (selectedFileItemsWithoutRemoved.length > 0) {
      fileListFocusIndexRef.current = indexToRemove > 0 ? indexToRemove - 1 : 0;
      setInputStateText(getRemoveSuccessMessage(language));
    } else {
      passFocusToInput();
      setInputStateText(getNoFilesAddedMessage(language));
    }

    afterFileItemsChange(selectedFileItemsWithoutRemoved);
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

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const { dataTransfer }: { dataTransfer: DataTransfer } = event;
    onDragLeave(event);
    onFilesChange(Array.from(dataTransfer.files));
  };

  useEffect(() => {
    if (!didMountRef.current) {
      setInputStateText(getNoFilesAddedMessage(language));
      didMountRef.current = true;
    }
  }, [setInputStateText, language]);

  useEffect(() => {
    if (!hasFileItems && defaultValue && inputRef.current) {
      const dataTransfer = new DataTransfer();

      defaultValue.forEach((defaultFile) => {
        const file = new File([defaultFile], defaultFile.name, {
          type: defaultFile.type,
          lastModified: defaultFile.lastModified,
        });
        dataTransfer.items.add(file);
      });

      inputRef.current.files = dataTransfer.files;
      const event = new Event('change', { bubbles: true });
      inputRef.current.dispatchEvent(event);
    }
  }, [defaultValue]);

  // Compose aria-describedby attribute
  const ariaDescribedBy: string = [
    composeAriaDescribedBy(id, helperTextToUse, errorTextToUse, successText, infoTextToUse),
    hasFileItems && fileListId,
  ]
    .filter((text) => !!text)
    .join(' ');

  return (
    <>
      <InputWrapper {...wrapperProps}>
        <div className={styles.fileInputContainer}>
          {dragAndDrop && (
            <>
              <div
                aria-hidden
                className={classNames(
                  styles.dragAndDrop,
                  isDragOverDrop && styles.dragAndDropActive,
                  disabled && styles.dragAndDropDisabled,
                )}
                ref={dropAreaRef}
                {...(disabled
                  ? {}
                  : {
                      onClick: () => passClickToInput(),
                      onDragEnter,
                      onDragOver: onDragEnter,
                      onDragLeave,
                      onDrop,
                    })}
              >
                <div className={styles.dragAndDropLabel}>
                  <IconUpload aria-hidden />
                  <span className={styles.dragAndDropLabelText}>
                    {dragAndDropLabel || getDragAndDropLabel(language)}
                  </span>
                </div>
              </div>
              <div className={styles.dragAndDropHelperText}>
                {dragAndDropInputLabel || getDragAndDropInputLabel(language)}
              </div>
            </>
          )}
          <div className={styles.fileInputWrapper}>
            <Button
              aria-hidden
              tabIndex={-1}
              variant="secondary"
              iconLeft={<IconPlus aria-hidden />}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                passFocusToInput();
                passClickToInput();
              }}
              disabled={disabled}
            >
              {buttonLabel || getButtonLabel(language, multiple)}
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
          hasFileItems ? getFileListAriaLabel(language, selectedFileItems.length) : getNoFilesAddedMessage(language)
        }
      >
        {selectedFileItems.map((item: FileItem, index: number) => (
          <li
            key={item.uiId}
            className={styles.fileListItem}
            tabIndex={-1}
            ref={(el) => {
              if (el && fileListRef.current && fileListFocusIndexRef.current === index) {
                el.focus();
              }
            }}
          >
            {item.file.type.startsWith('image') ? <IconPhoto aria-hidden /> : <IconDocument aria-hidden />}
            <div className={styles.fileListItemTitle}>
              <span className={styles.fileListItemName}>{item.file.name}</span>
              <span className={styles.fileListItemSize}>({formatBytes(item.file.size)})</span>
            </div>
            <Button
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onRemoveFileFromList(item, index);
              }}
              variant="supplementary"
              size="small"
              theme="black"
              iconLeft={<IconCross />}
              aria-label={getRemoveButtonAriaLabel(language, item.file.name)}
              className={styles.fileListItemButton}
              disabled={disabled}
            >
              {getRemoveButtonLabel(language)}
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};
