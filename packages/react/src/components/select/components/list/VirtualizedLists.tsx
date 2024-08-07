import React from 'react';

import { useRenderChildrenInChunks } from '../../hooks/useRenderChildrenInChunks';
import { createContainerProps, createGroups } from './MultiSelectListWithGroups';
import { Group } from '../../types';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { getAllOptions } from '../../utils';
import { createListElementProps, createOptionElements } from './SingleSelectAndGrouplessList';

export const VirtualizedLists = ({ forMultiSelectWithGroups }: { forMultiSelectWithGroups: boolean }) => {
  const dataHandlers = useSelectDataHandlers();
  const { getData, getMetaData, trigger } = dataHandlers;
  const { open, groups, multiSelect } = getData();
  const { getOptionId, refs, elementIds } = getMetaData();

  const allOptions = getAllOptions(groups);
  const shouldRenderOptions = open;
  const currentChildren = useRenderChildrenInChunks(shouldRenderOptions ? allOptions : []);

  const createVirtualGroups = (): Group[] => {
    let childrenLeft = currentChildren.length;
    if (!shouldRenderOptions) {
      return [];
    }
    return groups.map((group) => {
      const options = group.options.filter((opt) => opt.visible);
      const allowedLength = Math.min(options.length, childrenLeft);
      childrenLeft -= allowedLength;
      return {
        options: allowedLength > 0 ? options.slice(0, allowedLength - 1) : [],
      };
    });
  };

  if (forMultiSelectWithGroups) {
    const attr = createContainerProps(dataHandlers);
    const children = shouldRenderOptions ? createGroups({ groups: createVirtualGroups(), getOptionId, trigger }) : null;
    return <div {...attr}>{children}</div>;
  }
  const attr = createListElementProps({ refs, elementIds, multiSelect });
  const children = shouldRenderOptions
    ? createOptionElements({ groups: createVirtualGroups(), trigger, multiSelect, getOptionId })
    : null;
  return <ul {...attr}>{children}</ul>;
};
