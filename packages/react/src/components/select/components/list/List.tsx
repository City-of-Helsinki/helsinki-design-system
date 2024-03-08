import React from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { DivElementProps, SelectData, SelectDataHandlers, SelectMetaData } from '../../types';
import {
  createSingleSelectGroupLabelProps,
  createSingleSelectItemProps,
  LiElementWithCheckboxProps,
  OptionListItem,
  SelectItemProps,
} from './SingleSelectItem';
import { getAllOptions, getVisibleGroupLabels } from '../../utils';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { ChangeTrigger } from '../../../dataProvider/DataContext';

const createOptionsListItemProps = ({ option, trigger }: SelectItemProps): LiElementWithCheckboxProps => {
  const { isGroupLabel } = option;
  if (isGroupLabel) {
    return createSingleSelectGroupLabelProps(option);
  }
  return createSingleSelectItemProps({ option, trigger });
};

const createOptionElements = (groups: SelectData['groups'], trigger: ChangeTrigger) => {
  return getAllOptions(groups, false)
    .map((option) => {
      const { children, ...attr } = createOptionsListItemProps({
        option,
        trigger,
      });
      if (!option.visible) {
        return null;
      }
      return (
        <OptionListItem {...attr} key={option.value as string}>
          {children}
        </OptionListItem>
      );
    })
    .filter((option) => !!option);
};

const createOptionsListChildren = ({ getData, trigger }: SelectDataHandlers) => {
  const { open, groups } = getData();
  return {
    children: open ? createOptionElements(groups, trigger) : null,
  };
};

const createContainerProps = (): DivElementProps => {
  return {
    className: styles.listContainer,
  };
};

const createListElementProps = ({ getData, getMetaData }: SelectDataHandlers) => {
  const { groups } = getData() as SelectData;
  const { refs, elementIds } = getMetaData() as SelectMetaData;
  const hasVisibleGroupLabels = getVisibleGroupLabels(groups).length > 0;

  return {
    className: classNames(styles.list, hasVisibleGroupLabels && styles.shiftOptions),
    ref: refs.list,
    tabIndex: 0,
    id: elementIds.list,
    role: 'listbox',
  };
};

export const List = () => {
  const handlers = useSelectDataHandlers();
  const { children } = createOptionsListChildren(handlers);
  if (!children || (Array.isArray(children) && !children.length)) {
    return null;
  }
  const listElementProps = createListElementProps(handlers);
  return (
    <div {...createContainerProps()}>
      <ul {...listElementProps}>{children}</ul>
    </div>
  );
};
