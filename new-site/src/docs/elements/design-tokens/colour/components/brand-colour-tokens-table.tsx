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
  { cssVariable: <code>--color-brick</code>, sassVariable: <code>$color-brick</code>, hexValue: '#bd2719', example: <TextAndColorExample color="var(--color-brick)" name="Brick example" /> },
  { cssVariable: <code>--color-bus</code>, sassVariable: <code>$color-bus</code>, hexValue: '#0000bf', example: <TextAndColorExample color="var(--color-bus)" name="Bus example" /> },
  { cssVariable: <code>--color-coat-of-arms</code>, sassVariable: <code>$color-coat-of-arms</code>, hexValue: '#0072c6', example: <TextAndColorExample color="var(--color-coat-of-arms)" name="Coat of Arms example" /> },
  { cssVariable: <code>--color-gold</code>, sassVariable: <code>$color-gold</code>, hexValue: '#c2a251', example: <TextAndColorExample color="var(--color-gold)" name="Gold example" /> },
  { cssVariable: <code>--color-silver</code>, sassVariable: <code>$color-silver</code>, hexValue: '#dedfe1', example: <TextAndColorExample color="var(--color-silver)" name="Silver example" /> },
  { cssVariable: <code>--color-copper</code>, sassVariable: <code>$color-copper</code>, hexValue: '#00d7a7', example: <TextAndColorExample color="var(--color-copper)" name="Copper example" /> },
  { cssVariable: <code>--color-engel</code>, sassVariable: <code>$color-engel</code>, hexValue: '#ffe977', example: <TextAndColorExample color="var(--color-engel)" name="Engel example" /> },
  { cssVariable: <code>--color-fog</code>, sassVariable: <code>$color-fog</code>, hexValue: '#9fc9eb', example: <TextAndColorExample color="var(--color-fog)" name="Fog example" /> },
  { cssVariable: <code>--color-metro</code>, sassVariable: <code>$color-metro</code>, hexValue: '#fd4f00', example: <TextAndColorExample color="var(--color-metro)" name="Metro example" /> },
  { cssVariable: <code>--color-summer</code>, sassVariable: <code>$color-summer</code>, hexValue: '#ffc61e', example: <TextAndColorExample color="var(--color-summer)" name="Summer example" /> },
  { cssVariable: <code>--color-suomenlinna</code>, sassVariable: <code>$color-suomenlinna</code>, hexValue: '#f5a3c7', example: <TextAndColorExample color="var(--color-suomenlinna)" name="Suomenlinna example" /> },
  { cssVariable: <code>--color-tram</code>, sassVariable: <code>$color-tram</code>, hexValue: '#008741', example: <TextAndColorExample color="var(--color-tram)" name="Tram example" /> },
];

export default function BrandColoursTokensTable() {
  return (
    <Table dense cols={cols} rows={rows} heading="Brand colour tokens" headingAriaLevel={3} indexKey="id" renderIndexCol={false} />
  );
}