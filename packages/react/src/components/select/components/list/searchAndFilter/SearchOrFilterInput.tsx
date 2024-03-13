import React from 'react';

import styles from '../../../Select.module.scss';
import { TextInput, TextInputProps } from '../../../../textInput/TextInput';
import { IconSearch } from '../../../../../icons';
import { SelectDataHandlers } from '../../../types';
import classNames from '../../../../../utils/classNames';
import { createInputOnChangeListener } from '../../../utils';
import { EventId, eventIds } from '../../../events';
import { useSelectDataHandlers } from '../../../hooks/useSelectDataHandlers';

type InputType = Extract<EventId, 'filter' | 'search'>;

const createFilterInputProps = ({ getMetaData, trigger }: SelectDataHandlers, inputType: InputType): TextInputProps => {
  const { filter, elementIds, refs, search, activeDescendant } = getMetaData();
  const isSearchInput = inputType === 'search';
  const value = isSearchInput ? search : filter;
  return {
    className: classNames(styles.searchOrFilterInput),
    ...createInputOnChangeListener({ id: eventIds[inputType], trigger }),
    onButtonClick: (e) => {
      e.preventDefault();
    },
    id: elementIds.searchOrFilterInput,
    key: elementIds.searchOrFilterInput,
    buttonAriaLabel: isSearchInput ? `Search for "${value}"` : `Filter options with "${value}"`,
    buttonIcon: <IconSearch />,
    clearButtonAriaLabel: `Clear ${inputType}`,
    label: inputType,
    value,
    placeholder: isSearchInput ? 'Search ' : 'Filter',
    ref: refs.searchOrFilterInput,
    hideLabel: true,
    'aria-controls': elementIds.list,
    'aria-expanded': true,
    'aria-activedescendant': activeDescendant || '',
    'aria-labelledby': `${elementIds.searchOrFilterInputLabel} ${elementIds.label}`,
    'aria-haspopup': 'true',
    role: 'combobox',
    labelId: elementIds.searchOrFilterInputLabel,
  };
};

export function SearchOrFilterInput() {
  const dataHandlers = useSelectDataHandlers();
  const { getData } = dataHandlers;
  const { showFiltering, showSearch } = getData();
  if (!showFiltering && !showSearch) {
    return null;
  }
  const inputType: InputType = showFiltering ? 'filter' : 'search';
  const inputProps = createFilterInputProps(dataHandlers, inputType);
  return <TextInput {...inputProps} />;
}
