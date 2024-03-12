import React from 'react';

import styles from '../../../Select.module.scss';
import classNames from '../../../../../utils/classNames';
import { LiElementProps } from '../../../types';
import { SingleSelectOption } from './SingleSelectOption';
import { SelectItemProps } from '../common';

export const createSingleSelectGroupLabelProps = (option: SelectItemProps['option']): LiElementProps => {
  const { label } = option;
  return {
    className: classNames(styles.listItem, styles.groupLabel),
    children: label,
    tabIndex: -1,
  };
};

export function SingleSelectGroupLabel(props: SelectItemProps) {
  return <SingleSelectOption {...props} />;
}
