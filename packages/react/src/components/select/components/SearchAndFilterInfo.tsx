import React from 'react';

import styles from '../Select.module.scss';
import { DivElementProps } from '..';
import classNames from '../../../utils/classNames';
import { PropSetter } from '../../group/utils';
import { countVisibleOptions, getMetaDataFromController, getSelectDataFromController } from '../utils';

type SearchAndFilterInfoProps = DivElementProps & {
  noResultsText?: string;
  loadingText?: string;
};
export const searchAndFilterInfoPropSetter: PropSetter<SearchAndFilterInfoProps> = ({ controller }) => {
  const { groups } = getSelectDataFromController(controller);
  const { isSearching, search, filter } = getMetaDataFromController(controller);
  const count = countVisibleOptions(groups);
  return {
    noResultsText: !isSearching && !count && (search || filter) ? 'No results....' : '',
    loadingText: isSearching ? 'Loading....' : '',
    className: classNames(styles.searchAndFilterInfoContainer),
  };
};

export function SearchAndFilterInfo(props: SearchAndFilterInfoProps) {
  const { loadingText, noResultsText, ...attr } = props;
  if (!noResultsText && !loadingText) {
    return null;
  }
  return (
    <div {...attr}>
      <p>{loadingText || noResultsText}</p>
    </div>
  );
}
