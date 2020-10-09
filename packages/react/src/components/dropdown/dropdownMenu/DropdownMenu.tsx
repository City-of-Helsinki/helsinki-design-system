import React from 'react';
import isEqual from 'lodash.isequal';

import styles from '../select/Select.module.scss';
import { getIsInSelectedOptions } from '../dropdownUtils';
import { IconCheck } from '../../../icons';

export type DropdownMenuProps = {
  getItemProps: any;
  isOptionDisabled: any;
  menuProps: any;
  multiselect: any;
  open: any;
  optionLabelField: any;
  options: any;
  rowVirtualizer?: any;
  selectedItem: any;
  selectedItems: any;
  virtualizer?: any;
};

export const DropdownMenu = ({
  getItemProps,
  isOptionDisabled,
  menuProps,
  multiselect,
  open,
  optionLabelField,
  options,
  virtualizer,
  selectedItem,
  selectedItems,
}: DropdownMenuProps) => {
  const isVirtualized = !!virtualizer;
  const listOptions = isVirtualized ? virtualizer.virtualItems : options;

  return (
    <ul {...menuProps}>
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

export const DropdownMenuItem = ({ disabled, itemProps, multiselect, label, selected }) => {
  return (
    <li {...itemProps} {...{ 'aria-selected': selected }} {...(disabled && { 'aria-disabled': true })}>
      {multiselect ? (
        <>
          <IconCheck className={styles.checkbox} aria-hidden />
          {label}
        </>
      ) : (
        <>
          {label}
          {selected && <IconCheck className={styles.selectedIcon} />}
        </>
      )}
    </li>
  );
};
