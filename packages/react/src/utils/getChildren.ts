import React from 'react';

import { FCWithName } from '../common/types';

/**
 * Returns the children as a flat array with keys assigned to each child
 * @param children  Children
 */
export const getChildrenAsArray = (children: React.ReactNode): React.ReactElement[] =>
  React.Children.toArray(children) as React.ReactElement[];

/**
 * Filters out a component from the children and returns it and the children without the filtered out component
 * @param children      Children
 * @param componentName Name of the component that should be filtered out
 */
export const getComponentFromChildren = (children: React.ReactNode, componentName: string): React.ReactElement[][] => {
  // copy and ensure that children is an array
  const childrenAsArray = [...getChildrenAsArray(children)];
  const componentIndex = childrenAsArray.findIndex(
    (child) => (child.type as FCWithName)?.componentName === componentName,
  );
  const component = componentIndex >= 0 ? childrenAsArray.splice(componentIndex, 1) : [];

  // return the component and the children without the removed component
  return [component, childrenAsArray];
};
