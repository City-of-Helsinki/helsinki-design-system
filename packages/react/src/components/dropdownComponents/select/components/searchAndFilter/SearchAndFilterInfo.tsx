import React, { useRef } from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../../utils/classNames';
import {
  addOrUpdateScreenReaderNotificationByType,
  removeScreenReaderNotification,
} from '../../../shared/utils/screenReader';
import { countVisibleOptions } from '../../../modularOptionList/utils';
import { LoadingSpinner } from '../../../../loadingSpinner';
import { DivElementProps } from '../../../modularOptionList/types';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { getTextKey } from '../../texts';
import { IconError } from '../../../../../icons';
import { getScreenReaderNotification } from './getScreenReaderNotification';
import { getTextKeyWithType, typeIndicator } from './common';

const createSearchAndFilterInfoProps = (hasError: boolean): DivElementProps => {
  return {
    className: classNames(styles.searchAndFilterInfoContainer, hasError && styles.withErrorMessage),
    'data-testid': 'hds-select-search-and-filter-info',
  };
};

export function SearchAndFilterInfo() {
  const dataHandlers = useSelectDataHandlers();
  const { getData, getMetaData } = dataHandlers;
  const shouldRenderScreenReaderNotificationsRef = useRef(false);
  const data = getData();
  const { groups, open } = data;
  const metaData = getMetaData();
  const { isSearching, hasSearchError, search, filter, listInputType } = metaData;
  const count = countVisibleOptions(groups);
  const createCurrentState = () => {
    return `${search} ${filter} ${count} ${hasSearchError ? 'error' : ''} ${isSearching ? 'searching' : ''}`;
  };
  const previousValueRef = useRef(createCurrentState());
  const currentState = createCurrentState();
  const didChange = previousValueRef.current !== currentState;
  previousValueRef.current = currentState;
  if (!shouldRenderScreenReaderNotificationsRef.current && (isSearching || filter)) {
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
  const isSearchInput = listInputType === 'search';

  const showNoResultsTexts = !isSearching && !count && (search || filter);

  const loadingText = isSearching ? getTextKey('searching', metaData, { value: search }) : '';

  if (!open || !listInputType || (!showNoResultsTexts && !loadingText)) {
    return null;
  }

  const attr = createSearchAndFilterInfoProps(hasSearchError);

  return (
    <div {...attr}>
      {loadingText && (
        <>
          <LoadingSpinner small loadingText="" loadingFinishedText="" />
          <span data-testid="hds-select-searching-text">{loadingText}</span>
        </>
      )}
      {showNoResultsTexts && !hasSearchError && (
        <>
          <span data-testid="hds-select-no-results">
            {getTextKey(getTextKeyWithType(`${typeIndicator}edWithoutResultsInfo`, isSearchInput), metaData, {
              value: filter || search,
            })}
          </span>
          <span>{getTextKey(getTextKeyWithType(`${typeIndicator}WithAnotherTerm`, isSearchInput), metaData)}</span>
        </>
      )}
      {hasSearchError && (
        <>
          <IconError color="var(--color-error)" />
          <span data-testid="hds-select-searching-error">{getTextKey('searchErrorTitle', metaData)}</span>
          <span>{getTextKey('searchErrorText', metaData)}</span>
        </>
      )}
    </div>
  );
}
