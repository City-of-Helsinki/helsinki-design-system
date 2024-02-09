import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { PropSetter } from '../../group/utils';
import { getMetaDataFromController, getSelectDataFromController } from '../utils';
import { FieldLabel } from '../../../internal/field-label/FieldLabel';
import { ComponentToGroupChild } from '../../group/Group';

type FieldLabelProps = Parameters<typeof FieldLabel>[0];

export const labelGroupId = 'label';

export const labelPropSetter: PropSetter<FieldLabelProps> = ({ controller }) => {
  const { label, required } = getSelectDataFromController(controller);
  const { elementIds } = getMetaDataFromController(controller);
  return {
    required,
    className: classNames(styles.label),
    label,
    inputId: elementIds.button,
    id: elementIds.label,
  };
};

export const Label = ComponentToGroupChild((props: FieldLabelProps) => {
  if (!(props as FieldLabelProps).label) {
    return null;
  }
  return <FieldLabel {...(props as FieldLabelProps)} />;
}, labelGroupId);
