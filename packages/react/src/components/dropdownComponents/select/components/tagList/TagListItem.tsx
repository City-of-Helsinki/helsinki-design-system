import React from 'react';

import styles from '../../Select.module.scss';
import { SelectDataHandlers } from '../../types';
import { DivElementProps } from '../../../modularOptionList/types';
import { Option } from '../../../modularOptionList/types';
import classNames from '../../../../../utils/classNames';
import { Tag, TagProps } from '../../../../tag/Tag';
import { ChangeTrigger } from '../../../../dataProvider/DataContext';
import { eventTypes, eventIds } from '../../events';
import { getTextKey } from '../../texts';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';

type SelectedTagProps = { option: Option; trigger: ChangeTrigger; disabled: boolean };

// use with id `#${elementIds.tagList} ${tagSelector}`
// or <tagListElement>.querySelectorAll(`* ${tagSelector}`)
export const tagSelectorForTagList = '> div';

const createSelectedTagProps = (
  { option, trigger, disabled }: SelectedTagProps,
  { getMetaData }: SelectDataHandlers,
): TagProps & Pick<DivElementProps, 'aria-label'> => {
  const componentOrOptionDisabled = disabled || option.disabled;
  const ariaLabel = getTextKey('tagRemoveSelectionAriaLabel', getMetaData(), { label: option.label }) as string;
  return {
    'aria-label': ariaLabel,
    className: classNames(styles.tag, componentOrOptionDisabled && styles.disabledTag),
    onClick: (e) => {
      e.stopPropagation();
    },
    multiline: true,
    onDelete: componentOrOptionDisabled
      ? undefined
      : (e) => {
          e.stopPropagation();
          trigger({ id: eventIds.tag, type: eventTypes.click, payload: { value: option } });
        },
    children: option.label,
  };
};

export function TagListItem(props: SelectedTagProps) {
  const { children, ...attr } = createSelectedTagProps(props, useSelectDataHandlers());
  // @ts-ignore
  return <Tag {...attr}>{children}</Tag>;
}
