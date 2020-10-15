import React from 'react';
import isEqual from 'lodash.isequal';
import { VirtualItem } from 'react-virtual';

import { getIsInSelectedOptions } from '../../components/dropdown/dropdownUtils';
import { IconCheck } from '../../icons';
import classNames from '../../utils/classNames';

type DropdownMenuProps<T> = {
  /**
   * Getter function for item props
   */
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  getItemProps(item: T, index: number, selected: boolean, disabled: boolean, virtualItem: VirtualItem | null): any;
  /**
   * Function used to detect whether an option is disabled
   */
  isOptionDisabled: (option: T, index: number) => boolean;
  /**
   * Downshift getter function for menu props
   */
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  menuProps: any;
  /**
   * Menu styles
   */
  menuStyles: { [className: string]: string };
  /**
   * Whether multi-select is enabled
   */
  multiselect: boolean;
  /**
   * Menu open state
   */
  open: boolean;
  /**
   * Data item field that represents the item label
   */
  optionLabelField: string;
  /**
   * Array of options that should be shown in the menu
   */
  options: T[];
  /**
   * Currently selected item
   */
  selectedItem: T;
  /**
   * Currently selected item(s) when multiselect is enabled.
   */
  selectedItems: T[];
  /**
   * Values return by the useVirtual hook
   */
  virtualizer?: {
    virtualItems: VirtualItem[];
    totalSize: number;
  };
  /**
   * The number of options that are visible in the menu before it becomes scrollable
   */
  visibleOptions: number;
};

export const DropdownMenu = <T,>({
  getItemProps,
  isOptionDisabled,
  menuProps,
  menuStyles,
  multiselect,
  open,
  optionLabelField,
  options,
  selectedItem,
  selectedItems,
  virtualizer,
  visibleOptions,
}: DropdownMenuProps<T>) => {
  const isVirtualized = !!virtualizer;
  const listOptions: (VirtualItem | T)[] = isVirtualized ? virtualizer.virtualItems : options;

  return (
    <ul {...menuProps} className={classNames(menuStyles.menu, options.length > visibleOptions && menuStyles.overflow)}>
      {open && (
        <>
          {isVirtualized && <li key="total-size" aria-hidden style={{ height: virtualizer.totalSize }} />}
          {listOptions.map((data, _index) => {
            let index = _index;
            let virtualItem: VirtualItem | null = null;

            if (isVirtualized) {
              ({ index } = data as VirtualItem);
              virtualItem = data as VirtualItem;
            }

            const item = options[index];
            const optionLabel: string = item[optionLabelField];
            const selected: boolean = multiselect
              ? getIsInSelectedOptions(selectedItems, item)
              : isEqual(selectedItem, item);
            const disabled = typeof isOptionDisabled === 'function' ? isOptionDisabled(item, index) : false;
            const itemProps = getItemProps(item, index, selected, disabled, virtualItem);

            return (
              <DropdownMenuItem
                key={optionLabel}
                disabled={disabled}
                itemProps={itemProps}
                menuStyles={menuStyles}
                multiselect={multiselect}
                label={optionLabel}
                selected={selected}
              />
            );
          })}
        </>
      )}
    </ul>
  );
};

type DropdownMenuItemProps = {
  /**
   * Whether the item is disabled
   */
  disabled: boolean;
  /**
   * Downshift item props
   */
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  itemProps: any;
  /**
   * Item label
   */
  label: string;
  /**
   * Menu styles
   */
  menuStyles: { [className: string]: string };
  /**
   * Whether multi-select is enabled
   */
  multiselect: boolean;
  /**
   * Whether the item is selected
   */
  selected: boolean;
};

export const DropdownMenuItem = ({
  disabled,
  itemProps,
  label,
  menuStyles,
  multiselect,
  selected,
}: DropdownMenuItemProps) => {
  return (
    <li {...itemProps} {...{ 'aria-selected': selected }} {...(disabled && { 'aria-disabled': true })}>
      {multiselect ? (
        <>
          <span className={menuStyles.checkbox} aria-hidden>
            <IconCheck />
          </span>
          {label}
        </>
      ) : (
        <>
          {label}
          {selected && <IconCheck className={menuStyles.selectedIcon} />}
        </>
      )}
    </li>
  );
};
