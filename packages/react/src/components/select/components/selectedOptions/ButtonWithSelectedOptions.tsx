import React, { useLayoutEffect } from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { eventIds, eventTypes } from '../../events';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { ButtonElementProps, SelectDataHandlers, SelectMetaData, Option } from '../../types';
import { getSelectedOptions, createOnClickListener } from '../../utils';
import { getIndexOfFirstVisibleChild } from '../../../../utils/getIndexOfFirstVisibleChild';

type ButtonWithSelectedOptionsProps = ButtonElementProps & {
  options: Option[];
  placeholder: string;
  icon: SelectMetaData['icon'];
  optionClassName: string;
  buttonRef: SelectMetaData['refs']['selectionButton'];
};

const createButtonWithSelectedOptionsProps = ({
  getData,
  getMetaData,
  trigger,
}: SelectDataHandlers): ButtonWithSelectedOptionsProps => {
  const { groups, placeholder, open } = getData();
  const { icon, refs, elementIds } = getMetaData();
  const selectedOptions = getSelectedOptions(groups);
  return {
    className: classNames(styles.button, styles.selectedOptions, !selectedOptions.length && styles.placeholder),
    options: selectedOptions,
    ...createOnClickListener({ id: eventIds.selectedOptions, type: eventTypes.click, trigger }),
    placeholder,
    icon,
    optionClassName: styles.buttonOption,
    buttonRef: refs.selectionButton,
    id: elementIds.button,
    'aria-controls': elementIds.selectionsAndListsContainer,
    'aria-expanded': open,
    'aria-haspopup': 'listbox',
  };
};

/*
This function updates the indicator showing how many options are hidden.
Because the number of hidden elements can be n+1 digits, the space the indicator needs to vary.
If the hidden element count is +9 before hidden elements are calculated it bay change to +10, the count requires more space.
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
  const { options, placeholder, buttonRef, optionClassName, icon, ...attr } =
    createButtonWithSelectedOptionsProps(useSelectDataHandlers());
  const labels = options.length ? (
    options.map((opt) => (
      <span className={optionClassName} key={opt.value}>
        {opt.label}
      </span>
    ))
  ) : (
    <span className={optionClassName}>{placeholder}</span>
  );

  const dataHandlers = useSelectDataHandlers();

  useLayoutEffect(() => {
    updateHiddenElementsCount(dataHandlers.getMetaData());
  });

  return (
    <button type="button" {...attr} ref={buttonRef}>
      {icon && <span key="icon">{icon}</span>}
      <div className={styles.labels} key="labels">
        {labels}
      </div>
      {options.length > 1 && (
        <span className={styles.count} key="count">
          {/* This className deliberately a string so js finds the span with span.count */}
          <span className="count" key="number">
            +1
          </span>
        </span>
      )}
    </button>
  );
}
