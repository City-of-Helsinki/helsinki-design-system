import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import styles from './styles.module.scss';
import classNames from '../../../utils/classNames';
import { PropSetter } from '../../group/utils';
import { createOnClickListener } from '../../group/utils/propSetterHelpers';
import { IconAngleDown } from '../../../icons/IconAngleDown';
import { getMultiSelectState, getSelectDataFromController, getSelectedOptions } from '../utils';
import { SelectedTag, selectedTagPropSetter } from './SelectedTag';

export type ButtonElementProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, never>;

export const selectButtonPropSetter: PropSetter<ButtonElementProps> = (propSetterProps) => {
  const { controller } = propSetterProps;
  const { groups } = getSelectDataFromController(controller);
  const isMultiSelect = getMultiSelectState(controller);
  const selectedOptions = getSelectedOptions(groups);
  const children = isMultiSelect
    ? selectedOptions.map((option) => <SelectedTag {...selectedTagPropSetter({ option, controller })} />)
    : (selectedOptions[0] && selectedOptions[0].value) || '';
  return {
    className: classNames(styles.button),
    ...createOnClickListener(propSetterProps),
    children,
  };
};

export function SelectButton(props: ButtonElementProps) {
  const { children, ...attr } = props;
  return (
    <button type="button" {...attr}>
      {children}
      <IconAngleDown className={styles.angleIcon} aria-hidden />
    </button>
  );
}
