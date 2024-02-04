import React from 'react';

import styles from './styles.module.scss';
import classNames from '../../../utils/classNames';
import { DefaultGroupElementProps, PropSetter } from '../../group/utils';
import { DivElementProps } from './SelectWrapper';
import { RenderGroupChildren } from '../../group/utils/renderChildrenAsGroupChildren';

export const selectBorderedContainerPropSetter: PropSetter<DivElementProps> = () => {
  return {
    className: classNames(styles.root, styles.container),
  };
};

export function SelectBorderedContainer(props: React.PropsWithChildren<DefaultGroupElementProps>) {
  const { children, ...attr } = props;
  return <div {...attr}>{children}</div>;
}

export const SelectBorderedContainerX = RenderGroupChildren((props, controller, childRenderer) => {
  const { children, ...attr } = props;
  return <div {...attr}>{childRenderer(children, controller)}</div>;
});
