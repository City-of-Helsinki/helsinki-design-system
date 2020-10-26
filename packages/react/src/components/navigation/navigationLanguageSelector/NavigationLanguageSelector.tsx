import React from 'react';

import styles from './NavigationLanguageSelector.module.scss';
import { NavigationDropdown } from '../navigationDropdown/NavigationDropdown';
import { MenuButtonProps } from '../../../internal/menuButton/MenuButton';

export const NavigationLanguageSelector = ({ children, id = 'languageSelector', label, ...rest }: MenuButtonProps) => (
  <NavigationDropdown className={styles.languageDropdown} id={id} label={label} menuOffset={10} {...rest}>
    {children}
  </NavigationDropdown>
);
NavigationLanguageSelector.componentName = 'NavigationLanguageSelector';
