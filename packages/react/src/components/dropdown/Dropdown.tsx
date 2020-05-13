import React, { FC, PropsWithChildren, useState } from 'react';
import { useCombobox, useMultipleSelection, useSelect } from 'downshift';

import styles from './Dropdown.module.css';
import classNames from '../../utils/classNames';
import { IconAngleDown, IconCheck, IconAttention } from '../../icons';
import Checkbox from '../checkbox/Checkbox';

// todo: Types
// todo: API (onChange etc)

// fixme: type
export type DropdownProps = PropsWithChildren<{
  /**
   * Additional class names to apply to the button
   */
  className?: string;
  /**
   * Close the menu when the user selects an option
   */
  closeMenuOnSelect?: boolean;
  disabled?: boolean;
  filterable?: boolean;
  helperText?: string;
  invalid?: boolean;
  labelId?: string;
  labelText?: string;
  inputId?: string;
  multiselect?: boolean;
  // todo: rename?
  placeholder?: string;
  // todo: rename?
  visibleOptions?: number;
}>;

const Dropdown: FC<DropdownProps> = ({
  className,
  closeMenuOnSelect = true,
  disabled = false,
  filterable = false,
  helperText,
  invalid,
  labelId,
  labelText,
  inputId,
  multiselect = false,
  placeholder = '',
  visibleOptions = 5,
}: DropdownProps) => {
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
  // const items: string[] = [
  const items: string[] = [
    'Neptunium',
    'Plutonium',
    'Americium',
    'Curium',
    'Berkelium',
    'Californium',
    'Einsteinium',
    'Fermium',
    'Mendelevium',
    'Nobelium',
    'Lawrencium',
    'Rutherfordium',
    'Dubnium',
    'Seaborgium',
    'Bohrium',
    'Hassium',
    'Meitnerium',
    'Darmstadtium',
    'Roentgenium',
    'Copernicium',
    'Nihonium',
    'Flerovium',
    'Moscovium',
    'Livermorium',
    'Tennessine',
    'Oganesson',
  ];
  // const [inputValue, setInputValue] = useState('');
  const [inputValue] = useState('');
  const [inputItems, setInputItems] = useState(items);
  // const [menuOpen, setMenuOpen] = useState(false);
  const { getDropdownProps, addSelectedItem, removeSelectedItem, selectedItems } = useMultipleSelection({});
  // init combobox
  const combobox = useCombobox({
    inputValue: multiselect ? inputValue : undefined,
    items: inputItems,
    labelId,
    inputId,
    selectedItem: multiselect ? null : undefined,
    // isOpen: menuOpen,
    stateReducer: (state, actionAndChanges) => {
      const { type, changes } = actionAndChanges;
      // this prevents the menu from being closed when the user selects an item with 'Enter' or mouse
      if (
        !closeMenuOnSelect &&
        (type === useCombobox.stateChangeTypes.InputKeyDownEnter || type === useCombobox.stateChangeTypes.ItemClick)
      ) {
        return {
          ...changes,
          isOpen: state.isOpen,
          highlightedIndex: state.highlightedIndex,
        };
      }
      return changes;
    },
    onInputValueChange: ({ inputValue: _inputValue }) =>
      // setInputItems(items.filter((item) => !inputValue || item.includes(inputValue))),
      setInputItems(items.filter((item) => !_inputValue || item.includes(_inputValue))),
    // fixme: type
    // eslint-disable-next-line
    // @ts-ignore
    onStateChange: ({ type, selectedItem }) => {
      if (
        selectedItem &&
        (type === useCombobox.stateChangeTypes.InputKeyDownEnter ||
          type === useCombobox.stateChangeTypes.ItemClick ||
          type === useCombobox.stateChangeTypes.InputBlur)
      ) {
        console.log('combobox onStateChange _selectedItem', selectedItem);
        selectedItems.includes(selectedItem) ? removeSelectedItem(selectedItem) : addSelectedItem(selectedItem);
      }
    },
    // onStateChange: ({ inputValue: _inputValue, type, selectedItem, isOpen }) => {
    //   switch (type) {
    //     case useCombobox.stateChangeTypes.InputChange:
    //       setInputValue(_inputValue);
    //       break;
    //     case useCombobox.stateChangeTypes.InputKeyDownEnter:
    //     case useCombobox.stateChangeTypes.ItemClick:
    //     case useCombobox.stateChangeTypes.InputBlur:
    //       if (selectedItem) {
    //         setInputValue('');
    //         selectedItems.includes(selectedItem) ? removeSelectedItem(selectedItem) : addSelectedItem(selectedItem);
    //         // selectItem(null);
    //       }
    //       break;
    //     default:
    //       break;
    //   }
    // },
  });
  const select = useSelect({
    items,
    labelId,
    selectedItem: multiselect ? null : undefined,
    // isOpen: true,
    // fixme: type
    // eslint-disable-next-line
    // @ts-ignore
    onStateChange: ({ type, selectedItem }) => {
      if (
        multiselect &&
        selectedItem &&
        (type === useSelect.stateChangeTypes.MenuKeyDownEnter ||
          type === useSelect.stateChangeTypes.MenuKeyDownSpaceButton ||
          type === useSelect.stateChangeTypes.ItemClick)
      ) {
        console.log('select onStateChange _selectedItem', selectedItem);
        selectedItems.includes(selectedItem) ? removeSelectedItem(selectedItem) : addSelectedItem(selectedItem);
      }
    },
  });

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = filterable ? combobox : select;

  const getButtonLabel = () => {
    if (filterable) return null;
    const label = multiselect ? selectedItems.join(', ') : selectedItem;
    return <span className={styles.buttonLabel}>{label || placeholder}</span>;
  };

  // console.log('selectedItem', selectedItem);
  // console.log('selectedItems', selectedItems);

  // list options
  const options = filterable ? inputItems : items;

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
      <Wrapper filterable={filterable} comboboxProps={combobox.getComboboxProps({ className: styles.wrapper })}>
        {filterable && (
          <>
            {/* <div className={styles.selectedItems}> */}
            {/*  <span>{selectedItems.join(', ')}</span> */}
            {/* </div> */}
            <input
              {...{
                ...combobox.getInputProps({
                  ...getDropdownProps({ preventKeyAction: isOpen }),
                  // ...getDropdownProps({ preventKeyAction: menuOpen }),
                  className: styles.input,
                  disabled,
                  placeholder,
                  // onFocus: () => setInputValue(''),
                  // onBlur: () => setInputValue(selectedItems.join(', ')),
                }),
              }}
            />
          </>
        )}
        <ToggleButton
          toggleButtonProps={getToggleButtonProps({
            // fixme
            // ...getDropdownProps({ preventKeyAction: isOpen }),
            className: classNames(
              // todo: rename class?
              !filterable && styles.button,
              // fixme: make it cleaner
              ((multiselect && selectedItems.length === 0) || (!multiselect && !selectedItem)) && styles.placeholder,
            ),
            disabled,
          })}
        >
          {getButtonLabel()}
          <IconAngleDown className={styles.angleIcon} />
        </ToggleButton>
        {invalid && <IconAttention className={styles.invalidIcon} />}
      </Wrapper>
      <OptionList
        menuProps={{
          ...getMenuProps({
            // fixme: overflow class
            className: classNames(styles.list, options.length > visibleOptions && styles.overflow),
            style: { maxHeight: `calc(var(--input-height) * ${visibleOptions})` },
          }),
        }}
      >
        {isOpen &&
          // {menuOpen &&
          options.map((item, index) => (
            <OptionListItem
              key={item}
              item={item}
              selectedItem={selectedItem}
              selectedItems={selectedItems}
              multiselect={multiselect}
              itemProps={{
                ...getItemProps({
                  key: item,
                  index,
                  item,
                  className: classNames(
                    styles.listItem,
                    highlightedIndex === index && styles.highlighted,
                    selectedItem === item && styles.selected,
                  ),
                }),
              }}
            />
          ))}
      </OptionList>
      {helperText && <div className={styles.helperText}>{helperText}</div>}
    </div>
  );
};

const Wrapper = ({ filterable, comboboxProps, children }) => {
  return filterable ? <div {...comboboxProps}>{children}</div> : <div className={styles.wrapper}>{children}</div>;
};

const ToggleButton = ({ toggleButtonProps, children }) => (
  <button type="button" {...toggleButtonProps}>
    {children}
  </button>
);

const OptionList = ({ menuProps, children }) => <ul {...menuProps}>{children}</ul>;

const OptionListItem = ({ item, selectedItem, selectedItems, itemProps, multiselect }) => {
  return (
    <li {...itemProps}>
      {multiselect ? (
        <Checkbox className={styles.checkbox} id={item} labelText={item} checked={selectedItems.includes(item)} />
      ) : (
        <>
          {item}
          {selectedItem === item && <IconCheck className={styles.selectedIcon} />}
        </>
      )}
    </li>
  );
};

export default Dropdown;
