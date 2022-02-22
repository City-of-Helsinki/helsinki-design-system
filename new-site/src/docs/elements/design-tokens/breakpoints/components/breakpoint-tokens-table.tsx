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
  { key: 'scalingMethod', headerName: 'Scaling method' },
];

const rows = [
  { cssVariable: <code>--breakpoint-xs</code>, sassVariable: <code>$breakpoint-xs</code>, pxValue: '≥ 320px', scalingMethod: 'Scale columns' },
  { cssVariable: <code>--breakpoint-s</code>, sassVariable: <code>$breakpoint-s</code>, pxValue: '≥ 576px', scalingMethod: '	Scale outside margins' },
  { cssVariable: <code>--breakpoint-m</code>, sassVariable: <code>$breakpoint-m</code>, pxValue: '≥ 768px', scalingMethod: '	Scale outside margins' },
  { cssVariable: <code>--breakpoint-l</code>, sassVariable: <code>$breakpoint-l</code>, pxValue: '≥ 992px', scalingMethod: '	Scale outside margins' },
  { cssVariable: <code>--breakpoint-xl</code>, sassVariable: <code>$breakpoint-xl</code>, pxValue: '≥ 1248px', scalingMethod: '	Scale outside margins' },
];

export default function BreakpointTokensTable() {
  return (
    <Table cols={cols} rows={rows} heading="Breakpoint tokens" headingAriaLevel={3} indexKey="id" renderIndexCol={false} />
  );
}