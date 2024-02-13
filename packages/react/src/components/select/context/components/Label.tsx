import React from 'react';

import { FieldLabel } from '../../../../internal/field-label/FieldLabel';
import { useContextTools } from '../hooks';
import { SelectData, SelectMetaData } from '../..';

type FieldLabelProps = Parameters<typeof FieldLabel>[0];
type LabelComponentProps = Partial<FieldLabelProps>;

export const labelDataContextId = 'label';

const labelPropSetter = (props?: LabelComponentProps): FieldLabelProps => {
  const { getData, getMetaData } = useContextTools();
  const { label, required } = getData() as SelectData;
  const { elementIds } = getMetaData() as SelectMetaData;
  return {
    ...props,
    required,
    label,
    inputId: elementIds.button,
    id: elementIds.label,
  };
};

export const Label = (props: LabelComponentProps = {}) => {
  return <FieldLabel {...labelPropSetter(props)} />;
};
