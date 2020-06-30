import React, { useContext, useRef } from 'react';
import { useSelect } from 'downshift';
import { animated, useTransition, UseTransitionProps } from 'react-spring';
import isEqual from 'lodash.isequal';

import styles from './NavigationLanguageSelector.module.css';
import classNames from '../../../utils/classNames';
import NavigationContext from '../NavigationContext';
import { IconAngleDown } from '../../../icons';
import Button from '../../button/Button';

// TODO: ACCESSIBILITY ATTRIBUTES
// TODO: ACCESSIBILITY ATTRIBUTES
// TODO: ACCESSIBILITY ATTRIBUTES

const DROPDOWN_TRANSITION: UseTransitionProps = {
  from: { transform: 'translate3d(0, -2px, 0)', opacity: 0.75 },
  enter: { transform: 'translate3d(0, 10px, 0)', opacity: 1 },
  config: {
    friction: 30,
    tension: 300,
  },
};

// todo: move
type OptionType = {
  [key: string]: any;
};

export type NavigationLanguageSelectorProps = {
  /**
   * If `true`, the dropdown will be animated when opened
   */
  animateOpen?: boolean;
  /**
   * Used to label the toggle button and the menu
   */
  ariaLabel?: string;
  /**
   * Additional class names to apply to the dropdown
   */
  className?: string;
  /**
   * todo
   */
  formatOptionLabel?: (option: OptionType, index: number) => string;
  /**
   * todo
   */
  formatSelectedValue?: (option: OptionType) => string;
  /**
   * Dropdown id
   */
  id?: string;
  /**
   * Callback fired when the state is changed
   * @param selectedItem Selected item
   */
  onLanguageChange?: (selectedItem: { [key: string]: any }) => void;
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
   * The selected value
   */
  value: OptionType;
};

const LanguageSelectorDropdown = ({
  animateOpen = true,
  ariaLabel = '',
  className,
  formatOptionLabel,
  formatSelectedValue,
  id,
  onLanguageChange = () => {
    // do nothing by default
  },
  optionLabelField = 'label',
  options = [],
  value,
}: NavigationLanguageSelectorProps) => {
  const toggleButtonRef = useRef(null);
  // filter out the active language from options
  const filteredOptions = options.filter((item) => !isEqual(item, value));

  const focusToggleButton = () => toggleButtonRef.current?.focus();

  // init select
  const {
    getItemProps,
    getLabelProps,
    getMenuProps,
    getToggleButtonProps,
    highlightedIndex,
    isOpen,
    selectedItem,
  } = useSelect<OptionType>({
    // todo: remove
    // isOpen: true,
    id,
    items: filteredOptions,
    // downshift needs a string representation for each option label
    itemToString: (item: OptionType): string => (item ? item[optionLabelField] ?? '' : ''),
    onSelectedItemChange: ({ selectedItem: _selectedItem }) => {
      onLanguageChange(_selectedItem);
      focusToggleButton();
    },
    selectedItem: value,
  });

  // menu transition
  const transitionProps = animateOpen ? DROPDOWN_TRANSITION : {};
  const menuTransition = useTransition(isOpen, transitionProps);

  const label =
    typeof formatSelectedValue === 'function' ? formatSelectedValue(selectedItem) : selectedItem?.[optionLabelField];

  return (
    <div className={classNames(styles.languageSelectorDropdown, isOpen && styles.open, className)}>
      <label
        {...getLabelProps({
          className: styles.srLabel,
        })}
      >
        {ariaLabel}
      </label>
      {/* WRAPPER */}
      <div className={styles.wrapper}>
        <button
          type="button"
          {...getToggleButtonProps({
            className: classNames(styles.buttonDropdown, styles.placeholder),
            ref: toggleButtonRef,
            refKey: 'ref',
          })}
        >
          <span className={styles.label}>{label}</span>
          <IconAngleDown className={styles.angleIcon} />
        </button>
      </div>
      {/* MENU */}
      {menuTransition((values, open) => (
        <animated.ul
          style={values}
          {...getMenuProps({
            className: styles.menu,
          })}
        >
          {open &&
            filteredOptions.map((item, index) => {
              const optionLabel =
                typeof formatOptionLabel === 'function' ? formatOptionLabel(item, index) : item[optionLabelField];

              return (
                <li
                  {...getItemProps({
                    key: optionLabel,
                    index,
                    item,
                    className: classNames(styles.menuItem, highlightedIndex === index && styles.highlighted),
                  })}
                >
                  {optionLabel}
                </li>
              );
            })}
        </animated.ul>
      ))}
    </div>
  );
};

const NavigationLanguageSelector = (props: NavigationLanguageSelectorProps) => {
  const { isMobile } = useContext(NavigationContext);
  const {
    onLanguageChange = () => {
      // do nothing by default
    },
    options,
    value,
    optionLabelField = 'label',
  } = props;

  return isMobile ? (
    // todo: rename
    <div className={styles.mobileContainer}>
      {options.map((item) => {
        const label = item[optionLabelField];
        // todo: set defaults in NavigationLanguageSelector
        return (
          <Button
            key={`item-${label}`}
            className={classNames(styles.mobileLanguageItem, isEqual(item, value) && styles.active)}
            onClick={() => onLanguageChange(item)}
            size="small"
            theme="coat"
            type="button"
            variant="supplementary"
          >
            {label}
          </Button>
        );
      })}
    </div>
  ) : (
    <LanguageSelectorDropdown {...props} />
  );
};

export default NavigationLanguageSelector;
