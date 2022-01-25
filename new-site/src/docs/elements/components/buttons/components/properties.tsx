import React from "react"

import { Table } from 'hds-react';

const cols = [
  { key: 'property', headerName: 'Property' },
  { key: 'description', headerName: 'Description' },
  { key: 'values', headerName: 'Values' },
  { key: 'defaultValue', headerName: 'Default value' },
];

const rows = [
  { property: <code>variant</code>, description: 'Variant of the button', values: "primary, secondary, supplementary, success, danger", defaultValue: 'primary' },
  { property: <code>size</code>, description: 'Size of the button', values: 'default, small', defaultValue: 'default' },
  { property: <code>iconLeft</code>, description: 'Icon placed on the left side of the button label', values: '-', defaultValue: '-' },
  { property: <code>iconLeft</code>, description: 'Icon placed on the right side of the button label', values: '-', defaultValue: '-' },
  { property: <code>fullWidth</code>, description: 'If set to true, the button will take full width of its container', values: 'true, false', defaultValue: 'false' },
  { property: <code>isLoading</code>, description: 'If set to true, a loading spinner is displayed inside the button', values: 'true, false', defaultValue: 'false' },
  { property: <code>loadingText</code>, description: 'Visible loading text to be shown next to the loading spinner', values: '-', defaultValue: '-' },
];

const caption = (
  <span>
    <b>Table 1</b>: Button component properties
  </span>
)

export default function PropertyTable() {
  return (
    <Table cols={cols} rows={rows} caption={caption} indexKey="id" renderIndexCol={false} />
  );
}