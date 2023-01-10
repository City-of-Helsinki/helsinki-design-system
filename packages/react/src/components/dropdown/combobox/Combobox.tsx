/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/destructuring-assignment */
import React, { useRef, useState, KeyboardEvent, FocusEvent, FocusEventHandler, useMemo, useCallback } from 'react';
import { useCombobox, useMultipleSelection } from 'downshift';
import isEqual from 'lodash.isequal';
import uniqueId from 'lodash.uniqueid';
import { useVirtual } from 'react-virtual';

import 'hds-core';

import styles from './Combobox.module.scss';
import { FieldLabel } from '../../../internal/field-label/FieldLabel';
import classNames from '../../../utils/classNames';
import { IconAlertCircleFill, IconAngleDown } from '../../../icons';
import { ClearButton, SelectedItems } from '../../../internal/selectedItems/SelectedItems';
import { multiSelectReducer, onMultiSelectStateChange, SelectCustomTheme, SelectProps } from '../select';
import { DROPDOWN_MENU_ITEM_HEIGHT, getIsInSelectedOptions } from '../dropdownUtils';
import { DropdownMenu } from '../../../internal/dropdownMenu/DropdownMenu';
import getIsElementFocused from '../../../utils/getIsElementFocused';
import getIsElementBlurred from '../../../utils/getIsElementBlurred';
import { useTheme } from '../../../hooks/useTheme';

type FilterFunction<OptionType> = (options: OptionType[], search: string) => OptionType[];

export type ComboboxProps<OptionType> = SelectProps<OptionType> & {
  /**
   * Custom aria-describedby added to the input element
   */
  'aria-describedby'?: string;
  /**
   * Prevents further propagation of the 'Escape' onKeyDown event when the menu is closed by pressing Esc.
   * Useful e.g. when the component is used inside a modal.
   */
  catchEscapeKey?: boolean;
  /**
   * If provided, this filter function will be used for filtering the
   * combobox suggestions. If this prop is not provided, the default
   * filter implementation is used. The default implementation assumes
   * that the `optionLabelField` prop points to a string value that it
   * can compare with the search value.
   */
  filter?: FilterFunction<OptionType>;
  /**
   * If `true`, displays a menu toggle button in the combobox.
   */
  showToggleButton?: boolean;
  /**
   * aria-label for the menu toggle button. The label for the combobox will be prepended to the given value.
   */
  toggleButtonAriaLabel: string;
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

      return label.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  };
}

