/* eslint-disable no-unreachable */
import React, { PropsWithChildren, forwardRef, ForwardedRef, MutableRefObject } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { UlElementProps } from '../../../types';
import { useRenderChildrenInChunks } from '../../../hooks/useRenderChildrenInChunks';
import { getChildElementsEvenIfContainersInbetween, getChildrenAsArray } from '../../../../../utils/getChildren';

type Props = PropsWithChildren<UlElementProps> & { isMultiSelectWithGroups: boolean };

const renderFunctionalComponent = (component: unknown, props?: unknown) => {
  if (!component || typeof component !== 'object') {
    return null;
  }
  const typeFunc = Reflect.get(component, 'type');
  if (typeof typeFunc !== 'function') {
    return null;
  }
  return typeFunc(props);
};

export const VirtualizedList = forwardRef<HTMLUListElement, Props>(
  (props: Props, ref: ForwardedRef<HTMLUListElement>) => {
    const { isMultiSelectWithGroups, children } = props;
    const listComponent = renderFunctionalComponent(children);

    const childMap: Map<number, number> = new Map();
    const getGrandChildren = (arr: Array<React.ReactNode>, child: React.ReactNode, index: number) => {
      const grandChildren = getChildElementsEvenIfContainersInbetween(child);
      childMap.set(index, grandChildren.length);
      return [...arr, ...grandChildren];
    };
    const directChildren = isMultiSelectWithGroups
      ? getChildrenAsArray(listComponent.props.children).reduce(getGrandChildren, [])
      : [];
    const pickedChildren = isMultiSelectWithGroups
      ? directChildren.reduce(getGrandChildren, [])
      : listComponent.props.children;
    const currentChildren = useRenderChildrenInChunks(pickedChildren);
    const rowVirtualizer = useVirtualizer({
      count: currentChildren.length || 0,
      getScrollElement: () => (ref ? (ref as MutableRefObject<Element>).current : null),
      estimateSize: () => 52,
    });
    const listComponentProps = {
      ...listComponent.props,
      ref,
      style: {
        height: `${rowVirtualizer.getTotalSize()}px`,
        width: '100%',
        position: 'relative',
      },
    };
    const List = () => {
      const childElements = currentChildren;
      const virtualItems = rowVirtualizer.getVirtualItems();
      console.log('!!!!virtualItems', virtualItems.length);
      console.log('!!!!pickedChildren', pickedChildren.length);
      const setChildProps = (el: React.ReactNode, index: number) => {
        const vProps = virtualItems[index];
        if (!vProps) {
          return null;
        }
        const listItemProps = {
          key: vProps.key,
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${vProps.size}px`,
            transform: `translateY(${vProps.start}px)`,
          },
        };
        const elem = renderFunctionalComponent(el, (el as React.ReactPortal).props);
        if (!elem) {
          return null;
        }
        return React.cloneElement(elem, listItemProps);
      };
      const createChildren = () => {
        if (isMultiSelectWithGroups) {
          let pickedChildrenCount = 0;
          const maxChildren = childElements.length;
          console.log('currentChildren', currentChildren);
          const pickGroupChildren = (i: number) => {
            const groupChildCount = childMap.get(i);

            if (!groupChildCount) {
              return null;
            }
            const startIndex = pickedChildrenCount;
            const lastChild = Math.min(startIndex + groupChildCount, maxChildren);
            const groupChildren = childElements.slice(pickedChildrenCount, lastChild);
            console.log('---::::', startIndex, lastChild, groupChildren);
            pickedChildrenCount = lastChild;

            return groupChildren.map((el, childIndex) => setChildProps(el, startIndex + childIndex));
          };
          return directChildren.map((child, groupIndex) => {
            if ((child as React.ReactElement).type === 'span') {
              return child;
            }
            console.log('g', child);
            const groupChildren = pickGroupChildren(groupIndex);
            console.log('groupChildren', groupChildren);
            const childProps = {
              ...(child as React.ReactElement).props,
              children: groupChildren,
            };
            const elem = renderFunctionalComponent(child, childProps);
            console.log('elem', elem);
            return elem;
          });
        }
        return childElements.map(setChildProps);
      };
      const listChildren = createChildren();

      return React.cloneElement(listComponent, listComponentProps, listChildren);
    };
    return (
      <div>
        <List />
      </div>
    );
  },
);
