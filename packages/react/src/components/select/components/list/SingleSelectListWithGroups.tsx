import React from 'react';

import styles from '../../Select.module.scss';
import { SelectData, SelectDataHandlers, SelectMetaData } from '../../types';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { createListElementProps, createOptionElements } from './SingleSelectAndGrouplessList';
import { createGroupProps } from './MultiSelectListWithGroups';
import classNames from '../../../../utils/classNames';

const createGroups = ({
  groups,
  getOptionId,
  trigger,
}: Pick<SelectData, 'groups'> & Pick<SelectMetaData, 'getOptionId'> & Pick<SelectDataHandlers, 'trigger'>) => {
  return groups.map((group) => {
    const attr = { ...createGroupProps(group), className: classNames(styles.list, styles.shiftOptions) };
    const children = createOptionElements({ groups: [group], trigger, getOptionId, multiSelect: false });
    return (
      <ul {...attr} key={attr['aria-label']}>
        {children}
      </ul>
    );
  });
};

export function SingleSelectListWithGroups() {
  const { getData, trigger, getMetaData } = useSelectDataHandlers();
  const { open, groups, multiSelect } = getData();
  const { isSearching, getOptionId, refs, elementIds } = getMetaData();
  const attr = createListElementProps<HTMLDivElement>({ refs, elementIds, multiSelect });
  const shouldRenderOptions = open && !isSearching;
  const children = shouldRenderOptions ? createGroups({ groups, trigger, getOptionId }) : null;
  return <div {...attr}>{children}</div>;
}
