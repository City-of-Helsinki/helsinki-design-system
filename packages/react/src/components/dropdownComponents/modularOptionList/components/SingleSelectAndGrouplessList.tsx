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
import { getTextFromDataHandlers } from '../texts';

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
  labelledBy,
  label,
}: Pick<ModularOptionListMetaData, 'refs' | 'elementIds'> &
  Pick<ModularOptionListData, 'multiSelect'> & { labelledBy?: string; label?: string }) {
  return {
    className: classNames(styles.list),
    ref: refs.list as unknown as RefObject<T>,
    id: elementIds.list,
    role: 'listbox',
    'aria-multiselectable': multiSelect,
    ...(labelledBy && { 'aria-labelledby': labelledBy }),
    ...(!labelledBy && label && { 'aria-label': label }),
    tabIndex: -1,
  };
}

export function SingleSelectAndGrouplessList() {
  const dataHandlers = useModularOptionListDataHandlers();
  const { getData, trigger, getMetaData } = dataHandlers;
  const { groups, multiSelect } = getData();
  const metaData = getMetaData();
  const { getOptionId, refs, elementIds } = metaData;

  // Use aria-labelledby to share the same accessible name as the search input
  const hasSearchInput = (metaData as Record<string, unknown>).hasSearchInput as boolean | undefined;
  const labelId = hasSearchInput ? (elementIds as Record<string, string>).label : undefined;
  // Fall back to aria-label from texts when no labelledBy is available (e.g. standalone usage)
  const ariaLabel = !labelId ? getTextFromDataHandlers('label', dataHandlers) : undefined;

  const attr = {
    ...createListElementProps({ refs, elementIds, multiSelect, labelledBy: labelId, label: ariaLabel }),
  };

  const children = createOptionElements({ groups, trigger, multiSelect, getOptionId });
  return <ul {...attr}>{children}</ul>;
}
