import React, { useLayoutEffect } from 'react';

import styles from '../Select.module.scss';
import { DivElementProps, SelectMetaData, ButtonElementProps, Option, SelectDataHandlers } from '../types';
import { IconCrossCircle, IconAngleDown } from '../../../icons';
import classNames from '../../../utils/classNames';
import { getIndexOfFirstVisibleChild } from '../../../utils/getIndexOfFirstVisibleChild';
import { createOnClickListener, getSelectedOptions } from '../utils';
import { eventTypes, eventIds } from '../events';
import { useSelectDataHandlers } from '../typedHooks';

type ButtonWithSelectedOptionsProps = ButtonElementProps & {
  options: Option[];
  placeholder: string;
  icon: SelectMetaData['icon'];
  optionClassName: string;
  buttonRef: SelectMetaData['refs']['selectionButton'];
};

const createClearButtonProps = ({ getData, getMetaData, trigger }: SelectDataHandlers): ButtonElementProps | null => {
  const { elementIds } = getMetaData();
  const { groups, disabled } = getData();
  const selectedOptions = getSelectedOptions(groups);
  if (!selectedOptions.length) {
    return null;
  }
  return {
    className: classNames(styles.button, styles.icon, disabled && styles.disabledButton),
    ...createOnClickListener({ id: eventIds.clearButton, type: eventTypes.click, trigger }),
    id: elementIds.clearButton,
    disabled,
  };
};

function ClearButton() {
  const props = createClearButtonProps(useSelectDataHandlers());
  if (!props) {
    return null;
  }
  return (
    <button type="button" {...props}>
      <IconCrossCircle className={styles.angleIcon} aria-hidden />
    </button>
  );
}

const createArrowButtonProps = ({ getMetaData, trigger, getData }: SelectDataHandlers): ButtonElementProps => {
  const { elementIds } = getMetaData();
  const { disabled } = getData();
  return {
    className: classNames(styles.button, styles.icon, disabled && styles.disabledButton),
    ...createOnClickListener({ id: eventIds.arrowButton, type: eventTypes.click, trigger }),
    id: elementIds.arrowButton,
    disabled,
  };
};

function ArrowButton() {
  const props = createArrowButtonProps(useSelectDataHandlers());
  return (
    <button type="button" {...props} aria-hidden>
      <IconAngleDown className={styles.angleIcon} aria-hidden />
    </button>
  );
}

const createButtonWithSelectedOptionsProps = ({
  getData,
  getMetaData,
  trigger,
}: SelectDataHandlers): ButtonWithSelectedOptionsProps => {
  const { groups, placeholder, disabled } = getData();
  const { icon, refs, elementIds } = getMetaData();
  const selectedOptions = getSelectedOptions(groups);
  return {
    className: classNames(
      styles.button,
      styles.selectedOptions,
      !selectedOptions.length && styles.placeholder,
      disabled && styles.disabledButton,
    ),
    options: selectedOptions,
    ...createOnClickListener({ id: eventIds.selectedOptions, type: eventTypes.click, trigger }),
    placeholder,
    icon,
    optionClassName: styles.buttonOption,
    buttonRef: refs.selectionButton,
    id: elementIds.button,
    disabled,
  };
};

function ButtonWithSelectedOptions() {
  const { options, placeholder, buttonRef, optionClassName, icon, ...attr } = createButtonWithSelectedOptionsProps(
    useSelectDataHandlers(),
  );
  const labels = options.length ? (
    options.map((opt) => (
      <span className={optionClassName} key={opt.value}>
        {opt.label}
      </span>
    ))
  ) : (
    <span className={optionClassName}>{placeholder}</span>
  );
  return (
    <button type="button" {...attr} ref={buttonRef}>
      {icon && <span key="icon">{icon}</span>}
      <div className={styles.labels} key="labels">
        {labels}
      </div>
      {options.length > 1 && (
        <span className={styles.count} key="count">
          <span className="count" key="number">
            +1
          </span>
        </span>
      )}
    </button>
  );
}

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
    if (!hiddenItems) {
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

function createContainerProps(): DivElementProps {
  return {
    className: classNames(styles.selectedOptionsContainer),
  };
}

export function SelectedOptions() {
  const dataHandlers = useSelectDataHandlers();
  const attr = createContainerProps();

  useLayoutEffect(() => {
    updateHiddenElementsCount(dataHandlers.getMetaData());
  });

  return (
    <div {...attr}>
      <ButtonWithSelectedOptions />
      <ClearButton />
      <ArrowButton />
    </div>
  );
}
