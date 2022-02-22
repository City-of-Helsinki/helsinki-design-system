import React from "react"

import { Table } from 'hds-react';
import ContrastExample from '../../../../../components/examples/ContrastExample';

const cols = [
  { key: 'colourNameEn', headerName: 'Colour name' },
  { key: 'backgroundColourToken', headerName: 'Background colour token' },
  { key: 'colourContrast', headerName: 'Colour contrast (WCAG)' },
  { key: 'example', headerName: 'Example' },
];

const rows = [
  { colourNameEn: <span><b>Coat of Arms</b></span>, backgroundColourToken: <code>--color-white</code>, colourContrast: <span><b>AA</b> <code>5 : 1</code></span>, example: <ContrastExample color="var(--color-coat-of-arms)" background="var(--color-white)">AA</ContrastExample> },
  { colourNameEn: <span><b>White</b></span>, backgroundColourToken: <code>--color-black</code>, colourContrast: <span><b>AAA</b> <code>21 : 1</code></span>, example: <ContrastExample color="var(--color-white)" background="var(--color-black)">AAA</ContrastExample> },
];

export default function FocusColourCombinationsTable() {
  return (
    <Table dense cols={cols} rows={rows} indexKey="id" renderIndexCol={false} />
  );
}