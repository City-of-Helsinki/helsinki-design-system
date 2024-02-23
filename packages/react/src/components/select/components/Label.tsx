import React from 'react';

import { FieldLabel } from '../../../internal/field-label/FieldLabel';
import { useSelectDataHandlers } from '../typedHooks';
import { SelectDataHandlers } from '../types';

type FieldLabelProps = Parameters<typeof FieldLabel>[0];
type LabelComponentProps = Partial<FieldLabelProps>;

const createLabelProps = (
  props: LabelComponentProps,
  { getData, getMetaData }: SelectDataHandlers,
): FieldLabelProps => {
  const { label, required } = getData();
  const { elementIds } = getMetaData();
  return {
    ...props,
    required,
    label,
    inputId: elementIds.button,
    id: elementIds.label,
  };
};

export const Label = (props: LabelComponentProps = {}) => {
  return <FieldLabel {...createLabelProps(props, useSelectDataHandlers())} />;
};
