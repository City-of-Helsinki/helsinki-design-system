import React from 'react';

import styles from '../../Select.module.scss';
import { TextInput, TextInputProps } from '../../../textInput/TextInput';
import { IconSearch } from '../../../../icons';
import { SelectDataHandlers } from '../../types';
import classNames from '../../../../utils/classNames';
import { createInputOnChangeListener } from '../../utils';
import { eventIds } from '../../events';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';

const createFilterInputProps = ({ getMetaData, trigger }: SelectDataHandlers): TextInputProps => {
  const { filter, elementIds, refs } = getMetaData();
  return {
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

export function FilterInput() {
  const dataHandlers = useSelectDataHandlers();
  if (!dataHandlers.getData().showFiltering) {
    return null;
  }
  const inputProps = createFilterInputProps(dataHandlers);
  return <TextInput {...inputProps} />;
}
