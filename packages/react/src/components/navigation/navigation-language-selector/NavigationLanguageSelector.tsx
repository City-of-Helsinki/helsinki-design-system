import React, { useContext, useRef } from 'react';
import { useSelect } from 'downshift';
import { animated, useTransition, UseTransitionProps } from 'react-spring';
import isEqual from 'lodash.isequal';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import styles from './NavigationLanguageSelector.module.css';
import classNames from '../../../utils/classNames';
import { NavigationContext } from '../NavigationContext';
import { IconAngleDown } from '../../../icons';
import { Button } from '../../button';

const DROPDOWN_TRANSITION: UseTransitionProps = {
  from: { transform: 'translate3d(0, -2px, 0)' },
  enter: { transform: 'translate3d(0, 10px, 0)' },
  config: {
    friction: 30,
    tension: 300,
  },
};

export type NavigationLanguageSelectorProps<OptionType> = {
  /**
   * If `true`, the dropdown will be animated when opened
   * @default true
   */
  animateOpen?: boolean;
  /**
   * aria-label for the language dropdown. Can be used to give additional information to screen readers
   */
  ariaLabel?: string;
  /**
   * Additional class names to apply to the dropdown
   */
  className?: string;
  /**
   * A function used to format what is displayed as the selected value
   */
  formatOptionLabel?: (option: OptionType, index: number) => string | React.ReactNode;
  /**
   * A function used to format what is displayed as the option label
   */
  formatSelectedValue?: (option: OptionType) => string | React.ReactNode;
  /**
   * Callback fired when the language is changed
   */
  onLanguageChange?: (selectedItem: OptionType) => void;
  /**
   * Sets the data item field that represents the item label.
   * E.g. an `optionLabelField` value of `'foo'` and a data item `{ foo: 'Suomeksi', bar: 'fi' }`, would display `Suomeksi` in the dropdown menu for that specific item
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

const LanguageSelectorDropdown = <OptionType,>({
  animateOpen = true,
  ariaLabel = '',
  className,
  formatOptionLabel,
  formatSelectedValue,
  onLanguageChange = () => null,
  optionLabelField = 'label',
  options = [],
  value,
}: NavigationLanguageSelectorProps<OptionType>) => {
  const toggleButtonRef = useRef(null);
  // filter out the active language from options
  const filteredOptions = options.filter((item) => !isEqual(item, value));

  // focuses the dropdown toggle button
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
    id: 'languageDropdown',
    items: filteredOptions,
    // downshift needs a string representation for each option label
    itemToString: (item: OptionType): string => (item ? item[optionLabelField] ?? '' : ''),
    onSelectedItemChange: ({ selectedItem: _selectedItem }) => {
      // only fire callback when the value changes
      if (!isEqual(value, _selectedItem)) onLanguageChange(_selectedItem);
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
      <VisuallyHidden>
        <label {...getLabelProps()}>{ariaLabel}</label>
      </VisuallyHidden>
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
            onKeyDown: (event) => {
              // focus toggle button when escape is pressed or when enter/space is pressed and no item is highlighted
              if (event.key === 'Escape' || (['Enter', ' '].includes(event.key) && highlightedIndex < 0))
                focusToggleButton();
            },
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

export const NavigationLanguageSelector = <OptionType,>(props: NavigationLanguageSelectorProps<OptionType>) => {
  const { isMobile } = useContext(NavigationContext);
  const { onLanguageChange = () => null, options, value, optionLabelField = 'label' } = props;

  return isMobile ? (
    <div className={styles.mobileLanguageContainer}>
      {options.map((item) => {
        const label = item[optionLabelField];
        const active = isEqual(item, value);
        return (
          <Button
            key={`item-${label}`}
            className={classNames(styles.mobileLanguageItem, active && styles.active)}
            onClick={() => onLanguageChange(item)}
            size="small"
            tabIndex={active ? -1 : 0}
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
