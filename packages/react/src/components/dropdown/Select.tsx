import React, { useRef } from 'react';
import { useSelect, useMultipleSelection } from 'downshift';
import isEqual from 'lodash.isequal';
import uniqueId from 'lodash.uniqueid';

import 'hds-core';

import styles from './Select.module.scss';
import { FieldLabel } from '../../internal/field-label/FieldLabel';
import classNames from '../../utils/classNames';
import { IconAngleDown, IconCheck, IconCrossCircle } from '../../icons';
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
   * Used to generate the first part of the id on the elements.
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
   * Label for selected items that is only visible to screen readers. Can be used to to give screen reader users additional information about the selected item.
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
      value?: OptionType;
      clearButtonAriaLabel?: string;
      selectedItemRemoveButtonAriaLabel?: string;
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
      /**
       * The aria-label for the clear button
       */
      clearButtonAriaLabel: string;
      /**
       * The aria-label for the selected item remove button
       */
      selectedItemRemoveButtonAriaLabel: string;
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
  clearButtonAriaLabel,
  disabled = false,
  helper,
  id = uniqueId('hds-select-'),
  invalid = false,
  isOptionDisabled,
  label,
  multiselect,
  onChange = () => null,
  // test using options without a label key and without optionLabelField defined
  optionLabelField = 'label',
  options = [],
  placeholder,
  selectedItemRemoveButtonAriaLabel,
  selectedItemSrLabel,
  style,
  value,
  visibleOptions = 5,
}: SelectProps<OptionType>) => {
  const selectedItemsContainerRef = useRef(null);

  // init multi-select
  const {
    activeIndex,
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
    // todo: create a prop for setting the selection message and "selections cleared" message
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
    // don't set selectedItem if it's not, so that downshift can handle the state
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
    return buttonLabel;
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
            <div ref={selectedItemsContainerRef} className={styles.selectedItems}>
              {selectedItems.map((_selectedItem, index) => {
                const selectedItemLabel = _selectedItem[optionLabelField];
                const tagId = uniqueId('hds-tag-');

                return (
                  <Tag
                    key={selectedItemLabel}
                    className={styles.tag}
                    id={tagId}
                    label={selectedItemLabel}
                    labelProps={{ 'aria-labelledby': `${id}-label ${tagId}-label` }}
                    deleteButtonAriaLabel={selectedItemRemoveButtonAriaLabel}
                    onDelete={(e) => {
                      e.stopPropagation();
                      removeSelectedItem(_selectedItem);
                    }}
                    srOnlyLabel={selectedItemSrLabel}
                    {...getSelectedItemProps({ selectedItem: _selectedItem, index })}
                  />
                );
              })}
            </div>
            {/* CLEAR BUTTON */}
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => reset()}
              aria-label={clearButtonAriaLabel}
              onFocus={() => {
                // manually set the tabindex of the first selected item to "0"
                // when the clear button is focused and Downshift's activeIndex is -1,
                // otherwise shift+tabbing back to the selected items won't work as they have a tabindex value of -1.
                if (activeIndex === -1) {
                  // eslint-disable-next-line no-unused-expressions
                  selectedItemsContainerRef?.current.childNodes[0].setAttribute('tabindex', '0');
                }
              }}
            >
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
            // todo: only add helper id if a helper text is defined
            'aria-labelledby': `${id}-helper ${getToggleButtonProps()['aria-labelledby']}`,
            // add downshift dropdown props when multiselect is enabled
            ...(multiselect && { ...getDropdownProps({ preventKeyAction: isOpen }) }),
            disabled,
            className: classNames(styles.button, showPlaceholder && styles.placeholder),
          })}
        >
          {getButtonLabel()}
          <IconAngleDown className={styles.angleIcon} />
        </button>
        {/* INVALID ICON */}
        {/* {invalid && <IconAlertCircle className={styles.invalidIcon} />} */}
        <ul
          {...getMenuProps({
            ...(multiselect && { 'aria-multiselectable': true }),
            className: classNames(styles.menu, options.length > visibleOptions && styles.overflow),
            style: { maxHeight: `calc(var(--menu-item-height) * ${visibleOptions})` },
          })}
        >
          {isOpen &&
            options.map((item, index) => {
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
                      multiselect && styles.multiselect,
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
      {helper && (
        <div id={`${id}-helper`} className={styles.helperText} aria-hidden="true">
          {helper}
        </div>
      )}
    </div>
  );
};
