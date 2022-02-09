import React from "react"

import { Table } from 'hds-react';
import ColorExample from '../../../../../components/ColorExample';

const cols = [
  { key: 'statusName', headerName: 'Status name' },
  { key: 'usage', headerName: 'Usage' },
  { key: 'example', headerName: 'Example message' },
  { key: 'baseColourExample', headerName: 'Base colour' },
  { key: 'darkVariantExample', headerName: 'Medium light' },
  { key: 'lightVariantExample', headerName: 'Light' },
];

const rows = [
  { statusName: 'Info', usage: 'State which does not indicate clear success or failure but can be useful extra information to the user.', example: <i>You have received new messages.</i>, baseColourExample: <ColorExample color="var(--color-info)" name="Info base status colour example" />, darkVariantExample: <ColorExample color="var(--color-info-dark)" name="Info dark variant example" />, lightVariantExample: <ColorExample color="var(--color-info-light)" name="Info light variant example" />},
  { statusName: 'Success', usage: 'Positive state to inform user about success.', example: <i>Form submit was successful!</i>, baseColourExample: <ColorExample color="var(--color-success)" name="success base status colour example" />, darkVariantExample: <ColorExample color="var(--color-success-dark)" name="success dark variant example" />, lightVariantExample: <ColorExample color="var(--color-success-light)" name="success light variant example" />},
  { statusName: 'Alert', usage: 'Warning state to catch users attention but does not require immediate actions.', example: <i>Loading is taking longer than expected.</i>, baseColourExample: <ColorExample color="var(--color-alert)" name="alert base status colour example" />, darkVariantExample: <ColorExample color="var(--color-alert-dark)" name="alert dark variant example" />, lightVariantExample: <ColorExample color="var(--color-alert-light)" name="alert light variant example" />},
  { statusName: 'Error', usage: 'Error state which requires users immediate action.', example: <i>Form is missing critical information.</i>, baseColourExample: <ColorExample color="var(--color-error)" name="error base status colour example" />, darkVariantExample: <ColorExample color="var(--color-error-dark)" name="error dark variant example" />, lightVariantExample: <ColorExample color="var(--color-error-light)" name="error light variant example" />},
];

export default function StatusColoursTable() {
  return (
    <Table dense cols={cols} rows={rows} indexKey="id" renderIndexCol={false} />
  );
}