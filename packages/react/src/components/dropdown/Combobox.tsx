/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { useCombobox, useMultipleSelection } from 'downshift';
import isEqual from 'lodash.isequal';
import uniqueId from 'lodash.uniqueid';

import 'hds-core';

import styles from './Select.module.scss';
import comboboxStyles from './Combobox.module.scss';
import { FieldLabel } from '../../internal/field-label/FieldLabel';
import classNames from '../../utils/classNames';
import { IconAlertCircle, IconAngleDown, IconCheck } from '../../icons';
import { SelectedItems } from '../../internal/selectedItems/SelectedItems';
import { SelectProps } from './Select';
import { getIsInSelectedOptions } from './dropdownUtils';

type FilterFunction<OptionType> = (options: OptionType[], search: string) => OptionType[];

export type ComboboxProps<OptionType> = SelectProps<OptionType> & {
  /**
   * If provided, this filter function will be used for filtering the
   * combobox suggestions. If this prop is not provided, the default
   * filter implementation is used. The default implementation assumes
   * that the `optionLabelField` prop points to a string value that it
   * can compare with the search value.
   */
  filter?: FilterFunction<OptionType>;
};

function getDefaultFilter<OptionType>(labelField: string): FilterFunction<OptionType> {
  return (options: OptionType[], search: string) => {
    return options.filter((option) => {
      const label = option[labelField];
      const isLabelString = typeof label === 'string';

      if (!label) {
        // eslint-disable-next-line no-console
        console.warn(`Filtering failed because field ${labelField} could not be found from OptionType`);

        return false;
      }

      if (!isLabelString) {
        // eslint-disable-next-line no-console
        console.warn(`Filtering failed because field ${labelField} has a value that is not a string`);

        return false;
      }

      return label.toLowerCase().startsWith(search.toLowerCase());
    });
  };
}

