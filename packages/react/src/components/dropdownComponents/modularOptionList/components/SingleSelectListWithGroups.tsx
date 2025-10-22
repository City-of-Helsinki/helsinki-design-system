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
  const { getOptionId, refs, elementIds } = getMetaData();

  const attr = {
    ...createListElementProps<HTMLDivElement>({
      refs,
      elementIds,
      multiSelect,
    }),
    'aria-live': 'polite' as const,
  };
  const children = createGroups({ groups, trigger, getOptionId });
  return <div {...attr}>{children}</div>;
}
