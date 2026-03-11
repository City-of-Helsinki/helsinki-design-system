import React from 'react';

import { useRenderChildrenInChunks } from '../hooks/useRenderChildrenInChunks';
import { createContainerProps, createGroups } from './MultiSelectListWithGroups';
import { Group } from '../types';
import { useModularOptionListDataHandlers } from '../hooks/useModularOptionListDataHandlers';
import { getAllOptions, getVisibleGroupLabels } from '../utils';
import { createListElementProps, createOptionElements } from './SingleSelectAndGrouplessList';

export const VirtualizedLists = ({ forMultiSelectWithGroups }: { forMultiSelectWithGroups: boolean }) => {
  const dataHandlers = useModularOptionListDataHandlers();
  const { getData, getMetaData, trigger } = dataHandlers;
  const { groups, multiSelect } = getData();
  const metaData = getMetaData();
  const { getOptionId, refs, elementIds } = metaData;

  // Use aria-labelledby to share the same accessible name as the search input
  const hasSearchInput = (metaData as Record<string, unknown>).hasSearchInput as boolean | undefined;
  const labelId = hasSearchInput ? (elementIds as Record<string, string>).label : undefined;

  // In multiselect with groups, group labels are rendered, so include them in the count
  // For single select with groups, group labels are also rendered, so include them
  // Otherwise, exclude them as they're not focusable/rendered
  const hasVisibleGroupLabels = getVisibleGroupLabels(groups).length > 0;
  const filterOutGroupLabels = !(forMultiSelectWithGroups || (!multiSelect && hasVisibleGroupLabels));
  const allOptions = getAllOptions(groups, filterOutGroupLabels);
  const shouldRenderOptions = true;
  const currentChildren = useRenderChildrenInChunks(shouldRenderOptions ? allOptions : []);

  const createVirtualGroups = (): Group[] => {
    let childrenLeft = currentChildren.length;
    return groups.map((group) => {
      // Filter visible options (this includes group label if visible)
      const options = group.options.filter((opt) => opt.visible);
      // Calculate how many items we can render from this group
      // The options array already includes the group label as first element if visible
      const allowedLength = Math.min(options.length, childrenLeft);
      childrenLeft -= allowedLength;
      return {
        options: allowedLength > 0 ? options.slice(0, allowedLength) : [],
      };
    });
  };

  if (forMultiSelectWithGroups) {
    const attr = createContainerProps(dataHandlers);
    const children = shouldRenderOptions ? createGroups({ groups: createVirtualGroups(), getOptionId, trigger }) : null;
    return <div {...attr}>{children}</div>;
  }
  const attr = createListElementProps({ refs, elementIds, multiSelect, labelledBy: labelId });
  const children = shouldRenderOptions
    ? createOptionElements({ groups: createVirtualGroups(), trigger, multiSelect, getOptionId })
    : null;
  return <ul {...attr}>{children}</ul>;
};
