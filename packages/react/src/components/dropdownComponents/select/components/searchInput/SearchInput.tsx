import React from 'react';

import styles from './SearchInput.module.scss';
import classNames from '../../../../../utils/classNames';
import { TextInput, TextInputProps } from '../../../../textInput/TextInput';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { eventIds } from '../../events';
import { getTextKey } from '../../texts';
import { getTextKeyWithType, typeIndicator } from '../searchAndFilter/common';
import { createInputOnChangeListener } from '../../utils';

export const SearchInput = (props: TextInputProps) => {
  const classes = classNames(styles.searchInput, props.className);
  const dataHandlers = useSelectDataHandlers();
  const { getMetaData, trigger } = dataHandlers;
  const metaData = getMetaData();

  const placeholder = getTextKey(getTextKeyWithType(`${typeIndicator}Placeholder`, true), metaData);
  const clearButtonAriaLabel = getTextKey(getTextKeyWithType(`${typeIndicator}ClearButtonAriaLabel`, true), metaData);
  const handleChange = createInputOnChangeListener({ id: eventIds.search, trigger });

  return (
    <TextInput
      {...props}
      {...handleChange}
      className={classes}
      id="test"
      placeholder={placeholder}
      aria-label="Search"
      value={metaData.search}
      clearButton
      clearButtonAriaLabel={clearButtonAriaLabel}
    />
  );
};