export const Combobox = <OptionType,>(props: ComboboxProps<OptionType>) => {
  // we can't destructure all the props. after destructuring, the link
  // between the multiselect prop and the value, onChange etc. props would vanish
  const {
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': customAriaDescribedBy,
    catchEscapeKey,
    circularNavigation = false,
    className,
    clearable = props.multiselect,
    disabled = false,
    error,
    getA11ySelectionMessage = () => '',
    getA11yStatusMessage = () => '',
    helper,
    id = uniqueId('hds-combobox-') as string,
    invalid = false,
    isOptionDisabled,
    label,
    onBlur = () => null,
    onFocus = () => null,
    optionLabelField = 'label',
    options = [],
    placeholder,
    required,
    showToggleButton = true,
    style,
    theme,
    virtualized = false,
    visibleOptions = 5,
    filter: userLandFilter,
    toggleButtonAriaLabel,
    tooltipLabel,
    tooltipButtonLabel,
    tooltipText,
  } = props;

  // flag for whether the component is controlled
  const controlled = props.multiselect && props.value !== undefined;
  // custom theme class that is applied to the root element
  const customThemeClass = useTheme<SelectCustomTheme>(styles.root, theme);
  // selected items container ref
  const selectedItemsContainerRef = useRef<HTMLDivElement>();
  // combobox input ref
  const inputRef = useRef<HTMLInputElement>();
  // menu ref
  const menuRef = React.useRef<HTMLUListElement>();
  // toggle button ref
  const toggleButtonRef = React.useRef<HTMLButtonElement>(null);
  // whether active focus is within the dropdown
  const [hasFocus, setFocus] = useState<boolean>(false);
  // Tracks whether any combobox item is being clicked
  const [isClicking, setIsClicking] = useState<boolean>(false);
  // tracks current combobox search value
  const [search, setSearch] = useState<string>('');
  // memorise filtered items and only update them when any of the dependencies change
  const getFilteredItems = useMemo<OptionType[]>(() => {
    const filter = userLandFilter || getDefaultFilter(optionLabelField);
    return filter(options, search);
  }, [options, search, userLandFilter, optionLabelField]);
  // virtualize menu items to increase performance
  const virtualizer = useVirtual<HTMLUListElement>({
    size: getFilteredItems.length,
    parentRef: menuRef,
    estimateSize: useCallback(() => DROPDOWN_MENU_ITEM_HEIGHT, []),
    overscan: visibleOptions,
  });

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
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
    // set the default value(s) when the dropdown is initialized
    ...(props.multiselect && { initialSelectedItems: props.defaultValue ?? [] }),
    // set the selected items when the dropdown is controlled
    ...(props.multiselect && props.value !== undefined && { selectedItems: props.value ?? [] }),
    getA11yRemovalMessage: (props.multiselect && props.getA11yRemovalMessage) ?? (() => ''),
    onSelectedItemsChange: ({ selectedItems: _selectedItems }) =>
      props.multiselect && typeof props.onChange === 'function' && props.onChange(_selectedItems),
    onStateChange: (changes) =>
      onMultiSelectStateChange<OptionType>(changes, activeIndex, selectedItemsContainerRef.current),
    stateReducer: (state, actionAndChanges) => multiSelectReducer<OptionType>(state, actionAndChanges, controlled),
  });

  // init combobox
  const {
    getItemProps,
    getLabelProps,
    getMenuProps,
    getToggleButtonProps,
    highlightedIndex,
    isOpen,
    reset: resetCombobox,
    selectedItem,
    selectItem,
    closeMenu,
    setInputValue,
    getInputProps,
    getComboboxProps,
  } = useCombobox<OptionType>({
    circularNavigation,
    id,
    items: getFilteredItems,
    // set the default value when the dropdown is initialized
    ...(props.multiselect === false && { initialSelectedItem: props.defaultValue ?? null }),
    // a defined value indicates that the dropdown should be controlled
    // don't set selectedItem if it's not, so that downshift can handle the state
    ...(props.multiselect === false && props.value !== undefined && { selectedItem: props.value }),
    onInputValueChange: ({ inputValue }) => setSearch(inputValue),
    getA11ySelectionMessage,
    getA11yStatusMessage,
    itemToString: (item): string => (item ? item[optionLabelField] ?? '' : ''),
    onSelectedItemChange: ({ selectedItem: _selectedItem }) =>
      props.multiselect === false && typeof props.onChange === 'function' && props.onChange(_selectedItem),
    onStateChange({ type, selectedItem: _selectedItem }) {
      const { InputBlur, InputKeyDownEnter, ItemClick } = useCombobox.stateChangeTypes;

      if (
        (type === InputBlur || type === InputKeyDownEnter || type === ItemClick) &&
        props.multiselect &&
        _selectedItem
      ) {
        getIsInSelectedOptions(selectedItems, _selectedItem)
          ? _setSelectedItems(selectedItems.filter((item) => !isEqual(item, _selectedItem)))
          : addSelectedItem(_selectedItem);
        selectItem(null);
      }
    },
    stateReducer(state, { type, changes }) {
      const { ItemClick, InputBlur, FunctionSelectItem, InputKeyDownEnter } = useCombobox.stateChangeTypes;
      const { selectedItem: _selectedItem, inputValue } = changes;

      // special cases with singleselect only
      if (!props.multiselect) {
        // clear the selected item if the input value doesn't match the selected item label
        if (_selectedItem && _selectedItem[optionLabelField] !== inputValue) {
          return {
            ...changes,
            selectedItem: null,
          };
        }

        if (type === InputBlur) {
          // clear the input value on blur if
          // it is a single select and there's no selected item
          if (!_selectedItem) {
            return {
              ...changes,
              inputValue: '',
            };
          }
        }
      }

      // special cases with multiselect only
      if (props.multiselect) {
        // clear changes.selectedItem on blur, if state.selectedItem does not exist
        // and therefore an item has not been selected. For some reason changes.selectedItem exists
        // when deleting tag while suggestions are open.
        if (type === InputBlur) {
          if (!state.selectedItem) {
            return {
              ...changes,
              selectedItem: null,
              // reset input value
              inputValue: '',
            };
          }

          // otherwise clear the input value on blur
          return {
            ...changes,
            inputValue: '',
          };
        }

        // prevent the menu from being closed when the user selects an item by clicking
        if (type === ItemClick) {
          return {
            ...changes,
            isOpen: state.isOpen,
            highlightedIndex: state.highlightedIndex,
            // keep input value as the input field value, not value of the selected item
            inputValue: state.inputValue,
          };
        }

        // close the menu when an item is selected with the enter key.
        // this preserves the old behavior which was changed with the next block (FunctionSelectItem)
        if (type === InputKeyDownEnter) {
          return {
            ...changes,
            inputValue: '',
          };
        }

        // keep input value when multiselect item is selected with mouse or keyboard
        if (type === FunctionSelectItem) {
          return {
            ...changes,
            inputValue: state.inputValue,
          };
        }
      }

      return changes;
    },
  });

  const showClearButtonForSingleSelect = clearable && !props.multiselect && selectedItem;

  const setSelectedItems = (itemToBeSelected: OptionType) => {
    getIsInSelectedOptions(selectedItems, itemToBeSelected)
      ? _setSelectedItems(selectedItems.filter((item) => !isEqual(item, itemToBeSelected)))
      : addSelectedItem(itemToBeSelected);
  };

  const handleWrapperClick = (e) => {
    const selectedItemsContainerEl = selectedItemsContainerRef.current;
    const selectedItemClicked = selectedItemsContainerEl !== e.target && selectedItemsContainerEl?.contains(e.target);

    if (!selectedItemClicked) {
      focusInput();
    }
  };

  const ignoreFocusHandlerWhenClickingItem = (handler: FocusEventHandler<HTMLDivElement>) => (
    event: FocusEvent<HTMLDivElement>,
  ) => {
    if (!isClicking) {
      handler(event);
    }
  };

  const handleWrapperFocus = (e: FocusEvent<HTMLDivElement>) => {
    if (getIsElementFocused(e)) {
      setFocus(true);
      onFocus();
    }
  };

  const handleWrapperBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (getIsElementBlurred(e)) {
      setFocus(false);
      onBlur();
    }
  };

  const handleMultiSelectInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // prevent further propagation
    if (catchEscapeKey && e.key === 'Escape') {
      e.stopPropagation();
    }

    // Only select an item with 'Space' if an index is highlighted. Otherwise, it should have the default behavior, add a space into the input value.
    if (e.key === ' ' && highlightedIndex > -1) {
      // Prevent 'Space' from typing a space into the input.
      e.preventDefault();
      const highlightedItem = getFilteredItems[highlightedIndex];
      setSelectedItems(highlightedItem);
    }

    // If the menu is open, prevent the events for dropdown from firing.
    if (isOpen && (e.key === 'Backspace' || e.key === 'ArrowLeft')) {
      // @ts-ignore
      e.nativeEvent.preventDownshiftDefault = true;
    }

    // Tab keypress should close the menu without selecting an item.
    if (e.key === 'Tab' && highlightedIndex > -1 && isOpen) {
      // @ts-ignore
      closeMenu();
    }
  };

  if (!props.multiselect) {
    // we call the getDropdownProps getter function when multiselect isn't enabled
    // in order to suppress the "You forgot to call the ..." error message thrown by downshift.
    // we only need to apply the getter props to the toggle button when multiselect is enabled.
    getDropdownProps({}, { suppressRefError: true });
  }

  // Input should be shown when the combobox is open, or when it's
  // closed, but no items are selected. The input should always be
  // visible when multiselect mode is turned off.
  const isInputVisible = !props.multiselect || isOpen || (!isOpen && selectedItems.length === 0);

  // screen readers should read the labels in the following order:
  // field label > ariaLabelledBy > helper text > error text > toggle button label
  // helper and error texts should only be read if they have been defined
  // prettier-ignore
  const inputAriaLabel =
    `${getLabelProps().id}${ariaLabelledBy ? ` ${ariaLabelledBy}` : ''}${error ? ` ${id}-error` : ''}${helper ? ` ${id}-helper` : ''} ${getInputProps().id}`;

  const renderInput = () => (
    <input
      {...getInputProps({
        ...(invalid && { 'aria-invalid': true }),
        ...(props.multiselect && {
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
            ref: inputRef,
          }),
        }),
        type: 'text',
        disabled,
        required,
        role: getComboboxProps().role,
        'aria-expanded': getComboboxProps()['aria-expanded'],
        'aria-haspopup': getComboboxProps()['aria-haspopup'],
        'aria-owns': getComboboxProps()['aria-owns'],
        'aria-labelledby': inputAriaLabel,
        'aria-describedby': customAriaDescribedBy,
      })}
      placeholder={placeholder}
      className={classNames(
        styles.input,
        !isInputVisible && styles.hidden,
        !showToggleButton && styles.noToggle,
        hasFocus && selectedItems.length > 0 && styles.adjustSpacing,
        props.icon && props.multiselect && styles.inputWithIcon,
        showClearButtonForSingleSelect && styles.withClearButton,
      )}
      autoCorrect="off"
      autoComplete="off"
    />
  );

  return (
    <div
      className={classNames(
        styles.root,
        invalid && styles.invalid,
        disabled && styles.disabled,
        isOpen && styles.open,
        props.multiselect && styles.multiselect,
        customThemeClass,
        className,
      )}
      style={style}
    >
      {/* LABEL */}
      {label && (
        <FieldLabel
          label={label}
          required={required}
          {...getLabelProps()}
          tooltipLabel={tooltipLabel}
          tooltipButtonLabel={tooltipButtonLabel}
          tooltipText={tooltipText}
        />
      )}
      {
        // This onClick function is used so that mouse users are able to
        // focus the Combobox without having to use the keyboard. The
        // design calls for the input to be visually hidden until the
        // user gives indication of wanting to access it.
        // Keyboard and screen reader users will move through the
        // selected items list and the clear button, after which they
        // will find the input. It's assumed that mouse users can
        // consume this information all at once and it's hence
        // convenient to offer direct access to the input by clicking.
        // In turn, providing this element as a focusable element would
        // add one more item keyboard/screen reader users would need to
        // move through.
      }
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div
        // When a user clicks on a combobox item, the focus on the page
        // is momentarily lost. This will cause an event to fire which
        // has its 'relatedTarget' field set as 'null'. An event like
        // this looks exactly like a valid blur/focus event could look
        // like. We can not distinct this scenario in the blur/focus
        // handler.

        // If we allow blur/focus to fire, the input will briefly be
        // displayed as unfocused, which makes the selected items list
        // limit its visible options, which in turn changes the dropdown
        // position, which in turn makes selecting an item by click
        // almost impossible.

        // As a hackfix, we track whether any item is being clicked in
        // the components state. If an item is clicked, we do not call
        // the blur/focus handlers at all.
        // eslint-disable-next-line
        onFocus={ignoreFocusHandlerWhenClickingItem(handleWrapperFocus)}
        onBlur={ignoreFocusHandlerWhenClickingItem(handleWrapperBlur)}
        onClick={handleWrapperClick}
        onMouseUp={() => {
          setIsClicking(false);
          focusInput();
        }}
        className={classNames(styles.wrapper, props.multiselect && props.icon && styles.wrapperWithMultiSelectAndIcon)}
        ref={getComboboxProps().ref}
      >
        {/* SELECTED ITEMS */}
        {props.multiselect && selectedItems.length > 0 && (
          <SelectedItems<OptionType>
            activeIndex={activeIndex}
            className={styles.selectedItems}
            clearable={clearable}
            clearButtonAriaLabel={props.clearButtonAriaLabel}
            dropdownId={id}
            getSelectedItemProps={getSelectedItemProps}
            hideItems={!hasFocus}
            onClear={() => {
              reset();
              setInputValue('');
              toggleButtonRef.current.focus();
            }}
            onRemove={removeSelectedItem}
            optionLabelField={optionLabelField}
            removeButtonAriaLabel={props.selectedItemRemoveButtonAriaLabel}
            selectedItems={selectedItems}
            selectedItemSrLabel={props.selectedItemSrLabel}
            selectedItemsContainerRef={selectedItemsContainerRef}
            setActiveIndex={setActiveIndex}
            toggleButtonHidden={!showToggleButton}
          />
        )}
        {props.multiselect === false && props.icon && (
          <span className={styles.icon} aria-hidden>
            {props.icon}
          </span>
        )}
        {/* FILTER INPUT */}
        {props.multiselect && props.icon ? (
          <div className={classNames(styles.multiselectIconAndInputWrapper, !isInputVisible && styles.hidden)}>
            <span
              className={classNames(styles.icon, hasFocus && selectedItems.length > 0 && styles.adjustSpacingForIcon)}
              aria-hidden
            >
              {props.icon}
            </span>
            {renderInput()}
          </div>
        ) : (
          renderInput()
        )}
        {/* TOGGLE BUTTON */}
        <button
          type="button"
          {...getToggleButtonProps({
            disabled,
            className: classNames(styles.button, !showToggleButton && styles.hidden),
            'aria-label': `${label}: ${toggleButtonAriaLabel}`,
            'aria-expanded': isOpen,
            ...(invalid && { 'aria-invalid': true }),
            ref: toggleButtonRef,
          })}
        >
          <IconAngleDown className={styles.angleIcon} aria-hidden />
        </button>
        {showClearButtonForSingleSelect && (
          <ClearButton
            toggleButtonHidden={!showToggleButton}
            onClear={() => {
              resetCombobox();
              toggleButtonRef.current.focus();
            }}
            clearButtonAriaLabel={props.clearButtonAriaLabel}
          />
        )}
        {/* MENU */}
        <DropdownMenu<OptionType>
          getItemProps={(item, index, selected, optionDisabled, virtualRow) =>
            getItemProps({
              item,
              index,
              disabled: optionDisabled,
              className: classNames(
                styles.menuItem,
                highlightedIndex === index && styles.highlighted,
                selected && styles.selected,
                optionDisabled && styles.disabled,
                virtualized && styles.virtualized,
              ),
              onMouseDown: () => {
                setIsClicking(true);
              },
              // We can't use 'onMouseDown' because it is fired
              // before 'onClick' which is too soon for us. Using
              // 'onClick' creates a niche case where it's
              // possible that the user fails to complete their
              // click. In other words, they mouse down on a
              // different element than they mouse up on. In this
              // scenario, the blur/focus events will be ignored
              // until the next successful click.
              onClick: () => {
                setIsClicking(false);
              },
              // apply styles for virtualization to menu items
              ...(virtualRow && {
                style: {
                  transform: `translateY(${virtualRow.start}px`,
                },
                ref: virtualRow.measureRef,
              }),
            })
          }
          isOptionDisabled={isOptionDisabled}
          menuProps={getMenuProps({
            ...(props.multiselect && { 'aria-multiselectable': true }),
            ...(required && { 'aria-required': true }),
            style: { maxHeight: DROPDOWN_MENU_ITEM_HEIGHT * visibleOptions },
            ref: menuRef,
            onMouseLeave: (event) => {
              // prevent downshift from resetting highlighted index on mouseleave
              // @ts-ignore
              // eslint-disable-next-line no-param-reassign
              event.nativeEvent.preventDownshiftDefault = true;
            },
          })}
          menuStyles={styles}
          multiselect={props.multiselect}
          open={isOpen}
          optionLabelField={optionLabelField}
          options={getFilteredItems}
          selectedItem={selectedItem}
          selectedItems={selectedItems}
          virtualizer={virtualized && virtualizer}
        />
      </div>
      {/* INVALID TEXT */}
      {invalid && error && (
        <div id={`${id}-error`} className={styles.errorText} aria-hidden>
          <IconAlertCircleFill className={styles.invalidIcon} />
          {error}
        </div>
      )}
      {/* HELPER TEXT */}
      {helper && (
        <div id={`${id}-helper`} className={styles.helperText} aria-hidden>
          {helper}
        </div>
      )}
    </div>
  );
};
Combobox.defaultProps = {
  multiselect: false,
};
