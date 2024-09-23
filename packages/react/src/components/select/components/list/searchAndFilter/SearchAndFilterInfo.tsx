import React from 'react';

import styles from '../../../Select.module.scss';
import classNames from '../../../../../utils/classNames';
import { countVisibleOptions } from '../../../utils';
import { DivElementProps } from '../../../types';
import { useSelectDataHandlers } from '../../../hooks/useSelectDataHandlers';
import { getTextKey } from '../../../texts';

const createSearchAndFilterInfoProps = (): DivElementProps => {
  return {
    className: classNames(styles.searchAndFilterInfoContainer),
    'data-testid': 'search-and-filter-info',
  };
};

export function SearchAndFilterInfo() {
  const dataHandlers = useSelectDataHandlers();
  const { getData, getMetaData } = dataHandlers;
  const data = getData();
  const { groups, open } = data;
  const metaData = getMetaData();
  const { filter } = metaData;
  const count = countVisibleOptions(groups);

  const showNoResultsTexts = !count && !!filter;

  if (!open || !showNoResultsTexts) {
    return null;
  }

  const attr = createSearchAndFilterInfoProps();

  return (
    <div {...attr}>
      <span aria-hidden>{getTextKey('noFilteredResultsInfo', metaData, { filter })}.</span>
      <span aria-hidden>{getTextKey('filterWithAnotherTerm', metaData)}.</span>
    </div>
  );
}
