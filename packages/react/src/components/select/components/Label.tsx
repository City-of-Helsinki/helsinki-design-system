import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { PropSetter } from '../../group/utils';
import { getSelectDataFromController } from '../utils';
import { LabelElementProps } from '..';
import GroupChild from '../../group/GroupChild';

export const labelPropSetter: PropSetter<LabelElementProps> = ({ controller }) => {
  const { label } = getSelectDataFromController(controller);
  return {
    className: classNames(styles.label),
    children: label,
  };
};

export function Label(props: LabelElementProps) {
  return <GroupChild as="label" {...props} renderOnlyWithChildren />;
}
