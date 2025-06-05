import React from 'react';

import styles from './SearchInput.module.scss';
import classNames from '../../../../utils/classNames';
import { TextInput, TextInputProps } from '../../../textInput/TextInput';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { eventIds, eventTypes } from '../../events';

export const SearchInput = (props: TextInputProps) => {
  const classes = classNames(styles.searchInput, props.className);
  const dataHandlers = useSelectDataHandlers();
  const { getMetaData, trigger } = dataHandlers;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    trigger({
      id: eventIds.search,
      type: eventTypes.change,
      payload: {
        value: event.target.value,
        originalEvent: event,
      },
    });
  };

  return (
    <TextInput
      {...props}
      className={classes}
      id="test"
      placeholder="Search..."
      aria-label="Search"
      onChange={handleChange}
      value={getMetaData().search}
    />
  );
};
