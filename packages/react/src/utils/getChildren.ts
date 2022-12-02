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

/**
 * Get the child elements even if there is a parent container element.
 * @param children
 */
export const getChildElements = (children) => {
  const arrayChildren = React.Children.toArray(children);
  const childrenHasContainer =
    arrayChildren.length === 1 && React.isValidElement(arrayChildren[0]) && Boolean(arrayChildren[0].props.children);
  /* If user gives a container element, we dig out the child links in order to have correct styles for them. */

  if (childrenHasContainer && React.isValidElement(arrayChildren[0])) {
    return React.Children.toArray(arrayChildren[0].props.children);
  }
  return arrayChildren;
};
