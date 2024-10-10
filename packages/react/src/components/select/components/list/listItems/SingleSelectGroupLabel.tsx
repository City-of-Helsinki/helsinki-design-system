import React from 'react';

import styles from '../../../Select.module.scss';
import classNames from '../../../../../utils/classNames';
import { LiElementProps } from '../../../types';
import { SelectItemProps } from '../common';

export const singleSelectGroupLabelSelector = `li[role="presentation"].${styles.groupLabel}`;

export const isSingleSelectGroupLabel = (element: HTMLElement | null | undefined) => {
  return element && element.matches(singleSelectGroupLabelSelector);
};

export const createSingleSelectGroupLabelProps = ({ option, getOptionId }: SelectItemProps): LiElementProps => {
  const { label } = option;
  return {
    className: classNames(styles.listItem, styles.groupLabel, styles.focusableListItem),
    children: label,
    tabIndex: -1,
    id: getOptionId(option),
    role: 'presentation',
  };
};

export function SingleSelectGroupLabel(props: SelectItemProps) {
  const { children, ...attr } = createSingleSelectGroupLabelProps(props);
  return <li {...attr}>{children}</li>;
}
