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
];

const rows = [
  { cssVariable: <code>--container-width-xs</code>, sassVariable: <code>$container-width-xs</code>, pxValue: '288px' },
  { cssVariable: <code>--container-width-s</code>, sassVariable: <code>$container-width-s</code>, pxValue: '544px' },
  { cssVariable: <code>--container-width-m</code>, sassVariable: <code>$container-width-m</code>, pxValue: '720px' },
  { cssVariable: <code>--container-width-l</code>, sassVariable: <code>$container-width-l</code>, pxValue: '944px' },
  { cssVariable: <code>--container-width-xl</code>, sassVariable: <code>$container-width-xl</code>, pxValue: '1200px' },
];

export default function ContainerTokensTable() {
  return (
    <Table cols={cols} rows={rows} heading="Container width tokens" headingAriaLevel={3} indexKey="id" renderIndexCol={false} />
  );
}