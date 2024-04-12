import React, { RefObject } from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { SelectDataHandlers, SelectMetaData, DivElementProps, Group, SelectData } from '../../types';
import { getSelectedOptionsPerc, getGroupLabelOption, getAllOptions } from '../../utils';
import { MemoizedMultiSelectOption } from './listItems/MultiSelectOption';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { MultiSelectGroupLabel } from './listItems/MultiSelectGroupLabel';

const getGroupLabelIntermediateState = (target: Group): boolean => {
  const perc = getSelectedOptionsPerc(target);
  return perc < 1 && perc > 0;
};
const getGroupLabelDisabledState = (target: Group): boolean => {
  return !target.options.some((opt) => !opt.isGroupLabel && !opt.disabled);
};

export const createGroupOptionElements = (
  group: Group,
  { trigger, getOptionId }: Pick<SelectDataHandlers, 'trigger'> & Pick<SelectMetaData, 'getOptionId'>,
) => {
  return group.options
    .map((option) => {
      if (!option.visible) {
        return null;
      }

      if (option.isGroupLabel) {
        return (
          <MultiSelectGroupLabel
            option={option}
            trigger={trigger}
            getOptionId={getOptionId}
            isIntermediate={getGroupLabelIntermediateState(group)}
            isGroupDisabled={getGroupLabelDisabledState(group)}
            key={option.value}
          />
        );
      }
      return (
        <MemoizedMultiSelectOption
          option={option}
          trigger={trigger}
          isInGroup
          key={option.value}
          getOptionId={getOptionId}
        />
      );
    })
    .filter((option) => !!option);
};

export function MultiSelectGroup(props: DivElementProps) {
  const { children, ...attr } = props;
  return <div {...attr}>{children}</div>;
}

const createGroupProps = (group: Group) => {
  const labelOption = getGroupLabelOption(group);
  return {
    role: 'group',
    'aria-label': (labelOption && labelOption.label) || '',
    key: labelOption && labelOption.label,
  };
};

export const createGroups = ({
  groups,
  getOptionId,
  trigger,
}: Pick<SelectData, 'groups'> & Pick<SelectMetaData, 'getOptionId'> & Pick<SelectDataHandlers, 'trigger'>) => {
  return groups.map((group) => {
    const attr = createGroupProps(group);
    const children = createGroupOptionElements(group, { trigger, getOptionId });
    return (
      <MultiSelectGroup {...attr} key={attr['aria-label']}>
        {children}
      </MultiSelectGroup>
    );
  });
};

export const createContainerProps = ({
  getMetaData,
}: SelectDataHandlers): DivElementProps & { ref: RefObject<HTMLDivElement> } => {
  const { elementIds, refs } = getMetaData() as SelectMetaData;

  return {
    'aria-labelledby': `${elementIds.label} ${elementIds.choicesCount}`,
    id: elementIds.list,
    className: classNames(styles.list, styles.shiftOptions, styles.multiSelectList),
    ref: refs.list as unknown as RefObject<HTMLDivElement>,
    role: 'group',
  };
};

export function MultiSelectListWithGroups() {
  const dataHandlers = useSelectDataHandlers();
  const { getData, getMetaData, trigger } = dataHandlers;
  const { open, groups } = getData();
  const { isSearching, getOptionId, elementIds } = getMetaData();
  const attr = createContainerProps(dataHandlers);
  const choiceCount = getAllOptions(groups).length;
  const shouldRenderOptions = open && !isSearching;
  const children = shouldRenderOptions ? createGroups({ groups, getOptionId, trigger }) : [];
  return (
    <div {...attr}>
      <span className={styles.visuallyHidden} id={elementIds.choicesCount}>{`${choiceCount} choices`}</span>
      {children}
    </div>
  );
}
