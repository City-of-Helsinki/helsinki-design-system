import React from 'react';

import styles from '../Select.module.scss';
import { TextInput, TextInputProps } from '../../textInput/TextInput';
import { IconSearch } from '../../../icons';
import { SelectDataHandlers } from '../types';
import classNames from '../../../utils/classNames';
import { createInputOnChangeListener } from '../utils';
import { eventIds } from '../events';
import { useSelectDataHandlers } from '../typedHooks';

const createFilterInputProps = (
  props: Partial<TextInputProps>,
  { getMetaData, trigger }: SelectDataHandlers,
): TextInputProps => {
  const { filter, elementIds, refs } = getMetaData();
  return {
    ...props,
    className: classNames(styles.filterOrSearchInput),
    ...createInputOnChangeListener({ id: eventIds.filter, trigger }),
    onButtonClick: (e) => {
      e.preventDefault();
    },
    id: elementIds.searchOrFilterInput,
    key: elementIds.searchOrFilterInput,
    buttonAriaLabel: 'Search for ...inputValue',
    buttonIcon: <IconSearch />,
    clearButtonAriaLabel: 'Clear search',
    label: '',
    value: filter,
    placeholder: 'Filter',
    ref: refs.filterOrSearchInput,
  };
};

export function FilterInput(props: Partial<TextInputProps>) {
  const inputProps = createFilterInputProps(props, useSelectDataHandlers());
  return <TextInput {...inputProps} />;
}
