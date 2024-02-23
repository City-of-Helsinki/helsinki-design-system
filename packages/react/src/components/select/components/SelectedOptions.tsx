import React, { useLayoutEffect } from 'react';

import styles from '../Select.module.scss';
import { DivElementProps, SelectMetaData, ButtonElementProps, Option, SelectDataHandlers } from '../types';
import { IconCrossCircle, IconAngleDown } from '../../../icons';
import classNames from '../../../utils/classNames';
import { getIndexOfFirstVisibleChild } from '../../../utils/getIndexOfFirstVisibleChild';
import { createOnClickListener, getSelectedOptions } from '../utils';
import { eventTypes, eventIds } from '../events';
import { useSelectDataHandlers } from '../typedHooks';

type SingleOptionButtonProps = ButtonElementProps & {
  options: Option[];
  placeholder: string;
  icon: SelectMetaData['icon'];
  optionClassName: string;
  buttonRef: SelectMetaData['selectionButtonRef'];
};

const createClearButtonProps = ({ getData, getMetaData, trigger }: SelectDataHandlers): ButtonElementProps | null => {
  const { elementIds } = getMetaData();
  const { groups } = getData();
  const selectedOptions = getSelectedOptions(groups);
  if (!selectedOptions.length) {
    return null;
  }
  return {
    className: classNames(styles.button, styles.icon),
    ...createOnClickListener({ id: eventIds.clearButton, type: eventTypes.click, trigger }),
    id: elementIds.clearButton,
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

const createArrowButtonProps = ({ getMetaData, trigger }: SelectDataHandlers): ButtonElementProps => {
  const { elementIds } = getMetaData();
  return {
    className: classNames(styles.button, styles.icon),
    ...createOnClickListener({ id: eventIds.arrowButton, type: eventTypes.click, trigger }),
    id: elementIds.arrowButton,
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

const createButtonWithSelectionProps = ({
  getData,
  getMetaData,
  trigger,
}: SelectDataHandlers): SingleOptionButtonProps => {
  const { groups, placeholder } = getData();
  const { icon, selectionButtonRef, elementIds } = getMetaData();
  const selectedOptions = getSelectedOptions(groups);
  return {
    className: classNames(styles.button, styles.selection, !selectedOptions.length && styles.placeholder),
    options: selectedOptions,
    ...createOnClickListener({ id: eventIds.selectedOptions, type: eventTypes.click, trigger }),
    placeholder,
    icon,
    optionClassName: styles.buttonOption,
    buttonRef: selectionButtonRef,
    id: elementIds.button,
  };
};

function ButtonWithSelection() {
  const { options, placeholder, buttonRef, optionClassName, icon, ...attr } = createButtonWithSelectionProps(
    useSelectDataHandlers(),
  );
  const labels = options.length
    ? options.map((opt) => (
        <span className={optionClassName} key={opt.value}>
          {opt.label}
        </span>
      ))
    : placeholder;
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

function updateHiddenElementsCount(metaData: SelectMetaData) {
  const buttonEl = metaData.selectionButtonRef.current;
  const labels = buttonEl && buttonEl.querySelector('* > div');
  if (labels) {
    labels.childNodes.forEach(
      (el) => el && (el as HTMLElement).classList && (el as HTMLElement).classList.remove(styles.lastVisible),
    );
    const firstVisible = getIndexOfFirstVisibleChild(labels);
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
      <ButtonWithSelection />
      <ClearButton />
      <ArrowButton />
    </div>
  );
}
