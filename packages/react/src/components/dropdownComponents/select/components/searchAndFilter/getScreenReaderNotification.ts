import { getNumberedVariationsTextKey, getTextKey } from '../../texts';
import { SelectData, SelectMetaData } from '../../types';
import { ScreenReaderNotification, TextInterpolationContent } from '../../../modularOptionList/types';
import { createScreenReaderNotification } from '../../../shared/utils/screenReader';
import { countVisibleOptions } from '../../../modularOptionList/utils';
import { getTextKeyWithType, typeIndicator } from './common';

export function getScreenReaderNotification(data: SelectData, metaData: SelectMetaData): ScreenReaderNotification {
  const { open, groups } = data;
  const { isSearching, search, filter, hasSearchError } = metaData;
  const resultCount = countVisibleOptions(groups);
  const value = search || filter;
  const notificationType = 'searchAndFilter';
  const delayTime = 800;
  const interpolationContent: Partial<TextInterpolationContent> = {
    value,
    numberIndicator: resultCount,
  };

  const getScreenReaderText = (): string => {
    if (isSearching) {
      return getTextKey('searching', metaData, { value }) as string;
    }
    if (value) {
      const isSearch = !!search;
      if (hasSearchError) {
        return `${getTextKey('searchErrorTitle', metaData)} ${getTextKey('searchErrorText', metaData)}`;
      }
      if (resultCount === 0) {
        const noResultsKey = getTextKeyWithType(`${typeIndicator}edWithoutResultsInfo`, isSearch);
        const tryAnotherKey = getTextKeyWithType(`${typeIndicator}WithAnotherTerm`, isSearch);
        return `${getTextKey(noResultsKey, metaData, interpolationContent)} ${getTextKey(tryAnotherKey, metaData, interpolationContent)}`;
      }
      if (isSearch) {
        return getNumberedVariationsTextKey(
          'searchResults',
          metaData,
          'numberIndicator',
          interpolationContent,
        ) as string;
      }
      const resultsText = getTextKey('filterResults', metaData, interpolationContent) as string;
      const countText = getNumberedVariationsTextKey(
        'filterResultsCount',
        metaData,
        'numberIndicator',
        interpolationContent,
      ) as string;
      return `${resultsText} ${countText}`;
    }

    return '';
  };

  if (!open) {
    return createScreenReaderNotification(notificationType, '');
  }

  const content = getScreenReaderText();
  // constantly updated notifications are delayed to avoid flooding
  const delay = isSearching || filter ? delayTime : 0;
  return createScreenReaderNotification(notificationType, content || '', delay);
}
