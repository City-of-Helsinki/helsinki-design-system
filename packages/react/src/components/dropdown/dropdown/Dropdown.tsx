import React, { useState, useRef } from 'react';
import { useCombobox, useMultipleSelection, useSelect } from 'downshift';
import isEqual from 'lodash.isequal';

// import core base styles
import 'hds-core';
import styles from './Dropdown.module.css';
import classNames from '../../../utils/classNames';
import { IconAngleDown, IconCheck, IconAlertCircle } from '../../../icons';
import { Checkbox } from '../../checkbox';
import { FieldLabel } from '../../../internal/field-label/FieldLabel';

type OptionType = {
  [key: string]: any;
};

export type DropdownProps = {
  /**
   * Controls the circular keyboard navigation between items. If set to `true`, when first item is highlighted, the Arrow Up will move highlight to the last item, and vice versa using Arrow Down.
   */
  circularNavigation?: boolean;
  /**
   * Additional class names to apply to the dropdown
   */
  className?: string;
  /**
   * Close the menu when the user selects an option
   */
  closeMenuOnSelect?: boolean;
  /**
   * If `true`, the dropdown will be disabled
   */
  disabled?: boolean;
  /**
   * If `true`, the dropdown menu can be filtered
   */
  filterable?: boolean;
  /**
   * Function used to set the `id` prop for menu options (`li`). The returned `string` value will be set a the option `id`
   */
  getItemId?: (index: number) => string;
  /**
   * The helper text content that will be shown below the dropdown
   */
  helper?: string | React.ReactNode;
  /**
   * Hides the label above the dropdown
   */
  hideLabel?: boolean;
  /**
   * Item that should be selected when the dropdown is initialized
   */
  defaultValue?: OptionType;
  /**
   * Item(s) that should be selected when the dropdown is initialized. Use this instead of `defaultValue` when `multiselect` is enabled
   */
  defaultValues?: OptionType[];
  /**
   * Used to generate the first part of the id on the elements.
   * You can override this id with one of your own, provided as a prop, or you can override the id for each element using the `getItemId`, `labelId`, `inputId`, `menuId` and `toggleButtonId` props.
   */
  id?: string;
  /**
   * If `true`, the input and `helper` will be displayed in an invalid state
   */
  invalid?: boolean;
  /**
   * A function used to detect whether an option is disabled ([example](/?path=/story/components-dropdown--disabled-options))
   */
  isOptionDisabled?: (option: OptionType, index: number) => boolean;
  /**
   * Sets the data item field that represents the item label.
   * E.g. an `optionLabelField` value of `'foo'` and a data item `{ foo: 'Label', bar: 'value' }`, would display `Label` in the menu for that specific item
   */
  optionLabelField?: string;
  /**
   * Sets the `id` prop for the label element
   */
  labelId?: string;
  /**
   * The label for the dropdown
   */
  label?: string | React.ReactNode;
  /**
   * Sets the `id` prop for the input element when `filterable` is `true`
   */
  inputId?: string;
  /**
   * Sets the `id` prop for the menu (`ul`)
   */
  menuId?: string;
  /**
   * Enables selecting multiple values if `true`.
   *
   * Note: Using multiselect together with the `filterable` prop is not yet supported. `multiselect` will be ignored if `filterable` is `true`
   */
  multiselect?: boolean;
  /**
   * Callback fired when the state is changed
   */
  onChange?: (selectedItems: OptionType | OptionType[]) => void;
  /**
   * Array of options that should be shown in the menu
   */
  options: OptionType[];
  /**
   * Short hint displayed in the dropdown before the user enters a value
   */
  placeholder?: string;
  /**
   * If `true`, the label is displayed as required
   */
  required?: boolean;
  /**
   * The option(s) that should be selected
   */
  selectedOption?: OptionType | OptionType[];
  /**
   * Override or extend the root styles applied to the component
   */
  style?: React.CSSProperties;
  /**
   * Sets the `id` prop for the toggle button (`button`)
   */
  toggleButtonId?: string;
  /**
   * Sets the number of options that are visible in the menu before it becomes scrollable
   */
  visibleOptions?: number;
};

type WrapperProps = React.PropsWithChildren<{
  filterable: boolean;
  getComboboxProps: any;
}>;

/**
 * Wrapper for input and toggle button that applies correct props based on dropdown mode
 * @param filterable        Whether the dropdown is filterable
 * @param getComboboxProps  Prop getter function required by Downshift to work correctly
 * @param children
 */
