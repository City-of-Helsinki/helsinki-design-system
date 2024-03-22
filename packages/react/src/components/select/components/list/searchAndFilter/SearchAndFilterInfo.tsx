import React, { useRef } from 'react';

import styles from '../../../Select.module.scss';
import classNames from '../../../../../utils/classNames';
import { countVisibleOptions } from '../../../utils';
import { LoadingSpinner } from '../../../../loadingSpinner';
import { DivElementProps } from '../../../types';
import { useSelectDataHandlers } from '../../../hooks/useSelectDataHandlers';
import { ScreenReaderNotifications } from './ScreenReaderNotifications';

const createSearchAndFilterInfoProps = (forScreenReaderOnly: boolean): DivElementProps => {
  return {
    className: classNames(styles.searchAndFilterInfoContainer, forScreenReaderOnly && styles.screenReaderOnly),
  };
};

export function SearchAndFilterInfo() {
  const { getData, getMetaData } = useSelectDataHandlers();
  const shouldRenderScreenReaderNotificationsRef = useRef(false);
  const { groups, open } = getData();
  const { isSearching, search, filter } = getMetaData();
  const count = countVisibleOptions(groups);
  if (!shouldRenderScreenReaderNotificationsRef.current && (isSearching || filter)) {
    shouldRenderScreenReaderNotificationsRef.current = true;
  }
  const noResultsTexts =
    !isSearching && !count && (search || filter)
      ? [`No options found for "${search || filter}"`, 'Try a different term']
      : [];
  const loadingText = isSearching ? 'Loading options' : '';
  const shouldBeVisible = noResultsTexts.length > 0 || loadingText;

  if (!open || (!shouldBeVisible && !shouldRenderScreenReaderNotificationsRef.current)) {
    return null;
  }

  const attr = createSearchAndFilterInfoProps(!shouldBeVisible && shouldRenderScreenReaderNotificationsRef.current);

  return (
    <div {...attr}>
      {loadingText && (
        <>
          <LoadingSpinner small loadingText="" loadingFinishedText="" />
          <span aria-hidden>{loadingText}</span>
        </>
      )}
      {!!noResultsTexts.length && (
        <>
          <span aria-hidden>{noResultsTexts[0]}</span>
          <span aria-hidden>{noResultsTexts[1]}</span>
        </>
      )}
      <ScreenReaderNotifications isSearching={isSearching} search={search} filter={filter} resultCount={count} />
    </div>
  );
}
