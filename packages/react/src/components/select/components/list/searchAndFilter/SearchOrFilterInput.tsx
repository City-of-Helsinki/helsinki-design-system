import React from 'react';

import styles from '../../../Select.module.scss';
import { TextInput, TextInputProps } from '../../../../textInput/TextInput';
import { SelectDataHandlers, SelectMetaData, TextKey } from '../../../types';
import classNames from '../../../../../utils/classNames';
import { createInputOnChangeListener, getVisibleGroupLabels } from '../../../utils';
import { eventIds } from '../../../events';
import { useSelectDataHandlers } from '../../../hooks/useSelectDataHandlers';
import { getTextKey } from '../../../texts';

const typeIndicator = '{{type}}';

const getTextKeyWithType = (key: string, isSearchInput): TextKey => {
  const inputType = isSearchInput ? 'search' : 'filter';
  return key.replace(typeIndicator, inputType) as TextKey;
};

const createFilterInputProps = (
  { getMetaData, trigger, getData }: SelectDataHandlers,
  inputType: Exclude<SelectMetaData['listInputType'], undefined>,
): TextInputProps => {
  const metaData = getMetaData();
  const { filter, elementIds, refs, search } = metaData;
  const { multiSelect, groups } = getData();
  const hasVisibleGroupLabels = getVisibleGroupLabels(groups).length > 0;
  const isSearchInput = inputType === 'search';
  const value = isSearchInput ? search : filter;
  const label = getTextKey(getTextKeyWithType(`${typeIndicator}ClearButtonAriaLabel`, isSearchInput), metaData);
  const clearButtonAriaLabel = getTextKey(getTextKeyWithType(`${typeIndicator}Label`, isSearchInput), metaData);
  const placeholder = getTextKey(getTextKeyWithType(`${typeIndicator}Placeholder`, isSearchInput), metaData);

  return {
    className: classNames(styles.searchOrFilterInput),
    ...createInputOnChangeListener({ id: eventIds[inputType], trigger }),
    onButtonClick: (e) => {
      e.preventDefault();
    },
    id: elementIds.searchOrFilterInput,
    key: elementIds.searchOrFilterInput,
    clearButton: true,
    clearButtonAriaLabel,
    label,
    value,
    placeholder,
    ref: refs.searchOrFilterInput,
    'aria-controls': elementIds.list,
    'aria-expanded': true,
    'aria-labelledby': `${elementIds.searchOrFilterInputLabel} ${elementIds.label}`,
    'aria-haspopup': multiSelect && hasVisibleGroupLabels ? 'dialog' : 'listbox',
    role: 'combobox',
    labelId: elementIds.searchOrFilterInputLabel,
  };
};

export function SearchOrFilterInput() {
  const dataHandlers = useSelectDataHandlers();
  const { getMetaData } = dataHandlers;
  const { listInputType } = getMetaData();
  if (!listInputType) {
    return null;
  }
  const inputProps = createFilterInputProps(dataHandlers, listInputType);
  return <TextInput {...inputProps} />;
}
