import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { RenderGroupChildren } from '../../group/utils/renderChildrenAsGroupChildren';

export const SelectionsAndListsContainer = RenderGroupChildren((props, controller, childRenderer) => {
  const { children } = props;
  return <div className={classNames(styles.root, styles.container)}>{childRenderer(children, controller)}</div>;
});
