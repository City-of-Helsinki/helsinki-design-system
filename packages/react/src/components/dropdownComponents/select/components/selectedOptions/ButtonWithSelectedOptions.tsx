import React, { useCallback, useLayoutEffect } from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../../utils/classNames';
import { useResizeObserver } from '../../../../../hooks/useResizeObserver';
import { eventIds, eventTypes } from '../../events';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import {
  ButtonElementProps,
  SelectDataHandlers,
  SelectMetaData,
  TextKey,
  TextsWithNumberedVariations,
} from '../../types';
import { Option } from '../../../modularOptionList/types';
import { createOnClickListener } from '../../utils';
import { getVisibleGroupLabels } from '../../../modularOptionList/utils';
import { getIndexOfFirstVisibleChild } from '../../../../../utils/getIndexOfFirstVisibleChild';
import { getNumberedVariationsTextKey, getTextKey } from '../../texts';
import { IconAngleDown } from '../../../../../icons';

type ButtonWithSelectedOptionsProps = ButtonElementProps & {
  options: Option[];
  placeholder: string;
  icon: SelectMetaData['icon'];
  optionClassName: string;
  buttonRef: SelectMetaData['refs']['button'];
};

const getTexts = (metaData: SelectMetaData) => {
  const getter = (key: TextKey | TextsWithNumberedVariations) => {
    if (key === 'selectedOptionsCount') {
      return getNumberedVariationsTextKey(key, metaData, 'selectionCount') as string;
    }
    return getTextKey(key as TextKey, metaData) as string;
  };
  return {
    placeholder: getter('placeholder') || '',
    label: getter('label'),
    ariaLabel: getter('dropdownButtonAriaLabel'),
    assistiveText: getter('assistive'),
    errorText: getter('error'),
    noSelectedOptionsText: getter('noSelectedOptions'),
    selectedOptionsCount: getter('selectedOptionsCount'),
    and: getter('selectedOptionsCount_and'),
    otherOptions: getter('selectedOptionsCount_otherOptions'),
    noSelectedOptions: getter('noSelectedOptions'),
    requiredText: getter('required'),
  };
};

const createButtonWithSelectedOptionsProps = (dataHandlers: SelectDataHandlers): ButtonWithSelectedOptionsProps => {
  const { getData, getMetaData, trigger } = dataHandlers;
  const { disabled, open, invalid, multiSelect, groups, clearable, required } = getData();
  const metaData = getMetaData();
  const { icon, refs, elementIds, selectedOptions, listInputType, activeDescendant } = metaData;
  const {
    placeholder,
    label,
    ariaLabel,
    errorText,
    assistiveText,
    noSelectedOptions,
    selectedOptionsCount,
    and,
    otherOptions,
    requiredText,
  } = getTexts(metaData);
  const hasInput = !!listInputType;
  const getAriaLabel = () => {
    const descriptiveLabel = label || ariaLabel;
    const labels = descriptiveLabel ? [`${descriptiveLabel}.`] : [];
    const { length } = selectedOptions;
    if (!length) {
      labels.push(`${placeholder}. ${noSelectedOptions}.`);
    } else {
      const optionTexts = [];
      optionTexts.push(`${selectedOptionsCount}:`);
      if (selectedOptions[0]) {
        optionTexts.push(`"${selectedOptions[0].label}"`);
      }
      if (selectedOptions[1]) {
        optionTexts.push(`${and} "${selectedOptions[1].label}"`);
      }
      if (length > 2) {
        optionTexts.push(`${and} ${length - 2} ${otherOptions}.`);
      }
      labels.push(optionTexts.join(' '));
    }
    if (required) {
      labels.push(requiredText);
    }
    if (assistiveText) {
      labels.push(assistiveText);
    }
    if (invalid && errorText) {
      labels.push(errorText);
    }
    return labels
      .map((text) => {
        const hasDot = text.charAt(text.length - 1) === '.';
        return hasDot ? text : `${text}.`;
      })
      .join(' ');
  };

  const getInputAndGroupRelatedProps = (): Partial<ButtonElementProps> => {
    if (hasInput) {
      return { role: undefined, 'aria-controls': elementIds.searchOrFilterInput, 'aria-haspopup': 'dialog' };
    }
    const hasVisibleGroupLabels = getVisibleGroupLabels(groups).length > 0;
    const isMultiSelectWithGroups = multiSelect && hasVisibleGroupLabels;
    return {
      role: 'combobox',
      'aria-controls': elementIds.list,
      'aria-haspopup': isMultiSelectWithGroups ? 'dialog' : 'listbox',
    };
  };

  return {
    'aria-controls': elementIds.selectionsAndListsContainer,
    'aria-expanded': open,
    'aria-haspopup': 'listbox',
    'aria-label': getAriaLabel(),
    'aria-activedescendant': hasInput ? undefined : activeDescendant,
    buttonRef: refs.button,
    className: classNames(
      styles.dropdownButton,
      styles.selectedOptions,
      !selectedOptions.length && styles.placeholder,
      disabled && styles.disabledButton,
      !multiSelect && styles.singleSelect,
      clearable && styles.clearable,
    ),
    'aria-disabled': disabled,
    icon,
    id: elementIds.button,
    options: selectedOptions,
    optionClassName: styles.dropdownButtonOption,
    placeholder,
    ...createOnClickListener({ id: eventIds.selectedOptions, type: eventTypes.click, trigger }),
    ...getInputAndGroupRelatedProps(),
  };
};

