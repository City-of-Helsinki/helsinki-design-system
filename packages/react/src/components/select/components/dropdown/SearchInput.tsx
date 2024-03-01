import React from 'react';

import styles from '../../Select.module.scss';
import { TextInput, TextInputProps } from '../../../textInput/TextInput';
import { IconSearch } from '../../../../icons';
import { SelectDataHandlers, SelectMetaData } from '../../types';
import classNames from '../../../../utils/classNames';
import { createInputOnChangeListener } from '../../utils';
import { eventIds } from '../../events';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';

const createSearchInputProps = ({ getMetaData, trigger }: SelectDataHandlers): TextInputProps => {
  const { search, elementIds, refs } = getMetaData() as SelectMetaData;
  return {
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

export function SearchInput() {
  const dataHandlers = useSelectDataHandlers();
  if (!dataHandlers.getData().showSearch) {
    return null;
  }
  const inputProps = createSearchInputProps(dataHandlers);
  return <TextInput {...inputProps} />;
}
