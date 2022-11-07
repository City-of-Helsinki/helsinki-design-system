import React, { KeyboardEvent, useState, useRef, useEffect, useCallback } from 'react';
import { useCombobox } from 'downshift';

// import core base styles
import 'hds-core';

import styles from './SearchInput.module.scss';
import { FieldLabel } from '../../internal/field-label/FieldLabel';
import { DropdownMenu } from '../../internal/dropdownMenu/DropdownMenu';
import classNames from '../../utils/classNames';
import { IconCrossCircle, IconSearch } from '../../icons';
import { GetSuggestionsFunction, SUGGESTIONS_DEBOUNCE_VALUE, useSuggestions } from './useSuggestions';
import { DROPDOWN_MENU_ITEM_HEIGHT } from '../dropdown/dropdownUtils';
import { useShowLoadingSpinner } from '../../hooks/useShowLoadingSpinner';
import { LoadingSpinner } from '../loadingSpinner';

export type SearchInputProps<SuggestionItem> = {
  /**
   * Additional class names to add to the component
   */
  className?: string;
  /**
   * The aria-label for the clear button.
   * @default Clear
   */
  clearButtonAriaLabel?: string;
  /**
   * Callback function fired every time the input content changes. Receives the input value as a parameter. Must return a promise which resolves to an array of SuggestionItems.
   */
  getSuggestions?: GetSuggestionsFunction<SuggestionItem>;
  /**
   * The helper text content that will be shown below the input
   */
  helperText?: string;
  /**
   * Should the matching part of a suggestion be highlighted.
   * @default true
   */
  highlightSuggestions?: boolean;
  /**
   * The label for the search field
   */
  label: React.ReactNode;
  /**
   * Text to show for screen readers when loading spinner is no longer visible.
   * @default "Finished loading suggestions"
   */
  loadingSpinnerFinishedText?: string;
  /**
   * Text to show for screen readers when loading spinner is visible.
   * @default "Loading suggestions"
   */
  loadingSpinnerText?: string;
  /**
   * Callback function fired after search is triggered.
   */
  onSubmit: (value: string) => void;
  /**
   * Callback function fired after input value has changed.
   */
  onChange?: (value: string) => void;
  /**
   * Placeholder text for the search input
   */
  placeholder?: string;
  /**
   * The aria-label for the search button.
   * @default Search
   */
  searchButtonAriaLabel?: string;
  /**
   * Hides the search button
   * @default false
   */
  hideSearchButton?: boolean;
  /**
   * Override or extend the styles applied to the component
   */
  style?: React.CSSProperties;
  /**
   * Field of the SuggestionItem that represents the item label.
   * E.g. an `suggestionLabelField` value of `'foo'` and a suggestion item `{ foo: 'Label', bar: 'value' }`, would display `'Label'` in the menu for that specific suggestion.
   */
  suggestionLabelField?: keyof SuggestionItem;
  /**
   * The number of suggestions that are visible in the menu before it becomes scrollable.
   * @default 8
   */
  visibleSuggestions?: number;
};

