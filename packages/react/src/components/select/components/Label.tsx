import React from 'react';

import { FieldLabel } from '../../../internal/field-label/FieldLabel';
import { useSelectDataHandlers } from '../typedHooks';
import { SelectDataHandlers } from '../types';

type FieldLabelProps = Parameters<typeof FieldLabel>[0];

const createLabelProps = ({ getData, getMetaData }: SelectDataHandlers): FieldLabelProps => {
  const { label, required } = getData();
  const { elementIds } = getMetaData();
  return {
    required,
    label,
    inputId: elementIds.button,
    id: elementIds.label,
  };
};

export const Label = () => {
  return <FieldLabel {...createLabelProps(useSelectDataHandlers())} />;
};
