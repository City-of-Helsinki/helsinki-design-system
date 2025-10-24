import React, { useRef } from 'react';

import styles from '../Search.module.scss';
import classNames from '../../../../utils/classNames';
import {
  addOrUpdateScreenReaderNotificationByType,
  removeScreenReaderNotification,
} from '../../shared/utils/screenReader';
import { countVisibleOptions } from '../../modularOptionList/utils';
import { LoadingSpinner } from '../../../loadingSpinner';
import { DivElementProps } from '../../modularOptionList/types';
import { useSearchDataHandlers } from '../hooks/useSearchDataHandlers';
import { getTextKey } from '../texts';
import { IconError } from '../../../../icons';
import { getScreenReaderNotification } from './getScreenReaderNotification';

const createSearchInfoProps = (hasError: boolean): DivElementProps => {
  return {
    className: classNames(styles.searchAndFilterInfoContainer, hasError && styles.withErrorMessage),
    'data-testid': 'hds-search-search-info',
  };
};

export function SearchInfo() {
  const dataHandlers = useSearchDataHandlers();
  const { getData, getMetaData } = dataHandlers;
  const shouldRenderScreenReaderNotificationsRef = useRef(false);
  const data = getData();
  const { groups, open } = data;
  const metaData = getMetaData();
  const { isSearching, hasSearchError, search } = metaData;
  const count = countVisibleOptions(groups);
  const createCurrentState = () => {
    return `${search} ${count} ${hasSearchError ? 'error' : ''} ${isSearching ? 'searching' : ''}`;
  };
  const previousValueRef = useRef(createCurrentState());
  const currentState = createCurrentState();
  const didChange = previousValueRef.current !== currentState;
  previousValueRef.current = currentState;
  if (!shouldRenderScreenReaderNotificationsRef.current && isSearching) {
    shouldRenderScreenReaderNotificationsRef.current = true;
  }
  if (didChange) {
    const notification = getScreenReaderNotification(data, metaData);
    if (!notification.content) {
      removeScreenReaderNotification(notification, dataHandlers);
    } else {
      addOrUpdateScreenReaderNotificationByType(notification, dataHandlers);
    }
  }

  const showNoResultsTexts = !isSearching && !count && search;

  const loadingText = isSearching ? getTextKey('searching', metaData, { value: search }) : '';

  if (!open || (!showNoResultsTexts && !loadingText)) {
    return null;
  }

  const attr = createSearchInfoProps(hasSearchError);

  return (
    <div {...attr}>
      {loadingText && (
        <>
          <LoadingSpinner small loadingText="" loadingFinishedText="" />
          <span data-testid="hds-search-searching-text">{loadingText}</span>
        </>
      )}
      {showNoResultsTexts && !hasSearchError && (
        <>
          <span data-testid="hds-search-no-results">
            {getTextKey('searchedWithoutResultsInfo', metaData, {
              value: search,
            })}
          </span>
          <span>{getTextKey('searchWithAnotherTerm', metaData)}</span>
        </>
      )}
      {hasSearchError && (
        <>
          <IconError color="var(--color-error)" />
          <span data-testid="hds-search-searching-error">{getTextKey('searchErrorTitle', metaData)}</span>
          <span>{getTextKey('searchErrorText', metaData)}</span>
        </>
      )}
    </div>
  );
}
