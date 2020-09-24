import React from 'react';
import { useSelect, useMultipleSelection, UseSelectStateChangeTypes } from 'downshift';
import isEqual from 'lodash.isequal';

import 'hds-core';
import styles from './Select.module.scss';
import { FieldLabel } from '../../internal/field-label/FieldLabel';
import classNames from '../../utils/classNames';
import { IconAlertCircle, IconAngleDown, IconCheck, IconCrossCircle } from '../../icons';
import { Checkbox } from '../checkbox';

export type SelectProps<OptionType> = {
  /**
   * If `true`, the dropdown will be disabled
   */
  disabled?: boolean;
  /**
   * A helper text that will be shown below the dropdown
   */
  helper?: React.ReactNode;
  /**
   * If `true`, the input and `helper` will be displayed in an invalid state
   */
  invalid?: boolean;
  /**
   * A function used to detect whether an option is disabled ([example](/?path=/story/components-dropdown--disabled-options))
   */
  isOptionDisabled?: (option: OptionType, index: number) => boolean;
  /**
   * The label for the dropdown
   */
  label: React.ReactNode;
  /**
   * Callback fired when the state is changed
   */
  onChange?: <T = unknown>(selectedItem: T) => void;
  /**
   * Sets the data item field that represents the item label.
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
   * Override or extend the root styles applied to the component
   */
  style?: React.CSSProperties;
  // /**
  //  * The selected value
  //  */
  // value?: OptionType;
  /**
   * Sets the number of options that are visible in the menu before it becomes scrollable
   */
  visibleOptions?: number;
} & MultiselectProps<OptionType>;

type MultiselectProps<OptionType> =
  | {
      multiselect?: false;
      value?: OptionType;
    }
  | {
      /**
       * Enables selecting multiple values if `true`.
       */
      multiselect?: boolean;
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
  disabled = false,
  helper,
  invalid = false,
  isOptionDisabled,
  label,
  multiselect,
  onChange = () => null,
  optionLabelField = 'label',
  options = [],
  placeholder = 'Placeholder',
  style,
  value,
  visibleOptions = 5,
}: SelectProps<OptionType>) => {
  const id = 'hds-select';

  // init multi-select
  const {
    addSelectedItem,
    getDropdownProps,
    getSelectedItemProps,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection<OptionType>({
    onSelectedItemsChange: ({ selectedItems: _selectedItems }) => {
      console.log('onSelectedItemsChange selectedItems', _selectedItems);
      return multiselect && onChange(_selectedItems);
    },
    ...(multiselect && value !== undefined && { selectedItems: (value as OptionType[]) ?? [] }),
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
    id,
    items: options,
    itemToString: (item): string => (item ? item[optionLabelField] ?? '' : ''),
    // onSelectedItemChange: ({ selectedItem: _selectedItem }) => onChange(_selectedItem),
    onSelectedItemChange: ({ selectedItem: _selectedItem }) => {
      console.log('onSelectedItemChange selectedItem', _selectedItem);
      if (!multiselect) onChange(_selectedItem);
      // return !multiselect && onChange(_selectedItem);
    },
    // a defined value indicates that the dropdown should be controlled
    // don't set selectedItem if it's not, so that downshift can control the selected item(s)
    ...(!multiselect && value !== undefined && { selectedItem: value as OptionType }),
    // handles state changes
    stateReducer(state, { type, changes }) {
      const { selectedItem: _selectedItem } = changes;
      // flag for whether an item was selected
      const itemSelection = ([
        useSelect.stateChangeTypes.MenuKeyDownEnter,
        useSelect.stateChangeTypes.MenuKeyDownSpaceButton,
        useSelect.stateChangeTypes.ItemClick,
      ] as UseSelectStateChangeTypes[]).includes(type);

      // update selected items when multiselect is enabled
      if (multiselect && _selectedItem && itemSelection) {
        console.log('selectedItem', _selectedItem);

        getIsInSelectedOptions(selectedItems, _selectedItem)
          ? removeSelectedItem(_selectedItem)
          : addSelectedItem(_selectedItem);
        selectItem(null);
      }
      // prevent the menu from being closed when the user selects an item
      // if (!closeMenuOnSelect && itemSelection) {
      if (multiselect && itemSelection) {
        return {
          ...changes,
          isOpen: state.isOpen,
          highlightedIndex: state.highlightedIndex,
        };
      }
      return changes;
    },
  });

  return (
    <div
      className={classNames(
        styles.root,
        invalid && styles.invalid,
        disabled && styles.disabled,
        isOpen && styles.open,
        // className,
      )}
      style={style}
    >
      {/* LABEL */}
      {label && <FieldLabel label={label} {...getLabelProps()} />}

      {/* SELECTED ITEMS */}
      <div className={styles.selectedItems}>
        {selectedItems.map((_selectedItem, index) => (
          <span
            key={`selected-item-${_selectedItem?.[optionLabelField] ?? index}`}
            {...getSelectedItemProps({ selectedItem: _selectedItem, index })}
          >
            {_selectedItem[optionLabelField]}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <span onClick={() => removeSelectedItem(_selectedItem)}>
              <IconCrossCircle />
            </span>
          </span>
        ))}
      </div>

      <div className={styles.wrapper}>
        {/* INVALID ICON */}
        {invalid && <IconAlertCircle className={styles.invalidIcon} />}
        {/* TOGGLE BUTTON */}
        <button
          type="button"
          {...getToggleButtonProps({
            'aria-owns': getMenuProps().id,
            // prepend helper text id to the id's return by the downshift getter function,
            // so that the helper text will be read to screen reader users before the other labels.
            'aria-labelledby': `${id}-helper ${getToggleButtonProps()['aria-labelledby']}`,
            // add downshift dropdown props when multiselect is enabled
            ...(multiselect && { ...getDropdownProps({ preventKeyAction: isOpen }) }),
            disabled,
            className: classNames(styles.buttonDropdown, !selectedItem && styles.placeholder),
          })}
        >
          <span className={styles.buttonLabel}>{selectedItem?.[optionLabelField] || placeholder}</span>
          <IconAngleDown className={styles.angleIcon} />
        </button>
        <ul
          {...getMenuProps({
            className: classNames(styles.menu, options.length > visibleOptions && styles.overflow),
            style: { maxHeight: `calc(var(--dropdown-height) * ${visibleOptions})` },
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
                      tabIndex={-1}
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
      </div>
      {helper && (
        <div id={`${id}-helper`} className={styles.helperText} aria-hidden="true">
          {helper}
        </div>
      )}
    </div>
  );
};
