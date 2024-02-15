import React from 'react';

import styles from '../Select.module.scss';
import { TextInput, TextInputProps } from '../../textInput/TextInput';
import { IconSearch } from '../../../icons';
import { SelectMetaData } from '../types';
import classNames from '../../../utils/classNames';
import { createInputOnChangeListener } from '../utils';
import { useChangeTrigger, useContextTools } from '../../dataContext/hooks';
import { eventIds } from '../events';

export const searchInputPropSetter = (props: Partial<TextInputProps>): TextInputProps => {
  const { getMetaData } = useContextTools();
  const trigger = useChangeTrigger();
  const { search } = getMetaData() as SelectMetaData;
  return {
    ...props,
    className: classNames(styles.filterInput),
    ...createInputOnChangeListener({ id: eventIds.search, trigger }),
    onButtonClick: () => {
      console.log('--->btn');
    },
    id: 'ccc',
    buttonAriaLabel: 'Search for ...inputValue',
    buttonIcon: <IconSearch />,
    clearButtonAriaLabel: 'Clear search',
    label: 'Search options',
    key: 'keepme',
    value: search,
  };
};

export function SearchInput(props: Partial<TextInputProps>) {
  const inputProps = searchInputPropSetter(props);
  return <TextInput {...inputProps} />;
}
