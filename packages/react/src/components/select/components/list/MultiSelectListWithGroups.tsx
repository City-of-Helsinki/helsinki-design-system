import React, { RefObject } from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { SelectDataHandlers, SelectMetaData, DivElementProps, Group, SelectData } from '../../types';
import { getSelectedOptionsPerc, getGroupLabelOption, getVisibleGroupLabels, countVisibleOptions } from '../../utils';
import { MemoizedMultiSelectOption } from './listItems/MultiSelectOption';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { MultiSelectGroupLabel } from './listItems/MultiSelectGroupLabel';
import { getTextKeyFromDataHandlers } from '../../texts';

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

export const createGroupProps = (group: Group) => {
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
    if (!children.length) {
      return null;
    }
    return (
      <MultiSelectGroup {...attr} key={attr['aria-label']}>
        {children}
      </MultiSelectGroup>
    );
  });
};

export const createContainerProps = (
  dataHandlers: SelectDataHandlers,
): DivElementProps & { ref: RefObject<HTMLDivElement> } => {
  const { getData, getMetaData } = dataHandlers;
  const { groups } = getData();
  const { elementIds, refs, listInputType } = getMetaData();
  const hasInput = !!listInputType;
  const hasVisibleGroupLabels = getVisibleGroupLabels(groups).length > 0;
  const hasInputAndGroups = hasInput || hasVisibleGroupLabels;
  const hasOnlyGroups = !hasInput && hasVisibleGroupLabels;
  const choiceCount = countVisibleOptions(groups);
  const label = getTextKeyFromDataHandlers('label', dataHandlers);
  const getRole = (): DivElementProps['role'] => {
    if (hasOnlyGroups) {
      return undefined;
    }
    if (hasInputAndGroups) {
      return 'dialog';
    }
    return 'listbox';
  };
  const getAriaLabel = (): DivElementProps['aria-labelledby'] => {
    if (hasOnlyGroups) {
      return undefined;
    }
    if (hasInputAndGroups) {
      return `${choiceCount} choices.`;
    }
    return `${label}. ${choiceCount} choices.`;
  };
  return {
    'aria-label': getAriaLabel(),
    id: elementIds.list,
    className: classNames(styles.list, styles.shiftOptions, styles.multiSelectList),
    ref: refs.list as unknown as RefObject<HTMLDivElement>,
    role: getRole(),
    tabIndex: -1,
  };
};

export function MultiSelectListWithGroups() {
  const dataHandlers = useSelectDataHandlers();
  const { getData, getMetaData, trigger } = dataHandlers;
  const { open, groups } = getData();
  const { isSearching, getOptionId } = getMetaData();
  const attr = createContainerProps(dataHandlers);

  const shouldRenderOptions = open && !isSearching;
  const children = shouldRenderOptions ? createGroups({ groups, getOptionId, trigger }) : [];
  return <div {...attr}>{open ? children : null}</div>;
}
