import { getNumberedVariationsTextKey, getTextKey } from '../texts';
import { SearchData, SearchMetaData } from '../types';
import { ScreenReaderNotification, TextInterpolationContent } from '../../modularOptionList/types';
import { createScreenReaderNotification } from '../../shared/utils/screenReader';
import { countVisibleOptions } from '../../modularOptionList/utils';

export function getScreenReaderNotification(data: SearchData, metaData: SearchMetaData): ScreenReaderNotification {
  const { open, groups } = data;
  const { isSearching, search, hasSearchError } = metaData;
  const resultCount = countVisibleOptions(groups);
  const value = search;
  const notificationType = 'search';
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
      if (hasSearchError) {
        return `${getTextKey('searchErrorTitle', metaData)} ${getTextKey('searchErrorText', metaData)}`;
      }
      if (resultCount === 0) {
        return `${getTextKey('searchedWithoutResultsInfo', metaData, interpolationContent)} ${getTextKey('searchWithAnotherTerm', metaData, interpolationContent)}`;
      }
      return getNumberedVariationsTextKey('searchResults', metaData, 'numberIndicator', interpolationContent) as string;
    }

    return '';
  };

  if (!open) {
    return createScreenReaderNotification(notificationType, '');
  }

  const content = getScreenReaderText();
  // constantly updated notifications are delayed to avoid flooding
  const delay = isSearching ? delayTime : 0;
  return createScreenReaderNotification(notificationType, content || '', delay);
}
