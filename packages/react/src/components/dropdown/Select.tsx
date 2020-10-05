import React, { useEffect, useRef, useState } from 'react';
import { useSelect, useMultipleSelection, A11yRemovalMessage, A11yStatusMessageOptions } from 'downshift';
import isEqual from 'lodash.isequal';
import uniqueId from 'lodash.uniqueid';

import 'hds-core';

import styles from './Select.module.scss';
import { FieldLabel } from '../../internal/field-label/FieldLabel';
import classNames from '../../utils/classNames';
import { IconAlertCircle, IconAngleDown, IconCheck } from '../../icons';
import { SelectedItems } from '../../internal/selectedItems/SelectedItems';

export type SelectProps<OptionType> = {
  /**
   * When set to `true`, allows moving from the first item to the last item with Arrow Up, and vice versa using Arrow Down.
   */
  circularNavigation?: boolean;
  /**
   * Additional class names to apply to the select
   */
  className?: string;
  /**
   * Flag for whether the clear selections button should be displayed
   */
  clearable?: boolean;
  /**
   * If `true`, the dropdown will be disabled
   */
  disabled?: boolean;
  /**
   * Function used to generate an ARIA a11y message when the status changes. See [here](https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect#geta11ystatusmessage) for more information.
   */
  getA11yStatusMessage?: (options: A11yStatusMessageOptions<OptionType>) => string;
  /**
   * A helper text that will be shown below the dropdown
   */
  helper?: React.ReactNode;
  /**
   * An error text that will be shown below the dropdown when `invalid` is true
   */
  error?: React.ReactNode;
  /**
   * Used to generate the first part of the id on the elements
   */
  id?: string;
  /**
   * If `true`, the input and `helper` will be displayed in an invalid state
   */
  invalid?: boolean;
  /**
   * A function used to detect whether an option is disabled
   */
  isOptionDisabled?: (option: OptionType, index: number) => boolean;
  /**
   * The label for the dropdown
   */
  label: React.ReactNode;
  /**
   * Callback function fired when the component is blurred
   */
  onBlur?: () => void;
  /**
   * Callback function fired when the state is changed
   */
  onChange?: <OptionType>(selectedItem: OptionType) => void;
  /**
   * Callback function fired when the component is focused
   */
  onFocus?: () => void;
  /**
   * Sets the data item field that represents the item label
   * E.g. an `optionLabelField` value of `'foo'` and a data item `{ foo: 'Label', bar: 'value' }`, would display `Label` in the menu for that specific item
   */
  optionLabelField?: string;
  /**
   * Array of options that should be shown in the menu
   */
  options: OptionType[];
  /**
   * Short hint displayed in the dropdown before the user enters a value
   */
  placeholder?: string;
  /**
   * If `true`, marks the dropdown as required
   */
  required?: boolean;
  /**
   * Label for selected items that is only visible to screen readers. Can be used to to give screen reader users additional information about the selected item
   */
  selectedItemSrLabel?: string;
  /**
   * Override or extend the root styles applied to the component
   */
  style?: React.CSSProperties;
  /**
   * Sets the number of options that are visible in the menu before it becomes scrollable
   */
  visibleOptions?: number;
} & MultiselectProps<OptionType>;

type MultiselectProps<OptionType> =
  | {
      multiselect?: false;
      clearButtonAriaLabel?: string;
      defaultValue?: OptionType;
      getA11yRemovalMessage?: undefined;
      getA11ySelectionMessage?: (options: A11yStatusMessageOptions<OptionType>) => string;
      icon?: React.ReactNode;
      selectedItemRemoveButtonAriaLabel?: string;
      value?: OptionType;
    }
  | {
      /**
       * Enables selecting multiple values if `true`.
       */
      multiselect?: boolean;
      /**
       * The aria-label for the clear button
       */
      clearButtonAriaLabel: string;
      /**
       * Value(s) that should be selected when the dropdown is initialized
       */
      defaultValue?: OptionType[];
      /**
       * Function used to generate an ARIA a11y message when an item is removed. See [here](https://github.com/downshift-js/downshift/tree/master/src/hooks/useMultipleSelection#geta11yremovalmessage) for more information.
       */
      getA11yRemovalMessage?: (options: A11yRemovalMessage<OptionType>) => string;
      /**
       * Function used to generate an ARIA a11y message when an item is selected. See [here](https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect#geta11yselectionmessage) for more information.
       */
      getA11ySelectionMessage?: undefined;
      /**
       * Icon to be shown in the dropdown
       */
      icon?: undefined;
      /**
       * The aria-label for the selected item remove button
       */
      selectedItemRemoveButtonAriaLabel: string;
      /**
       * The selected value(s)
       */
      value?: OptionType[];
    };

/**
 * Helper that checks if an item is in the selected options
 * @param selectedOptions Currently selected options
 * @param item            Item we want to check
 */
function getIsInSelectedOptions<T>(selectedOptions: T[], item: T): boolean {
  return selectedOptions.some((selectedOption: T) => isEqual(selectedOption, item));
}

