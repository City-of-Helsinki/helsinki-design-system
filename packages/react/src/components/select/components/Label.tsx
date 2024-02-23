import React from 'react';

import { FieldLabel } from '../../../internal/field-label/FieldLabel';
import { useContextDataHandlers } from '../../dataProvider/hooks';
import { SelectData, SelectMetaData } from '../types';

type FieldLabelProps = Parameters<typeof FieldLabel>[0];
type LabelComponentProps = Partial<FieldLabelProps>;

const labelPropSetter = (props?: LabelComponentProps): FieldLabelProps => {
  const { getData, getMetaData } = useContextDataHandlers();
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
