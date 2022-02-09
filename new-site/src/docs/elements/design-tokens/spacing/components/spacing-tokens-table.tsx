import React from "react"

import { Table } from 'hds-react';

const cols = [
  { key: 'cssVariable', headerName: 'CSS variable' },
  { key: 'sassVariable', headerName: 'SASS variable' },
  { 
    key: 'pxValue', 
    headerName: 'PX value',
    transform: ({ pxValue }) => {
      return <div style={{ textAlign: 'right' }}>{pxValue}</div>;
    }, 
  },
  { 
    key: 'remValue',
    headerName: 'REM value',
    transform: ({ remValue }) => {
      return <div style={{ textAlign: 'right' }}>{remValue}</div>;
    },
  },
  { key: 'example', headerName: 'Example' },
];

const rows = [
  { cssVariable: <code>--spacing-4-xs</code>, sassVariable: <code>$spacing-4-xs</code>, pxValue: '2px', remValue: '0.125rem', example: '' },
  { cssVariable: <code>--spacing-3-xs</code>, sassVariable: <code>$spacing-3-xs</code>, pxValue: '4px', remValue: '0.24rem', example: '' },
  { cssVariable: <code>--spacing-2-xs</code>, sassVariable: <code>$spacing-2-xs</code>, pxValue: '8px', remValue: '0.5rem', example: '' },
  { cssVariable: <code>--spacing-xs</code>, sassVariable: <code>$spacing-xs</code>, pxValue: '12px', remValue: '0.75rem', example: '' },
  { cssVariable: <code>--spacing-s</code>, sassVariable: <code>$spacing-s</code>, pxValue: '16px', remValue: '1rem', example: '' },
  { cssVariable: <code>--spacing-m</code>, sassVariable: <code>$spacing-m</code>, pxValue: '24px', remValue: '1.5rem', example: '' },
  { cssVariable: <code>--spacing-l</code>, sassVariable: <code>$spacing-l</code>, pxValue: '32px', remValue: '2rem', example: '' },
  { cssVariable: <code>--spacing-xl</code>, sassVariable: <code>$spacing-xl</code>, pxValue: '40px', remValue: '2.5rem', example: '' },
  { cssVariable: <code>--spacing-2-xl</code>, sassVariable: <code>$spacing-2-xl</code>, pxValue: '48px', remValue: '3rem', example: '' },
  { cssVariable: <code>--spacing-3-xl</code>, sassVariable: <code>$spacing-3-xl</code>, pxValue: '56px', remValue: '3.5rem', example: '' },
  { cssVariable: <code>--spacing-4-xl</code>, sassVariable: <code>$spacing-4-xl</code>, pxValue: '64px', remValue: '4rem', example: '' },
  { cssVariable: <code>--spacing-5-xl</code>, sassVariable: <code>$spacing-5-xl</code>, pxValue: '72px', remValue: '4.5rem', example: '' },
];

export default function SpacingTokensTable() {
  return (
    <Table cols={cols} rows={rows} heading="Spacing tokens" headingAriaLevel={3} indexKey="id" renderIndexCol={false} />
  );
}