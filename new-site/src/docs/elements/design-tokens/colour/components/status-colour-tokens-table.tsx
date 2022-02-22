import React from "react"

import { Table } from 'hds-react';
import TextAndColorExample from '../../../../../components/examples/TextAndColorExample';

const cols = [
  { key: 'cssVariable', headerName: 'CSS variable' },
  { key: 'sassVariable', headerName: 'SASS variable' },
  { key: 'hexValue', headerName: 'HEX value' },
  { key: 'example', headerName: 'Example' },
];

const rows = [
  { cssVariable: <code>--color-info</code>, sassVariable: <code>$color-info</code>, hexValue: '#007293', example: <TextAndColorExample color="var(--color-info)" name="Info example" /> },
  { cssVariable: <code>--color-info-dark</code>, sassVariable: <code>$color-info-dark</code>, hexValue: '#007293', example: <TextAndColorExample color="var(--color-info-dark)" name="Info dark variant example" /> },
  { cssVariable: <code>--color-info-light</code>, sassVariable: <code>$color-info-light</code>, hexValue: '#dcf1f5', example: <TextAndColorExample color="var(--color-info-light)" name="Info light variant example" /> },

  { cssVariable: <code>--color-success</code>, sassVariable: <code>$color-success</code>, hexValue: '#007a64', example: <TextAndColorExample color="var(--color-success)" name="Success example" /> },
  { cssVariable: <code>--color-success-dark</code>, sassVariable: <code>$color-success-dark</code>, hexValue: '#006250', example: <TextAndColorExample color="var(--color-success-dark)" name="Success dark variant example" /> },
  { cssVariable: <code>--color-success-light</code>, sassVariable: <code>$color-success-light</code>, hexValue: '#e2f5f3', example: <TextAndColorExample color="var(--color-success-light)" name="Success light variant example" /> },

  { cssVariable: <code>--color-alert</code>, sassVariable: <code>$color-alert</code>, hexValue: '#ffda07', example: <TextAndColorExample color="var(--color-alert)" name="Alert example" /> },
  { cssVariable: <code>--color-alert-dark</code>, sassVariable: <code>$color-alert-dark</code>, hexValue: '#986700', example: <TextAndColorExample color="var(--color-alert-dark)" name="Alert dark variant example" /> },
  { cssVariable: <code>--color-alert-light</code>, sassVariable: <code>$color-alert-light</code>, hexValue: '#fff4b4', example: <TextAndColorExample color="var(--color-alert-light)" name="Alert light variant example" /> },

  { cssVariable: <code>--color-error</code>, sassVariable: <code>$color-error</code>, hexValue: '#c4123e', example: <TextAndColorExample color="var(--color-error)" name="Error example" /> },
  { cssVariable: <code>--color-error-dark</code>, sassVariable: <code>$color-error-dark</code>, hexValue: '#8d0d2d', example: <TextAndColorExample color="var(--color-error-dark)" name="Error dark variant example" /> },
  { cssVariable: <code>--color-error-light</code>, sassVariable: <code>$color-error-light</code>, hexValue: '#f6e2e6', example: <TextAndColorExample color="var(--color-error-light)" name="Error light variant example" /> },
];

export default function StatusColoursTokensTable() {
  return (
    <Table dense cols={cols} rows={rows} heading="Status colour tokens" headingAriaLevel={3} indexKey="id" renderIndexCol={false} />
  );
}