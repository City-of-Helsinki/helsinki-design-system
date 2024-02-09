import { containerGroupId } from './components/Container';
import { labelGroupId } from './components/Label';
import { searchAndFilterInfoGroupId } from './components/SearchAndFilterInfo';

export const groupIds = {
  selectedOptions: 'selectedOptions',
  listItem: 'listItem',
  listGroup: 'listGroup',
  tag: 'tag',
  filter: 'filter',
  search: 'search',
  container: containerGroupId,
  label: labelGroupId,
  selectionsAndLists: 'selectionsAndLists',
  listAndInputContainer: 'listAndInputContainer',
  list: 'list',
  searchAndFilterInfo: searchAndFilterInfoGroupId,
  error: 'error',
  assistiveText: 'assistiveText',
  arrowButton: 'arrowButton',
  clearButton: 'clearButton',
  tagList: 'tagList',
  showAllButton: 'showAllButton',
  clearAllButton: 'clearAllButton',
};

export const eventTypes = {
  click: 'click',
  outSideclick: 'outsideClick',
  change: 'change',
};

export const groupIdEvents = {
  selectedOptionsClick: `${groupIds.selectedOptions}_${eventTypes.click}`,
  listItemClick: `${groupIds.listItem}_${eventTypes.click}`,
  clearClick: `${groupIds.clearButton}_${eventTypes.click}`,
  clearAllClick: `${groupIds.clearAllButton}_${eventTypes.click}`,
  showAllClick: `${groupIds.showAllButton}_${eventTypes.click}`,
  arrowClick: `${groupIds.arrowButton}_${eventTypes.click}`,
  tagClick: `${groupIds.tag}_${eventTypes.click}`,
  listGroupClick: `${groupIds.listGroup}_${eventTypes.click}`,
  filterChange: `${groupIds.filter}_${eventTypes.change}`,
  searchChange: `${groupIds.search}_${eventTypes.change}`,
};
