import React from 'react';
import { Controller } from 'react-spring';

import { DivElementProps, SelectMetaData, ButtonElementProps, SelectData, Option } from '../..';
import { IconCrossCircle, IconAngleDown } from '../../../../icons';
import classNames from '../../../../utils/classNames';
import { getIndexOfFirstVisibleChild } from '../../../../utils/getIndexOfFirstVisibleChild';
import { createOnClickListener } from '../utils';
import { groupIds, eventTypes } from '../../groupData';
import { getSelectedOptions } from '../../utils';
import { useChangeTrigger, useContextTools } from '../hooks';
import styles from '../../Select.module.scss';

type TagContainerProps = DivElementProps & {
  options: Option[];
  placeholder: string;
  controller: Controller;
  icon: SelectMetaData['icon'];
};
type SingleOptionButtonProps = ButtonElementProps & {
  options: Option[];
  placeholder: string;
  icon: SelectMetaData['icon'];
  optionClassName: string;
  buttonRef: SelectMetaData['selectionButtonRef'];
};
type SelectedOptionsProps = DivElementProps & {
  singleOptionButtonProps?: SingleOptionButtonProps;
  clearButtonProps: ButtonElementProps;
  arrowButtonProps: ButtonElementProps;
  tagContainerProps?: TagContainerProps;
};

export const selectedOptionsId = 'selectedOptions';

export function ClearButton(props: ButtonElementProps) {
  return (
    <button type="button" {...props}>
      <IconCrossCircle className={styles.angleIcon} aria-hidden />
    </button>
  );
}

export function ArrowButton(props: ButtonElementProps) {
  return (
    <button type="button" {...props} aria-hidden>
      <IconAngleDown className={styles.angleIcon} aria-hidden />
    </button>
  );
}

export function SingleSelectButton(props: SingleOptionButtonProps) {
  const { options, placeholder, buttonRef, optionClassName, icon, ...attr } = props || {};
  const labels = options.length
    ? options.map((opt) => <span className={optionClassName}>{opt.label}</span>)
    : placeholder;
  return (
    <button type="button" {...attr} ref={buttonRef}>
      {icon && <span key="icon">{icon}</span>}
      <div className={styles.labels} key="labels">
        {labels}
      </div>
      <span className={styles.count} key="count">
        <span className="count" key="number">
          +1
        </span>
      </span>
    </button>
  );
}

const selectedOptionsPropSetter = (props: DivElementProps): SelectedOptionsProps => {
  const { getData, getMetaData } = useContextTools();
  const { groups, placeholder } = getData() as SelectData;
  const { icon, selectionButtonRef } = getMetaData() as SelectMetaData;
  // const isMultiSelect = getMultiSelectState(controller);
  const selectedOptions = getSelectedOptions(groups);
  const trigger = useChangeTrigger();
  const clearButtonProps = {
    className: classNames(styles.button, styles.icon),
    ...createOnClickListener({ id: groupIds.clearButton, type: eventTypes.click, trigger }),
  };
  const arrowButtonProps = {
    className: classNames(styles.button, styles.icon),
    ...createOnClickListener({ id: groupIds.arrowButton, type: eventTypes.click, trigger }),
  };

  return {
    ...props,
    className: classNames(styles.selectedOptionsContainer),
    clearButtonProps,
    arrowButtonProps,
    singleOptionButtonProps: {
      className: classNames(styles.button, styles.selection),
      options: selectedOptions,
      ...createOnClickListener({ id: selectedOptionsId, type: eventTypes.click, trigger }),
      placeholder,
      icon,
      optionClassName: styles.buttonOption,
      buttonRef: selectionButtonRef,
    },
  };
};

export function updateHiddenElementsCount(metaData: SelectMetaData) {
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

export function SelectedOptions(props: DivElementProps) {
  const {
    clearButtonProps,
    arrowButtonProps,
    singleOptionButtonProps,
    tagContainerProps,
    ...attr
  } = selectedOptionsPropSetter(props);
  const showClearButton =
    (singleOptionButtonProps && singleOptionButtonProps.options.length) ||
    (tagContainerProps && tagContainerProps.options.length);
  return (
    <div {...attr}>
      {singleOptionButtonProps && <SingleSelectButton {...singleOptionButtonProps} />}
      {showClearButton && <ClearButton {...clearButtonProps} />}
      <ArrowButton {...arrowButtonProps} />
    </div>
  );
}
