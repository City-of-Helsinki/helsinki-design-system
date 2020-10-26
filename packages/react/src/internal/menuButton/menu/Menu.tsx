import React, { useContext, useEffect, useRef, useState } from 'react';
import { RectReadOnly } from 'react-use-measure';

import classNames from '../../../utils/classNames';
import styles from './Menu.module.scss';
import { MenuItem } from '../menuItem/MenuItem';
import { MenuButtonContext } from '../MenuButtonContext';
import { MenuButtonReducerAction } from '../MenuButton.interface';

type MenuStyles = {
  top?: number;
  minWidth?: string | number;
};

type MenuProps = React.ComponentPropsWithoutRef<'ul'> & {
  menuButtonRef: React.MutableRefObject<HTMLButtonElement>;
  menuContainerSize: RectReadOnly;
  menuOffset?: number;
};

const MENU_MIN_WIDTH = 190;

const isPrintableCharacter = (str): boolean => str.length === 1 && str.match(/\S/);

const handleKeydown = (
  event: React.KeyboardEvent<HTMLUListElement>,
  dispatch?: React.Dispatch<MenuButtonReducerAction>,
) => {
  const { altKey, ctrlKey, key, metaKey } = event;

  if (ctrlKey || altKey || metaKey || key === ' ') {
    return;
  }

  if (['ArrowUp', 'ArrowDown', 'Home', 'PageUp', 'End', 'PageDown'].includes(key)) {
    // prevent the default page scrolling behaviour
    event.preventDefault();
  }

  switch (key) {
    case 'Tab':
      dispatch({ type: 'RESET' });
      break;

    case 'Escape':
    case 'Enter':
      dispatch({ type: 'TOGGLE_MENU' });
      break;

    case 'ArrowUp':
      dispatch({ type: 'FOCUS_PREVIOUS_ITEM' });
      break;

    case 'ArrowDown':
      dispatch({ type: 'FOCUS_NEXT_ITEM' });
      break;

    case 'Home':
    case 'PageUp':
      dispatch({ type: 'FOCUS_FIRST_ITEM' });
      break;

    case 'End':
    case 'PageDown':
      dispatch({ type: 'FOCUS_LAST_ITEM' });
      break;

    default:
      if (isPrintableCharacter(key)) {
        dispatch({ type: 'FOCUS_BY_CHARACTER', value: key });
      }
      break;
  }
};

export const Menu = ({ children, menuButtonRef, menuContainerSize, menuOffset = 0, ...rest }: MenuProps) => {
  const {
    state: { focusedIndex, menuItems, menuOpen },
    dispatch,
  } = useContext(MenuButtonContext);
  const menuRef = useRef<HTMLUListElement>(null);
  const [menuStyles, setMenuStyles] = useState<MenuStyles>({});

  // get the container height
  useEffect(() => {
    const { height = 0, width = 0 } = menuContainerSize;
    // the menu width should be at least 190px
    const minWidth = MENU_MIN_WIDTH >= width ? MENU_MIN_WIDTH : width;
    setMenuStyles({ top: height + menuOffset, minWidth });
  }, [menuContainerSize, menuOffset]);

  // get the menu items
  useEffect(() => {
    const menuEl = menuRef.current;
    const value = [...menuEl.childNodes]?.map((child) => child.firstChild as HTMLElement);
    dispatch({ type: 'SET_MENU_ITEMS', value });
  }, [dispatch]);

  // handle menu item focus
  useEffect(() => {
    // focus menu item if index is a number with a value of 0 or more
    if (menuItems && menuOpen && Number.isInteger(focusedIndex) && focusedIndex >= 0) {
      menuItems[focusedIndex].focus();
      // focus menu button if index is -1
    } else if (focusedIndex === -1) {
      menuButtonRef.current.focus();
    }
  }, [menuButtonRef, menuItems, menuOpen, focusedIndex]);

  return (
    <ul
      ref={menuRef}
      role="menu"
      tabIndex={-1}
      className={classNames(styles.menu, menuOpen && styles.open)}
      onKeyDown={(e) => handleKeydown(e, dispatch)}
      style={menuStyles}
      {...rest}
    >
      {React.Children.toArray(children).map((child: React.ReactElement) => (
        <MenuItem key={child.key}>{child}</MenuItem>
      ))}
    </ul>
  );
};
