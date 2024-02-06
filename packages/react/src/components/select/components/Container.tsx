import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { PropSetter } from '../../group/utils';
import { RenderGroupChildren } from '../../group/utils/renderChildrenAsGroupChildren';
import { DivElementProps } from '..';

export const containerPropSetter: PropSetter<DivElementProps> = () => {
  return {
    className: classNames(styles.wrapper),
  };
};

export const Container = RenderGroupChildren((props, controller, childRenderer) => {
  const { children, ...attr } = props;
  return <div {...attr}>{childRenderer(children, controller)}</div>;
});
