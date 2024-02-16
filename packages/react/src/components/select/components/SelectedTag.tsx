import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import styles from '../Select.module.scss';
import { Option } from '../types';
import classNames from '../../../utils/classNames';
import { Tag, TagProps } from '../../tag/Tag';
import { ChangeTrigger } from '../../dataContext/DataContext';
import { eventTypes, eventIds } from '../events';

export type ButtonElementProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, never>;

type SelectedTagProps = { option: Option; trigger: ChangeTrigger };

const selectedTagPropSetter = ({ option, trigger }: SelectedTagProps): TagProps => {
  return {
    className: classNames(styles.tag),
    onClick: (e) => {
      e.stopPropagation();
    },
    onDelete: (e) => {
      e.stopPropagation();
      trigger({ id: eventIds.tag, type: eventTypes.click, payload: { value: option } });
    },
    children: option.label,
  };
};

export function SelectedTag(props: SelectedTagProps) {
  const { children, ...attr } = selectedTagPropSetter(props);
  return <Tag {...attr}>{children}</Tag>;
}
