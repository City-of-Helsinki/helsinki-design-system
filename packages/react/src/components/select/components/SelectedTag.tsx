import React from 'react';

import styles from '../Select.module.scss';
import { Option } from '../types';
import classNames from '../../../utils/classNames';
import { Tag, TagProps } from '../../tag/Tag';
import { ChangeTrigger } from '../../dataProvider/DataContext';
import { eventTypes, eventIds } from '../events';

type SelectedTagProps = { option: Option; trigger: ChangeTrigger; disabled: boolean };

const createDelectedTagProps = ({ option, trigger, disabled }: SelectedTagProps): TagProps => {
  return {
    className: classNames(styles.tag, disabled && styles.disabledTag),
    onClick: (e) => {
      e.stopPropagation();
    },
    onDelete: disabled
      ? undefined
      : (e) => {
          e.stopPropagation();
          trigger({ id: eventIds.tag, type: eventTypes.click, payload: { value: option } });
        },
    children: option.label,
  };
};

export function SelectedTag(props: SelectedTagProps) {
  const { children, ...attr } = createDelectedTagProps(props);
  return <Tag {...attr}>{children}</Tag>;
}
