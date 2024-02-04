import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { Option } from '../index';
import styles from './styles.module.scss';
import classNames from '../../../utils/classNames';
import { Controller } from '../../group/utils';
import { Tag, TagProps } from '../../tag/Tag';

export type ButtonElementProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, never>;

//  tags are dynamically created. They are not in controller data.
//  propSetterProps are from SelectButton

export const selectedTagPropSetter = ({ option, controller }: { option: Option; controller: Controller }): TagProps => {
  return {
    className: classNames(styles.tag),
    onClick: (e) => {
      e.stopPropagation();
    },
    onDelete: (e) => {
      e.stopPropagation();
      controller.triggerChange({ id: 'tag', type: 'tag-click', payload: { value: option } });
    },
    children: option.label,
    role: 'button',
  };
};

export function SelectedTag(props: TagProps) {
  const { children, ...attr } = props;
  return <Tag {...attr}>{children}</Tag>;
}
