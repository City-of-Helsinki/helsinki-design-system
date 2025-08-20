import { Option, ModularOptionListData, ModularOptionListDataHandlers, ModularOptionListMetaData } from './types';
import { ChangeEvent, ChangeHandler } from '../../dataProvider/DataContext';
import {
  updateOptionInGroup,
  propsToGroups,
  getSelectedOptions,
  updateGroupLabelAndOptions,
  createMetaDataAfterSelectionChange,
} from './utils';
import { EventId, EventType, isGroupClickEvent, isOptionClickEvent } from './events';
import { appendTexts } from './texts';

const dataUpdater = (
  event: ChangeEvent,
  dataHandlers: ModularOptionListDataHandlers,
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

  const updateGroups = (groups: ModularOptionListData['groups'], clickedOption?: Option) => {
    dataHandlers.updateData({ groups });
    dataHandlers.updateMetaData(
      createMetaDataAfterSelectionChange(groups, dataHandlers.getMetaData().selectedOptions, clickedOption),
    );
  };

  if (isOptionClickEvent(id, type)) {
    console.log('option click');
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
    /* TODO
    if (isRemoveTagEventId(id)) {
      const currentMetaData = dataHandlers.getMetaData();
      const remainingOptions = currentMetaData.selectedOptions.length;
      const hasSelectedItems = !!remainingOptions;
      setFocusTarget(hasSelectedItems ? 'tag' : 'button');
      const removalText = getTextKey('tagRemoved', currentMetaData, {
        value: clickedOption.label,
      });
      const currentCountText = getNumberedVariationsTextKey('tagsRemaining', currentMetaData, 'selectionCount');
      const notification = createScreenReaderNotification(eventIds.tag, `${removalText} ${currentCountText}`);

      addOrUpdateScreenReaderNotificationByType(notification, dataHandlers);
    }
    */
    return {
      ...returnValue,
      didSelectionsChange: true,
      didDataChange: true,
    };
  }

  // Note: single select group labels do not emit events
  // so multiSelect is not checked.
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

  return returnValue;
};

export const changeHandler: ChangeHandler<ModularOptionListData, ModularOptionListMetaData> = (
  event,
  dataHandlers,
): boolean => {
  const { updateData, updateMetaData, getData, getMetaData } = dataHandlers;
  const { didSelectionsChange, didDataChange } = dataUpdater(event, dataHandlers);
  const current = getData();
  const { onChange } = current;

  if (didSelectionsChange) {
    const { lastClickedOption } = getMetaData();
    const newProps = onChange?.(getSelectedOptions(current.groups), lastClickedOption as Option, current);
    let newPropsHasChanges = false;
    if (newProps) {
      const { groups, options, invalid, texts } = newProps;
      if (groups || options) {
        const newGroups = propsToGroups(newProps) || [];
        updateData({ groups: newGroups });
        updateMetaData(
          createMetaDataAfterSelectionChange(newGroups, dataHandlers.getMetaData().selectedOptions, lastClickedOption),
        );
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
