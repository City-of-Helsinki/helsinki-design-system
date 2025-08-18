import React, { RefObject } from 'react';

import styles from '../ModularOptionList.module.scss';
import classNames from '../../../../utils/classNames';
import { ModularOptionListData, ModularOptionListDataHandlers, ModularOptionListMetaData } from '../types';
import { getAllOptions } from '../utils';
import { MemoizedMultiSelectOption } from './listItems/MultiSelectOption';
import { MemoizedSingleSelectOption } from './listItems/SingleSelectOption';
import { useModularOptionListDataHandlers } from '../hooks/useModularOptionListDataHandlers';
import { SingleSelectGroupLabel } from './listItems/SingleSelectGroupLabel';
import { ModularOptionListItemProps } from './common';

export const createOptionElements = ({
  groups,
  multiSelect,
  getOptionId,
  trigger,
}: Pick<ModularOptionListData, 'groups' | 'multiSelect'> &
  Pick<ModularOptionListMetaData, 'getOptionId'> &
  Pick<ModularOptionListDataHandlers, 'trigger'>) => {
  return getAllOptions(groups, false)
    .map((option) => {
      if (!option.visible) {
        return null;
      }
      const props: ModularOptionListItemProps & { key: string } = {
        option,
        trigger,
        key: option.value,
        getOptionId,
      };
      if (multiSelect) {
        return <MemoizedMultiSelectOption {...props} isInGroup={false} />;
      }
      if (option.isGroupLabel) {
        return <SingleSelectGroupLabel {...props} />;
      }
      return <MemoizedSingleSelectOption {...props} />;
    })
    .filter((option) => !!option);
};

export function createListElementProps<T = HTMLUListElement>({
  refs,
  elementIds,
  multiSelect,
}: Pick<ModularOptionListMetaData, 'refs' | 'elementIds'> & Pick<ModularOptionListData, 'multiSelect'>) {
  return {
    className: classNames(styles.list),
    ref: refs.list as unknown as RefObject<T>,
    id: elementIds.list,
    role: 'listbox',
    'aria-multiselectable': multiSelect,
    tabIndex: -1,
  };
}

export function SingleSelectAndGrouplessList() {
  const { getData, trigger, getMetaData } = useModularOptionListDataHandlers();
  const { groups, multiSelect } = getData();
  const { getOptionId, refs, elementIds } = getMetaData();
  const attr = {
    ...createListElementProps({ refs, elementIds, multiSelect }),
    'aria-live': 'polite' as const,
  };

  const children = createOptionElements({ groups, trigger, multiSelect, getOptionId });
  return <ul {...attr}>{children}</ul>;
}
