// Inspired by: https://github.com/fernandopasik/react-children-utilities/blob/master/src/lib/onlyText.ts
import type { ReactElement, ReactNode } from 'react';
import { Children, isValidElement } from 'react';

const hasChildren = (element: ReactNode): element is ReactElement<{ children: ReactNode[] }> =>
  isValidElement<{ children?: ReactNode[] }>(element) && Boolean(element.props.children);

const childToString = (child?: ReactNode): string => {
  if (typeof child === 'undefined' || child === null || typeof child === 'boolean') {
    return '';
  }

  if (JSON.stringify(child) === '{}') {
    return '';
  }

  return (child as number | string).toString();
};

export const getTextFromReactChildren = (children: ReactNode): string => {
  if (!(children instanceof Array) && !isValidElement(children)) {
    return childToString(children);
  }

  return Children.toArray(children).reduce((text: string, child: ReactNode): string => {
    let newText = '';

    if (isValidElement(child) && hasChildren(child)) {
      newText = getTextFromReactChildren(child.props.children);
    } else if (isValidElement(child) && !hasChildren(child)) {
      newText = '';
    } else {
      newText = childToString(child);
    }

    return text.concat(newText);
  }, '') as string;
};
