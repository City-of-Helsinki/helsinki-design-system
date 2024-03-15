import React, { useLayoutEffect } from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { getSelectedOptions } from '../../utils';
import { Tags } from './Tags';
import { DivElementProps, SelectMetaData } from '../../types';
import { getChildElementsPerRow } from '../../../../utils/getChildElementsPerRow';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { getIndexOfFirstVisibleChild } from '../../../../utils/getIndexOfFirstVisibleChild';
import { TagListButtons } from './TagListButtons';

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

function makeHiddenElementsUnfocusable(metaData: SelectMetaData) {
  const tagListEl = metaData.refs.tagList.current;

  const tags = tagListEl && tagListEl.querySelectorAll('* > div');
  if (tags) {
    const firstVisible = getIndexOfFirstVisibleChild(tagListEl, 'vertical');
    const firstHidden = firstVisible > -1 ? firstVisible + 1 : -1;
    let index = 0;
    tags.forEach((el) => {
      if (el && (el as HTMLElement).setAttribute) {
        (el as HTMLElement).setAttribute('tabindex', index < firstHidden ? '0' : '-1');
      }
      index += 1;
    });
  }
}

function createContainerProps(showAllTags: boolean): DivElementProps {
  return {
    className: classNames(styles.tagListContainer, showAllTags && styles.tagListExpanded),
  };
}

export function TagList() {
  const { getData, getMetaData } = useSelectDataHandlers();
  const { groups, multiSelect, noTags } = getData();
  const { showAllTags } = getMetaData();

  const selectedOptions = multiSelect ? getSelectedOptions(groups) : [];

  useLayoutEffect(() => {
    checkIfShowAllButtonIsNeeded(getMetaData());
    makeHiddenElementsUnfocusable(getMetaData());
  });

  if (!selectedOptions.length || noTags) {
    return null;
  }

  return (
    <div {...createContainerProps(showAllTags)}>
      <Tags />
      <TagListButtons />
    </div>
  );
}
