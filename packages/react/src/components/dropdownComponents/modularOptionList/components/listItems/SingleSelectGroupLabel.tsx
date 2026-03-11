import React from 'react';

import styles from '../../ModularOptionList.module.scss';
import classNames from '../../../../../utils/classNames';
import { LiElementProps } from '../../types';
import { ModularOptionListItemProps } from '../common';

export const singleSelectGroupLabelSelector = `li[role="presentation"].${styles.groupLabel}`;

export const isSingleSelectGroupLabel = (element: HTMLElement | null | undefined) => {
  return element && element.matches(singleSelectGroupLabelSelector);
};

export const createSingleSelectGroupLabelProps = ({
  option,
  getOptionId,
}: ModularOptionListItemProps): LiElementProps => {
  const { label } = option;
  return {
    className: classNames(styles.listItem, styles.groupLabel, styles.focusableListItem),
    children: label,
    tabIndex: -1,
    id: getOptionId(option),
    role: 'presentation',
  };
};

export function SingleSelectGroupLabel(props: ModularOptionListItemProps) {
  const { children, ...attr } = createSingleSelectGroupLabelProps(props);
  return <li {...attr}>{children}</li>;
}