export const Combobox = <OptionType,>({
  className,
  clearable = true,
  clearButtonAriaLabel,
  disabled = false,
  error,
  helper,
  icon,
  id = uniqueId('hds-select-'),
  invalid = false,
  isOptionDisabled,
  label,
  multiselect,
  onBlur = () => null,
  onChange = () => null,
  onFocus = () => null,
  // todo: test using options without a label key and without optionLabelField defined
  optionLabelField = 'label',
  options = [],
  placeholder,
  selectedItemRemoveButtonAriaLabel,
  selectedItemSrLabel,
  style,
  value,
  visibleOptions = 5,
  filter: userLandFilter,
}: ComboboxProps<OptionType>) => {
  const filter = userLandFilter || getDefaultFilter(optionLabelField);

  // dropdown wrapper ref
  const wrapperRef = useRef<HTMLDivElement>(null);
  // selected items container ref
  const selectedItemsContainerRef = useRef<HTMLDivElement>(null);
  // whether active focus is within the dropdown
  const [hasFocus, setFocus] = useState(false);
  // tracks current combobox search value
  const [search, setSearch] = useState<string>('');
  // init focus & blur listeners and handle callbacks
  useEffect(() => {
    const wrapperEl = wrapperRef.current;

    const focusHandler = (event: FocusEvent): void => {
      const { relatedTarget, target, type } = event;

      if (type === 'focus') {
        setFocus(wrapperEl.contains(target as Node));
      }
      if (type === 'blur') {
        setFocus(wrapperEl.contains(relatedTarget as Node));
      }
      if (!relatedTarget) {
        type === 'focus' ? onFocus() : onBlur();
      }
    };

    // set listeners
    ['focus', 'blur'].forEach((type) => wrapperEl.addEventListener(type, focusHandler, true));
    // cleanup
    return () => ['focus', 'blur'].forEach((type) => wrapperEl.removeEventListener(type, focusHandler, true));
  }, [onFocus, onBlur]);

  const getFilteredItems = (items: OptionType[]) => filter(items, search);

  // init multi-select
  const {
    activeIndex,
    addSelectedItem,
    getDropdownProps,
    getSelectedItemProps,
    removeSelectedItem,
    reset,
    selectedItems,
    setActiveIndex,
    setSelectedItems: _setSelectedItems,
  } = useMultipleSelection<OptionType>({
    // sets focus on the first selected item when the dropdown is initialized
    defaultActiveIndex: 0,
    initialActiveIndex: 0,
    // todo: create prop
    initialSelectedItems: [options[0], options[1], options[2], options[3]],
    ...(multiselect && value !== undefined && { selectedItems: (value as OptionType[]) ?? [] }),
    // todo: create a prop for setting the removal message
    getA11yRemovalMessage({ itemToString, removedSelectedItem }) {
      // eslint-disable-next-line no-console
      console.log(
        `getA11yRemovalMessage message: "${itemToString(removedSelectedItem[optionLabelField])} has been removed"`,
      );
      return `${itemToString(removedSelectedItem[optionLabelField])} has been removed`;
    },
    onSelectedItemsChange({ selectedItems: _selectedItems }) {
      return multiselect && onChange(_selectedItems);
    },
    onStateChange({ type, activeIndex: _activeIndex }) {
      let activeNode;

      switch (type) {
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          activeNode = selectedItemsContainerRef.current?.childNodes[activeIndex] as HTMLDivElement;
          if (!_activeIndex && activeNode) activeNode.focus();
          break;
        default:
          break;
      }
    },
    stateReducer(state, { type, changes }) {
      let removedItemIndex;
      let lastItemRemoved;
      switch (type) {
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          // get the index of the deleted item
          removedItemIndex = state.selectedItems.findIndex((item) => !changes.selectedItems.includes(item));
          // whether the removed item was last in selectedItems
          lastItemRemoved = removedItemIndex === changes.selectedItems.length;

          return {
            ...changes,
            // set the new last item as active if the removed item was last,
            // otherwise set the item succeeding the removed one active
            activeIndex: lastItemRemoved ? removedItemIndex - 1 : removedItemIndex,
          };
        default:
          return changes;
      }
    },
  });

  // init select
  const {
    getItemProps,
    getLabelProps,
    getMenuProps,
    getToggleButtonProps,
    highlightedIndex,
    isOpen,
    selectedItem,
    selectItem,
    getInputProps,
    getComboboxProps,
  } = useCombobox<OptionType>({
    id,
    items: getFilteredItems(options),
    onInputValueChange: ({ inputValue }) => {
      setSearch(inputValue);
    },
    // a defined value indicates that the dropdown should be controlled
    // don't set selectedItem if it's not, so that downshift can handle the state
    ...(!multiselect && value !== undefined && { selectedItem: value as OptionType }),
    // todo: create a prop for setting the selection message and "selections cleared" message
    // todo: how can this be done for multiselect?
    getA11ySelectionMessage({ selectedItem: _selectedItem }) {
      if (!multiselect && _selectedItem) {
        const message = `${_selectedItem?.[optionLabelField]} has been selected`;
        // eslint-disable-next-line no-console
        console.log(`getA11ySelectionMessage message: "${message}"`);
        return message;
      }
      return '';
    },
    itemToString: (item): string => (item ? item[optionLabelField] ?? '' : ''),
    onSelectedItemChange: ({ selectedItem: _selectedItem }) => !multiselect && onChange(_selectedItem),
    onStateChange({ type, selectedItem: _selectedItem }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (multiselect && _selectedItem) {
            getIsInSelectedOptions(selectedItems, _selectedItem)
              ? _setSelectedItems(selectedItems.filter((item) => !isEqual(item, _selectedItem)))
              : addSelectedItem(_selectedItem);
            selectItem(null);
          }
          break;
        default:
          break;
      }
    },
    stateReducer(state, { type, changes }) {
      switch (type) {
        case useCombobox.stateChangeTypes.ItemClick:
          // prevent the menu from being closed when the user selects an item
          if (multiselect) {
            return {
              ...changes,
              isOpen: state.isOpen,
              highlightedIndex: state.highlightedIndex,
            };
          }
          return changes;
        default:
          return changes;
      }
    },
  });

  const setSelectedItems = (itemToBeSelected: OptionType) => {
    getIsInSelectedOptions(selectedItems, itemToBeSelected)
      ? _setSelectedItems(selectedItems.filter((item) => !isEqual(item, itemToBeSelected)))
      : addSelectedItem(itemToBeSelected);
  };

  const handleMultiSelectInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // 'keyCode' is deprecated. We can't use 'key', because it does not
    // support space. Alternative would be to use 'code', but it's not
    // supported by React. Instead we are using the underlying native
    // element in order to access code.
    if (e.nativeEvent.code === 'Space') {
      // Prevent 'Space' from typing a space into the input.
      // @ts-ignore
      e.nativeEvent.preventDownshiftDefault = true;

      const highlightedItem = getFilteredItems(options)[highlightedIndex];

      setSelectedItems(highlightedItem);
    }

    // If the menu is open, prevent the events for dropdown from firing.
    if (isOpen && (e.key === 'Backspace' || e.key === 'ArrowLeft')) {
      // @ts-ignore
      e.nativeEvent.preventDownshiftDefault = true;
    }
  };

  if (!multiselect) {
    // we call the getDropdownProps getter function when multiselect isn't enabled
    // in order to suppress the "You forgot to call the ..." error message thrown by downshift.
    // we only need to apply the getter props to the toggle button when multiselect is enabled.
    getDropdownProps({}, { suppressRefError: true });
  }

  // show placeholder if no value is selected
  const showPlaceholder = (multiselect && selectedItems.length === 0) || (!multiselect && !selectedItem);
  // Input should be show when the combobox is open, or when it's
  // closed, but no items are selected. The input should always be
  // visible when multiselect mode is turned off.
  const isInputVisible = !multiselect || isOpen || (!isOpen && selectedItems.length === 0);

  return (
    <div
      className={classNames(
        styles.root,
        invalid && styles.invalid,
        disabled && styles.disabled,
        isOpen && styles.open,
        multiselect && styles.multiselect,
        className,
      )}
      style={style}
    >
      {/* LABEL */}
      {label && <FieldLabel label={label} {...getLabelProps()} />}
      <div ref={wrapperRef} className={classNames(styles.wrapper, comboboxStyles.wrapper)}>
        {/* SELECTED ITEMS */}
        {multiselect && selectedItems.length > 0 && (
          <SelectedItems
            activeIndex={activeIndex}
            clearable={clearable}
            clearButtonAriaLabel={clearButtonAriaLabel}
            dropdownId={id}
            getSelectedItemProps={getSelectedItemProps}
            hideItems={!hasFocus}
            onClear={() => reset()}
            onRemove={removeSelectedItem}
            optionLabelField={optionLabelField}
            removeButtonAriaLabel={selectedItemRemoveButtonAriaLabel}
            selectedItems={selectedItems}
            selectedItemSrLabel={selectedItemSrLabel}
            selectedItemsContainerRef={selectedItemsContainerRef}
            setActiveIndex={setActiveIndex}
          />
        )}
        {/* TOGGLE BUTTON */}
        <div {...getComboboxProps()} className={comboboxStyles.buttonInputStack}>
          <div className={comboboxStyles.inputWrapper}>
            {/* icons are only supported by single selects */}
            {icon && !multiselect && <span className={classNames(styles.icon, comboboxStyles.inputIcon)}>{icon}</span>}
            <input
              {...getInputProps({
                ...(multiselect && {
                  ...getDropdownProps({
                    // Change Downshift's default behavior with space.
                    // Instead of typing a space character into the
                    // search input, it now selects an item without
                    // closing the dropdown menu.

                    // Our custom keyDown handler also blocks other
                    // dropdown key events when the menu is open. This
                    // would normally be done with the
                    // 'preventKeyAction' setting, but it would also
                    // block our custom handler from executing, which
                    // would break the special behavior we have
                    // implemented for space. We want to block other key
                    // actions in order to ensure that dropdown and
                    // input props don't conflict.
                    onKeyDown: handleMultiSelectInputKeyDown,
                  }),
                }),
              })}
              placeholder={placeholder}
              className={classNames(
                'hds-text-input__input',
                comboboxStyles.input,
                isInputVisible ? '' : comboboxStyles.hidden,
              )}
            />
          </div>
          <button
            type="button"
            {...getToggleButtonProps({
              'aria-owns': getMenuProps().id,
              // prepend helper text id to the id's return by the downshift getter function,
              // so that the helper text will be read to screen reader users before the other labels.
              // todo: only add helper id if a helper text is defined
              'aria-labelledby': `${id}-helper ${getToggleButtonProps()['aria-labelledby']}`,
              disabled,
              className: classNames(
                styles.button,
                showPlaceholder && styles.placeholder,
                !showPlaceholder && comboboxStyles.noPadding,
                comboboxStyles.button,
              ),
            })}
          >
            <IconAngleDown className={styles.angleIcon} />
          </button>
        </div>
        <ul
          {...getMenuProps({
            ...(multiselect && { 'aria-multiselectable': true }),
            className: classNames(styles.menu, options.length > visibleOptions && styles.overflow),
            style: { maxHeight: `calc(var(--menu-item-height) * ${visibleOptions})` },
          })}
        >
          {isOpen &&
            getFilteredItems(options).map((item, index) => {
              const optionLabel = item[optionLabelField];
              const selected = multiselect ? getIsInSelectedOptions(selectedItems, item) : isEqual(selectedItem, item);
              // todo: add aria-disabled to disabled menu items
              const optionDisabled = typeof isOptionDisabled === 'function' ? isOptionDisabled(item, index) : false;

              return (
                <li
                  key={optionLabel}
                  {...getItemProps({
                    item,
                    index,
                    disabled: optionDisabled,
                    className: classNames(
                      styles.menuItem,
                      highlightedIndex === index && styles.highlighted,
                      selected && styles.selected,
                      optionDisabled && styles.disabled,
                      // todo: use root multiselect class
                      // multiselect && styles.multiselect,
                    ),
                  })}
                  {...{ 'aria-selected': selected }}
                >
                  {multiselect ? (
                    <>
                      <IconCheck className={styles.checkbox} aria-hidden />
                      {optionLabel}
                    </>
                  ) : (
                    <>
                      {optionLabel}
                      {selected && <IconCheck className={styles.selectedIcon} />}
                    </>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
      {/* INVALID TEXT */}
      {invalid && error && (
        <div id={`${id}-error`} className={styles.errorText} aria-hidden="true">
          <IconAlertCircle className={styles.invalidIcon} />
          {error}
        </div>
      )}
      {/* HELPER TEXT */}
      {helper && (
        <div id={`${id}-helper`} className={styles.helperText} aria-hidden="true">
          {helper}
        </div>
      )}
    </div>
  );
};
