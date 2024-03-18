import React, { PropsWithChildren, forwardRef, ForwardedRef, MutableRefObject } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import styles from '../../Select.module.scss';
import { UlElementProps } from '../../types';
import { DROPDOWN_MENU_ITEM_HEIGHT } from '../../utils';
import { useRenderChildrenInChunks } from '../../hooks/useRenderChildrenInChunks';

type Props = PropsWithChildren<UlElementProps>;

export const VirtualizedSSAGL = forwardRef<HTMLUListElement, Props>(
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
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const node = currentChildren[virtualItem.index] as React.ReactElement;
            if (!node || !virtualItem) {
              return null;
            }
            const nodeProps = {
              ...node.props,
              key: virtualItem.key,
              className: styles.virtualizedListItem,
              style: {
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              },
            };
            return React.cloneElement(node, nodeProps);
          })}
        </ul>
      </div>
    );
  },
);
