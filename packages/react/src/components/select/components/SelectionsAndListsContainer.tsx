import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { PropSetter } from '../../group/utils';
import { DivElementProps } from './SelectWrapper';
import { RenderGroupChildren } from '../../group/utils/renderChildrenAsGroupChildren';

export const selectionsAndListsContainerPropSetter: PropSetter<DivElementProps> = () => {
  return {
    className: classNames(styles.root, styles.container),
  };
};

export const SelectionsAndListsContainer = RenderGroupChildren((props, controller, childRenderer) => {
  const { children, ...attr } = props;
  return <div {...attr}>{childRenderer(children, controller)}</div>;
});
