import React from 'react';

export type MenuButtonContextProps = {
  /**
   * todo
   */
  state?: MenuButtonReducerState;
  /**
   * Dispatch method that is passed down to children
   */
  dispatch?: React.Dispatch<MenuButtonReducerAction>;
};

export type MenuButtonReducerState = {
  /**
   * List of menu item elements
   */
  menuItems?: HTMLElement[];
  /**
   * Flag for whether the menu is open
   */
  menuOpen?: boolean;
  /**
   * Menu item index to set focus on
   */
  focusedIndex?: number | null;
};

export type MenuButtonReducerAction =
  | { type: 'FOCUS_BY_CHARACTER'; value: string }
  | { type: 'FOCUS_FIRST_ITEM' }
  | { type: 'FOCUS_LAST_ITEM' }
  | { type: 'FOCUS_NEXT_ITEM' }
  | { type: 'FOCUS_PREVIOUS_ITEM' }
  | { type: 'RESET' }
  | { type: 'SET_MENU_ITEMS'; value: HTMLElement[] }
  | { type: 'TOGGLE_MENU' };
