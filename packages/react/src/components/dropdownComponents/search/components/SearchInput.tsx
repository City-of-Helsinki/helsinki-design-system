import React from 'react';

import classNames from '../../../../utils/classNames';
import { TextInput, TextInputProps } from '../../../textInput/TextInput';
import { useSearchDataHandlers } from '../hooks/useSearchDataHandlers';
import { eventIds } from '../events';
import { getTextKey } from '../texts';
import { createInputOnChangeListener } from '../utils';

export const SearchInput = (props: Partial<TextInputProps>) => {
  const classes = classNames(props.className || '');
  const dataHandlers = useSearchDataHandlers();
  const { getMetaData, trigger } = dataHandlers;
  const metaData = getMetaData();

  const placeholder = getTextKey('searchPlaceholder', metaData) || 'Type to search...';
  const clearButtonAriaLabel = getTextKey('searchClearButtonAriaLabel', metaData) || 'Clear search';
  const handleChange = createInputOnChangeListener({ id: eventIds.search, trigger });

  return (
    <TextInput
      {...props}
      {...handleChange}
      className={classes}
      ref={metaData.refs.searchInput}
      id={metaData.elementIds.searchInput}
      placeholder={placeholder}
      aria-label={getTextKey('searchLabel', metaData) || 'Search'}
      value={metaData.search}
      clearButton
      clearButtonAriaLabel={clearButtonAriaLabel}
    />
  );
};
