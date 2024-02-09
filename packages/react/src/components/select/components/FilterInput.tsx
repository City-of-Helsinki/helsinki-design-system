import React, { MouseEventHandler } from 'react';

import { TextInput, TextInputProps } from '../../textInput/TextInput';
import { PropSetter } from '../../group/utils';
import { IconSearch } from '../../../icons';
import styles from '../Select.module.scss';
import { InputElementProps } from '..';
import classNames from '../../../utils/classNames';
import { createInputOnChangeListener } from '../../group/utils/propSetterHelpers';
import { getMetaDataFromController, getSelectDataFromController } from '../utils';

export const filterInputPropSetter: PropSetter<InputElementProps> = (props) => {
  const { controller } = props;
  const { label } = getSelectDataFromController(controller);
  const { filter } = getMetaDataFromController(controller);
  return {
    className: classNames(styles.filterInput),
    children: label,
    ...createInputOnChangeListener(props),
    onButtonClick: () => {
      console.log('--->btn');
    },
    value: filter,
  };
};

export function FilterInput(props: Partial<TextInputProps>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, onButtonClick, ...rest } = props;
  return (
    <TextInput
      id="ccc"
      buttonAriaLabel="Search for ...inputValue"
      buttonIcon={<IconSearch />}
      clearButtonAriaLabel="Clear search"
      label="Filter options"
      onButtonClick={onButtonClick as MouseEventHandler<HTMLButtonElement>}
      key="keepme"
      {...rest}
    />
  );
}

/*
Object.defineProperty(FilterInput, 'HDSForwardController', {
  value: true,
});

(FilterInput as React.FC & { groupId: string }).groupId = 'TEST';

*/
