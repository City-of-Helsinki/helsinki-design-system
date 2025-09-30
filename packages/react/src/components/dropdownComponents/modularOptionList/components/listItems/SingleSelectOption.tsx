import React, { memo } from 'react';

import styles from '../../ModularOptionList.module.scss';
import classNames from '../../../../../utils/classNames';
import { LiElementProps } from '../../types';
import { eventIds, eventTypes } from '../../events';
import { ModularOptionListItemProps } from '../common';
import { IconCheck } from '../../../../../icons';

export const singleSelectOptionSelector = `li.${styles.singleSelectListItem}`;

export const isSingleSelectOption = (element: HTMLElement | null | undefined) => {
  return element && element.matches(singleSelectOptionSelector);
};

const Label = ({ text, selected }: { text: string; selected: boolean }) => {
  return (
    <span className={styles.singleSelectListItemLabel}>
      {text}
      {selected ? (
        <span>
          <IconCheck aria-hidden />
        </span>
      ) : (
        ''
      )}
    </span>
  );
};

const createSingleSelectItemProps = ({ option, trigger, getOptionId }: ModularOptionListItemProps): LiElementProps => {
  const { label, selected, disabled } = option;
  return {
    className: classNames(
      styles.listItem,
      styles.selectableListItem,
      styles.singleSelectListItem,
      styles.focusableListItem,
      selected && styles.selected,
      disabled && styles.disabledOption,
    ),
    children: <Label text={label} selected={selected} />,
    onClick: (originalEvent: React.MouseEvent) => {
      if (option.selected) {
        return;
      }
      trigger({
        id: eventIds.listItem,
        type: eventTypes.click,
        payload: { originalEvent, value: option },
      });
    },
    role: 'option',
    'aria-selected': selected,
    'aria-disabled': disabled,
    tabIndex: -1,
    id: getOptionId(option),
  };
};

function SingleSelectOption(props: ModularOptionListItemProps) {
  const { children, ...attr } = createSingleSelectItemProps(props);
  return <li {...attr}>{children}</li>;
}

export const MemoizedSingleSelectOption = memo<ModularOptionListItemProps>(
  SingleSelectOption,
  ({ option: oldOption, trigger: oldTrigger }, { option: newOption, trigger: newTrigger }) => {
    // option.visible is checked in parent component and option.value is used as prop.key,
    // so those are not compared.
    // comparing "trigger" functions makes the memoization more unefficient, because the trigger changes every time
    // ModularOptionList component's props are changed externally. This might cause update lag, when there are hundreds of options.
    return (
      oldOption.selected === newOption.selected &&
      oldOption.disabled === newOption.disabled &&
      oldOption.label === newOption.label &&
      oldTrigger === newTrigger
    );
  },
);
