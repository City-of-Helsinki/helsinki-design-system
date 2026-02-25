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

export const createOptionElements = (
  {
    groups,
    multiSelect,
    getOptionId,
    trigger,
  }: Pick<ModularOptionListData, 'groups' | 'multiSelect'> &
    Pick<ModularOptionListMetaData, 'getOptionId'> &
    Pick<ModularOptionListDataHandlers, 'trigger'> /* & { search?: string } */,
) => {
  return getAllOptions(groups, false)
    .map((option) => {
      if (!option.visible) {
        return null;
      }
      const props: ModularOptionListItemProps & { key: string } & { search?: string } = {
        option,
        trigger,
        key: getOptionId(option),
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
  listLabel,
}: Pick<ModularOptionListMetaData, 'refs' | 'elementIds'> &
  Pick<ModularOptionListData, 'multiSelect'> & { listLabel?: string }) {
  return {
    className: classNames(styles.list),
    ref: refs.list as unknown as RefObject<T>,
    id: elementIds.list,
    role: 'listbox',
    'aria-multiselectable': multiSelect,
    ...(listLabel && { 'aria-label': listLabel }),
    tabIndex: -1,
  };
}

export function SingleSelectAndGrouplessList() {
  const { getData, trigger, getMetaData } = useModularOptionListDataHandlers();
  const { groups, multiSelect } = getData();
  const metaData = getMetaData();
  const { getOptionId, refs, elementIds } = metaData;

  // Determine listbox aria-label for search context
  const hasSearchInput = (metaData as Record<string, unknown>).hasSearchInput as boolean | undefined;
  const search = (metaData as Record<string, unknown>).search as string | undefined;
  let listAriaLabel: string | undefined;
  if (hasSearchInput) {
    const textKey = search ? 'searchSuggestionsLabel' : 'searchHistoryLabel';
    listAriaLabel = metaData.textProvider(textKey as never, {} as never) || undefined;
  }

  const attr = {
    ...createListElementProps({ refs, elementIds, multiSelect, listLabel: listAriaLabel }),
    'aria-live': 'polite' as const,
  };

  const children = createOptionElements({ groups, trigger, multiSelect, getOptionId });
  return <ul {...attr}>{children}</ul>;
}
