import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { PropSetter } from '../../group/utils';
import { getSelectDataFromController } from '../utils';
import { RenderGroupChildren } from '../../group/utils/renderChildrenAsGroupChildren';

export type LabelElementProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLLabelElement>, never>;

export const xPropSetter: PropSetter<LabelElementProps> = (propSetterProps) => {
  const { label } = getSelectDataFromController(propSetterProps.controller);
  return {
    className: `label-${label}`,
  };
};

export const XSelectLabel = RenderGroupChildren((props, controller, childRenderer) => {
  const { children, ...attr } = props;
  return <section {...attr}>{childRenderer(children, controller)}</section>;
});
export const XSelectLabelChild = (props) => {
  const { children, ...attr } = props;
  return <p {...attr}>{children}</p>;
};
