import React from 'react';

import styles from '../Select.module.scss';
import { UlElementProps } from '..';
import classNames from '../../../utils/classNames';
import { PropSetter } from '../../group/utils';
import { RenderGroupChildren } from '../../group/utils/renderChildrenAsGroupChildren';
import { getMetaDataFromController, getSelectDataFromController } from '../utils';

export const listAndInputContainerPropSetter: PropSetter<UlElementProps> = ({ controller }) => {
  const { open, showFiltering, showSearch } = getSelectDataFromController(controller);
  const hasInput = showFiltering || showSearch;
  return {
    className: classNames(
      styles.listAndInputContainer,
      open && styles.listAndInputContainerVisible,
      hasInput && styles.withSearchOrFilter,
    ),
  };
};

export const ListAndInputContainer = RenderGroupChildren((props, controller, childRenderer) => {
  const { listContainerRef } = getMetaDataFromController(controller);
  const { children, ...attr } = props;
  return (
    <div {...attr} ref={listContainerRef}>
      {childRenderer(children, controller)}
    </div>
  );
});
