import React, { KeyboardEvent, useState, useRef, useEffect } from 'react';
import { useCombobox, UseComboboxStateChangeTypes } from 'downshift';

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
   * Additional class names to add to the component.
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
   * The helper text content that will be shown below the input.
   */
  helperText?: string;
  /**
   * Should the matching part of a suggestion be highlighted.
   * @default true
   */
  highlightSuggestions?: boolean;
  /**
   * The label for the search field.
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
   * Callback function fired after input value has changed. Required for a controlled component.
   */
  onChange?: (value: string) => void;
  /**
   * Placeholder text for the search input.
   */
  placeholder?: string;
  /**
   * The aria-label for the search button.
   * @default Search
   */
  searchButtonAriaLabel?: string;
  /**
   * Hides the search button.
   * @default false
   */
  hideSearchButton?: boolean;
  /**
   * Override or extend the styles applied to the component.
   */
  style?: React.CSSProperties;
  /**
   * Field of the SuggestionItem that represents the item label.
   * E.g. an `suggestionLabelField` value of `'foo'` and a suggestion item `{ foo: 'Label', bar: 'value' }`, would display `'Label'` in the menu for that specific suggestion.
   */
  suggestionLabelField?: keyof SuggestionItem;
  /**
   * The value of the input element, required for a controlled component. Remember to use onChange prop as well.
   */
  value?: string;
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
  value,
}: SearchInputProps<SuggestionItem>) => {
  const didMount = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const userEnterKeyAction = 'userEnterKeyAction';
  const [lastAction, updateLastAction] = useState<UseComboboxStateChangeTypes | typeof userEnterKeyAction>(undefined);
  const [internalValue, setInternalValue] = useState<string>('');
  const inputValue = value || internalValue;

  const wasLastActionStateChangeEnterKey = () => {
    return lastAction === useCombobox.stateChangeTypes.InputKeyDownEnter;
  };

  const wasSubmitted = () => {
    return (
      lastAction === useCombobox.stateChangeTypes.ItemClick ||
      lastAction === userEnterKeyAction ||
      wasLastActionStateChangeEnterKey()
    );
  };

  const { suggestions, isLoading, clearSuggestions } = useSuggestions<SuggestionItem>(
    inputValue,
    getSuggestions,
    wasSubmitted(),
  );
  const showLoadingSpinner = useShowLoadingSpinner(isLoading, 1500 - SUGGESTIONS_DEBOUNCE_VALUE);
  const isControlledComponent = value !== undefined && onChange;

  const dispatchValueChange = (changedValue: string) => {
    if (isControlledComponent) {
      onChange(changedValue);
    } else {
      setInternalValue(changedValue);
    }
  };

  // onInputValueChange of the useCombobox hook is not used,
  // because it causes some sort of async input value update.
  // That causes input value to be out of sync in second re-render.
  // That causes cursor to always jump to the end of the input.
  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchValueChange(e.target.value);
  };

  const submitValue = (val?: string) => {
    const inputElementValue = inputRef.current?.value;
    const valueToSubmit = val !== undefined ? val : inputElementValue;
    onSubmit(valueToSubmit);
    clearSuggestions();
  };

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
    onStateChange(props) {
      const { ItemClick, FunctionReset, InputKeyDownEnter } = useCombobox.stateChangeTypes;
      const handledChanges = [ItemClick, FunctionReset, InputKeyDownEnter] as UseComboboxStateChangeTypes[];
      if (handledChanges.includes(props.type)) {
        // if props.type === ItemClick and the value of the clicked item matches
        // the value in the input element then props.inputValue does not exist.
        const clickedValueMatchesCurrentValue = props.type === ItemClick && props.inputValue === undefined;
        const newValue = clickedValueMatchesCurrentValue ? inputRef.current?.value : props.inputValue;
        // additional check to make sure the value is never set to undefined
        if (newValue === undefined) {
          return;
        }
        if (!clickedValueMatchesCurrentValue) {
          dispatchValueChange(newValue);
        }
        if (props.type !== FunctionReset) {
          submitValue(newValue);
        }
        updateLastAction(props.type);
      } else {
        updateLastAction(undefined);
      }
    },
    itemToString: (item) => (item ? `${item[suggestionLabelField]}` : ''),
    ...(isControlledComponent && { inputValue }),
  });

  const onInputKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = event.key || event.keyCode;
    const wasEnterKey = key === 'Enter' || key === 13;
    if (!wasLastActionStateChangeEnterKey() && wasEnterKey) {
      submitValue();
    }
    updateLastAction(wasEnterKey ? userEnterKeyAction : undefined);
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // isOpen is sometimes true for no reason
    if (isOpen && suggestions.length) {
      return;
    }
    if (event.key === 'Home' || event.key === 'End') {
      // When preventDownshiftDefault = true, downshift does not alter native behavior
      // eslint-disable-next-line no-param-reassign
      (event.nativeEvent as typeof event.nativeEvent & {
        preventDownshiftDefault: boolean;
      }).preventDownshiftDefault = true;
    }
  };

  const clear = () => {
    reset();
    inputRef.current.focus();
    clearSuggestions();
  };

  /**
   * Call onChange here if internal value changes and this is uncontrolled component.
   */
  useEffect(() => {
    if (didMount.current) {
      if (onChange && value === undefined) {
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
            onKeyDown: onInputKeyDown,
            onChange: onInputValueChange,
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
              onClick={() => submitValue()}
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
          menuStyles={styles}
          options={suggestions}
          optionLabelField={`${String(suggestionLabelField)}`}
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
