import { Option, SelectData, SelectDataHandlers, SelectMetaData } from './types';
import { ChangeEvent, ChangeHandler } from '../dataProvider/DataContext';
import { updateSelectedOptionInGroups, clearAllSelectedOptions, propsToGroups, getSelectedOptions } from './utils';
import {
  EventId,
  EventType,
  isClearOptionsClickEvent,
  isCloseEvent,
  isOpenOrCloseEvent,
  isOptionClickEvent,
  isOutsideClickEvent,
} from './events';

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

  const updateGroups = (groups: SelectData['groups']) => {
    dataHandlers.updateData({ groups });
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
    const newGroups = updateSelectedOptionInGroups(current.groups, {
      ...clickedOption,
      selected: !clickedOption.selected,
    });
    updateGroups(newGroups);
    dataHandlers.updateMetaData({
      lastClickedOption: clickedOption,
    });
    openOrClose(false);
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

export const changeChandler: ChangeHandler<SelectData, SelectMetaData> = (event, dataHandlers): boolean => {
  const { updateData, getData, getMetaData } = dataHandlers;
  const { onChange } = getData();
  const { didSelectionsChange, didDataChange } = dataUpdater(event, dataHandlers);

  if (didSelectionsChange) {
    const current = getData();
    const { lastClickedOption } = getMetaData();
    const newProps = onChange(getSelectedOptions(current.groups), lastClickedOption as Option, current);
    if (newProps) {
      if (newProps.groups || newProps.options) {
        const newGroups = propsToGroups(newProps) || [];
        updateData({ groups: newGroups });
        return true;
      }
    }
  }

  return didDataChange;
};
