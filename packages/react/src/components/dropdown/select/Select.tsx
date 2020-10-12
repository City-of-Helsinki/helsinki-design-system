import React, { FocusEvent, useCallback, useRef, useState } from 'react';
import {
  useSelect,
  useMultipleSelection,
  A11yRemovalMessage,
  A11yStatusMessageOptions,
  UseMultipleSelectionStateChange,
  UseMultipleSelectionStateChangeOptions,
  UseMultipleSelectionState,
} from 'downshift';
import isEqual from 'lodash.isequal';
import uniqueId from 'lodash.uniqueid';
import { useVirtual } from 'react-virtual';

import 'hds-core';

import styles from './Select.module.scss';
import { FieldLabel } from '../../../internal/field-label/FieldLabel';
import classNames from '../../../utils/classNames';
import { IconAlertCircle, IconAngleDown } from '../../../icons';
import { SelectedItems } from '../../../internal/selectedItems/SelectedItems';
import {
  DROPDOWN_MENU_ITEM_HEIGHT,
  getIsElementBlurred,
  getIsElementFocused,
  getIsInSelectedOptions,
} from '../dropdownUtils';
import { DropdownMenu } from '../dropdownMenu/DropdownMenu';

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
  onChange?: (selected: OptionType | OptionType[]) => void;
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
   * todo
   */
  virtualized?: boolean;
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
 * Multi-select state change handler
 * @param type
 * @param activeIndex
 * @param currentActiveIndex
 * @param selectedItemsContainerEl
 */
export function onMultiSelectStateChange<T>(
  { type, activeIndex }: UseMultipleSelectionStateChange<T>,
  currentActiveIndex,
  selectedItemsContainerEl,
) {
  let activeNode;
  const { FunctionRemoveSelectedItem, SelectedItemKeyDownBackspace } = useMultipleSelection.stateChangeTypes;

  if (type === FunctionRemoveSelectedItem || type === SelectedItemKeyDownBackspace) {
    activeNode = selectedItemsContainerEl?.childNodes[currentActiveIndex] as HTMLDivElement;
    if (!activeIndex && activeNode) activeNode.focus();
  }
}

/**
 * Multi-select reducer function
 * @param state
 * @param type
 * @param changes
 * @param controlled
 */
export function multiSelectReducer<T>(
  state: UseMultipleSelectionState<T>,
  { type, changes }: UseMultipleSelectionStateChangeOptions<T>,
  controlled: boolean,
) {
  const { FunctionRemoveSelectedItem, SelectedItemKeyDownBackspace } = useMultipleSelection.stateChangeTypes;

  if (type === FunctionRemoveSelectedItem || type === SelectedItemKeyDownBackspace) {
    // get the index of the deleted item
    const removedItemIndex = state.selectedItems.findIndex((item) => !changes.selectedItems.includes(item));
    // activeIndex updates at a different time depending on whether the
    // component is controlled. For controlled components, when 'onStateChange'
    // is called, the removed item still has a SelectedItem representing
    // it in the DOM. This means that the succeeding SelectedItem is at
    // index n + 1 instead of n
    const adjustedIndex = controlled ? removedItemIndex + 1 : removedItemIndex;
    // whether the removed item was last in selectedItems
    const lastItemRemoved = removedItemIndex === changes.selectedItems.length;

    return {
      ...changes,
      // set the new last item as active if the removed item was last,
      // otherwise set the item succeeding the removed one active
      activeIndex: lastItemRemoved ? removedItemIndex - 1 : adjustedIndex,
    };
  }

  return changes;
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
  multiselect = false,
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
  virtualized = false,
  visibleOptions = 5,
}: SelectProps<OptionType>) => {
  // flag for whether the component is controlled
  const controlled = multiselect && value !== undefined;
  // selected items container ref
  const selectedItemsContainerRef = useRef<HTMLDivElement>(null);
  // menu ref
  const menuRef = React.useRef<HTMLUListElement>();
  // whether active focus is within the dropdown
  const [hasFocus, setFocus] = useState(false);
  // virtualize menu items to increase performance
  const virtualizer = useVirtual<HTMLUListElement>({
    size: options.length,
    parentRef: menuRef,
    estimateSize: useCallback(() => DROPDOWN_MENU_ITEM_HEIGHT, []),
    overscan: visibleOptions,
  });

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
    ...(controlled && { selectedItems: (value as OptionType[]) ?? [] }),
    getA11yRemovalMessage,
    onSelectedItemsChange: ({ selectedItems: _selectedItems }) => multiselect && onChange(_selectedItems),
    onStateChange: (changes) =>
      onMultiSelectStateChange<OptionType>(changes, activeIndex, selectedItemsContainerRef.current),
    stateReducer: (state, actionAndChanges) => multiSelectReducer<OptionType>(state, actionAndChanges, controlled),
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
      const { ItemClick, MenuBlur, MenuKeyDownEnter, MenuKeyDownSpaceButton } = useSelect.stateChangeTypes;

      if (
        (type === ItemClick || type === MenuBlur || type === MenuKeyDownEnter || type === MenuKeyDownSpaceButton) &&
        multiselect &&
        _selectedItem
      ) {
        getIsInSelectedOptions(selectedItems, _selectedItem)
          ? setSelectedItems(selectedItems.filter((item) => !isEqual(item, _selectedItem)))
          : addSelectedItem(_selectedItem);
        selectItem(null);
      }
    },
    stateReducer(state, { type, changes }) {
      const { ItemClick, MenuKeyDownSpaceButton } = useSelect.stateChangeTypes;

      // prevent the menu from being closed when the user selects an item by clicking or pressing space
      if ((type === ItemClick || type === MenuKeyDownSpaceButton) && multiselect) {
        return {
          ...changes,
          isOpen: state.isOpen,
          highlightedIndex: state.highlightedIndex,
        };
      }

      return changes;
    },
  });

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
    `${getLabelProps().id}${error ? ` ${id}-error` : ''}${helper ? ` ${id}-helper` : ''} ${getToggleButtonProps().id}`;

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
      <div className={styles.wrapper} onFocus={handleWrapperFocus} onBlur={handleWrapperBlur}>
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
          {icon && !multiselect && (
            <span className={styles.icon} aria-hidden>
              {icon}
            </span>
          )}
          {getButtonLabel()}
          <IconAngleDown className={styles.angleIcon} />
        </button>
        {/* MENU */}
        <DropdownMenu
          getItemProps={(optionDisabled, index, item, selected, virtualRow) =>
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
            ...(multiselect && { 'aria-multiselectable': true }),
            ...(required && { 'aria-required': true }),
            style: { maxHeight: `calc(var(--menu-item-height) * ${visibleOptions})` },
            ref: menuRef,
          })}
          menuStyles={styles}
          multiselect={multiselect}
          open={isOpen}
          optionLabelField={optionLabelField}
          options={options}
          selectedItem={selectedItem}
          selectedItems={selectedItems}
          virtualizer={virtualized && virtualizer}
          visibleOptions={visibleOptions}
        />
      </div>
      {/* INVALID TEXT */}
      {invalid && error && (
        <div id={`${id}-error`} className={styles.errorText} aria-hidden>
          <IconAlertCircle className={styles.invalidIcon} />
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
