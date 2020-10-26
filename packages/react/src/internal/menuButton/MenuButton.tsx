import React, { useEffect, useReducer, useRef } from 'react';
// import core base styles
import 'hds-core';
import uniqueId from 'lodash.uniqueid';
import mergeRefs from 'react-merge-refs';
import useMeasure from 'react-use-measure';

import styles from './MenuButton.module.scss';
import { Menu } from './menu/Menu';
import { MenuButtonContext } from './MenuButtonContext';
import { MenuButtonReducerAction, MenuButtonReducerState } from './MenuButton.interface';
import { IconAngleDown, IconAngleUp } from '../../icons';
import classNames from '../../utils/classNames';

export type MenuButtonProps = React.PropsWithChildren<{
  /**
   * aria-label for the dropdown toggle button
   */
  buttonAriaLabel?: string;
  /**
   * Additional class names to apply to the dropdown
   */
  className?: string;
  /**
   * Used to generate the first part of the id on the elements
   */
  id?: string;
  /**
   * Icon to be displayed in the dropdown
   */
  icon?: React.ReactNode;
  /**
   * Label for the dropdown
   */
  label: React.ReactNode;
  /**
   * Spacing between the toggle button and the menu
   */
  menuOffset?: number;
}>;

/**
 * MenuButton reducer
 * @param {ReducerState} state
 * @param {ReducerAction} action
 */
const reducer = (state: MenuButtonReducerState, action: MenuButtonReducerAction): MenuButtonReducerState => {
  const { focusedIndex, menuItems } = state;
  const menuItemCount = menuItems.length;

  if (action.type === 'SET_MENU_ITEMS') {
    return { ...state, menuItems: action.value };
  }

  if (action.type === 'TOGGLE_MENU') {
    return { ...state, menuOpen: !state.menuOpen, focusedIndex: -1 };
  }

  if (action.type === 'RESET') {
    return { ...state, menuOpen: false, focusedIndex: null };
  }

  if (action.type === 'FOCUS_PREVIOUS_ITEM') {
    // focus the last item if the currently focused item is the first one, otherwise focus the previous item
    const index = focusedIndex === 0 ? menuItemCount - 1 : focusedIndex - 1;
    return { ...state, focusedIndex: index };
  }

  if (action.type === 'FOCUS_NEXT_ITEM') {
    // focus the first item if the currently focused item is the last one, otherwise focus the next item
    const index = focusedIndex === menuItemCount - 1 ? 0 : focusedIndex + 1;
    return { ...state, focusedIndex: index };
  }

  if (action.type === 'FOCUS_FIRST_ITEM') {
    return { ...state, menuOpen: true, focusedIndex: 0 };
  }

  if (action.type === 'FOCUS_LAST_ITEM') {
    return { ...state, menuOpen: true, focusedIndex: state.menuItems.length - 1 };
  }

  if (action.type === 'FOCUS_BY_CHARACTER') {
    const char = action.value.toLowerCase();
    // get start index for search based on current focused index
    const startIndex = menuItemCount === focusedIndex ? 0 : focusedIndex + 1;
    // get the first character of each menu item
    // prettier-ignore
    const firstChars = menuItems.map((item) =>
      item.textContent
        .trim()
        .substring(0, 1)
        .toLowerCase(),
    );
    // look for matches after current index
    const matchAfterCurrentIndex = firstChars.findIndex((item, index) => index >= startIndex && item === char);

    if (matchAfterCurrentIndex > -1) {
      return { ...state, focusedIndex: matchAfterCurrentIndex };
    }

    // look for matches before current index
    const matchBeforeCurrentIndex = firstChars.findIndex((item, index) => index < startIndex && item === char);

    if (matchBeforeCurrentIndex > -1) {
      return { ...state, focusedIndex: matchBeforeCurrentIndex };
    }
  }

  return state;
};

/**
 * Handles toggle button key down events
 * @param event
 * @param dispatch
 */
const handleKeydown = (
  event: React.KeyboardEvent<HTMLButtonElement>,
  dispatch?: React.Dispatch<MenuButtonReducerAction>,
) => {
  const { key } = event;

  if (key === ' ' || key === 'Enter' || key === 'ArrowDown') {
    dispatch({ type: 'FOCUS_FIRST_ITEM' });
  }
  if (key === 'ArrowUp') {
    dispatch({ type: 'FOCUS_LAST_ITEM' });
  }
};

export const MenuButton = ({
  buttonAriaLabel,
  children,
  className,
  icon,
  id = uniqueId('hds-menu-button-'),
  label,
  menuOffset,
}: MenuButtonProps) => {
  const [ref, menuContainerSize] = useMeasure({ debounce: 0, scroll: false });
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;

  // init reducer
  const [state, dispatch] = useReducer(reducer, {
    menuItems: [],
    menuOpen: false,
    focusedIndex: null,
  });
  const { menuOpen } = state;

  useEffect(() => {
    // closes the menu when a user clicks outside the container element
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuOpen && !containerRef.current.contains(e.target as Node)) {
        dispatch({ type: 'RESET' });
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [menuOpen]);

  return (
    <MenuButtonContext.Provider value={{ state, dispatch }}>
      <div ref={mergeRefs<HTMLDivElement>([ref, containerRef])} className={classNames(styles.menuButton, className)}>
        <button
          type="button"
          ref={buttonRef}
          id={buttonId}
          className={styles.toggleButton}
          aria-label={buttonAriaLabel}
          aria-haspopup="menu"
          aria-controls={menuId}
          {...(menuOpen && { 'aria-expanded': true })}
          onMouseUp={() => dispatch({ type: 'TOGGLE_MENU' })}
          onKeyDown={(e) => (menuOpen ? dispatch({ type: 'TOGGLE_MENU' }) : handleKeydown(e, dispatch))}
        >
          {icon}
          <span className={styles.toggleButtonLabel}>{label}</span>
          {menuOpen ? <IconAngleUp /> : <IconAngleDown />}
        </button>
        <Menu
          id={menuId}
          aria-labelledby={buttonId}
          menuButtonRef={buttonRef}
          menuContainerSize={menuContainerSize}
          menuOffset={menuOffset}
        >
          {children}
        </Menu>
      </div>
    </MenuButtonContext.Provider>
  );
};
