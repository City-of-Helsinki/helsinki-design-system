import React from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { getSelectedOptions } from '../../utils';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { TagListItem } from './TagListItem';

export function Tags() {
  const { getData, getMetaData, trigger } = useSelectDataHandlers();
  const { groups, disabled } = getData();
  const { refs, elementIds } = getMetaData();

  const selectedOptions = getSelectedOptions(groups);

  return (
    <div id={elementIds.tagList} className={classNames(styles.tagList)} ref={refs.tagList}>
      {selectedOptions.map((option) => (
        <TagListItem option={option} trigger={trigger} key={option.value} disabled={disabled} />
      ))}
    </div>
  );
}
