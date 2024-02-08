import { groupIds, PropSetterElementTypes } from '.';
import { PropSetter } from '../group/utils';
import { optionsListPropSetter } from './components/OptionsList';
import { selectionsAndListsContainerPropSetter } from './components/SelectionsAndListsContainer';
import { selectedOptionsPropSetter } from './components/SelectedOptions';
import { labelPropSetter } from './components/Label';
import { containerPropSetter } from './components/Container';
import { filterInputPropSetter } from './components/FilterInput';
import { listAndInputContainerPropSetter } from './components/ListAndInputContainer';
import { searchAndFilterInfoPropSetter } from './components/SearchAndFilterInfo';
import { searchInputPropSetter } from './components/SearchInput';
import { getSelectDataFromController } from './utils';
import { tagListPropSetter } from './components/TagList';

const propSettersByGroupId: Partial<Record<keyof typeof groupIds, PropSetter<PropSetterElementTypes>>> = {
  selectedOptions: selectedOptionsPropSetter,
  container: containerPropSetter,
  selectionsAndLists: selectionsAndListsContainerPropSetter,
  list: optionsListPropSetter,
  label: labelPropSetter,
  filter: filterInputPropSetter,
  search: searchInputPropSetter,
  listAndInputContainer: listAndInputContainerPropSetter,
  searchAndFilterInfo: searchAndFilterInfoPropSetter,
  tagList: tagListPropSetter,
};

export const selectPropSetter: PropSetter<PropSetterElementTypes> = (propSetterProps) => {
  const { id, controller } = propSetterProps;
  const propSetter = propSettersByGroupId[id];
  if (propSetter) {
    return propSetter(propSetterProps);
  }

  const data = getSelectDataFromController(controller);
  if (id === 'assistiveText') {
    return {
      children: data.assistiveText || '',
    };
  }
  if (id === 'error') {
    return {
      children: data.error || '',
    };
  }
  return {};
};
