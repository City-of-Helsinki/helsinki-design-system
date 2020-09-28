import React from 'react';
import { useSelect, useMultipleSelection } from 'downshift';
import isEqual from 'lodash.isequal';

import 'hds-core';
import styles from './Select.module.scss';
import { FieldLabel } from '../../internal/field-label/FieldLabel';
import classNames from '../../utils/classNames';
import { IconAngleDown, IconCheck, IconCrossCircle } from '../../icons';
import { Checkbox } from '../checkbox';
import { Tag } from '../tag';

export type SelectProps<OptionType> = {
  /**
   * Additional class names to apply to the select
   */
  className?: string;
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
  className,
  disabled = false,
  helper,
  invalid = false,
  isOptionDisabled,
  label,
  multiselect,
  onChange = () => null,
  // test using options without a label key and without optionLabelField defined
  optionLabelField = 'label',
  options = [],
  placeholder,
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
    reset,
    selectedItems,
    setSelectedItems,
  } = useMultipleSelection<OptionType>({
    // todo: create a prop for setting the removal message
    getA11yRemovalMessage({ itemToString, removedSelectedItem }) {
      console.log(
        `getA11yRemovalMessage message: "${itemToString(removedSelectedItem[optionLabelField])} has been removed"`,
      );
      return `${itemToString(removedSelectedItem[optionLabelField])} has been removed`;
    },
    // sets focus on the first selected item when the select is initialized
    defaultActiveIndex: 0,
    initialActiveIndex: 0,
    // todo: remove. just for testing
    initialSelectedItems: [options[0], options[1]],
    onSelectedItemsChange({ selectedItems: _selectedItems }) {
      // console.log('onSelectedItemsChange selectedItems', _selectedItems);
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
    // todo: remove. for testing only.
    // isOpen: true,
    // todo: create a prop for setting the selection message and clear message
    // todo: how can this be done for multiselect?
    getA11ySelectionMessage({ selectedItem: _selectedItem }) {
      if (!multiselect && _selectedItem) {
        const message = `${_selectedItem?.[optionLabelField]} has been selected`;
        console.log(`getA11ySelectionMessage message: "${message}"`);
        return message;
      }
      return '';
    },
    id,
    items: options,
    itemToString: (item): string => (item ? item[optionLabelField] ?? '' : ''),
    onSelectedItemChange: ({ selectedItem: _selectedItem }) => !multiselect && onChange(_selectedItem),
    // a defined value indicates that the dropdown should be controlled
    // don't set selectedItem if it's not, so that downshift can control the selected item(s)
    ...(!multiselect && value !== undefined && { selectedItem: value as OptionType }),
    stateReducer(state, { type, changes }) {
      switch (type) {
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
    return <span>{buttonLabel}</span>;
  };
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
      {label && <FieldLabel label={label} {...getLabelProps()} />}
      <div className={styles.wrapper}>
        {multiselect && selectedItems.length > 0 && (
          <>
            {/* SELECTED ITEMS */}
            <div className={styles.selectedItems}>
              {selectedItems.map((_selectedItem, index) => {
                const selectedItemLabel = _selectedItem[optionLabelField];

                // console.log('getSelectedItemProps', getSelectedItemProps({ selectedItem: _selectedItem, index }));

                return (
                  <Tag
                    className={styles.tag}
                    key={selectedItemLabel}
                    label={selectedItemLabel}
                    // aria-describedby={`${id}-helper`}
                    labelProps={{
                      'aria-describedby': `${id}-label`,
                      // 'aria-labelledby': `${id}-label hds-tag-label`,
                      // 'aria-label': `Selected: ${selectedItemLabel}`,
                    }}
                    deleteButtonAriaLabel={`Remove: ${selectedItemLabel}`}
                    onDelete={() => removeSelectedItem(_selectedItem)}
                    {...getSelectedItemProps({ selectedItem: _selectedItem, index })}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                );
              })}
            </div>
            {/* CLEAR BUTTON */}
            <button type="button" className={styles.clearButton} onClick={() => reset()}>
              <IconCrossCircle />
            </button>
          </>
        )}
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
            className: classNames(styles.button, showPlaceholder && styles.placeholder),
          })}
        >
          {/* <span className={styles.buttonLabel}>{selectedItem?.[optionLabelField] || placeholder}</span> */}
          {getButtonLabel()}
          <IconAngleDown className={styles.angleIcon} />
        </button>
        {/* INVALID ICON */}
        {/* {invalid && <IconAlertCircle className={styles.invalidIcon} />} */}
        <ul
          {...getMenuProps({
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
                      // todo: use root multiselect class?
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
        // <div id={`${id}-helper`} className={styles.helperText} aria-hidden="true">
        <div id={`${id}-helper`} className={styles.helperText}>
          {helper}
        </div>
      )}
    </div>
  );
};
