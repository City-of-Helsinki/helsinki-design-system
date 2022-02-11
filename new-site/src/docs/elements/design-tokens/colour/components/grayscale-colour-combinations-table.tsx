import React from "react"

import { Table } from 'hds-react';
import ContrastExample from '../../../../../components/examples/ContrastExample';

const cols = [
  { key: 'colourNameEn', headerName: 'Colour name' },
  { key: 'textColourToken', headerName: 'Text colour token' },
  { key: 'textContrast', headerName: 'Colour contrast (WCAG)' },
  { key: 'exampleBackground', headerName: 'Example (background)' },
  { key: 'exampleText', headerName: 'Example (text)' },
];

const rows = [
  { colourNameEn: <b>Black</b>, textColourToken: <code>--color-white</code>, textContrast: <span><b>AAA</b> <code>21 : 1</code></span>, exampleBackground: <ContrastExample color="var(--color-white)" background="var(--color-black)">AAA</ContrastExample>, exampleText: <ContrastExample color="var(--color-black)" background="var(--color-white)">AAA</ContrastExample> },
  { colourNameEn: <b>Black-90</b>, textColourToken: <code>--color-white</code>, textContrast: <span><b>AAA</b> <code>17,4 : 1</code></span>, exampleBackground: <ContrastExample color="var(--color-white)" background="var(--color-black-90)">AAA</ContrastExample>, exampleText: <ContrastExample color="var(--color-black-90)" background="var(--color-white)">AAA</ContrastExample> },
  { colourNameEn: <b>Black-80</b>, textColourToken: <code>--color-white</code>, textContrast: <span><b>AAA</b> <code>12,6 : 1</code></span>, exampleBackground: <ContrastExample color="var(--color-white)" background="var(--color-black-80)">AAA</ContrastExample>, exampleText: <ContrastExample color="var(--color-black-80)" background="var(--color-white)">AAA</ContrastExample> },
  { colourNameEn: <b>Black-70</b>, textColourToken: <code>--color-white</code>, textContrast: <span><b>AAA</b> <code>8,6 : 1</code></span>, exampleBackground: <ContrastExample color="var(--color-white)" background="var(--color-black-70)">AAA</ContrastExample>, exampleText: <ContrastExample color="var(--color-black-70)" background="var(--color-white)">AAA</ContrastExample> },
  { colourNameEn: <b>Black-60</b>, textColourToken: <code>--color-white</code>, textContrast: <span><b>AA</b> (AAA for large text) <code>5,7 : 1</code></span>, exampleBackground: <ContrastExample color="var(--color-white)" background="var(--color-black-60)">AAA</ContrastExample>, exampleText: <ContrastExample color="var(--color-black-60)" background="var(--color-white)">AAA</ContrastExample> },
  { colourNameEn: <b>Black-50</b>, textColourToken: <code>--color-black-90</code>, textContrast: <span>AA for large text <code>4,3 : 1</code></span>, exampleBackground: <ContrastExample color="var(--color-black-90)" background="var(--color-black-50)">A</ContrastExample>, exampleText: <ContrastExample color="var(--color-black-50)" background="var(--color-black)">AAA</ContrastExample> },
  { colourNameEn: <b>Black-40</b>, textColourToken: <code>--color-black-90</code>, textContrast: <span><b>AA</b> (AAA for large text) <code>6,1 : 1</code></span>, exampleBackground: <ContrastExample color="var(--color-black-90)" background="var(--color-black-40)">AA</ContrastExample>, exampleText: <ContrastExample color="var(--color-black-40)" background="var(--color-black)">AAA</ContrastExample> },
  { colourNameEn: <b>Black-30</b>, textColourToken: <code>--color-black-90</code>, textContrast: <span><b>AAA</b> <code>8,2 : 1</code></span>, exampleBackground: <ContrastExample color="var(--color-black-90)" background="var(--color-black-30)">AAA</ContrastExample>, exampleText: <ContrastExample color="var(--color-black-30)" background="var(--color-black)">AAA</ContrastExample> },
  { colourNameEn: <b>Black-20</b>, textColourToken: <code>--color-black-90</code>, textContrast: <span><b>AAA</b> <code>10,8 : 1</code></span>, exampleBackground: <ContrastExample color="var(--color-black-90)" background="var(--color-black-20)">AAA</ContrastExample>, exampleText: <ContrastExample color="var(--color-black-20)" background="var(--color-black)">AAA</ContrastExample> },
  { colourNameEn: <b>Black-10</b>, textColourToken: <code>--color-black-90</code>, textContrast: <span><b>AAA</b> <code>13,8 : 1</code></span>, exampleBackground: <ContrastExample color="var(--color-black-90)" background="var(--color-black-10)">AAA</ContrastExample>, exampleText: <ContrastExample color="var(--color-black-10)" background="var(--color-black)">AAA</ContrastExample> },
  { colourNameEn: <b>Black-5</b>, textColourToken: <code>--color-black-90</code>, textContrast: <span><b>AAA</b> <code>15,4 : 1</code></span>, exampleBackground: <ContrastExample color="var(--color-black-90)" background="var(--color-black-5)">AAA</ContrastExample>, exampleText: <ContrastExample color="var(--color-black-5)" background="var(--color-black)">AAA</ContrastExample> },
  { colourNameEn: <b>White</b>, textColourToken: <code>--color-black-90</code>, textContrast: <span><b>AAA</b> <code>17,4 : 1</code></span>, exampleBackground: <ContrastExample color="var(--color-black-90)" background="var(--color-white)">AAA</ContrastExample>, exampleText: <ContrastExample color="var(--color-white)" background="var(--color-black)">AAA</ContrastExample> },

];

export default function GrayscaleColourCombinationsTable() {
  return (
    <Table dense cols={cols} rows={rows} indexKey="id" renderIndexCol={false} />
  );
}