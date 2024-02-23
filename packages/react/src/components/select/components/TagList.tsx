import React, { useLayoutEffect } from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { Button, ButtonProps } from '../../button/Button';
import { getSelectedOptions, createOnClickListener } from '../utils';
import { SelectedTag } from './SelectedTag';
import { IconAngleDown, IconCrossCircleFill } from '../../../icons';
import { DivElementProps, Option, SelectData, SelectMetaData } from '../types';
import { useContextDataHandlers, useChangeTrigger } from '../../dataProvider/hooks';
import { getChildElementsPerRow } from '../../../utils/getChildElementsPerRow';
import { eventIds } from '../events';

type TagsProps = DivElementProps & {
  selectedOptions: Option[];
  metaData: SelectMetaData;
};

const clearButtonPropSetter = (): ButtonProps => {
  const trigger = useChangeTrigger();
  return {
    ...createOnClickListener({ id: eventIds.clearAllButton, trigger }),
    children: 'Clear all',
    variant: 'secondary',
    className: styles.clearAllButton,
  };
};

function ClearButton() {
  const { children, ...attr } = clearButtonPropSetter();
  return (
    <Button {...attr} iconRight={<IconCrossCircleFill />}>
      {children}
    </Button>
  );
}

const showAllButtonPropSetter = (): ButtonProps & { buttonRef: SelectMetaData['showAllButtonRef'] } => {
  const { getMetaData, getData } = useContextDataHandlers();
  const { groups } = getData() as SelectData;
  const { showAllTags, showAllButtonRef } = getMetaData() as SelectMetaData;
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
    buttonRef: showAllButtonRef,
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

function Tags(props: TagsProps) {
  const { selectedOptions, metaData } = props;
  const { tagListRef, showAllTags, elementIds } = metaData;

  const trigger = useChangeTrigger();
  return (
    <div
      id={elementIds.tagList}
      className={classNames(styles.tagList, showAllTags && styles.tagListExpanded)}
      ref={tagListRef}
    >
      {selectedOptions.map((option) => (
        <SelectedTag option={option} trigger={trigger} key={option.value} />
      ))}
    </div>
  );
}

export function checkIfShowAllButtonIsNeeded(metaData: SelectMetaData) {
  const tagListEl = metaData.tagListRef.current;
  const buttonEl = metaData.showAllButtonRef.current;
  if (tagListEl && buttonEl) {
    // Because tags can be removed at any time, checking just number
    // of visible items does not work.
    // When all items are visible and one is deleted, visible items cannot be used
    // to determise should "show less"-button be hidden.
    const numberOfTagRows = getChildElementsPerRow(tagListEl).length;
    if (numberOfTagRows < 2) {
      buttonEl.classList.add(styles.hiddenButton);
    } else {
      buttonEl.classList.remove(styles.hiddenButton);
    }
  }
}

export function TagList() {
  const { getMetaData, getData } = useContextDataHandlers();
  const { groups } = getData() as SelectData;
  const metaData = getMetaData() as SelectMetaData;

  const selectedOptions = getSelectedOptions(groups);

  useLayoutEffect(() => {
    checkIfShowAllButtonIsNeeded(metaData);
  });

  if (!selectedOptions.length) {
    return null;
  }
  return (
    <div className={classNames(styles.tagListContainer)}>
      <Tags selectedOptions={selectedOptions} metaData={metaData} />
      <div className={styles.tagListButtons}>
        <ShowAllButton />
        <ClearButton />
      </div>
    </div>
  );
}
