import React from "react"

import { Table } from 'hds-react';
import { IconError } from 'hds-react';

import ContrastExample from '../../../../../components/examples/ContrastExample';

const cols = [
  { key: 'colourNameEn', headerName: 'Colour name' },
  { key: 'colourContrast', headerName: 'Colour contrast (WCAG)' },
  { key: 'example', headerName: 'Example' },
];

const rows = [
  { colourNameEn: <b>Bus</b>, colourContrast: <span><b>AAA</b> <code>12 : 1</code></span>, example: <ContrastExample color="var(--color-bus)" background="var(--color-white)">AAA</ContrastExample>  },
  { colourNameEn: <b>Brick</b>, colourContrast: <span><b>AA</b> (AAA for large text) <code>6,1 : 1</code></span>, example: <ContrastExample color="var(--color-brick)" background="var(--color-white)">AA</ContrastExample> },
  { colourNameEn: <b>Coat of Arms</b>, colourContrast: <span><b>AA</b> (AAA for large text) <code>5 : 1</code></span>, example: <ContrastExample color="var(--color-coat-of-arms)" background="var(--color-white)">AA</ContrastExample> },
  { colourNameEn: <b>Tram</b>, colourContrast: <span><b>AA</b> (AAA for large text) <code>4,6 : 1</code></span>, example: <ContrastExample color="var(--color-tram)" background="var(--color-white)">AA</ContrastExample> },
  { colourNameEn: <b>Metro</b>, colourContrast: <span>AA for large text <code>3,3 : 1</code></span>, example: <ContrastExample color="var(--color-metro)" background="var(--color-white)">A</ContrastExample> },

];

export default function BrandColourOnWhiteTable() {
  return (
    <Table dense cols={cols} rows={rows} indexKey="id" renderIndexCol={false} />
  );
}