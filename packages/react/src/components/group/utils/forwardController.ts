import React, { FC } from 'react';

import { Controller, HTMLElementAttributesWithChildren, isFunctionOrObject } from '.';

const HDSForwardController = Symbol('HDSForwardController');

/**
 *
 * Basically cloned how React.ForwardRef works.
 * Sometimes it is convenient to pass controller to a React.JSX/FC component.
 * If a React.JSX/FC component has HDSForwardController as a prop,
 * then the controller should be passed as a second argument.
 *
 */

export function ForwardController<P extends HTMLElementAttributesWithChildren & Record<string, unknown>>(
  component: (props: HTMLElementAttributesWithChildren & P, controller: Controller) => React.ReactElement | null,
): FC<HTMLElementAttributesWithChildren & P> {
  const renderFunc = (componentProps: P & { forwardedController?: Controller }) => {
    const { forwardedController, ...rest } = componentProps;
    if (!forwardedController) {
      throw new Error('forwardedController not passed to ForwardController');
    }
    return component((rest as unknown) as P, forwardedController);
  };
  Object.defineProperty(renderFunc, HDSForwardController, {
    value: true,
  });
  return renderFunc;
}

export function isForwardController(component: unknown) {
  const reactObjectType = isFunctionOrObject(component) && Reflect.get(component as React.ComponentType, 'type');
  return isFunctionOrObject(reactObjectType) && Reflect.get(reactObjectType, HDSForwardController) === true;
}
