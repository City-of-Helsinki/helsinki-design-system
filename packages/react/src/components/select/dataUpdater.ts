import { Option, SelectData, SelectDataHandlers, SelectMetaData } from './types';
import { ChangeEvent, ChangeHandler } from '../dataProvider/DataContext';
import {
  updateOptionInGroup,
  clearAllSelectedOptions,
  propsToGroups,
  getSelectedOptions,
  createSelectedOptionsList,
  updateGroupLabelAndOptions,
} from './utils';
import {
  EventId,
  EventType,
  isClearOptionsClickEvent,
  isCloseEvent,
  isGroupClickEvent,
  isOpenOrCloseEvent,
  isOptionClickEvent,
  isOutsideClickEvent,
} from './events';
import { appendTexts } from './texts';

const MIN_USER_INTERACTION_TIME_IN_MS = 200;

const dataUpdater = (
  event: ChangeEvent,
  dataHandlers: SelectDataHandlers,
): { didSearchChange: boolean; didSelectionsChange: boolean; didDataChange: boolean } => {
  const { id, type, payload } = event as ChangeEvent<EventId, EventType>;
  const current = dataHandlers.getData();
  const returnValue = {
    didSearchChange: false,
    didSelectionsChange: false,
    didDataChange: false,
  };
  if (current.disabled) {
    return returnValue;
  }
  const openOrClose = (open: boolean) => {
    if (current.open === open) {
      return false;
    }
    const now = Date.now();
    if (now - dataHandlers.getMetaData().lastToggleCommand < MIN_USER_INTERACTION_TIME_IN_MS) {
      return false;
    }
    dataHandlers.updateData({ open });
    dataHandlers.updateMetaData({ lastToggleCommand: now });
    return true;
  };

  const updateGroups = (groups: SelectData['groups'], clickedOption?: Option) => {
    dataHandlers.updateData({ groups });
    dataHandlers.updateMetaData({
      selectedOptions: createSelectedOptionsList(dataHandlers.getMetaData().selectedOptions, groups),
      lastClickedOption: clickedOption,
      // textContent is re-created, when a textProvider is called
      textContent: undefined,
    });
  };

  if (isOpenOrCloseEvent(id, type)) {
    const willOpen = !current.open;
    const didUpdate = openOrClose(willOpen);
    return {
      ...returnValue,
      didDataChange: didUpdate,
    };
  }

  if (isOptionClickEvent(id, type)) {
    const clickedOption = payload && (payload.value as Option);
    if (!clickedOption) {
      return returnValue;
    }
    const newGroups = updateOptionInGroup(
      current.groups,
      {
        ...clickedOption,
        selected: !clickedOption.selected,
      },
      current.multiSelect,
    );
    updateGroups(newGroups, clickedOption);
    openOrClose(current.multiSelect);
    return {
      ...returnValue,
      didSelectionsChange: true,
      didDataChange: true,
    };
  }

  if (isGroupClickEvent(id, type)) {
    const clickedOption = payload && (payload.value as Option);
    if (!clickedOption) {
      return returnValue;
    }
    // add to docs that the clicked option is updated before onChange
    const updatedOption = {
      ...clickedOption,
      selected: !clickedOption.selected,
    };
    const newGroups = updateGroupLabelAndOptions(current.groups, updatedOption);
    updateGroups(newGroups, clickedOption);
    return {
      ...returnValue,
      didSelectionsChange: true,
      didDataChange: true,
    };
  }

  if (isClearOptionsClickEvent(id, type)) {
    const newGroups = clearAllSelectedOptions(current.groups);
    updateGroups(newGroups);
    return {
      ...returnValue,
      didSelectionsChange: true,
      didDataChange: true,
    };
  }

  if (isOutsideClickEvent(id, type) || isCloseEvent(id, type)) {
    if (openOrClose(false)) {
      return {
        ...returnValue,
        didDataChange: true,
      };
    }
  }

  return returnValue;
};

export const changeHandler: ChangeHandler<SelectData, SelectMetaData> = (event, dataHandlers): boolean => {
  const { updateData, getData, getMetaData } = dataHandlers;
  const { onChange } = getData();
  const { didSelectionsChange, didDataChange } = dataUpdater(event, dataHandlers);
  if (didSelectionsChange) {
    const current = getData();
    const { lastClickedOption } = getMetaData();
    const newProps = onChange(getSelectedOptions(current.groups), lastClickedOption as Option, current);
    let newPropsHasChanges = false;
    if (newProps) {
      const { groups, options, invalid, texts } = newProps;
      if (groups || options) {
        const newGroups = propsToGroups(newProps) || [];
        updateData({ groups: newGroups });
        newPropsHasChanges = true;
      }
      if (invalid !== undefined && invalid !== current.invalid) {
        updateData({ invalid });
        newPropsHasChanges = true;
      }
      if (texts) {
        appendTexts(texts, getMetaData());
        newPropsHasChanges = true;
      }
    }
    if (newPropsHasChanges) {
      return true;
    }
  }

  return didDataChange;
};