export const SearchInput = <SuggestionItem,>({
  className,
  clearButtonAriaLabel = 'Clear',
  getSuggestions,
  helperText,
  highlightSuggestions = false,
  label,
  loadingSpinnerFinishedText = 'Finished loading suggestions',
  loadingSpinnerText = 'Loading suggestions',
  onSubmit,
  placeholder,
  searchButtonAriaLabel = 'Search',
  hideSearchButton = false,
  style,
  suggestionLabelField,
  visibleSuggestions = 8,
  onChange,
}: SearchInputProps<SuggestionItem>) => {
  const didMount = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isItemClicked = useRef<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const { suggestions, isLoading } = useSuggestions<SuggestionItem>(inputValue, getSuggestions, isSubmitted);
  const showLoadingSpinner = useShowLoadingSpinner(isLoading, 1500 - SUGGESTIONS_DEBOUNCE_VALUE);

  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    reset,
  } = useCombobox<SuggestionItem>({
    items: suggestions,
    onInputValueChange: (e) => {
      setInputValue(e.inputValue);
    },
    onStateChange(props) {
      const { ItemClick } = useCombobox.stateChangeTypes;
      if (props.type === ItemClick) {
        isItemClicked.current = true;
      }
    },
    itemToString: (item) => (item ? `${item[suggestionLabelField]}` : ''),
  });

  const submit = useCallback(() => {
    setIsSubmitted(true);
    onSubmit(inputValue);
  }, [setIsSubmitted, onSubmit, inputValue]);

  const onInputKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = event.key || event.keyCode;
    if (key === 'Enter' || key === 13) {
      submit();
    } else {
      setIsSubmitted(false);
    }
  };

  useEffect(() => {
    if (isItemClicked.current) {
      isItemClicked.current = false;
      submit();
    }
  }, [isItemClicked, submit]);

  const clear = () => {
    reset();
    inputRef.current.focus();
  };

  /**
   * Call optional onChange if input value changes
   */
  useEffect(() => {
    if (didMount.current) {
      if (onChange) {
        onChange(inputValue);
      }
    } else {
      didMount.current = true;
    }
  }, [onChange, inputValue]);

  return (
    <div className={classNames(styles.root, isOpen && styles.open, className)} style={style}>
      {label && <FieldLabel label={label} {...getLabelProps()} />}
      <div className={classNames(styles.wrapper)} ref={getComboboxProps().ref}>
        <input
          {...getInputProps({
            onKeyUp: onInputKeyUp,
            ref: inputRef,
            role: getComboboxProps().role,
            'aria-expanded': getComboboxProps()['aria-expanded'],
            'aria-haspopup': getComboboxProps()['aria-haspopup'],
            'aria-owns': getComboboxProps()['aria-owns'],
          })}
          className={classNames(styles.input)}
          placeholder={placeholder}
          enterKeyHint="search"
        />
        <div className={styles.buttons}>
          {inputValue.length > 0 && (
            <button
              type="button"
              aria-label={clearButtonAriaLabel}
              className={classNames(styles.button)}
              onClick={clear}
            >
              <IconCrossCircle className={styles.searchIcon} aria-hidden />
            </button>
          )}
          {!hideSearchButton && (
            <button
              type="button"
              aria-label={searchButtonAriaLabel}
              className={classNames(styles.button)}
              onClick={submit}
            >
              <IconSearch className={styles.searchIcon} aria-hidden />
            </button>
          )}
        </div>
        {showLoadingSpinner && (
          <div className={styles.loadingSpinnerContainer} aria-hidden>
            <LoadingSpinner
              loadingText={loadingSpinnerText}
              loadingFinishedText={loadingSpinnerFinishedText}
              small
              className={styles.loadingSpinner}
            />
            {loadingSpinnerText}
          </div>
        )}
        <DropdownMenu<SuggestionItem>
          isOptionDisabled={() => false}
          multiselect={false}
          open={isOpen && !showLoadingSpinner}
          selectedItem={null}
          selectedItems={[]}
          highlightValue={highlightSuggestions && inputValue.length >= 3 && inputValue}
          visibleOptions={visibleSuggestions}
          menuStyles={styles}
          options={suggestions}
          optionLabelField={`${suggestionLabelField}`}
          menuProps={getMenuProps({
            style: { maxHeight: DROPDOWN_MENU_ITEM_HEIGHT * visibleSuggestions },
          })}
          getItemProps={(item, index, selected, optionDisabled) =>
            getItemProps({
              item,
              index,
              disabled: optionDisabled,
              className: classNames(
                styles.menuItem,
                selected && styles.selected,
                highlightedIndex === index && styles.highlighted,
              ),
            })
          }
        />
      </div>
      {helperText && <div className={styles.helperText}>{helperText}</div>}
    </div>
  );
};
