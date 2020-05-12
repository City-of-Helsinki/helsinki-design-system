import React, { FC, forwardRef, PropsWithChildren, RefObject } from 'react';
import { useMultipleSelection, useSelect } from 'downshift';

import styles from './Dropdown.module.css';
import classNames from '../../utils/classNames';
import { IconAngleDown, IconInfo } from '../../icons';
import Checkbox from '../checkbox/Checkbox';

// fixme: type
export type MultiselectProps = PropsWithChildren<{
  /**
   * Additional class names to apply to the button
   */
  className?: string;
  disabled?: boolean;
  helperText?: string;
  invalid?: boolean;
  labelId?: string;
  labelText?: string;
  placeholder?: string;
  // todo: rename?
  visibleOptions?: number;
}>;

const Multiselect: FC<MultiselectProps> = forwardRef(
  (
    { className, disabled, helperText, invalid, labelId, labelText, placeholder, visibleOptions = 5 }: MultiselectProps,
    ref: RefObject<HTMLInputElement>,
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
    const { isOpen, getToggleButtonProps, getLabelProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({
      selectedItem: null,
      items,
      labelId,
      // isOpen: true,
      // fixme
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      onStateChange: ({ type, selectedItem }) => {
        switch (type) {
          case useSelect.stateChangeTypes.MenuKeyDownEnter:
          case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
          case useSelect.stateChangeTypes.ItemClick:
            console.log('onStateChange selectedItem', selectedItem);
            if (selectedItem) {
              selectedItems.includes(selectedItem) ? removeSelectedItem(selectedItem) : addSelectedItem(selectedItem);
            }
            break;
          default:
            break;
        }
      },
    });

    console.log('selectedItems', selectedItems);

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
              className: classNames(styles.button, selectedItems.length === 0 && styles.placeholder),
              disabled,
              ref,
            })}
          >
            <span className={styles.buttonLabel}>
              {selectedItems.length > 0 ? selectedItems.join(', ') : placeholder}
            </span>
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
                    styles.multiselect,
                    highlightedIndex === index && styles.highlighted,
                    selectedItems.includes(item) && styles.selected,
                  ),
                })}
              >
                <Checkbox
                  className={styles.checkbox}
                  id={item}
                  labelText={item}
                  checked={selectedItems.includes(item)}
                />
              </li>
            ))}
        </ul>
        {helperText && <div className={styles.helperText}>{helperText}</div>}
      </div>
    );
  },
);

export default Multiselect;
