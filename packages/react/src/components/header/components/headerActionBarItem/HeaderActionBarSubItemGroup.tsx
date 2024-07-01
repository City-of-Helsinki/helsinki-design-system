import React, { forwardRef } from 'react';

import classes from './HeaderActionBarItem.module.scss';
import { HeaderActionBarSubItem, HeaderActionBarSubItemProps } from '../headerActionBarSubItem';

export const HeaderActionBarSubItemGroup = forwardRef<HTMLButtonElement, HeaderActionBarSubItemProps>(
  ({ children, ...rest }, ref) => {
    return (
      <li className={classes.dropdownSubItem}>
        <HeaderActionBarSubItem ref={ref} {...rest} isHeading />
        <ul>{children}</ul>
      </li>
    );
  },
);
