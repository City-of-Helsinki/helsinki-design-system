import React, { cloneElement, isValidElement, useContext, useRef } from 'react';
import { useSelect } from 'downshift';
import { useTransition, animated, UseTransitionProps } from 'react-spring';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import styles from './NavigationDropdown.module.css';
import classNames from '../../../utils/classNames';
import { IconAngleDown } from '../../../icons';
import { NavigationContext } from '../NavigationContext';

const DROPDOWN_TRANSITION: UseTransitionProps = {
  from: { transform: 'translate3d(0, -2px, 0)' },
  enter: { transform: 'translate3d(0, 10px, 0)' },
  config: {
    friction: 30,
    tension: 300,
  },
};

export type NavigationDropdownProps = React.PropsWithChildren<{
  /**
   * If `true`, the dropdown will be marked as active
   */
  active?: boolean;
  /**
   * If `true`, the dropdown will be animated when opened
   */
  animateOpen?: boolean;
  /**
   * aria-label for the user dropdown. Can be used to give additional information to screen readers
   */
  ariaLabel?: string;
  /**
   * Additional class names to apply to the dropdown
   */
  className?: string;
  /**
   * Icon to display in the dropdown
   */
  icon?: React.ReactNode;
  /**
   * Dropdown id
   */
  id?: string;
  /**
   * The label for the dropdown
   */
  label?: string | React.ReactNode;
}>;

export const NavigationDropdown = ({
  active,
  animateOpen = true,
  ariaLabel = '',
  children,
  className,
  icon = null,
  id,
  label = '',
}: NavigationDropdownProps) => {
  const { isMobile } = useContext(NavigationContext);
  const toggleButtonRef = useRef(null);
  // add class name to every option, so that they can be styled
  const childrenWithClassName = React.Children.map(children, (child) =>
    isValidElement(child) ? cloneElement(child, { className: `${styles.option} option` }) : child,
  );

  // focuses the dropdown toggle button
  const focusToggleButton = () => toggleButtonRef.current?.focus();

  // Handles dropdown menu events
  const handleMenuEvent = (event: React.KeyboardEvent<HTMLElement>, highlightedIndex: number): void => {
    const clickAction = ['Enter', ' '].includes(event.key);
    const closeAction = ['Tab', 'Escape'].includes(event.key);

    // focus toggle button when tab/escape is pressed or when enter/space is pressed and no item is highlighted
    if (closeAction || (clickAction && highlightedIndex < 0)) {
      focusToggleButton();
    }
    // programmatically click the item component if it was selected
    if (clickAction) {
      // menu child nodes
      const { childNodes } = event.target as HTMLUListElement;
      // get the selected option based on highlightedIndex
      const selectedOption = (childNodes.item(highlightedIndex) as HTMLLIElement)?.firstChild as HTMLElement;
      // eslint-disable-next-line no-unused-expressions
      selectedOption?.click();
    }
  };

  // init select
  const { getItemProps, getLabelProps, getMenuProps, getToggleButtonProps, highlightedIndex, isOpen } = useSelect<
    React.ReactNode
  >({
    id,
    items: childrenWithClassName || [],
  });

  // menu transition
  const transitionProps = animateOpen && !isMobile ? DROPDOWN_TRANSITION : {};
  const menuTransition = useTransition(isOpen, transitionProps);

  return (
    <div
      className={classNames(
        `${styles.navigationDropdown} navigationDropdown`,
        isOpen && styles.open,
        isMobile && styles.mobile,
        className,
      )}
    >
      <VisuallyHidden>
        <label {...getLabelProps()}>{ariaLabel}</label>
      </VisuallyHidden>
      {/* WRAPPER */}
      <div className={`${styles.wrapper} dropdownWrapper`}>
        <button
          type="button"
          {...getToggleButtonProps({
            ...(active && { 'aria-current': 'page' }),
            className: classNames(`${styles.dropdownButton} dropdownButton`, styles.placeholder),
            ref: toggleButtonRef,
            refKey: 'ref',
          })}
        >
          {icon}
          <span className={`${styles.label} dropdownButtonLabel`}>{label}</span>
          <IconAngleDown className={`${styles.angleIcon} dropdownAngleIcon`} />
        </button>
      </div>
      {/* MENU */}
      {menuTransition((values, open) => (
        <animated.ul
          style={values}
          {...getMenuProps({
            className: `${styles.menu} menu`,
            onKeyDown: (event) => handleMenuEvent(event, highlightedIndex),
          })}
        >
          {open &&
            childrenWithClassName.map((item, index) => (
              <li
                {...getItemProps({
                  key: `item-${index}`,
                  index,
                  item,
                  className: classNames(
                    `${styles.menuItem} menuItem`,
                    highlightedIndex === index && `${styles.highlighted} highlighted`,
                  ),
                })}
              >
                {item}
              </li>
            ))}
        </animated.ul>
      ))}
    </div>
  );
};
