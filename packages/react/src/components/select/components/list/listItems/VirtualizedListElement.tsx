import React, { PropsWithChildren, forwardRef, ForwardedRef, MutableRefObject } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { UlElementProps } from '../../../types';
import { DROPDOWN_MENU_ITEM_HEIGHT } from '../../../utils';
import { useRenderChildrenInChunks } from '../../../hooks/useRenderChildrenInChunks';

type Props = PropsWithChildren<UlElementProps>;

export const VirtualizedListElement = forwardRef<HTMLUListElement, Props>(
  (props: Props, ref: ForwardedRef<HTMLUListElement>) => {
    const { children, ...attr } = props;
    const currentChildren = useRenderChildrenInChunks(children);
    const rowVirtualizer = useVirtualizer({
      count: currentChildren.length || 0,
      getScrollElement: () => (ref ? (ref as MutableRefObject<Element>).current : null),
      estimateSize: () => DROPDOWN_MENU_ITEM_HEIGHT,
    });
    /*
      Without the empty div, the virtualized render only 7/1000+ items.
    */
    return (
      <div>
        <ul
          {...attr}
          ref={ref}
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {currentChildren[virtualItem.index]}
            </div>
          ))}
        </ul>
      </div>
    );
  },
);
