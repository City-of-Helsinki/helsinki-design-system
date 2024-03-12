import React from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { SelectDataHandlers, SelectMetaData } from '../../types';
import { getAllOptions } from '../../utils';
import { MultiSelectOption } from './listItems/MultiSelectOption';
import { SingleSelectOption } from './listItems/SingleSelectOption';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';

const createOptionElements = ({ getData, trigger, getMetaData }: SelectDataHandlers) => {
  const { groups, multiSelect, open } = getData();
  const { isSearching } = getMetaData();
  if (!open || isSearching) {
    return [];
  }
  return getAllOptions(groups, false)
    .map((option) => {
      if (!option.visible) {
        return null;
      }
      if (multiSelect) {
        return <MultiSelectOption option={option} trigger={trigger} isInGroup={false} key={option.value} />;
      }
      return <SingleSelectOption option={option} trigger={trigger} key={option.value} />;
    })
    .filter((option) => !!option);
};

const createListElementProps = ({ getMetaData }: SelectDataHandlers) => {
  const { refs, elementIds } = getMetaData() as SelectMetaData;
  return {
    className: classNames(styles.list),
    ref: refs.list,
    tabIndex: 0,
    id: elementIds.list,
    role: 'listbox',
  };
};

export function SingleSelectAndGrouplessList() {
  const dataHandlers = useSelectDataHandlers();
  const attr = createListElementProps(dataHandlers);
  const children = createOptionElements(dataHandlers);
  return <ul {...attr}>{children}</ul>;
}
