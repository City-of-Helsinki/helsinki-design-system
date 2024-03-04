import React, { useLayoutEffect } from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { getSelectedOptions } from '../../utils';
import { Tags } from './Tags';
import { DivElementProps, SelectMetaData } from '../../types';
import { getChildElementsPerRow } from '../../../../utils/getChildElementsPerRow';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { ClearAllButton } from './ClearAllButton';
import { ShowAllButton } from './SelectAllButton';

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
  const { groups, multiSelect, noTags } = getData();

  const selectedOptions = multiSelect ? getSelectedOptions(groups) : [];

  useLayoutEffect(() => {
    checkIfShowAllButtonIsNeeded(getMetaData());
  });

  if (!selectedOptions.length || noTags) {
    return null;
  }

  return (
    <div {...createContainerProps()}>
      <Tags />
      <div {...createButtonContainerProps()}>
        <ShowAllButton />
        <ClearAllButton />
      </div>
    </div>
  );
}
