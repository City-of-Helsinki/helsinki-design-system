import React from 'react';

import styles from './SearchInput.module.scss';
import classNames from '../../../../utils/classNames';
import { TextInput, TextInputProps } from '../../../textInput/TextInput';

export const SearchInput = (props: TextInputProps) => {
  const classes = classNames(styles.searchInput, props.className);
  return <TextInput {...props} className={classes} id="test" placeholder="Search..." aria-label="Search" clearButton />;
};