/*
This function updates the indicator showing how many options are hidden.
Because the number of hidden elements can be n+1 digits, the space the indicator needs to vary.
If the hidden element count is +9 before hidden elements are calculated it may change to +10, the count requires more space.
That is why the preseved space needs to be for current count +1 digits.
The counter is absolutely positionend in its container, so if just number changes it won't affect element flow and result into 
unexpectedly hidden options if new number is wider than the one before hidden items calculations.
*/
function updateHiddenElementsCount(buttoRef: SelectMetaData['refs']['button']) {
  const buttonEl = buttoRef.current;
  const cssClassesForSpaceReservation = [
    styles.spaceForOneDigit,
    styles.spaceForTwoDigits,
    styles.spaceForThreeDigits,
    styles.spaceForFourDigits,
  ];
  const labels = buttonEl && buttonEl.querySelector('* > div');
  if (labels) {
    labels.childNodes.forEach(
      (el) => el && (el as HTMLElement).classList && (el as HTMLElement).classList.remove(styles.lastVisible),
    );
    const selectedItemsCount = labels.childNodes.length;
    const maxCountDigits = String(selectedItemsCount - 1).length; // -1 because one is always visible
    buttonEl.classList.remove(...cssClassesForSpaceReservation);
    if (selectedItemsCount > 1) {
      buttonEl.classList.add(cssClassesForSpaceReservation[maxCountDigits - 1]);
    }
    const firstVisible = getIndexOfFirstVisibleChild(labels, 'vertical');
    const childCount = labels.children.length - 1;
    const hiddenItems = childCount - firstVisible;
    if (hiddenItems < 1 || firstVisible === -1) {
      buttonEl.classList.remove(styles.hasHiddenItems);
    } else {
      buttonEl.classList.add(styles.hasHiddenItems);
      const countIndicator = buttonEl.querySelector('span.count');
      if (countIndicator) {
        countIndicator.innerHTML = `+${hiddenItems}`;
      }
      (labels.childNodes[firstVisible] as HTMLElement).classList.add(styles.lastVisible);
    }
  }
}

export function ButtonWithSelectedOptions() {
  const dataHandlers = useSelectDataHandlers();
  const { multiSelect } = dataHandlers.getData();
  const { options, placeholder, buttonRef, optionClassName, icon, ...attr } =
    createButtonWithSelectedOptionsProps(dataHandlers);

  const calculateElements = useCallback(() => {
    if (multiSelect) {
      updateHiddenElementsCount(buttonRef);
    }
  }, [buttonRef, multiSelect]);

  const [resizeRef] = useResizeObserver(calculateElements);

  useLayoutEffect(() => {
    calculateElements();
  });

  const labels = options.length ? (
    options.map((opt) => (
      <span className={optionClassName} key={opt.value}>
        {opt.label}
      </span>
    ))
  ) : (
    <span className={optionClassName} data-testid="placeholder">
      {placeholder}
    </span>
  );

  return (
    <button type="button" {...attr} ref={buttonRef}>
      {icon && (
        <span key="icon" className={styles.buttonIcon}>
          {icon}
        </span>
      )}
      <div className={styles.labels} key="labels" aria-hidden ref={resizeRef}>
        {labels}
      </div>
      {options.length > 1 && (
        <span className={styles.count} key="count" aria-hidden>
          <span className="count" key="number">
            +1
          </span>
        </span>
      )}
      <div className={classNames(styles.arrowAndSpaceForClearButton, styles.icon)}>
        <IconAngleDown className={styles.angleIcon} aria-hidden />
      </div>
    </button>
  );
}
