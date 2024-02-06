import React, { MouseEventHandler } from 'react';

import { TextInput } from '../../textInput/TextInput';
import { DefaultGroupElementProps, PropSetter } from '../../group/utils';
import { IconSearch } from '../../../icons';
import styles from '../Select.module.scss';
import { InputElementProps, SelectData } from '..';
import classNames from '../../../utils/classNames';
import { createInputOnChangeListener } from '../../group/utils/propSetterHelpers';

export const filterInputPropSetter: PropSetter<InputElementProps> = (props) => {
  const { controller } = props;
  const data = controller.getData() as SelectData;
  return {
    className: classNames(styles.filterInput),
    children: data.label,
    ...createInputOnChangeListener(props),
    onButtonClick: () => {
      console.log('--->btn');
    },
    value: controller.getMetaData().filter,
  };
};

export function FilterInput(props: DefaultGroupElementProps) {
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
