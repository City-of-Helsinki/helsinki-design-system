import React, { cloneElement, isValidElement, useContext } from 'react';

import styles from './MenuItem.module.scss';
import { MenuButtonContext } from '../MenuButtonContext';

type MenuItemProps = React.PropsWithChildren<{}>;

export const MenuItem = ({ children }: MenuItemProps) => {
  const { dispatch } = useContext(MenuButtonContext);
  // add classnames to children
  const childWithAttributes = React.Children.map(children, (child) =>
    isValidElement(child)
      ? cloneElement(child, {
          role: 'menuitem',
          className: `${styles.item} ${child.props.className || ''}`,
          // close menu when an item is clicked
          onMouseUp: () => dispatch({ type: 'TOGGLE_MENU' }),
          tabIndex: -1,
        })
      : child,
  );
  return (
    <li role="none" className={styles.menuItem}>
      {childWithAttributes}
    </li>
  );
};