const Wrapper = ({ filterable, getComboboxProps, children }: WrapperProps) =>
  filterable ? (
    <div {...getComboboxProps({ className: styles.wrapper })}>{children}</div>
  ) : (
    <div className={styles.wrapper}>{children}</div>
  );

/**
 * Helper that checks if an item is in the selected options
 * @param selectedOptions Currently selected options
 * @param item            Item we want to check
 */
function getIsInSelectedOptions<T>(selectedOptions: T[], item: T): boolean {
  return selectedOptions.some((selectedOption: T) => isEqual(selectedOption, item));
}

export const Dropdown = ({
  circularNavigation = false,
  className,
  closeMenuOnSelect = true,
  defaultValue = null,
  defaultValues = [],
  disabled = false,
  filterable = false,
  getItemId,
  helper,
  hideLabel = false,
  invalid = false,
  isOptionDisabled,
  label,
  labelId,
  id = 'hds',
  inputId,
  menuId,
  multiselect = false,
  onChange = () => null,
  optionLabelField = 'label',
  options = [],
  placeholder = '',
  required,
  selectedOption,
  style,
  toggleButtonId,
  visibleOptions = 5,
}: DropdownProps) => {
  // todo: this should be removed when multiselect is supported together with the filterable prop
  // https://helsinkisolutionoffice.atlassian.net/browse/HDS-200
  if (filterable && multiselect) {
    // eslint-disable-next-line no-param-reassign
    multiselect = false;
  }

  // toggle button ref
  const toggleButtonRef = useRef(null);

  // focuses the dropdown toggle button
  const focusToggleButton = () => toggleButtonRef.current?.focus();

  // combobox menu options
  const [inputItems, setInputItems] = useState(options);

  // init multi-select
  const { getDropdownProps, addSelectedItem, removeSelectedItem, selectedItems } = useMultipleSelection<OptionType>({
    initialSelectedItems: defaultValues,
    ...(multiselect && selectedOption !== undefined && { selectedItems: (selectedOption as OptionType[]) ?? [] }),
    onSelectedItemsChange: ({ selectedItems: _selectedItems }) => multiselect && onChange(_selectedItems),
  });

  // downshift needs a string representation for each option label
  const itemToString = (item: OptionType): string => (item ? item[optionLabelField] ?? '' : '');

  // handles state changes
  const stateReducer = (state, { type, changes }) => {
    const { selectedItem } = changes;
    // flag for whether an item was selected
    const itemSelection = ((filterable
      ? [useCombobox.stateChangeTypes.InputKeyDownEnter, useCombobox.stateChangeTypes.ItemClick]
      : [
          useSelect.stateChangeTypes.MenuKeyDownEnter,
          useSelect.stateChangeTypes.MenuKeyDownSpaceButton,
          useSelect.stateChangeTypes.ItemClick,
        ]) as string[]).includes(type);

    // update selected items when multiselect is enabled
    if (multiselect && selectedItem && itemSelection) {
      selectedItems.includes(selectedItem) ? removeSelectedItem(selectedItem) : addSelectedItem(selectedItem);
    }
    // prevent the menu from being closed when the user selects an item
    if (!closeMenuOnSelect && itemSelection) {
      return {
        ...changes,
        isOpen: state.isOpen,
        highlightedIndex: state.highlightedIndex,
      };
    }
    return changes;
  };

  // init select
  const select = useSelect<OptionType>({
    items: options,
    circularNavigation,
    getItemId,
    id,
    initialSelectedItem: (defaultValue as OptionType) ?? null,
    itemToString,
    labelId,
    menuId,
    onSelectedItemChange: ({ selectedItem }) => !multiselect && onChange(selectedItem),
    // selected items are handled by stateReducer when multiselect is enabled
    ...(multiselect && { selectedItem: null as OptionType[] }),
    // a value for selectedOption indicates that the dropdown should be controlled
    // don't set selectedItem if it's not, so that downshift can control the selected item(s)
    ...(!multiselect && selectedOption !== undefined && { selectedItem: selectedOption as OptionType }),
    stateReducer,
    toggleButtonId,
  });

  // init combobox
  const combobox = useCombobox<OptionType>({
    items: inputItems,
    inputId,
    onInputValueChange: ({ inputValue }) =>
      setInputItems(
        options.filter((item) => {
          const input = inputValue.toLowerCase();
          const optionItem = item[optionLabelField]?.toLowerCase() || '';

          return optionItem.includes(input);
        }),
      ),
    circularNavigation,
    getItemId,
    id,
    initialSelectedItem: defaultValue,
    itemToString,
    labelId,
    menuId,
    onSelectedItemChange: ({ selectedItem }) => !multiselect && onChange(selectedItem),
    // selected items are handled by stateReducer when multiselect is enabled
    ...(multiselect && { selectedItem: null as OptionType[] }),
    // a value for selectedOption indicates that the dropdown should be controlled
    // don't set selectedItem if it's not, so that downshift can control the selected item(s)
    ...(!multiselect && selectedOption !== undefined && { selectedItem: selectedOption as OptionType }),
    stateReducer,
    toggleButtonId,
  });

  // get downshift props based on dropdown mode
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = filterable ? combobox : select;

  // we call the getter functions in order to suppress the "You forgot to call the ..." error messages thrown by downshift.
  if (!multiselect) {
    getDropdownProps({}, { suppressRefError: true });
  }
  if (!filterable) {
    combobox.getMenuProps({}, { suppressRefError: true });
    combobox.getInputProps({}, { suppressRefError: true });
    combobox.getComboboxProps({}, { suppressRefError: true });
  } else {
    select.getMenuProps({}, { suppressRefError: true });
    select.getToggleButtonProps({}, { suppressRefError: true });
  }

  // returns the toggle button label based on the dropdown mode
  const getButtonLabel = (): React.ReactNode => {
    if (filterable) return null;

    const buttonLabel = multiselect
      ? selectedItems.map((item) => item[optionLabelField]).join(', ')
      : selectedItem?.[optionLabelField];

    return <span className={styles.buttonLabel}>{buttonLabel || placeholder}</span>;
  };

  // menu items
  const menuOptions = filterable ? inputItems : options;
  // show placeholder if no value is selected
  const showPlaceholder = (multiselect && selectedItems.length === 0) || (!multiselect && !selectedItem);

  return (
    <div
      className={classNames(
        styles.root,
        invalid && styles.invalid,
        disabled && styles.disabled,
        isOpen && styles.open,
        className,
      )}
      style={style}
    >
      {/* LABEL */}
      {label && <FieldLabel inputId={id} hidden={hideLabel} label={label} required={required} {...getLabelProps()} />}
      {/* WRAPPER */}
      <Wrapper filterable={filterable} getComboboxProps={combobox.getComboboxProps}>
        {/* COMBOBOX INPUT */}
        {filterable && (
          <input
            {...combobox.getInputProps({
              ...getDropdownProps(),
              type: 'text',
              className: styles.dropdown,
              disabled,
              placeholder,
            })}
          />
        )}
        {/* TOGGLE BUTTON */}
        <button
          type="button"
          {...getToggleButtonProps({
            // add downshift dropdown props for non-combobox multi-select dropdowns
            ...(!filterable && multiselect && { ...getDropdownProps({}, { suppressRefError: true }) }),
            // add aria attribute to button for combobox dropdowns
            ...(filterable && { 'aria-labelledby': labelId || `${id}-label` }),
            disabled,
            className: classNames(
              !filterable && styles.buttonDropdown,
              filterable && styles.filterDropdown,
              showPlaceholder && styles.placeholder,
            ),
            ref: toggleButtonRef,
            refKey: 'ref',
          })}
        >
          {getButtonLabel()}
          <IconAngleDown className={styles.angleIcon} />
        </button>
        {invalid && <IconAlertCircle className={styles.invalidIcon} />}
      </Wrapper>
      {/* MENU */}
      <ul
        {...getMenuProps({
          className: classNames(styles.menu, menuOptions.length > visibleOptions && styles.overflow),
          style: { maxHeight: `calc(var(--dropdown-height) * ${visibleOptions})` },
          onKeyDown: (event) => {
            if (event.key === 'Tab') focusToggleButton();
          },
        })}
      >
        {isOpen &&
          menuOptions.map((item, index) => {
            const optionLabel = item[optionLabelField];
            const selected = multiselect ? getIsInSelectedOptions(selectedItems, item) : isEqual(selectedItem, item);
            const optionDisabled = typeof isOptionDisabled === 'function' ? isOptionDisabled(item, index) : false;

            return (
              <li
                {...getItemProps({
                  key: `item-${index}`,
                  index,
                  item,
                  disabled: optionDisabled,
                  className: classNames(
                    styles.menuItem,
                    highlightedIndex === index && styles.highlighted,
                    selected && styles.selected,
                    optionDisabled && styles.disabled,
                    multiselect && styles.multiselect,
                  ),
                })}
              >
                {multiselect ? (
                  <Checkbox
                    className={styles.checkbox}
                    id={optionLabel}
                    label={optionLabel}
                    checked={selected}
                    disabled={optionDisabled}
                  />
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
      {helper && <div className={styles.helperText}>{helper}</div>}
    </div>
  );
};
