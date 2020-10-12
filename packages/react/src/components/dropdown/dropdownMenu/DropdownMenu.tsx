import React from 'react';
import isEqual from 'lodash.isequal';

import { getIsInSelectedOptions } from '../dropdownUtils';
import { IconCheck } from '../../../icons';
import classNames from '../../../utils/classNames';

export type DropdownMenuProps = {
  getItemProps: any;
  isOptionDisabled: any;
  menuProps: any;
  menuStyles: any;
  multiselect: any;
  open: any;
  optionLabelField: any;
  options: any;
  rowVirtualizer?: any;
  selectedItem: any;
  selectedItems: any;
  virtualizer?: any;
  visibleOptions: any;
};

// todo: typing
// todo: make generic
export const DropdownMenu = ({
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
}: DropdownMenuProps) => {
  const isVirtualized = !!virtualizer;
  const listOptions = isVirtualized ? virtualizer.virtualItems : options;

  return (
    <ul {...menuProps} className={classNames(menuStyles.menu, options.length > visibleOptions && menuStyles.overflow)}>
      {open && (
        <>
          {isVirtualized && <li key="total-size" aria-hidden style={{ height: virtualizer.totalSize }} />}
          {/* {virtualizer.virtualItems.map((virtualRow) => { */}
          {/* {listOptions.map((virtualRow) => { */}
          {listOptions.map((data, _index) => {
            const index = isVirtualized ? data.index : _index;
            const item = options[index];
            const optionLabel = item[optionLabelField];
            const selected = multiselect ? getIsInSelectedOptions(selectedItems, item) : isEqual(selectedItem, item);
            const optionDisabled = typeof isOptionDisabled === 'function' ? isOptionDisabled(item, index) : false;
            const itemProps = getItemProps(optionDisabled, index, item, selected, isVirtualized ? data : null);

            return (
              <DropdownMenuItem
                key={optionLabel}
                disabled={optionDisabled}
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

// todo: typing
export const DropdownMenuItem = ({ disabled, itemProps, label, menuStyles, multiselect, selected }) => {
  return (
    <li {...itemProps} {...{ 'aria-selected': selected }} {...(disabled && { 'aria-disabled': true })}>
      {multiselect ? (
        <>
          <IconCheck className={menuStyles.checkbox} aria-hidden />
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
