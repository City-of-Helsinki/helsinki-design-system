import React from 'react';

import styles from '../../../Select.module.scss';
import classNames from '../../../../../utils/classNames';
import { countVisibleOptions } from '../../../utils';
import { LoadingSpinner } from '../../../../loadingSpinner';
import { DivElementProps, TextKey } from '../../../types';
import { useSelectDataHandlers } from '../../../hooks/useSelectDataHandlers';
import { getTextKey } from '../../../texts';
import { IconError } from '../../../../../icons';

const typeIndicator = '{{type}}';

const getTextKeyWithType = (key: string, isSearchInput): TextKey => {
  const inputType = isSearchInput ? 'search' : 'filter';
  return key.replace(typeIndicator, inputType) as TextKey;
};

const createSearchAndFilterInfoProps = (hasError: boolean): DivElementProps => {
  return {
    className: classNames(styles.searchAndFilterInfoContainer, hasError && styles.withErrorMessage),
    'data-testid': 'search-and-filter-info',
  };
};

export function SearchAndFilterInfo() {
  const dataHandlers = useSelectDataHandlers();
  const { getData, getMetaData } = dataHandlers;
  const data = getData();
  const { groups, open } = data;
  const metaData = getMetaData();
  const { isSearching, hasSearchError, search, filter, listInputType } = metaData;
  const count = countVisibleOptions(groups);
  const isSearchInput = listInputType === 'search';

  const showNoResultsTexts = !isSearching && !count && (search || filter);

  const loadingText = isSearching ? getTextKey('searchingForOptions', metaData) : '';

  if (!open || !listInputType || (!showNoResultsTexts && !loadingText)) {
    return null;
  }

  const attr = createSearchAndFilterInfoProps(hasSearchError);

  return (
    <div {...attr}>
      {loadingText && (
        <>
          <LoadingSpinner small loadingText="" loadingFinishedText="" />
          <span aria-hidden>{loadingText}</span>
        </>
      )}
      {showNoResultsTexts && !hasSearchError && (
        <>
          <span aria-hidden>
            {getTextKey(getTextKeyWithType(`${typeIndicator}edWithoutResultsInfo`, isSearchInput), metaData, {
              value: filter || search,
            })}
            .
          </span>
          <span aria-hidden>
            {getTextKey(getTextKeyWithType(`${typeIndicator}WithAnotherTerm`, isSearchInput), metaData)}.
          </span>
        </>
      )}
      {hasSearchError && (
        <>
          <IconError color="var(--color-error)" />
          <span aria-hidden>{getTextKey('searchErrorTitle', metaData)}.</span>
          <span aria-hidden>{getTextKey('searchErrorText', metaData)}</span>
        </>
      )}
    </div>
  );
}
