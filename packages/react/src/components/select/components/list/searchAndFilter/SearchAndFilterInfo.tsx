import React, { useRef } from 'react';

import styles from '../../../Select.module.scss';
import classNames from '../../../../../utils/classNames';
import {
  addOrUpdateScreenReaderNotificationByType,
  countVisibleOptions,
  removeScreenReaderNotification,
} from '../../../utils';
import { LoadingSpinner } from '../../../../loadingSpinner';
import { DivElementProps } from '../../../types';
import { useSelectDataHandlers } from '../../../hooks/useSelectDataHandlers';
import { getScreenReaderNotification } from './getScreenReaderNotification';

const createSearchAndFilterInfoProps = (forScreenReaderOnly: boolean): DivElementProps => {
  return {
    className: classNames(styles.searchAndFilterInfoContainer, forScreenReaderOnly && styles.screenReaderOnly),
    'data-testid': 'search-and-filter-info',
  };
};

export function SearchAndFilterInfo() {
  const dataHandlers = useSelectDataHandlers();
  const { getData, getMetaData } = dataHandlers;
  const shouldRenderScreenReaderNotificationsRef = useRef(false);
  const data = getData();
  const { groups, open } = data;
  const metaData = getMetaData();
  const { isSearching, search, filter } = metaData;
  const previousValueRef = useRef(search || filter);
  const didChange = previousValueRef.current !== (search || filter);
  previousValueRef.current = search || filter;
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

  if (didChange) {
    const notification = getScreenReaderNotification(data, metaData);
    if (!notification.content) {
      removeScreenReaderNotification(notification, dataHandlers);
    } else {
      addOrUpdateScreenReaderNotificationByType(notification, dataHandlers);
    }
  }

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
    </div>
  );
}
