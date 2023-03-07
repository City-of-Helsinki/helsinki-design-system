import React, { useRef } from 'react';
import isEqual from 'lodash.isequal';
import { VirtualItem } from 'react-virtual';

import { getIsInSelectedOptions } from '../../components/dropdown/dropdownUtils';
import { IconCheck } from '../../icons';
import classNames from '../../utils/classNames';

export type OptionGroup<T> = {
  icon?: React.ReactNode;
  label: string;
  options: T[];
};

type DropdownMenuItemProps = {
  /**
   * Whether the item is disabled
   */
  disabled: boolean;
  /**
   * String to highlight
   */
  highlightValue?: string;
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
  highlightValue,
  itemProps,
  label,
  menuStyles,
  multiselect,
  selected,
}: DropdownMenuItemProps) => {
  const getHighligtedValue = (labelValue: string) => {
    return labelValue.replace(new RegExp(highlightValue, 'gi'), (match) => `<mark>${match}</mark>`);
  };
  const highlightLabel = (value: string) => {
    // eslint-disable-next-line react/no-danger
    return <span className={menuStyles.highlighted} dangerouslySetInnerHTML={{ __html: getHighligtedValue(value) }} />;
  };

  return (
    <li {...itemProps} {...{ 'aria-selected': selected }} {...(disabled && { 'aria-disabled': true })}>
      {multiselect ? (
        <>
          <span className={menuStyles.checkbox} aria-hidden>
            <IconCheck />
          </span>
          {highlightValue ? highlightLabel(label) : label}
        </>
      ) : (
        <>
          {highlightValue ? highlightLabel(label) : label}
          {selected && <IconCheck className={menuStyles.selectedIcon} />}
        </>
      )}
    </li>
  );
};

const ItemWrapper = ({
  elementIndex,
  isVirtualized,
  data,
  optionLabel,
  options,
  multiselect,
  selectedItems,
  selectedItem,
  isOptionDisabled,
  getItemProps,
  highlightValue,
  menuStyles,
}) => {
  let index = elementIndex;
  let virtualItem: VirtualItem | null = null;

  if (isVirtualized) {
    ({ index } = data as VirtualItem);
    virtualItem = data as VirtualItem;
  }

  const item = options[index];
  const selected: boolean = multiselect ? getIsInSelectedOptions(selectedItems, item) : isEqual(selectedItem, item);
  const disabled = typeof isOptionDisabled === 'function' ? isOptionDisabled(item, index) : false;
  const itemProps = getItemProps(item, index, selected, disabled, virtualItem);

  return (
    <DropdownMenuItem
      key={optionLabel}
      disabled={disabled}
      highlightValue={highlightValue}
      itemProps={itemProps}
      menuStyles={menuStyles}
      multiselect={multiselect}
      label={optionLabel}
      selected={selected}
    />
  );
};

type DropdownMenuProps<T> = {
  /**
   * Getter function for item props
   */
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  getItemProps(item: T, index: number, selected: boolean, disabled: boolean, virtualItem: VirtualItem | null): any;
  /**
   * String to be highlighted in a item
   */
  highlightValue?: string;
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
   * Array of optionGroups with label String and Options. Used instead of options. Prints label before each group in list.
   */
  optionGroups?: OptionGroup<T>[];
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
};

export const DropdownMenu = <T,>({
  getItemProps,
  highlightValue,
  isOptionDisabled,
  menuProps,
  menuStyles,
  multiselect,
  open,
  optionLabelField,
  options,
  optionGroups,
  selectedItem,
  selectedItems,
  virtualizer,
}: DropdownMenuProps<T>) => {
  const isVirtualized = !!virtualizer;
  const listOptions: (VirtualItem | T)[] = isVirtualized ? virtualizer.virtualItems : options;
  const groupIndexRef = useRef<number>(0);
  const sanitizedOptionGroups = optionGroups ? optionGroups.filter((group) => group.options.length > 0) : [];

  const commonItemProps = {
    isVirtualized,
    optionLabelField,
    multiselect,
    selectedItems,
    selectedItem,
    isOptionDisabled,
    getItemProps,
    highlightValue,
    menuStyles,
  };

  return (
    <ul {...menuProps} className={classNames(menuStyles.menu)}>
      {open && sanitizedOptionGroups.length > 0 ? (
        <>
          {sanitizedOptionGroups.map((optionGroup, groupIndex) => {
            return (
              <li key={optionGroup.label} className={menuStyles.menuGroup}>
                <div className={menuStyles.menuGroupLabel}>
                  {optionGroup.icon && (
                    <span className={menuStyles.menuGroupLabelIcon} aria-hidden="true">
                      {optionGroup.icon}
                    </span>
                  )}
                  {optionGroup.label}
                </div>
                <ul className={menuStyles.menuGroupOptions}>
                  {optionGroup.options.length &&
                    optionGroup.options.map((data, _index) => {
                      groupIndexRef.current = groupIndex === 0 && _index === 0 ? 0 : groupIndexRef.current + 1;
                      const elementIndex = groupIndexRef.current;
                      const optionLabel = data[optionLabelField];

                      return (
                        <ItemWrapper
                          key={optionLabel}
                          {...{
                            elementIndex,
                            optionLabel,
                            // @ts-ignore
                            options: optionGroups.flatMap((group) => group.options),
                            data,
                            ...commonItemProps,
                          }}
                        />
                      );
                    })}
                </ul>
              </li>
            );
          })}
        </>
      ) : (
        <>
          {isVirtualized && <li key="total-size" aria-hidden style={{ height: virtualizer.totalSize }} />}
          {listOptions.map((data, _index) => {
            const optionLabel = data[optionLabelField];
            return (
              <ItemWrapper
                key={optionLabel}
                {...{
                  elementIndex: _index,
                  optionLabel,
                  data,
                  options,
                  ...commonItemProps,
                }}
              />
            );
          })}
        </>
      )}
    </ul>
  );
};
