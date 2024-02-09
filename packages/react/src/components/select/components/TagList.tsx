import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { Button, ButtonProps } from '../../button/Button';
import { Controller, DefaultGroupElementProps, PropSetter } from '../../group/utils';
import { createOnClickListener } from '../../group/utils/propSetterHelpers';
import { getMetaDataFromController, getSelectDataFromController, getSelectedOptions } from '../utils';
import { SelectedTag, selectedTagPropSetter } from './SelectedTag';
import { IconAngleDown, IconCrossCircleFill } from '../../../icons';
import { DivElementProps, Option, SelectMetaData } from '..';
import { eventTypes, groupIds } from '../groupData';
import { getIndexOfFirstVisibleChild } from '../../../utils/getIndexOfFirstVisibleChild';

type TagContainerProps = DivElementProps & {
  options: Option[];
  controller: Controller;
  containerRef: SelectMetaData['tagListRef'];
};

type TagListProps = DivElementProps & {
  clearButtonProps: ButtonProps;
  showAllButtonProps: ButtonProps & { buttonRef: SelectMetaData['showAllButtonRef'] };
  tagContainerProps: TagContainerProps;
};

export const tagListPropSetter: PropSetter<TagListProps> = (propSetterProps) => {
  const { controller } = propSetterProps;
  const { groups } = getSelectDataFromController(controller);
  const { elementIds, showAllTags, tagListRef, showAllButtonRef } = getMetaDataFromController(controller);
  const selectedOptions = getSelectedOptions(groups);
  const clearButtonProps: ButtonProps = {
    ...createOnClickListener({ id: groupIds.clearAllButton, controller }, eventTypes.click),
    children: 'Clear all',
    variant: 'secondary',
    className: styles.clearAllButton,
  };
  const showAllButtonProps: TagListProps['showAllButtonProps'] = {
    ...createOnClickListener({ id: groupIds.showAllButton, controller }, eventTypes.click),
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

  const tagContainerProps: TagContainerProps = {
    options: selectedOptions,
    controller,
    id: elementIds.tagList,
    containerRef: tagListRef,
    className: classNames(styles.tagList, showAllTags && styles.tagListExpanded),
  };

  return {
    className: classNames(styles.tagListContainer),
    clearButtonProps,
    showAllButtonProps,
    tagContainerProps,
  };
};

function ClearButton(props: TagListProps['clearButtonProps']) {
  const { children, ...attr } = props;
  return (
    <Button {...attr} iconRight={<IconCrossCircleFill />}>
      {children}
    </Button>
  );
}

function ShowAllButton(props: TagListProps['showAllButtonProps']) {
  const { children, buttonRef, ...attr } = props;
  return (
    <Button {...attr} ref={buttonRef} iconRight={<IconAngleDown />}>
      {children}
    </Button>
  );
}
function Tags(props: TagContainerProps) {
  const { options, className, containerRef, controller } = props || {};
  return (
    <div className={className} ref={containerRef}>
      {options.map((option) => (
        <SelectedTag {...selectedTagPropSetter({ option, controller })} key={option.value} />
      ))}
    </div>
  );
}

export function checkIfShowAllButtonIsNeeded(metaData: SelectMetaData) {
  const tagListEl = metaData.tagListRef.current;
  const buttonEl = metaData.showAllButtonRef.current;
  if (tagListEl && buttonEl && !metaData.showAllTags) {
    const firstVisible = getIndexOfFirstVisibleChild(tagListEl);
    const childCount = tagListEl.children.length - 1;
    const hiddenItems = childCount - firstVisible;
    if (!hiddenItems) {
      buttonEl.classList.add(styles.hiddenButton);
    } else {
      buttonEl.classList.remove(styles.hiddenButton);
    }
  }
}

export function TagList(props: DefaultGroupElementProps) {
  const { clearButtonProps, showAllButtonProps, tagContainerProps, ...attr } = (props as unknown) as TagListProps;
  const showAllButton = showAllButtonProps;
  if (!tagContainerProps.options.length) {
    return null;
  }
  return (
    <div {...attr}>
      <Tags {...tagContainerProps} />
      <div className={styles.tagListButtons}>
        {showAllButton && <ShowAllButton {...showAllButtonProps} />}
        <ClearButton {...clearButtonProps} />
      </div>
    </div>
  );
}
