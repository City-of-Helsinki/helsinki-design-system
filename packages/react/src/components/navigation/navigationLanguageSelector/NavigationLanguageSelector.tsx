import React from 'react';

import styles from './NavigationLanguageSelector.module.scss';
import { MenuButton, MenuButtonProps } from '../../../internal/menuButton/MenuButton';

export const NavigationLanguageSelector = ({ children, id = 'languageSelector', label, ...rest }: MenuButtonProps) => (
  <MenuButton className={styles.languageDropdown} id={id} label={label} menuOffset={10} {...rest} closeOnItemClick>
    {children}
  </MenuButton>
);
NavigationLanguageSelector.componentName = 'NavigationLanguageSelector';
