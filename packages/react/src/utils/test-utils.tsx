import React, { PropsWithChildren } from 'react';
import type { Writable } from 'type-fest';

import { Footer } from '../components/footer';
import { Header } from '../components/header';

type WrapperProps = PropsWithChildren<Record<string, unknown>>;

export const FooterWrapper = ({ children }: WrapperProps) => <Footer title="Bar">{children}</Footer>;

export const FooterNavigationWrapper = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
  <Footer title="Bar">
    <Footer.Navigation>{children}</Footer.Navigation>
  </Footer>
);

export const FooterNavigationGroupsWrapper = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
  <Footer title="Bar">
    <Footer.Navigation>
      <Footer.NavigationGroup headingLink={<Footer.GroupHeading href="https://google.com" label="Main Page" />}>
        {children}
      </Footer.NavigationGroup>
    </Footer.Navigation>
  </Footer>
);

export const FooterUtilitiesWrapper = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
  <Footer title="Bar">
    <Footer.Utilities>{children}</Footer.Utilities>
  </Footer>
);

export const HeaderWrapper = ({ children }: WrapperProps) => <Header>{children}</Header>;

export const HeaderNavigationMenuWrapper = ({ children }: WrapperProps) => (
  <Header>
    <Header.NavigationMenu>{children}</Header.NavigationMenu>
  </Header>
);

export const createDomRect = (props: Partial<DOMRect>): Writable<DOMRect> => {
  const rect = {
    left: props.left || props.x || 0,
    top: props.top || props.y || 0,
    width: props.width || 0,
    height: props.height || 0,
    right: props.right || 0,
    bottom: props.bottom || 0,
  };

  const right = Math.max(rect.right, rect.left + rect.width);
  const bottom = Math.max(rect.bottom, rect.top + rect.height);
  const width = Math.max(rect.width, rect.right - rect.left);
  const height = Math.max(rect.height, rect.bottom - rect.top);

  return {
    left: rect.left,
    top: rect.top,
    width,
    height,
    right,
    bottom,
    x: rect.left,
    y: rect.top,
    toJSON: () => '',
  };
};

export const createFakeElement = (rect: Partial<DOMRect>, children: HTMLElement[] = []): HTMLElement => {
  const domRect = createDomRect(rect);
  const element: Partial<HTMLElement> = {
    getBoundingClientRect: () => {
      return domRect as DOMRect;
    },
  };
  const baseDefineProps = {
    enumerable: true,
    configurable: true,
  };
  let childList: HTMLElement[] = [];
  let parent: HTMLElement | null = null;
  const getParentChildren = () => {
    if (!parent || !parent.children) {
      return [];
    }
    return Array.from(parent.children);
  };
  const getIndexInParentChildren = () => {
    return getParentChildren().findIndex((i) => i === element);
  };
  Reflect.defineProperty(element, 'lastElementChild', {
    ...baseDefineProps,
    get() {
      return childList[childList.length - 1] || null;
    },
  });
  Reflect.defineProperty(element, 'firstElementChild', {
    ...baseDefineProps,
    get() {
      return childList[0] || null;
    },
  });
  Reflect.defineProperty(element, 'children', {
    ...baseDefineProps,
    get() {
      return childList;
    },
    set(newList: HTMLElement[]) {
      childList = [...newList];
      childList.forEach((child) => {
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        child.parent = element;
      });
    },
  });
  Reflect.defineProperty(element, 'parent', {
    ...baseDefineProps,
    get() {
      return parent;
    },
    set(value) {
      parent = value;
    },
  });
  Reflect.defineProperty(element, 'previousElementSibling', {
    ...baseDefineProps,
    get() {
      const siblingIndex = getIndexInParentChildren() - 1;
      const parentChildren = getParentChildren();
      return siblingIndex > -1 ? parentChildren[siblingIndex] : null;
    },
  });

  // @ts-ignore
  element.children = children;

  return element as HTMLElement;
};

export const createElementGrid = (rows: number, cols: number, width = 10, height = 10, spacingX = 0, spacingY = 0) => {
  const grid: HTMLElement[][] = [];
  for (let y = 0; y < rows; y += 1) {
    const column: HTMLElement[] = [];
    for (let xx = 0; xx < cols; xx += 1) {
      const top = y * (height + spacingY);
      const left = xx * (width + spacingX);
      column.push(
        createFakeElement({
          width,
          height,
          top,
          left,
          right: left + width,
          bottom: top + height,
        }),
      );
    }
    grid[y] = column;
  }
  return grid;
};

export const isRect = (element: HTMLElement | DOMRect) => {
  return typeof (element as DOMRect).top !== 'undefined';
};

export const getRect = (element: HTMLElement | DOMRect) => {
  return isRect(element) ? (element as DOMRect) : (element as HTMLElement).getBoundingClientRect();
};

export const assignNewFakeElementChildren = (parent: HTMLElement, children: (HTMLElement | DOMRect)[]) => {
  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  parent.children = children.map((childOrRect) => {
    if (isRect(childOrRect)) {
      return createFakeElement(childOrRect as DOMRect);
    }
    return childOrRect as HTMLElement;
  });
};
