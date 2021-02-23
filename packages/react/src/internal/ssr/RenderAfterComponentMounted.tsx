import React, { ComponentPropsWithoutRef, ElementType, ReactElement, useEffect, useState } from 'react';
/**
 * This avoids broken UI layout when using SSR: Element is hidden when server renders it
 * and becomes visible on client side render. See tip on: https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 */

export type Props<Element extends ElementType> = {
  /**
   * Element type
   */
  as?: Element;
} & ComponentPropsWithoutRef<Element>;

export const RenderAfterComponentMounted = <Element extends ElementType>({
  children,
  as = 'span',
  ...props
}: Props<Element>): ReactElement | null => {
  const [isComponentMounted, setComponentMounted] = useState(false);
  useEffect(() => setComponentMounted(true), []);
  if (!isComponentMounted) {
    return null;
  }
  const Component: ElementType = as;

  return <Component {...props}>{children}</Component>;
};
