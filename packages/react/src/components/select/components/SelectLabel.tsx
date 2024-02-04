import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import styles from './styles.module.scss';
import classNames from '../../../utils/classNames';
import { PropSetter } from '../../group/utils';
import { getSelectDataFromController } from '../utils';

export type LabelElementProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLLabelElement>, never>;

export const selectLabelPropSetter: PropSetter<LabelElementProps> = (propSetterProps) => {
  const { label } = getSelectDataFromController(propSetterProps.controller);
  return {
    className: classNames(styles.label),
    children: label,
  };
};

export function SelectLabel(props: LabelElementProps) {
  const { children, ...attr } = props;
  return <label {...attr}>{children}</label>;
}
