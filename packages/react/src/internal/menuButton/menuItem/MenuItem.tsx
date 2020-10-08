import React, { cloneElement, isValidElement } from 'react';

import styles from './MenuItem.module.scss';

type MenuItemProps = React.PropsWithChildren<{
  // open?: boolean;
}>;

export const MenuItem = ({ children }: MenuItemProps) => {
  // add classnames to children
  const childWithAttributes = React.Children.map(children, (child) =>
    isValidElement(child) ? cloneElement(child, { role: 'menuitem', className: styles.item, tabIndex: -1 }) : child,
  );
  return (
    <li role="none" className={styles.menuItem}>
      {childWithAttributes}
    </li>
  );
};
