import React from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { TagListItem } from './TagListItem';

export function Tags() {
  const { getData, getMetaData, trigger } = useSelectDataHandlers();
  const { disabled } = getData();
  const { refs, elementIds, selectedOptions } = getMetaData();

  return (
    <div id={elementIds.tagList} className={classNames(styles.tagList)} ref={refs.tagList}>
      {selectedOptions.map((option) => (
        <TagListItem option={option} trigger={trigger} key={option.value} disabled={disabled} />
      ))}
    </div>
  );
}
