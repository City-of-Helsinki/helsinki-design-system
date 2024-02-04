import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { SelectData } from '.';
import classNames from '../../utils/classNames';
import { PropSetter } from '../group/utils';
import styles from './components/styles.module.scss';
import { UlElementProps } from './components/OptionsList';
import { createInputOnChangeListener } from '../group/utils/propSetterHelpers';

export type InputElementProps = DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, never>;

export const filterInputPropSetter: PropSetter<InputElementProps> = (props) => {
  const { controller } = props;
  const data = controller.getData() as SelectData;
  const isOpen = data.open;
  return {
    className: classNames(styles.filterInput, isOpen && styles.filterInputVisible),
    children: data.label,
    ...createInputOnChangeListener(props),
    onButtonClick: () => {
      console.log('--->btn');
    },
    value: controller.getMetaData().filter,
  };
};

export const listAndInputContainerPropSetter: PropSetter<UlElementProps> = ({ controller }) => {
  const data = controller.getData() as SelectData;
  const isOpen = data.open;
  return {
    className: classNames(styles.listAndInputContainer, isOpen && styles.listAndInputContainerVisible),
  };
};
