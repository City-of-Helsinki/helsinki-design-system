import React from 'react';

import styles from '../Select.module.scss';
import { TextInput, TextInputProps } from '../../textInput/TextInput';
import { IconSearch } from '../../../icons';
import { SelectMetaData } from '../types';
import classNames from '../../../utils/classNames';
import { createInputOnChangeListener } from '../utils';
import { useChangeTrigger, useContextTools } from '../../dataContext/hooks';

export const filterEventId = 'filter';

export const filterInputPropSetter = (props: Partial<TextInputProps>): TextInputProps => {
  const { getMetaData } = useContextTools();
  const trigger = useChangeTrigger();
  const { filter } = getMetaData() as SelectMetaData;
  return {
    ...props,
    className: classNames(styles.filterInput),
    ...createInputOnChangeListener({ id: filterEventId, trigger }),
    onButtonClick: () => {
      console.log('--->btn');
    },
    id: 'ccc',
    buttonAriaLabel: 'Search for ...inputValue',
    buttonIcon: <IconSearch />,
    clearButtonAriaLabel: 'Clear search',
    label: '',
    key: 'keepme',
    value: filter,
    placeholder: 'Filter',
  };
};

export function FilterInput(props: Partial<TextInputProps>) {
  const inputProps = filterInputPropSetter(props);
  return <TextInput {...inputProps} />;
}
