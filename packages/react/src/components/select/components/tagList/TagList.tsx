import React, { useLayoutEffect } from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { Tags } from './Tags';
import { DivElementProps, SelectMetaData } from '../../types';
import { getChildElementsPerRow } from '../../../../utils/getChildElementsPerRow';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { getIndexOfFirstVisibleChild } from '../../../../utils/getIndexOfFirstVisibleChild';
import { TagListButtons } from './TagListButtons';
import { tagSelectorForTagList } from './TagListItem';

function makeTwoOrAllRowsVisible(refs: SelectMetaData['refs'], showAll: boolean) {
  const tagListEl = refs.tagList.current;
  if (tagListEl) {
    const elementsPerRow = getChildElementsPerRow(tagListEl);
    const targetRow = showAll ? elementsPerRow[elementsPerRow.length - 1] : elementsPerRow[1];
    // because elements are tags no need check the height of each element per row.
    // if there is a tag with 2 lines of text, it's the only one in that row. Otherwise they are one liners
    const element = targetRow && targetRow[0];
    const tagListY = tagListEl.getBoundingClientRect().top;
    const maxHeight = element ? `${element.getBoundingClientRect().bottom - tagListY}px` : undefined;

    tagListEl.style.maxHeight = maxHeight;
    return elementsPerRow;
  }
  return [];
}

function checkIfShowAllButtonIsNeeded(refs: SelectMetaData['refs'], numberOfTagRows: number) {
  const buttonEl = refs.showAllButton.current;
  const visibleRowsBeforeShowAll = 2;
  if (buttonEl) {
    // Because tags can be removed at any time, checking just number
    // of visible items does not work.
    // When all items are visible and one is deleted, visible items cannot be used
    // to determise should "show less"-button be hidden.
    if (numberOfTagRows <= visibleRowsBeforeShowAll) {
      buttonEl.classList.add(styles.hiddenButton);
    } else {
      buttonEl.classList.remove(styles.hiddenButton);
    }
  }
}

function makeHiddenElementsUnfocusable(refs: SelectMetaData['refs']) {
  const tagListEl = refs.tagList.current;

  const tags = tagListEl && tagListEl.querySelectorAll(`* ${tagSelectorForTagList}`);
  if (tags) {
    const firstVisible = getIndexOfFirstVisibleChild(tagListEl, 'vertical');
    const firstHidden = firstVisible > -1 ? firstVisible + 1 : -1;
    let index = 0;
    tags.forEach((el) => {
      if (el && (el as HTMLElement).setAttribute) {
        (el as HTMLElement).setAttribute('tabindex', index < firstHidden ? '0' : '-1');
        (el as HTMLElement).setAttribute('aria-hidden', index < firstHidden ? 'false' : 'true');
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
  const { multiSelect, noTags } = getData();
  const { showAllTags, selectedOptions } = getMetaData();

  const selectedOptioList = multiSelect ? selectedOptions : [];

  useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { refs, showAllTags } = getMetaData();
    const rows = makeTwoOrAllRowsVisible(refs, showAllTags);
    checkIfShowAllButtonIsNeeded(refs, rows.length);
    makeHiddenElementsUnfocusable(refs);
  });

  if (!selectedOptioList.length || noTags) {
    return null;
  }

  return (
    <div {...createContainerProps(showAllTags)}>
      <Tags />
      <TagListButtons />
    </div>
  );
}
