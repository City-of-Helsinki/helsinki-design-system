import React, { RefObject } from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { SelectDataHandlers, SelectMetaData, DivElementProps, Group } from '../../types';
import { getSelectedOptionsPerc, getGroupLabelOption, getAllOptions } from '../../utils';
import { MultiSelectOption } from './listItems/MultiSelectOption';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { MultiSelectGroupLabel } from './listItems/MultiSelectGroupLabel';

const createGroupOptionElements = (group: Group, { trigger }: Pick<SelectDataHandlers, 'trigger'>) => {
  const getGroupLabelIntermediateState = (target: Group): boolean => {
    const perc = getSelectedOptionsPerc(target);
    return perc < 1 && perc > 0;
  };
  const getGroupLabelDisabledState = (target: Group): boolean => {
    return !target.options.some((opt) => !opt.isGroupLabel && !opt.disabled);
  };
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
            isIntermediate={getGroupLabelIntermediateState(group)}
            isGroupDisabled={getGroupLabelDisabledState(group)}
            key={option.label}
          />
        );
      }
      return <MultiSelectOption option={option} trigger={trigger} isInGroup key={option.value} />;
    })
    .filter((option) => !!option);
};

export function MultiSelectGroup(props: DivElementProps) {
  const { children, ...attr } = props;
  return (
    <div role="group" aria-label="Healthy choices" {...attr}>
      {children}
    </div>
  );
}

const createGroupProps = (group: Group) => {
  const labelOption = getGroupLabelOption(group);
  return {
    role: 'group',
    'aria-label': (labelOption && labelOption.label) || '',
  };
};

const createGroups = ({ getData, trigger, getMetaData }: SelectDataHandlers) => {
  const { groups, open } = getData();
  const { isSearching } = getMetaData();
  if (!open || isSearching) {
    return [];
  }
  return groups.map((group) => {
    const attr = createGroupProps(group);
    const children = createGroupOptionElements(group, { trigger });
    return (
      <MultiSelectGroup {...attr} key={attr['aria-label']}>
        {children}
      </MultiSelectGroup>
    );
  });
};

const createContainerProps = ({
  getMetaData,
}: SelectDataHandlers): DivElementProps & { ref: RefObject<HTMLDivElement> } => {
  const { elementIds, refs } = getMetaData() as SelectMetaData;

  return {
    'aria-labelledby': elementIds.label,
    id: elementIds.list,
    className: classNames(styles.list, styles.shiftOptions, styles.multiSelectList),
    ref: refs.list as unknown as RefObject<HTMLDivElement>,
    role: 'group',
    tabIndex: 0,
  };
};

export function MultiSelectListWithGroups() {
  const dataHandlers = useSelectDataHandlers();
  const attr = createContainerProps(dataHandlers);
  const children = createGroups(dataHandlers);
  const choiceCount = getAllOptions(dataHandlers.getData().groups).length;
  return (
    <div {...attr}>
      <span className={styles.visuallyHidden}>{`${choiceCount} choices`}</span>
      {children}
    </div>
  );
}
