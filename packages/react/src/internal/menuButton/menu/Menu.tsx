import React, { cloneElement, isValidElement, useEffect, useRef, useState } from 'react';
import { RectReadOnly } from 'react-use-measure';

import classNames from '../../../utils/classNames';
import styles from './Menu.module.scss';

type MenuStyles = {
  top?: number;
  minWidth?: number;
};

type MenuProps = React.ComponentPropsWithoutRef<'div'> & {
  menuContainerSize: RectReadOnly;
  menuOffset?: number;
  menuOpen: boolean;
};

const MENU_MIN_WIDTH = 190;

export const Menu = ({ children, menuContainerSize, menuOffset = 0, menuOpen, ...rest }: MenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuStyles, setMenuStyles] = useState<MenuStyles>({});

  // get the container height
  useEffect(() => {
    const { height = 0, width = 0 } = menuContainerSize;
    // the menu width should be at least 190px
    const minWidth = MENU_MIN_WIDTH >= width ? MENU_MIN_WIDTH : width;
    setMenuStyles({ top: height + menuOffset, minWidth });
  }, [menuContainerSize, menuOffset]);

  return (
    <div
      ref={menuRef}
      role="region"
      className={classNames(styles.menu, menuOpen && styles.open)}
      style={menuStyles}
      {...rest}
    >
      {React.Children.toArray(children).map((child) => {
        return isValidElement(child)
          ? cloneElement(child, {
              // add class name(s) to child
              className: `${styles.item} ${child.props.className || ''}`,
            })
          : child;
      })}
    </div>
  );
};
