import React, { FC, forwardRef, PropsWithChildren, RefObject } from 'react';
import { useMultipleSelection, useSelect } from 'downshift';

import styles from './Dropdown.module.css';
import classNames from '../../utils/classNames';
import { IconAngleDown, IconCheck, IconInfo } from '../../icons';
import Checkbox from '../checkbox/Checkbox';

// todo: Create components for common stuff like list, list items, label etc.
// todo: Types
// todo: Multi-select
// todo: API (onChange etc)

// type Item = {
//   value: string;
//   [key: string]: any;
// };

// fixme: type
export type DropdownProps = PropsWithChildren<{
  /**
   * Additional class names to apply to the button
   */
  className?: string;
  disabled?: boolean;
  helperText?: string;
  invalid?: boolean;
  labelId?: string;
  labelText?: string;
  multiselect?: boolean;
  // todo: rename?
  placeholder?: string;
  // todo: rename?
  visibleOptions?: number;
}>;

const Dropdown: FC<DropdownProps> = forwardRef(
  (
    {
      className,
      disabled,
      helperText,
      invalid,
      labelId,
      labelText,
      multiselect = false,
      placeholder = '',
      visibleOptions = 5,
    }: DropdownProps,
    ref: RefObject<HTMLButtonElement>,
  ) => {
    // const objectItems: Item[] = [
    //   { value: 'Option 1' },
    //   { value: 'Option 2' },
    //   { value: 'Option 3' },
    //   { value: 'Option 4' },
    //   { value: 'Option 5' },
    //   { value: 'Option 6' },
    //   { value: 'Option 7' },
    //   { value: 'Option 8' },
    //   { value: 'Option 9' },
    //   { value: 'Option 10' },
    // ];
    const items: string[] = [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
      'Option 5',
      'Option 6',
      'Option 7',
      'Option 8',
      'Option 9',
      'Option 10',
    ];
    const { getDropdownProps, addSelectedItem, removeSelectedItem, selectedItems } = useMultipleSelection({});
    const {
      isOpen,
      selectedItem,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      highlightedIndex,
      getItemProps,
    } = useSelect({
      items,
      labelId,
      selectedItem: multiselect ? null : undefined,
      // fixme: type
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      onStateChange: ({ type, selectedItem: _selectedItem }) => {
        if (
          multiselect &&
          _selectedItem &&
          (type === useSelect.stateChangeTypes.MenuKeyDownEnter ||
            type === useSelect.stateChangeTypes.MenuKeyDownSpaceButton ||
            type === useSelect.stateChangeTypes.ItemClick)
        ) {
          console.log('onStateChange _selectedItem', _selectedItem);
          selectedItems.includes(_selectedItem) ? removeSelectedItem(_selectedItem) : addSelectedItem(_selectedItem);
        }
      },
    });

    const buttonLabel = (item: string) => <span className={styles.buttonLabel}>{item || placeholder}</span>;

    return (
      <div
        className={classNames(
          styles.dropdown,
          invalid && styles.invalid,
          disabled && styles.disabled,
          isOpen && styles.open,
          className,
        )}
      >
        {labelText && <label {...getLabelProps({ className: styles.label })}>{labelText}</label>}
        <div className={styles.wrapper}>
          <button
            type="button"
            {...getToggleButtonProps({
              ...getDropdownProps({ preventKeyAction: isOpen }),
              className: classNames(
                styles.button,
                // fixme: make it cleaner
                ((multiselect && selectedItems.length === 0) || (!multiselect && !selectedItem)) && styles.placeholder,
              ),
              disabled,
              ref,
            })}
          >
            {multiselect ? buttonLabel(selectedItems.join(', ')) : buttonLabel(selectedItem)}
            <IconAngleDown className={styles.angleIcon} />
          </button>
          {invalid && <IconInfo className={styles.invalidIcon} />}
        </div>
        <ul
          {...getMenuProps({
            className: classNames(styles.list, items.length > visibleOptions && styles.overflow),
            style: { maxHeight: `calc(var(--input-height) * ${visibleOptions})` },
          })}
        >
          {isOpen &&
            items.map((item, index) => (
              <li
                {...getItemProps({
                  key: item,
                  index,
                  item,
                  className: classNames(
                    styles.listItem,
                    highlightedIndex === index && styles.highlighted,
                    selectedItem === item && styles.selected,
                  ),
                })}
              >
                {multiselect ? (
                  <Checkbox
                    className={styles.checkbox}
                    id={item}
                    labelText={item}
                    checked={selectedItems.includes(item)}
                  />
                ) : (
                  <>
                    {item}
                    {selectedItem === item && <IconCheck className={styles.selectedIcon} />}
                  </>
                )}
              </li>
            ))}
        </ul>
        {helperText && <div className={styles.helperText}>{helperText}</div>}
      </div>
    );
  },
);

// type ListItemProps = {
//   getItemProps: (options: GetItemPropsOptions<any>) => any;
//   highlightedIndex: number;
//   index: number;
//   item: Item;
//   selectedItem: Item;
// };
//
// const ListItem: FC<ListItemProps> = ({ item, index, highlightedIndex, selectedItem, getItemProps }: ListItemProps) => {
//   return (
//     <li
//       {...getItemProps({
//         key: item.value,
//         index,
//         item,
//         className: classNames(
//           styles.listItem,
//           highlightedIndex === index && styles.highlighted,
//           selectedItem === item && styles.selected,
//         ),
//       })}
//     >
//       {item.value}
//       {selectedItem === item && <IconCheck className={styles.selectedIcon} />}
//     </li>
//   );
// };

export default Dropdown;
