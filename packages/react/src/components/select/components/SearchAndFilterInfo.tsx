import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { countVisibleOptions } from '../utils';
import { LoadingSpinner } from '../../loadingSpinner';
import { DivElementProps, SelectData, SelectMetaData } from '../types';
import { useContextTools } from '../../dataContext/hooks';

type SearchAndFilterInfoProps = DivElementProps & {
  noResultsTexts: string[];
  loadingText: string;
};

export const searchAndFilterInfoPropSetter = (props: DivElementProps): SearchAndFilterInfoProps => {
  const { getData, getMetaData } = useContextTools();
  const { groups } = getData() as SelectData;
  const { isSearching, search, filter } = getMetaData() as SelectMetaData;
  const count = countVisibleOptions(groups);
  return {
    ...props,
    noResultsTexts:
      !isSearching && !count && (search || filter)
        ? [`No options found for "${search || filter}"`, 'Try a different search term']
        : [],
    loadingText: isSearching ? 'Loading options' : '',
    className: classNames(styles.searchAndFilterInfoContainer),
  };
};

export function SearchAndFilterInfo(props: DivElementProps) {
  const { loadingText, noResultsTexts, ...attr } = searchAndFilterInfoPropSetter(props);
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
