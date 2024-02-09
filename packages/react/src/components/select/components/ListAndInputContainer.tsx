import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { RenderGroupChildren } from '../../group/utils/renderChildrenAsGroupChildren';
import { getMetaDataFromController, getSelectDataFromController } from '../utils';

export const ListAndInputContainer = RenderGroupChildren((props, controller, childRenderer) => {
  const { listContainerRef } = getMetaDataFromController(controller);
  const { open, showFiltering, showSearch } = getSelectDataFromController(controller);
  const hasInput = showFiltering || showSearch;
  const { children } = props;
  return (
    <div
      className={classNames(
        styles.listAndInputContainer,
        open && styles.listAndInputContainerVisible,
        hasInput && styles.withSearchOrFilter,
      )}
      ref={listContainerRef}
    >
      {childRenderer(children, controller)}
    </div>
  );
});
