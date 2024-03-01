import React from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { countVisibleOptions } from '../../utils';
import { LoadingSpinner } from '../../../loadingSpinner';
import { DivElementProps } from '../../types';
import { useSelectDataHandlers } from '../../typedHooks';

const createSearchAndFilterInfoProps = (): DivElementProps => {
  return {
    className: classNames(styles.searchAndFilterInfoContainer),
  };
};

export function SearchAndFilterInfo() {
  const { getData, getMetaData } = useSelectDataHandlers();

  const { groups } = getData();
  const { isSearching, search, filter } = getMetaData();
  const count = countVisibleOptions(groups);
  const noResultsTexts =
    !isSearching && !count && (search || filter)
      ? [`No options found for "${search || filter}"`, 'Try a different search term']
      : [];
  const loadingText = isSearching ? 'Loading options' : '';

  const attr = createSearchAndFilterInfoProps();
  if (!noResultsTexts?.length && !loadingText) {
    return null;
  }
  return (
    <div {...attr}>
      {loadingText && (
        <>
          <LoadingSpinner small />
          <span>{loadingText}</span>
        </>
      )}
      {!!noResultsTexts.length && (
        <>
          <span>{noResultsTexts[0]}</span>
          <span>{noResultsTexts[1]}</span>
        </>
      )}
    </div>
  );
}
