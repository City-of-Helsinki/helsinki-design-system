import React, { useEffect, useReducer, useRef } from 'react';
// import core base styles
import 'hds-core';
import uniqueId from 'lodash.uniqueid';

import styles from './MenuButton.module.scss';
import { Button } from '../../components/button';
import { Menu } from './menu/Menu';
import { MenuButtonContext } from './MenuButtonContext';
import { MenuButtonReducerAction, MenuButtonReducerState } from './MenuButton.interface';
import { IconAngleDown, IconAngleUp } from '../../icons';

export type MenuButtonProps = React.PropsWithChildren<{ id?: string }>;

/**
 * MenuButton reducer
 * @param {ReducerState} state
 * @param {ReducerAction} action
 */
const reducer = (state: MenuButtonReducerState, action: MenuButtonReducerAction): MenuButtonReducerState => {
  console.log('state', state);
  console.log('action', action);

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

export const MenuButton = ({ children, id = uniqueId('hds-menu-button-') }: MenuButtonProps) => {
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
      <div ref={containerRef} className={styles.menuButton}>
        <Button
          ref={buttonRef}
          id={buttonId}
          iconRight={menuOpen ? <IconAngleUp /> : <IconAngleDown />}
          aria-haspopup="menu"
          aria-controls={menuId}
          {...(menuOpen && { 'aria-expanded': true })}
          onMouseUp={() => {
            console.log('onMouseUp');
            dispatch({ type: 'TOGGLE_MENU' });
          }}
          onKeyDown={(e) => {
            console.log('onKeyDown');
            menuOpen ? dispatch({ type: 'TOGGLE_MENU' }) : handleKeydown(e, dispatch);
          }}
        >
          {/* todo: label */}
          WAI-ARIA Quick LinksMenuButton
        </Button>
        <Menu id={menuId} aria-labelledby={buttonId} menuButtonRef={buttonRef}>
          {children}
        </Menu>
      </div>
    </MenuButtonContext.Provider>
  );
};
