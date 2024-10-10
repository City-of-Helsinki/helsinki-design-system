import { getTextKey } from '../../../texts';
import { ScreenReaderNotification, SelectData, SelectMetaData, TextInterpolationContent } from '../../../types';
import { countVisibleOptions, createScreenReaderNotification } from '../../../utils';
import { getTextKeyWithType, typeIndicator } from './common';

export function getScreenReaderNotification(data: SelectData, metaData: SelectMetaData): ScreenReaderNotification {
  const { groups, open } = data;
  const { isSearching, search, filter } = metaData;
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
      if (resultCount === 0) {
        const noResultsKey = getTextKeyWithType(`${typeIndicator}edWithoutResultsInfo`, isSearch);
        const tryAnotherKey = getTextKeyWithType(`${typeIndicator}WithAnotherTerm`, isSearch);
        return `${getTextKey(noResultsKey, metaData, interpolationContent)} ${getTextKey(tryAnotherKey, metaData, interpolationContent)}`;
      }
      const resultsKey = getTextKeyWithType(`${typeIndicator}Results`, isSearch);
      return getTextKey(resultsKey, metaData, interpolationContent) as string;
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
