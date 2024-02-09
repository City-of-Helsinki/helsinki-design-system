import React, { MouseEventHandler } from 'react';

import styles from '../Select.module.scss';
import { TextInput, TextInputProps } from '../../textInput/TextInput';
import { PropSetter } from '../../group/utils';
import { IconSearch } from '../../../icons';
import { InputElementProps } from '..';
import classNames from '../../../utils/classNames';
import { createInputOnChangeListener } from '../../group/utils/propSetterHelpers';
import { getSelectDataFromController, getMetaDataFromController } from '../utils';

export const searchInputPropSetter: PropSetter<InputElementProps> = (props) => {
  const { controller } = props;
  const { label } = getSelectDataFromController(controller);
  const { search } = getMetaDataFromController(controller);
  return {
    className: classNames(styles.filterInput),
    children: label,
    ...createInputOnChangeListener(props),
    onButtonClick: () => {
      console.log('--->btn');
    },
    value: search,
  };
};

export function SearchInput(props: Partial<TextInputProps>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, onButtonClick, ...rest } = props;
  return (
    <TextInput
      id="ccc"
      buttonAriaLabel="Search for ...inputValue"
      buttonIcon={<IconSearch />}
      clearButtonAriaLabel="Clear search"
      label="Search options"
      onButtonClick={onButtonClick as MouseEventHandler<HTMLButtonElement>}
      key="keepme"
      {...rest}
    />
  );
}
