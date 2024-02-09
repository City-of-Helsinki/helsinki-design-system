import React from 'react';

import styles from '../Select.module.scss';
import { DivElementProps } from '..';
import classNames from '../../../utils/classNames';
import { PropSetter } from '../../group/utils';
import { countVisibleOptions, getMetaDataFromController, getSelectDataFromController } from '../utils';
import { LoadingSpinner } from '../../loadingSpinner';

type SearchAndFilterInfoProps = DivElementProps & {
  noResultsTexts: string[];
  loadingText: string;
};
export const searchAndFilterInfoPropSetter: PropSetter<SearchAndFilterInfoProps> = ({ controller }) => {
  const { groups } = getSelectDataFromController(controller);
  const { isSearching, search, filter } = getMetaDataFromController(controller);
  const count = countVisibleOptions(groups);
  return {
    noResultsTexts:
      !isSearching && !count && (search || filter)
        ? [`No options found for "${search || filter}"`, 'Try a different search term']
        : [],
    loadingText: isSearching ? 'Loading options' : '',
    className: classNames(styles.searchAndFilterInfoContainer),
  };
};

export function SearchAndFilterInfo(props: SearchAndFilterInfoProps) {
  const { loadingText, noResultsTexts, ...attr } = props;
  if (!noResultsTexts?.length && !loadingText) {
    return null;
  }
  return (
    <div {...attr}>
      {loadingText && (
        <>
          <LoadingSpinner />
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
