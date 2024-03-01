import React, { useLayoutEffect } from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { Button, ButtonProps } from '../../../button/Button';
import { getSelectedOptions, createOnClickListener } from '../../utils';
import { TagListItem } from './TagListItem';
import { IconAngleDown, IconCrossCircleFill } from '../../../../icons';
import { DivElementProps, SelectData, SelectDataHandlers, SelectMetaData } from '../../types';
import { useContextDataHandlers, useChangeTrigger } from '../../../dataProvider/hooks';
import { getChildElementsPerRow } from '../../../../utils/getChildElementsPerRow';
import { eventIds } from '../../events';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';

const clearButtonPropSetter = ({ getData, trigger }: SelectDataHandlers): ButtonProps => {
  const { disabled } = getData();
  return {
    ...createOnClickListener({ id: eventIds.clearAllButton, trigger }),
    children: 'Clear all',
    variant: 'secondary',
    className: styles.clearAllButton,
    disabled,
  };
};

function ClearButton() {
  const { children, ...attr } = clearButtonPropSetter(useContextDataHandlers());
  return (
    <Button {...attr} iconRight={<IconCrossCircleFill />}>
      {children}
    </Button>
  );
}

const showAllButtonPropSetter = (): ButtonProps & { buttonRef: SelectMetaData['refs']['showAllButton'] } => {
  const { getMetaData, getData } = useContextDataHandlers();
  const { groups, disabled } = getData() as SelectData;
  const { showAllTags, refs } = getMetaData() as SelectMetaData;
  const selectedOptions = getSelectedOptions(groups);
  const trigger = useChangeTrigger();
  return {
    ...createOnClickListener({ id: eventIds.showAllButton, trigger }),
    children: showAllTags ? (
      'Show less'
    ) : (
      <>
        Show all (<span className="count">{selectedOptions.length}</span>)
      </>
    ),
    variant: 'secondary',
    buttonRef: refs.showAllButton,
    disabled,
  };
};

function ShowAllButton() {
  const { children, buttonRef, ...attr } = showAllButtonPropSetter();
  return (
    <Button {...attr} ref={buttonRef} iconRight={<IconAngleDown />}>
      {children}
    </Button>
  );
}

function Tags() {
  const { getData, getMetaData, trigger } = useSelectDataHandlers();
  const { groups, disabled } = getData();
  const { refs, showAllTags, elementIds } = getMetaData();

  const selectedOptions = getSelectedOptions(groups);

  return (
    <div
      id={elementIds.tagList}
      className={classNames(styles.tagList, showAllTags && styles.tagListExpanded)}
      ref={refs.tagList}
    >
      {selectedOptions.map((option) => (
        <TagListItem option={option} trigger={trigger} key={option.value} disabled={disabled} />
      ))}
    </div>
  );
}

function checkIfShowAllButtonIsNeeded(metaData: SelectMetaData) {
  const tagListEl = metaData.refs.tagList.current;
  const buttonEl = metaData.refs.showAllButton.current;
  if (tagListEl && buttonEl) {
    // Because tags can be removed at any time, checking just number
    // of visible items does not work.
    // When all items are visible and one is deleted, visible items cannot be used
    // to determise should "show less"-button be hidden.
    const numberOfTagRows = getChildElementsPerRow(tagListEl).length;
    if (numberOfTagRows < 3) {
      buttonEl.classList.add(styles.hiddenButton);
    } else {
      buttonEl.classList.remove(styles.hiddenButton);
    }
  }
}

function createContainerProps(): DivElementProps {
  return {
    className: classNames(styles.tagListContainer),
  };
}

function createButtonContainerProps(): DivElementProps {
  return {
    className: classNames(styles.tagListButtons),
  };
}

export function TagList() {
  const { getData, getMetaData } = useSelectDataHandlers();
  const { groups, multiSelect } = getData();

  const selectedOptions = multiSelect ? getSelectedOptions(groups) : [];

  useLayoutEffect(() => {
    checkIfShowAllButtonIsNeeded(getMetaData());
  });

  if (!selectedOptions.length) {
    return null;
  }

  return (
    <div {...createContainerProps()}>
      <Tags />
      <div {...createButtonContainerProps()}>
        <ShowAllButton />
        <ClearButton />
      </div>
    </div>
  );
}
