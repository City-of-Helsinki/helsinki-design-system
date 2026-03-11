import React from 'react';

import { FieldLabel } from '../../../../internal/field-label/FieldLabel';
import { useSearchDataHandlers } from '../hooks/useSearchDataHandlers';
import { getTextFromDataHandlers } from '../texts';
import { SearchDataHandlers } from '../types';

type FieldLabelProps = Parameters<typeof FieldLabel>[0];

const createLabelProps = (dataHandlers: SearchDataHandlers): FieldLabelProps => {
  const { getData, getMetaData } = dataHandlers;
  const { required } = getData();
  const { elementIds, tooltip } = getMetaData();
  const label = getTextFromDataHandlers('label', dataHandlers);
  return {
    required,
    label,
    inputId: elementIds.searchInput,
    id: elementIds.label,
    tooltip,
  };
};

export const Label = () => {
  const props = createLabelProps(useSearchDataHandlers());
  if (!props.label) {
    return null;
  }
  return <FieldLabel {...props} />;
};
