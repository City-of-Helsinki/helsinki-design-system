import { Option, SelectData, SelectMetaData } from './types';
import { ChangeEvent, ChangeHandler } from '../dataProvider/DataContext';
import { updateSelectedOptionInGroups, clearAllSelectedOptions } from './utils';
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

export const dataUpdater: ChangeHandler<SelectData, SelectMetaData> = (event, dataHandlers) => {
  const { id, type, payload } = event as ChangeEvent<EventId, EventType>;
  const current = dataHandlers.getData();
  const openOrClose = (open: boolean) => {
    const now = Date.now();
    if (
      dataHandlers.getMetaData().lastToggleCommand &&
      now - dataHandlers.getMetaData().lastToggleCommand < MIN_USER_INTERACTION_TIME_IN_MS
    ) {
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
    return openOrClose(willOpen);
  }

  if (isOptionClickEvent(id, type)) {
    const clickedOption = payload && (payload.value as Option);
    if (!clickedOption) {
      return false;
    }
    const newGroups = updateSelectedOptionInGroups(current.groups, {
      ...clickedOption,
      selected: !clickedOption.selected,
    });
    updateGroups(newGroups);
    openOrClose(false);

    return true;
  }

  if (isClearOptionsClickEvent(id, type)) {
    const newGroups = clearAllSelectedOptions(current.groups);
    updateGroups(newGroups);
    return true;
  }

  if (isOutsideClickEvent(id, type) || isCloseEvent(id, type)) {
    return openOrClose(false);
  }

  return false;
};
