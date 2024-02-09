import React, { isValidElement, useMemo } from 'react';

import { getChildrenAsArray } from '../../utils/getChildren';
import useForceRender from '../../hooks/useForceRender';
import { createController } from './utils/controller';
import {
  Controller,
  DefaultGroupElementProps,
  GroupChild,
  GroupProps,
  HTMLElementAttributesWithChildren,
  isFunctionOrObject,
} from './utils';
import { isForwardController } from './utils/forwardController';

const HDSGroupIdProp = Symbol('HDSGroupId');

export function pickGroupId(props: React.HtmlHTMLAttributes<HTMLElement> & { groupId: string }) {
  return props['data-hds-group-id'] || props.groupId || props.id;
}

export const renderGroupChild = (
  child: React.FunctionComponentElement<GroupChild> | React.ReactElement,
  controller: Controller,
) => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const groupId = getComponentGroupId(child) || pickGroupId(child.props);
  const props = groupId ? controller.getProps({ id: groupId, elementProps: child.props }) : {};
  if (isForwardController(child)) {
    props.forwardedController = controller;
  }
  return React.cloneElement(child, props);
};

export function renderGroupChildren(children: React.ReactNode | null, controller: Controller): React.ReactNode[] {
  return getChildrenAsArray(children).map((child) => {
    if (!child) {
      return null;
    }
    const childType = typeof child;
    if (childType === 'string' || childType === 'number') {
      return child;
    }
    // in this case the child is a plain function accepting controller in argument object
    if (childType === 'function') {
      const renderResult = React.cloneElement(
        (child as React.FC<{ controller: Controller }>)({ controller }) as React.ReactElement,
      );
      return renderGroupChild(renderResult, controller);
    }
    if (!isValidElement(child)) {
      return null;
    }
    return renderGroupChild(child as React.ReactElement, controller);
  });
}

export const RenderWithController = ({ children, controller }: React.PropsWithChildren<{ controller: Controller }>) => {
  return <>{renderGroupChildren(children, controller)}</>;
};

export function getComponentGroupId(component: unknown) {
  const reactObjectType = isFunctionOrObject(component) && Reflect.get(component as React.ComponentType, 'type');
  return isFunctionOrObject(reactObjectType) && Reflect.get(reactObjectType, HDSGroupIdProp);
}

export const addGroupIdToComponent = (f: React.ReactNode | ((...args: unknown[]) => unknown), groupId: string) => {
  Object.defineProperty(f, HDSGroupIdProp, {
    value: groupId,
  });
  return f;
};

export const ComponentToGroupChild = <P, T = DefaultGroupElementProps>(f: React.FC<P>, groupId?: string) => {
  if (groupId) {
    addGroupIdToComponent(f, groupId);
  }
  return (props: T) => f((props as unknown) as P);
};

export function Group<T = HTMLElementAttributesWithChildren>({
  children,
  propSetter,
  initialData,
  metaData,
  onChange = () => undefined,
}: GroupProps<T>) {
  const reRenderer = useForceRender();
  const controller = useMemo(
    () =>
      createController({
        reRenderer,
        propSetter,
        initialData,
        metaData,
        onChange,
      }),
    [initialData],
  );
  return <>{renderGroupChildren(children, controller)}</>;
}
