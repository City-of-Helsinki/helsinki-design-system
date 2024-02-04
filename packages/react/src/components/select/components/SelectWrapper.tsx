import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

import styles from './styles.module.scss';
import classNames from '../../../utils/classNames';
import { DefaultGroupElementProps, PropSetter } from '../../group/utils';
import { RenderGroupChildren } from '../../group/utils/renderChildrenAsGroupChildren';

export type DivElementProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, never>;

export const selectWrapperPropSetter: PropSetter<DivElementProps> = () => {
  return {
    className: classNames(styles.wrapper),
  };
};

export function SelectWrapper(props: React.PropsWithChildren<DefaultGroupElementProps>) {
  const { children, ...attr } = props;
  return <div {...attr}>{children}</div>;
}

export const SelectWrapperX = RenderGroupChildren((props, controller, childRenderer) => {
  const { children, ...attr } = props;
  return <div {...attr}>{childRenderer(children, controller)}</div>;
});
