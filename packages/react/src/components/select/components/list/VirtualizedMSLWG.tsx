import React, { MutableRefObject, RefObject } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { flatten } from 'lodash';

import { useRenderChildrenInChunks } from '../../hooks/useRenderChildrenInChunks';
import type { GroupContent } from './MultiSelectListWithGroups';
import { DivElementProps } from '../../types';

type Props = { groupContents: GroupContent[]; containerProps: DivElementProps & { ref: RefObject<HTMLDivElement> } };

function MultiSelectGroup(props: DivElementProps) {
  const { children, ...attr } = props;
  return <div {...attr}>{children}</div>;
}

export const VirtualizedMSLWG = (props: Props) => {
  const { groupContents, containerProps } = props;
  const { ref } = containerProps;
  const allChildren = flatten(groupContents.map((contents) => contents.children));
  const currentChildren = useRenderChildrenInChunks(allChildren);
  const rowVirtualizer = useVirtualizer({
    count: currentChildren.length || 0,
    getScrollElement: () => (ref ? (ref as MutableRefObject<Element>).current : null),
    estimateSize: () => 52,
  });
  let pickedChildrenCount = 0;
  const maxChildren = currentChildren.length;
  const virtualItems = rowVirtualizer.getVirtualItems();

  const chunkedAndParsedGroups = groupContents.map(({ children, groupProps }) => {
    const groupChildCount = children.length;
    const startIndex = pickedChildrenCount;
    const lastChild = Math.min(startIndex + groupChildCount, maxChildren);
    const groupChildren = currentChildren.slice(pickedChildrenCount, lastChild) as React.ReactElement[];
    pickedChildrenCount = lastChild;
    return {
      groupProps,
      children: groupChildren,
      childProps: groupChildren.map((child, i) => {
        const virtualItem = virtualItems[startIndex + i];
        if (!virtualItem) {
          return null;
        }
        const virtualProps = {
          key: virtualItem.key,
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${virtualItem.size}px`,
            transform: `translateY(${virtualItem.start}px)`,
          },
        };
        return { ...child.props, ...virtualProps };
      }),
    };
  });

  /*
      Without the empty div, the virtualized render only 7/1000+ items.
      and / OR console is filling with "resizeObserver loop completed with undelivered notification" errors
    */
  return (
    <div>
      <div
        {...containerProps}
        ref={ref}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {chunkedAndParsedGroups.map(({ children, groupProps, childProps }) => {
          return (
            <MultiSelectGroup {...groupProps}>
              {children.map((node, i) => {
                const nodeProps = childProps[i];
                if (!nodeProps) {
                  return null;
                }
                return React.cloneElement(node, nodeProps);
              })}
            </MultiSelectGroup>
          );
        })}
      </div>
    </div>
  );
};
