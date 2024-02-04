import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

import styles from './styles.module.scss';
import classNames from '../../../utils/classNames';
import { Controller, DefaultGroupElementProps, PropSetter } from '../../group/utils';
import { Option, SelectData } from '../index';
import { createOptionsListItemProps, MultiSelectOptionListItem, OptionListItem } from './OptionListItem';
import { getAllOptions, getMultiSelectState, getOptionGroupIndex, getSelectedOptionsPerc } from '../utils';

export type UlElementProps = DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, never>;
export type LiElementProps = DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, never>;

const createListOptions = (data: SelectData, controller: Controller) => {
  const { groups } = data;
  const isMultiSelect = getMultiSelectState(controller);
  const getGroupLabelIntermediateState = (option: Option): boolean => {
    if (!option.isGroupLabel || option.selected) {
      return false;
    }
    const optionGroup = groups[getOptionGroupIndex(groups, option)];
    const perc = optionGroup ? getSelectedOptionsPerc(optionGroup) : 0;
    return perc < 1 && perc > 0;
  };
  return getAllOptions(groups, false).map((option) => {
    const { children, ...attr } = createOptionsListItemProps({
      option,
      controller,
      isMultiSelect,
      isIntermediate: getGroupLabelIntermediateState(option),
    });
    if (!option.visible) {
      return null;
    }
    const Component = isMultiSelect ? MultiSelectOptionListItem : OptionListItem;
    return (
      <Component {...attr} key={option.value as string}>
        {children}
      </Component>
    );
  });
};

export const optionsListPropSetter: PropSetter<UlElementProps> = ({ controller }) => {
  const data = controller.getData() as SelectData;
  const isOpen = data.open;
  return {
    className: classNames(styles.list, isOpen && styles.listVisible),
    children: isOpen ? createListOptions(data, controller) : null,
    containerProps: {
      className: 'c',
    },
  };
};

export const OptionsList = (props: React.PropsWithChildren<DefaultGroupElementProps>) => {
  const { children, containerProps, ...attr } = props;
  return (
    <div {...containerProps}>
      <ul {...attr}>{children}</ul>
    </div>
  );
};
