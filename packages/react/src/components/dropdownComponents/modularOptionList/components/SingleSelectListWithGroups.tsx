import React from 'react';

import styles from '../ModularOptionList.module.scss';
import { ModularOptionListData, ModularOptionListDataHandlers, ModularOptionListMetaData } from '../types';
import { useModularOptionListDataHandlers } from '../hooks/useModularOptionListDataHandlers';
import { createListElementProps, createOptionElements } from './SingleSelectAndGrouplessList';
import { createGroupProps } from './MultiSelectListWithGroups';
import classNames from '../../../../utils/classNames';

const createGroups = ({
  groups,
  getOptionId,
  trigger,
}: Pick<ModularOptionListData, 'groups'> &
  Pick<ModularOptionListMetaData, 'getOptionId'> &
  Pick<ModularOptionListDataHandlers, 'trigger'>) => {
  return groups.map((group) => {
    const attr = { ...createGroupProps(group), className: classNames(styles.list, styles.shiftOptions) };
    const children = createOptionElements({ groups: [group], trigger, getOptionId, multiSelect: false });
    return (
      <ul {...attr} key={attr['aria-label']}>
        {children}
      </ul>
    );
  });
};

export function SingleSelectListWithGroups() {
  const { getData, trigger, getMetaData } = useModularOptionListDataHandlers();
  const { groups, multiSelect } = getData();
  const metaData = getMetaData();
  const { getOptionId, refs, elementIds } = metaData;

  // Use aria-labelledby to share the same accessible name as the search input
  const hasSearchInput = (metaData as Record<string, unknown>).hasSearchInput as boolean | undefined;
  const labelId = hasSearchInput ? (elementIds as Record<string, string>).label : undefined;

  const attr = {
    ...createListElementProps<HTMLDivElement>({
      refs,
      elementIds,
      multiSelect,
      labelledBy: labelId,
    }),
    'aria-live': 'polite' as const,
  };
  const children = createGroups({ groups, trigger, getOptionId });
  return <div {...attr}>{children}</div>;
}
