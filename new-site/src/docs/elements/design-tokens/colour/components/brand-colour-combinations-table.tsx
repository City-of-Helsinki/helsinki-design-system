import React from "react"

import { Table } from 'hds-react';
import ContrastExample from '../../../../../components/examples/ContrastExample';

const cols = [
  { key: 'colourNameEn', headerName: 'Colour name' },
  { key: 'textColourToken', headerName: 'Text colour token' },
  { key: 'textContrast', headerName: 'Colour contrast (WCAG)' },
  { key: 'example', headerName: 'Example' },
];

const rows = [
  { colourNameEn: <b>Engel</b>, textColourToken: <code>--color-black-90</code>, textContrast: <span><b>AAA</b> <code>14,3 : 1</code></span>, example: <ContrastExample color="var(--color-black-90)" background="var(--color-engel)">AAA</ContrastExample> },
  { colourNameEn: <b>Silver</b>, textColourToken: <code>--color-black-90</code>, textContrast: <span><b>AAA</b> <code>13,1 : 1</code></span>, example: <ContrastExample color="var(--color-black-90)" background="var(--color-silver)">AAA</ContrastExample> },
  { colourNameEn: <b>Bus</b>, textColourToken: <code>--color-white</code>, textContrast: <span><b>AAA</b> <code>12 : 1</code></span>, example: <ContrastExample color="var(--color-white)" background="var(--color-bus)">AAA</ContrastExample> },
  { colourNameEn: <b>Summer</b>, textColourToken: <code>--color-black-90</code>, textContrast: <span><b>AAA</b> <code>11,1 : 1</code></span>, example: <ContrastExample color="var(--color-black-90)" background="var(--color-summer)">AAA</ContrastExample> },
  { colourNameEn: <b>Fog</b>, textColourToken: <code>--color-black-90</code>, textContrast: <span><b>AAA</b> <code>10 : 1</code></span>, example: <ContrastExample color="var(--color-black-90)" background="var(--color-fog)">AAA</ContrastExample> },
  { colourNameEn: <b>Copper</b>, textColourToken: <code>--color-black-90</code>, textContrast: <span><b>AAA</b> <code>9,4 : 1</code></span>, example: <ContrastExample color="var(--color-black-90)" background="var(--color-copper)">AAA</ContrastExample> },
  { colourNameEn: <b>Suomenlinna</b>, textColourToken: <code>--color-black-90</code>, textContrast: <span><b>AAA</b> <code>9,1 : 1</code></span>, example: <ContrastExample color="var(--color-black-90)" background="var(--color-suomenlinna)">AAA</ContrastExample> },
  { colourNameEn: <b>Gold</b>, textColourToken: <code>--color-black-90</code>, textContrast: <span><b>AAA</b> (AAA for large text) <code>7,1 : 1</code></span>, example: <ContrastExample color="var(--color-black-90)" background="var(--color-gold)">AAA</ContrastExample> },
  { colourNameEn: <b>Brick</b>, textColourToken: <code>--color-white</code>, textContrast: <span><b>AA</b> (AAA for large text) <code>6,1 : 1</code></span>, example: <ContrastExample color="var(--color-white)" background="var(--color-brick)">AA</ContrastExample> },
  { colourNameEn: <b>Metro</b>, textColourToken: <code>--color-black-90</code>, textContrast: <span><b>AA</b> (AAA for large text) <code>5,2 : 1</code></span>, example: <ContrastExample color="var(--color-black-90)" background="var(--color-metro)">AA</ContrastExample> },
  { colourNameEn: <b>Coat of Arms</b>, textColourToken: <code>--color-white</code>, textContrast: <span><b>AA</b> (AAA for large text) <code>5 : 1</code></span>, example: <ContrastExample color="var(--color-white)" background="var(--color-coat-of-arms)">AA</ContrastExample> },
  { colourNameEn: <b>Tram</b>, textColourToken: <code>--color-white</code>, textContrast: <span><b>AA</b> (AAA for large text) <code>4,6 : 1</code></span>, example: <ContrastExample color="var(--color-white)" background="var(--color-tram)">AA</ContrastExample> },
];

export default function BrandColourCombinationsTable() {
  return (
    <Table dense cols={cols} rows={rows} indexKey="id" renderIndexCol={false} />
  );
}