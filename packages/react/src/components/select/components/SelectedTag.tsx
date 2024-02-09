import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { Option } from '../index';
import { groupIds, eventTypes } from '../groupData';
import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { Controller } from '../../group/utils';
import { Tag, TagProps } from '../../tag/Tag';

export type ButtonElementProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, never>;

//  tags are dynamically created in SelectedOptions. They are not created by <Group>

export const selectedTagPropSetter = ({ option, controller }: { option: Option; controller: Controller }): TagProps => {
  return {
    className: classNames(styles.tag),
    onClick: (e) => {
      e.stopPropagation();
    },
    onDelete: (e) => {
      e.stopPropagation();
      controller.triggerChange({ id: groupIds.tag, type: eventTypes.click, payload: { value: option } });
    },
    children: option.label,
    role: 'button',
  };
};

export function SelectedTag(props: TagProps) {
  const { children, ...attr } = props;
  return <Tag {...attr}>{children}</Tag>;
}
