import React, { useLayoutEffect } from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { eventIds, eventTypes } from '../../events';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { ButtonElementProps, SelectDataHandlers, SelectMetaData, Option, TextKey } from '../../types';
import { createOnClickListener } from '../../utils';
import { getIndexOfFirstVisibleChild } from '../../../../utils/getIndexOfFirstVisibleChild';
import { getTextKey } from '../../texts';

type ButtonWithSelectedOptionsProps = ButtonElementProps & {
  options: Option[];
  placeholder: string;
  icon: SelectMetaData['icon'];
  optionClassName: string;
  buttonRef: SelectMetaData['refs']['selectionButton'];
};

const getTexts = (metaData: SelectMetaData) => {
  const getter = (key: TextKey) => getTextKey(key, metaData) as string;
  return {
    placeholder: getter('placeholder') || '',
    label: getter('label'),
    ariaLabel: getter('dropdownButtonAriaLabel'),
    assistiveText: getter('assistive'),
    errorText: getter('error'),
    noSelectedOptionsText: getter('noSelectedOptions'),
    selectedOptionsCount: getter('selectedOptionsCount'),
    noSelectedOptions: getter('noSelectedOptions'),
    selectedOptionsLabel: getter('selectedOptionsLabel'),
  };
};

const createButtonWithSelectedOptionsProps = (dataHandlers: SelectDataHandlers): ButtonWithSelectedOptionsProps => {
  const { getData, getMetaData, trigger } = dataHandlers;
  const { disabled, open, invalid } = getData();
  const metaData = getMetaData();
  const { icon, refs, elementIds, selectedOptions } = metaData;
  const { placeholder, label, ariaLabel, errorText, assistiveText, noSelectedOptions, selectedOptionsLabel } =
    getTexts(metaData);

  const getAriaLabel = () => {
    const descriptiveLabel = label || ariaLabel;
    const labels = descriptiveLabel ? [`${descriptiveLabel}.`] : [];
    const { length } = selectedOptions;
    if (!length) {
      labels.push(`${placeholder}. ${noSelectedOptions}.`);
    } else {
      labels.push(selectedOptionsLabel);
      if (selectedOptions[0]) {
        labels.push(`"${selectedOptions[0].label}"`);
      }
      if (selectedOptions[1]) {
        labels.push(`and "${selectedOptions[1].label}"`);
      }
      if (length > 2) {
        labels.push(`and ${length - 2} other options.`);
      }
    }
    if (assistiveText) {
      labels.push(assistiveText);
    }
    if (invalid && errorText) {
      labels.push(errorText);
    }
    return labels.join(' ');
  };

  return {
    'aria-controls': elementIds.selectionsAndListsContainer,
    'aria-expanded': open,
    'aria-haspopup': 'listbox',
    'aria-invalid': invalid,
    'aria-label': getAriaLabel(),
    buttonRef: refs.selectionButton,
    className: classNames(
      styles.dropdownButton,
      styles.selectedOptions,
      !selectedOptions.length && styles.placeholder,
      disabled && styles.disabledButton,
    ),
    'aria-disabled': disabled,
    icon,
    id: elementIds.button,
    options: selectedOptions,
    optionClassName: styles.dropdownButtonOption,
    placeholder,
    ...createOnClickListener({ id: eventIds.selectedOptions, type: eventTypes.click, trigger }),
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
function updateHiddenElementsCount(metaData: SelectMetaData) {
  const buttonEl = metaData.refs.selectionButton.current;
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
    buttonEl.classList.add(cssClassesForSpaceReservation[maxCountDigits - 1]);
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
  const { options, placeholder, buttonRef, optionClassName, icon, ...attr } =
    createButtonWithSelectedOptionsProps(dataHandlers);

  const labels = options.length ? (
    options.map((opt) => (
      <span className={optionClassName} key={opt.value}>
        {opt.label}
      </span>
    ))
  ) : (
    <span className={optionClassName}>{placeholder}</span>
  );

  useLayoutEffect(() => {
    updateHiddenElementsCount(dataHandlers.getMetaData());
  });

  return (
    <button type="button" {...attr} ref={buttonRef}>
      {icon && <span key="icon">{icon}</span>}
      <div className={styles.labels} key="labels" aria-hidden>
        {labels}
      </div>
      {options.length > 1 && (
        <span className={styles.count} key="count" aria-hidden>
          <span className="count" key="number">
            +1
          </span>
        </span>
      )}
    </button>
  );
}
