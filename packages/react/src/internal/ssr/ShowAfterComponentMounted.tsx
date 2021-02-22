import React, { useState, useEffect, ElementType, ComponentPropsWithoutRef } from 'react';
/**
 * This avoids broken UI layout when useing SSR: Element is hidden when server renders it
 * and becomes visible on client side render. See tip on: https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 */

export type Props<Element extends ElementType> = {
  /**
   * Element type
   */
  as?: Element;
} & ComponentPropsWithoutRef<Element>;

export const ShowAfterComponentMounted = <Element extends ElementType>({
  children,
  as = 'span',
  ...rest
}: Props<Element>) => {
  const [isPageLoaded, setPageLoaded] = useState(false);
  useEffect(() => setPageLoaded(true), []);
  const { style: propsStyle } = rest;
  const style = (!isPageLoaded && { visibility: 'hidden' }) || undefined;
  const props = { ...rest, ...(style && { style: { ...propsStyle, style } }) };

  const Component: ElementType = as;

  return <Component {...props}>{children}</Component>;
};
