import React from 'react';

import classes from './HeaderActionBarItem.module.scss';
import { HeaderActionBarSubItem, HeaderActionBarSubItemProps } from '../headerActionBarSubItem';

export const HeaderActionBarSubItemGroup = ({ children, ref, ...rest }: HeaderActionBarSubItemProps) => {
  return (
    <li className={classes.dropdownSubItem}>
      <HeaderActionBarSubItem ref={ref} {...rest} isHeading />
      <ul>{children}</ul>
    </li>
  );
};
