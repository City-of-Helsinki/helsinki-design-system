import React, { MouseEventHandler } from 'react';

import styles from '../Select.module.scss';
import { TextInput } from '../../textInput/TextInput';
import { DefaultGroupElementProps, PropSetter } from '../../group/utils';
import { IconSearch } from '../../../icons';
import { InputElementProps, SelectData } from '..';
import classNames from '../../../utils/classNames';
import { createInputOnChangeListener } from '../../group/utils/propSetterHelpers';

export const searchInputPropSetter: PropSetter<InputElementProps> = (props) => {
  const { controller } = props;
  const data = controller.getData() as SelectData;
  return {
    className: classNames(styles.filterInput),
    children: data.label,
    ...createInputOnChangeListener(props),
    onButtonClick: () => {
      console.log('--->btn');
    },
    value: controller.getMetaData().search,
  };
};

export function SearchInput(props: DefaultGroupElementProps) {
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
