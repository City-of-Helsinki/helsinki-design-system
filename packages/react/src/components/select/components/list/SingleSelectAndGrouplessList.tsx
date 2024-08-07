import React, { RefObject } from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { SelectData, SelectDataHandlers, SelectMetaData } from '../../types';
import { getAllOptions } from '../../utils';
import { MemoizedMultiSelectOption } from './listItems/MultiSelectOption';
import { MemoizedSingleSelectOption } from './listItems/SingleSelectOption';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { SingleSelectGroupLabel } from './listItems/SingleSelectGroupLabel';
import { SelectItemProps } from './common';

export const createOptionElements = ({
  groups,
  multiSelect,
  getOptionId,
  trigger,
}: Pick<SelectData, 'groups' | 'multiSelect'> &
  Pick<SelectMetaData, 'getOptionId'> &
  Pick<SelectDataHandlers, 'trigger'>) => {
  return getAllOptions(groups, false)
    .map((option) => {
      if (!option.visible) {
        return null;
      }
      const props: SelectItemProps & { key: string } = {
        option,
        trigger,
        key: option.value,
        getOptionId,
      };
      if (multiSelect) {
        return <MemoizedMultiSelectOption {...props} isInGroup={false} />;
      }
      if (option.isGroupLabel) {
        return <SingleSelectGroupLabel {...props} />;
      }
      return <MemoizedSingleSelectOption {...props} />;
    })
    .filter((option) => !!option);
};

export function createListElementProps<T = HTMLUListElement>({
  refs,
  elementIds,
  multiSelect,
}: Pick<SelectMetaData, 'refs' | 'elementIds'> & Pick<SelectData, 'multiSelect'>) {
  return {
    className: classNames(styles.list),
    ref: refs.list as unknown as RefObject<T>,
    id: elementIds.list,
    role: 'listbox',
    'aria-multiselectable': multiSelect,
    tabIndex: -1,
  };
}

export function SingleSelectAndGrouplessList() {
  const { getData, trigger, getMetaData } = useSelectDataHandlers();
  const { open, groups, multiSelect } = getData();
  const { getOptionId, refs, elementIds } = getMetaData();
  const attr = createListElementProps({ refs, elementIds, multiSelect });

  const children = open ? createOptionElements({ groups, trigger, multiSelect, getOptionId }) : null;
  return <ul {...attr}>{children}</ul>;
}
