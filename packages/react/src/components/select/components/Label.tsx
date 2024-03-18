import React from 'react';

import { FieldLabel } from '../../../internal/field-label/FieldLabel';
import { useSelectDataHandlers } from '../hooks/useSelectDataHandlers';
import { SelectDataHandlers } from '../types';

type FieldLabelProps = Parameters<typeof FieldLabel>[0];

const createLabelProps = ({ getData, getMetaData }: SelectDataHandlers): FieldLabelProps => {
  const { label, required } = getData();
  const { elementIds } = getMetaData();
  return {
    required,
    label,
    inputId: elementIds.dropdownButton,
    id: elementIds.label,
  };
};

export const Label = () => {
  const props = createLabelProps(useSelectDataHandlers());
  if (!props.label) {
    return null;
  }
  return <FieldLabel {...props} />;
};
