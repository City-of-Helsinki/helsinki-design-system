import React from 'react';

import styles from '../../../Select.module.scss';
import classNames from '../../../../../utils/classNames';
import { LiElementProps } from '../../../types';
import { SelectItemProps } from '../common';

export const createSingleSelectGroupLabelProps = ({ option, getOptionId }: SelectItemProps): LiElementProps => {
  const { label } = option;
  return {
    className: classNames(styles.listItem, styles.groupLabel, styles.focusableListItem),
    children: label,
    tabIndex: -1,
    id: getOptionId(option),
  };
};

export function SingleSelectGroupLabel(props: SelectItemProps) {
  const { children, ...attr } = createSingleSelectGroupLabelProps(props);
  return <li {...attr}>{children}</li>;
}
