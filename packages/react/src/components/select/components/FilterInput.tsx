import React from 'react';

import styles from '../Select.module.scss';
import { TextInput, TextInputProps } from '../../textInput/TextInput';
import { IconSearch } from '../../../icons';
import { SelectMetaData } from '../index';
import classNames from '../../../utils/classNames';
import { createInputOnChangeListener } from '../utils';
import { useChangeTrigger, useContextTools } from '../../dataContext/hooks';

export const filterInputPropSetter = (props: Partial<TextInputProps>): TextInputProps => {
  const { getMetaData } = useContextTools();
  const trigger = useChangeTrigger();
  const { filter } = getMetaData() as SelectMetaData;
  return {
    ...props,
    className: classNames(styles.filterInput),
    ...createInputOnChangeListener({ id: 'filter', trigger }),
    onButtonClick: () => {
      console.log('--->btn');
    },
    id: 'ccc',
    buttonAriaLabel: 'Search for ...inputValue',
    buttonIcon: <IconSearch />,
    clearButtonAriaLabel: 'Clear search',
    label: 'Filter options',
    key: 'keepme',
    value: filter,
  };
};

export function FilterInput(props: Partial<TextInputProps>) {
  const inputProps = filterInputPropSetter(props);
  return <TextInput {...inputProps} />;
}
