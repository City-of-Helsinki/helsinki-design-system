import React from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { SelectDataHandlers, SelectMetaData } from '../../types';
import { getAllOptions } from '../../utils';
import { MultiSelectOption } from './listItems/MultiSelectOption';
import { SingleSelectOption } from './listItems/SingleSelectOption';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { SingleSelectGroupLabel } from './listItems/SingleSelectGroupLabel';
import { SelectItemProps } from './common';
import { VirtualizedSSAGL } from './VirtualizedSSAGL';

const createOptionElements = ({ getData, trigger, getMetaData }: SelectDataHandlers) => {
  const { groups, multiSelect, open } = getData();
  const { isSearching, getOptionId } = getMetaData();
  if (!open || isSearching) {
    return [];
  }
  return getAllOptions(groups, false)
    .map((option) => {
      if (!option.visible) {
        return null;
      }
      const props: SelectItemProps & { key: string } = {
        option,
        trigger,
        key: option.value,
        getOptionId,
      };
      if (multiSelect) {
        return <MultiSelectOption {...props} isInGroup={false} />;
      }
      if (option.isGroupLabel) {
        return <SingleSelectGroupLabel {...props} />;
      }
      return <SingleSelectOption {...props} />;
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
  const { virtualize } = dataHandlers.getData();
  const attr = createListElementProps(dataHandlers);
  const children = createOptionElements(dataHandlers);
  if (virtualize) {
    return <VirtualizedSSAGL {...attr}>{children}</VirtualizedSSAGL>;
  }
  return <ul {...attr}>{children}</ul>;
}
