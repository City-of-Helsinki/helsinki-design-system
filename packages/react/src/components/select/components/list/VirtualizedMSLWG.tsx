import React, { MutableRefObject, RefObject } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { flatten } from 'lodash';

import styles from '../../Select.module.scss';
import { useRenderChildrenInChunks } from '../../hooks/useRenderChildrenInChunks';
import type { GroupContent } from './MultiSelectListWithGroups';
import { DivElementProps } from '../../types';
import { DROPDOWN_MENU_ITEM_HEIGHT } from '../../utils';

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
    estimateSize: () => DROPDOWN_MENU_ITEM_HEIGHT,
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
          className: styles.virtualizedListItem,
          style: {
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
