import React, { FC, forwardRef, PropsWithChildren, RefObject, useState } from 'react';
import { useCombobox } from 'downshift';

import styles from './Dropdown.module.css';
import classNames from '../../utils/classNames';
import { IconAngleDown, IconCheck, IconInfo } from '../../icons';

// type Item = {
//   value: string;
//   [key: string]: any;
// };

// fixme: type
export type ComboboxProps = PropsWithChildren<{
  /**
   * Additional class names to apply to the button
   */
  className?: string;
  disabled?: boolean;
  filterable?: boolean;
  helperText?: string;
  invalid?: boolean;
  labelId?: string;
  labelText?: string;
  inputId: string;
  multiselect?: boolean;
  placeholder?: string;
  // todo: rename?
  visibleOptions?: number;
}>;

const Combobox: FC<ComboboxProps> = forwardRef(
  (
    {
      className,
      disabled,
      helperText,
      invalid,
      labelId,
      labelText,
      inputId,
      // multiselect = false,
      placeholder,
      visibleOptions = 5,
    }: ComboboxProps,
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
    const [inputItems, setInputItems] = useState(items);
    const {
      isOpen,
      selectedItem,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      highlightedIndex,
      getItemProps,
    } = useCombobox({
      items: inputItems,
      labelId,
      inputId,
      // isOpen: true,
      onInputValueChange: ({ inputValue }) =>
        setInputItems(items.filter((item) => !inputValue || item.includes(inputValue))),
    });

    console.log('selectedItem', selectedItem);

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
        <div {...getComboboxProps({ className: styles.wrapper })}>
          <input {...getInputProps({ className: styles.input, disabled, placeholder, ref })} />
          <button type="button" {...getToggleButtonProps({ className: styles.angleIcon })}>
            <IconAngleDown />
          </button>
          {invalid && <IconInfo className={styles.invalidIcon} />}
        </div>
        <ul
          {...getMenuProps({
            className: classNames(styles.list, inputItems.length > visibleOptions && styles.overflow),
            style: { maxHeight: `calc(var(--input-height) * ${visibleOptions})` },
          })}
        >
          {isOpen &&
            inputItems.map((item, index) => (
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
                {item}
                {selectedItem === item && <IconCheck className={styles.selectedIcon} />}
              </li>
            ))}
        </ul>
        {helperText && <div className={styles.helperText}>{helperText}</div>}
      </div>
    );
  },
);

export default Combobox;
