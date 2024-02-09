import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { Controller, DefaultGroupElementProps, PropSetter } from '../../group/utils';
import { createOnClickListener } from '../../group/utils/propSetterHelpers';
import { getMetaDataFromController, getSelectDataFromController, getSelectedOptions } from '../utils';
import { ButtonElementProps } from './SelectedTag';
import { IconCrossCircle, IconAngleDown } from '../../../icons';
import { DivElementProps, Option, SelectMetaData } from '..';
import { eventTypes, groupIds } from '../groupData';
import { getIndexOfFirstVisibleChild } from '../../../utils/getIndexOfFirstVisibleChild';

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

/*
export function Tags(props: TagContainerProps) {
  const { options, placeholder, controller, icon, ...attr } = props || {};
  const children =
    options && options.length
      ? options.map((option) => <SelectedTag {...selectedTagPropSetter({ option, controller })} key={option.value} />)
      : placeholder;
  return (
    <div {...attr}>
      {icon && <span>{icon}</span>}
      {children}
    </div>
  );
} */

export const selectedOptionsPropSetter: PropSetter<SelectedOptionsProps> = (propSetterProps) => {
  const { controller } = propSetterProps;
  const { groups, placeholder } = getSelectDataFromController(controller);
  const { icon, selectionButtonRef } = getMetaDataFromController(controller);
  // const isMultiSelect = getMultiSelectState(controller);
  const selectedOptions = getSelectedOptions(groups);
  const clearButtonProps = {
    className: classNames(styles.button, styles.icon),
    ...createOnClickListener({ id: groupIds.clearButton, controller }, eventTypes.click),
  };
  const arrowButtonProps = {
    className: classNames(styles.button, styles.icon),
    ...createOnClickListener({ id: groupIds.arrowButton, controller }, eventTypes.click),
  };

  /*

  if (isMultiSelect && selectedOptions.length) {
    return {
      className: classNames(styles.selectedOptionsContainer),
      clearButtonProps,
      arrowButtonProps,
      tagContainerProps: {
        className: classNames(styles.tagContainer),
        options: selectedOptions,
        placeholder,
        controller,
        icon,
        // this onCLick goes to div!
        ...createOnClickListener(propSetterProps),
      },
    };
  } */
  return {
    className: classNames(styles.selectedOptionsContainer),
    clearButtonProps,
    arrowButtonProps,
    singleOptionButtonProps: {
      className: classNames(styles.button, styles.selection),
      options: selectedOptions,
      ...createOnClickListener(propSetterProps, eventTypes.click),
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

export function SelectedOptions(props: DefaultGroupElementProps) {
  const {
    clearButtonProps,
    arrowButtonProps,
    singleOptionButtonProps,
    tagContainerProps,
    ...attr
  } = (props as unknown) as SelectedOptionsProps;
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
