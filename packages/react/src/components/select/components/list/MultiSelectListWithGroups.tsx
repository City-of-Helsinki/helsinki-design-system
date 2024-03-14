import React, { RefObject } from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { SelectDataHandlers, SelectMetaData, DivElementProps, Group } from '../../types';
import { getSelectedOptionsPerc, getGroupLabelOption, getAllOptions } from '../../utils';
import { MultiSelectOption } from './listItems/MultiSelectOption';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { MultiSelectGroupLabel } from './listItems/MultiSelectGroupLabel';
import { VirtualizedMSLWG } from './VirtualizedMSLWG';

export type GroupContent = { groupProps: DivElementProps & { key: string }; children: (JSX.Element | null)[] };

const createGroupOptionElements = (
  group: Group,
  { trigger, getOptionId }: Pick<SelectDataHandlers, 'trigger'> & Pick<SelectMetaData, 'getOptionId'>,
) => {
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
            getOptionId={getOptionId}
            isIntermediate={getGroupLabelIntermediateState(group)}
            isGroupDisabled={getGroupLabelDisabledState(group)}
            key={option.label}
          />
        );
      }
      return (
        <MultiSelectOption option={option} trigger={trigger} isInGroup key={option.value} getOptionId={getOptionId} />
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
  };
};

const createGroupContents = ({ getData, trigger, getMetaData }: SelectDataHandlers) => {
  const { groups } = getData();
  const { getOptionId } = getMetaData();

  return groups.reduce((arr: GroupContent[], group: Group) => {
    const attr = createGroupProps(group);
    const children = createGroupOptionElements(group, { trigger, getOptionId });
    return [...arr, { groupProps: { ...attr, key: attr['aria-label'] }, children }];
  }, []);
};

const createGroups = ({ getData, trigger, getMetaData }: SelectDataHandlers) => {
  const { groups } = getData();
  const { getOptionId } = getMetaData();

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
  const { getData, getMetaData } = dataHandlers;
  const { virtualize, open, groups } = getData();
  const { isSearching } = getMetaData();
  const attr = createContainerProps(dataHandlers);
  const choiceCount = getAllOptions(groups).length;
  const shouldRenderOptions = open && !isSearching;

  // if (virtualize && groups.length === 10000000000) {
  if (virtualize) {
    const groupContents = shouldRenderOptions ? createGroupContents(dataHandlers) : [];
    return <VirtualizedMSLWG groupContents={groupContents} containerProps={attr} />;
  }
  const children = shouldRenderOptions ? createGroups(dataHandlers) : [];
  return (
    <div {...attr}>
      <span className={styles.visuallyHidden}>{`${choiceCount} choices`}</span>
      {children}
    </div>
  );
}
