import React, { RefObject } from 'react';

import styles from '../Select.module.scss';
import { SelectData, UlElementProps } from '..';
import classNames from '../../../utils/classNames';
import { PropSetter } from '../../group/utils';
import { RenderGroupChildren } from '../../group/utils/renderChildrenAsGroupChildren';

export const listAndInputContainerPropSetter: PropSetter<UlElementProps> = ({ controller }) => {
  const data = controller.getData() as SelectData;
  const isOpen = data.open;
  return {
    className: classNames(styles.listAndInputContainer, isOpen && styles.listAndInputContainerVisible),
  };
};

export const ListAndInputContainer = RenderGroupChildren((props, controller, childRenderer) => {
  const ref = controller.getMetaData().listContainerRef as RefObject<HTMLDivElement>;
  const { children, ...attr } = props;
  return (
    <div {...attr} ref={ref}>
      {childRenderer(children, controller)}
    </div>
  );
});
