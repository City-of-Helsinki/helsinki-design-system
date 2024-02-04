import React, { FC } from 'react';

import { Controller, HTMLElementAttributesWithChildren } from '.';
import { renderGroupChildren } from '../Group';
import { ForwardController } from './forwardController';

/**
 *
 *
 */

export function RenderGroupChildren<P extends HTMLElementAttributesWithChildren & Record<string, unknown>>(
  component: (
    props: HTMLElementAttributesWithChildren & P,
    controller: Controller,
    childRenderer: (children: React.ReactNode | null, controller: Controller) => React.ReactNode[],
  ) => React.ReactElement | null,
): FC<HTMLElementAttributesWithChildren & P> {
  const preWrapped = (props, controller) => {
    return component(props, controller, renderGroupChildren);
  };
  return ForwardController(preWrapped);
}