export const Select = <OptionType,>({
  circularNavigation = false,
  className,
  clearable = true,
  clearButtonAriaLabel,
  defaultValue,
  disabled = false,
  error,
  getA11yRemovalMessage = () => '',
  getA11ySelectionMessage = () => '',
  getA11yStatusMessage = () => '',
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
  optionLabelField = 'label',
  options = [],
  placeholder,
  required,
  selectedItemRemoveButtonAriaLabel,
  selectedItemSrLabel,
  style,
  value,
  visibleOptions = 5,
}: SelectProps<OptionType>) => {
  // dropdown wrapper ref
  const wrapperRef = useRef<HTMLDivElement>(null);
  // selected items container ref
  const selectedItemsContainerRef = useRef<HTMLDivElement>(null);
  // whether active focus is within the dropdown
  const [hasFocus, setFocus] = useState(false);
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
    setSelectedItems,
  } = useMultipleSelection<OptionType>({
    // sets focus on the first selected item when the dropdown is initialized
    defaultActiveIndex: 0,
    initialActiveIndex: 0,
    // set the default value(s) when the dropdown is initialized
    initialSelectedItems: (defaultValue as OptionType[]) ?? [],
    // set the selected items when the dropdown is controlled
    ...(multiselect && value !== undefined && { selectedItems: (value as OptionType[]) ?? [] }),
    getA11yRemovalMessage,
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
  } = useSelect<OptionType>({
    circularNavigation,
    id,
    items: options,
    // set the default value when the dropdown is initialized
    initialSelectedItem: (defaultValue as OptionType) ?? null,
    // a defined value indicates that the dropdown should be controlled
    // don't set selectedItem if it's not, so that downshift can handle the state
    ...(!multiselect && value !== undefined && { selectedItem: value as OptionType }),
    getA11ySelectionMessage,
    getA11yStatusMessage,
    itemToString: (item): string => (item ? item[optionLabelField] ?? '' : ''),
    onSelectedItemChange: ({ selectedItem: _selectedItem }) => !multiselect && onChange(_selectedItem),
    onStateChange({ type, selectedItem: _selectedItem }) {
      switch (type) {
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
        case useSelect.stateChangeTypes.MenuBlur:
          if (multiselect && _selectedItem) {
            getIsInSelectedOptions(selectedItems, _selectedItem)
              ? setSelectedItems(selectedItems.filter((item) => !isEqual(item, _selectedItem)))
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
        // todo: close dropdown if Enter is pressed, as suggested by auditors?
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
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

  if (!multiselect) {
    // we call the getDropdownProps getter function when multiselect isn't enabled
    // in order to suppress the "You forgot to call the ..." error message thrown by downshift.
    // we only need to apply the getter props to the toggle button when multiselect is enabled.
    getDropdownProps({}, { suppressRefError: true });
  }

  // returns the toggle button label based on the dropdown mode
  const getButtonLabel = (): React.ReactNode => {
    let buttonLabel = selectedItem?.[optionLabelField] || placeholder;
    if (multiselect) buttonLabel = selectedItems.length > 0 ? null : placeholder;
    return buttonLabel;
  };
  // screen readers should read the labels in the following order:
  // field label > helper text > error text > toggle button label
  // helper and error texts should only be read if they have been defined
  // prettier-ignore
  const buttonAriaLabel =
    `${getToggleButtonProps().id}${error ? ` ${id}-error` : ''}${helper ? ` ${id}-helper` : ''} ${getToggleButtonProps().id}`;
  // show placeholder if no value is selected
  const showPlaceholder = (multiselect && selectedItems.length === 0) || (!multiselect && !selectedItem);

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
      {label && <FieldLabel label={label} required={required} {...getLabelProps()} />}
      <div ref={wrapperRef} className={styles.wrapper}>
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
        <button
          type="button"
          {...getToggleButtonProps({
            'aria-owns': getMenuProps().id,
            'aria-labelledby': buttonAriaLabel,
            // add downshift dropdown props when multiselect is enabled
            ...(multiselect && { ...getDropdownProps({ preventKeyAction: isOpen }) }),
            ...(invalid && { 'aria-invalid': true }),
            disabled,
            className: classNames(styles.button, showPlaceholder && styles.placeholder),
          })}
        >
          {/* icons are only supported by single selects */}
          {icon && !multiselect && <span className={styles.icon}>{icon}</span>}
          {getButtonLabel()}
          <IconAngleDown className={styles.angleIcon} />
        </button>
        <ul
          {...getMenuProps({
            ...(multiselect && { 'aria-multiselectable': true }),
            ...(required && { 'aria-required': true }),
            className: classNames(styles.menu, options.length > visibleOptions && styles.overflow),
            style: { maxHeight: `calc(var(--menu-item-height) * ${visibleOptions})` },
          })}
        >
          {isOpen &&
            options.map((item, index) => {
              const optionLabel = item[optionLabelField];
              const selected = multiselect ? getIsInSelectedOptions(selectedItems, item) : isEqual(selectedItem, item);
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
                    ),
                  })}
                  {...{ 'aria-selected': selected }}
                  {...(optionDisabled && { 'aria-disabled': true })}
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
