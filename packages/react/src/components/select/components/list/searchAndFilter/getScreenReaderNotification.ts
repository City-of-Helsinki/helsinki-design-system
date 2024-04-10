import { ScreenReaderNotification, SelectData, SelectMetaData } from '../../../types';
import { countVisibleOptions, createScreenReaderNotification } from '../../../utils';

export function getScreenReaderNotification(data: SelectData, metaData: SelectMetaData): ScreenReaderNotification {
  const { groups, open } = data;
  const { isSearching, search, filter } = metaData;
  const resultCount = countVisibleOptions(groups);
  const notificationType = 'searchAndFilter';
  const delayTime = 800;

  const screenReaderTexts = {
    none: '',
    isSearching: `Searching for "${search}".`,
    filteredResults: `Filtered results for "${filter}". Found ${resultCount} options.`,
    noResults: `No options found for "${search || filter}". Try a different term.`,
    searchResults: `Found ${resultCount} options for search term "${search}".`,
  };

  if (!open) {
    return createScreenReaderNotification(notificationType, '');
  }

  const getScreenReaderTextType = (): keyof typeof screenReaderTexts => {
    if (isSearching) {
      return 'isSearching';
    }
    if (filter) {
      return 'filteredResults';
    }
    if (search && !isSearching) {
      return 'searchResults';
    }
    if ((search || filter) && resultCount === 0) {
      return 'noResults';
    }
    return 'none';
  };

  const textType = getScreenReaderTextType();
  const content = screenReaderTexts[textType];
  // constantly updated notifications are delay to avoid flooding
  const delay = ['filteredResults', 'isSearching'].includes(textType) ? delayTime : 0;
  return createScreenReaderNotification(notificationType, content, delay);

  // rm on unmount
}
