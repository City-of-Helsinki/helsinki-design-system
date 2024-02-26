import React from 'react';

import styles from '../Select.module.scss';
import { TextInput, TextInputProps } from '../../textInput/TextInput';
import { IconSearch } from '../../../icons';
import { SelectDataHandlers, SelectMetaData } from '../types';
import classNames from '../../../utils/classNames';
import { createInputOnChangeListener } from '../utils';
import { eventIds } from '../events';
import { useSelectDataHandlers } from '../typedHooks';

const createSearchInputProps = (
  props: Partial<TextInputProps>,
  { getMetaData, trigger }: SelectDataHandlers,
): TextInputProps => {
  const { search, elementIds, refs } = getMetaData() as SelectMetaData;
  return {
    ...props,
    className: classNames(styles.filterOrSearchInput),
    ...createInputOnChangeListener({ id: eventIds.search, trigger }),
    onButtonClick: (e) => {
      e.preventDefault();
    },
    id: elementIds.searchOrFilterInput,
    key: elementIds.searchOrFilterInput,
    buttonAriaLabel: 'Search for ...inputValue',
    buttonIcon: <IconSearch />,
    clearButtonAriaLabel: 'Clear search',
    placeholder: 'Search options',
    label: '',
    value: search,
    ref: refs.filterOrSearchInput,
  };
};

export function SearchInput(props: Partial<TextInputProps>) {
  const inputProps = createSearchInputProps(props, useSelectDataHandlers());
  return <TextInput {...inputProps} />;
}
