import React from 'react';

import styles from './NavigationLanguageSelector.module.scss';
import { MenuButton, MenuButtonProps } from '../../../internal/menuButton/MenuButton';

export const NavigationLanguageSelector = ({ children, id = 'languageSelector', label, ...rest }: MenuButtonProps) => {
  React.useEffect(() => {
    React.Children.forEach(children, (child:React.ReactElement) => {
      if (!child.props.lang) {
        console.warn(`NavigationLanguageSelector item "${child.props.label}" is missing a lang property.`);
      }
    });
  });

  return (
    <MenuButton className={styles.languageDropdown} id={id} label={label} menuOffset={10} {...rest} closeOnItemClick>
      {children}
    </MenuButton>
  );
};
NavigationLanguageSelector.componentName = 'NavigationLanguageSelector';
