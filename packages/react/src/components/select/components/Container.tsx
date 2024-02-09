import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { RenderGroupChildren } from '../../group/utils/renderChildrenAsGroupChildren';

export const containerGroupId = 'container';

export const Container = RenderGroupChildren((props, controller, childRenderer) => {
  const { children } = props;
  return <div className={classNames(styles.wrapper)}>{childRenderer(children, controller)}</div>;
});
