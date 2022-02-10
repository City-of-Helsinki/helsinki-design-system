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
  { cssVariable: <code>--color-black</code>, sassVariable: <code>$color-black</code>, hexValue: '#000000', example: <TextAndColorExample color="var(--color-black)" name="Black example" /> },
  { cssVariable: <code>--color-black-90</code>, sassVariable: <code>$color-black-90</code>, hexValue: '#1a1a1a', example: <TextAndColorExample color="var(--color-black-90)" name="Black-90 example" /> },
  { cssVariable: <code>--color-black-80</code>, sassVariable: <code>$color-black-80</code>, hexValue: '#333333', example: <TextAndColorExample color="var(--color-black-80)" name="Black-80 example" /> },
  { cssVariable: <code>--color-black-70</code>, sassVariable: <code>$color-black-70</code>, hexValue: '#4c4c4c', example: <TextAndColorExample color="var(--color-black-70)" name="Black-70 example" /> },
  { cssVariable: <code>--color-black-60</code>, sassVariable: <code>$color-black-60</code>, hexValue: '#666666', example: <TextAndColorExample color="var(--color-black-60)" name="Black-60 example" /> },
  { cssVariable: <code>--color-black-50</code>, sassVariable: <code>$color-black-50</code>, hexValue: '#808080', example: <TextAndColorExample color="var(--color-black-50)" name="Black-50 example" /> },
  { cssVariable: <code>--color-black-40</code>, sassVariable: <code>$color-black-40</code>, hexValue: '#999898', example: <TextAndColorExample color="var(--color-black-40)" name="Black-40 example" /> },
  { cssVariable: <code>--color-black-30</code>, sassVariable: <code>$color-black-30</code>, hexValue: '#b2b2b2', example: <TextAndColorExample color="var(--color-black-30)" name="Black-30 example" /> },
  { cssVariable: <code>--color-black-20</code>, sassVariable: <code>$color-black-20</code>, hexValue: '#cccccc', example: <TextAndColorExample color="var(--color-black-20)" name="Black-20 example" /> },
  { cssVariable: <code>--color-black-10</code>, sassVariable: <code>$color-black-10</code>, hexValue: '#e5e5e5', example: <TextAndColorExample color="var(--color-black-10)" name="Black-10 example" /> },
  { cssVariable: <code>--color-black-5</code>, sassVariable: <code>$color-black-5</code>, hexValue: '#f1f1f1', example: <TextAndColorExample color="var(--color-black-5)" name="Black-5 example" /> },
  { cssVariable: <code>--color-white</code>, sassVariable: <code>$color-white</code>, hexValue: '#ffffff', example: <TextAndColorExample color="var(--color-white)" name="White example" /> },

];

export default function GrayscaleColoursTokensTable() {
  return (
    <Table dense cols={cols} rows={rows} heading="Grayscale tokens" headingAriaLevel={3} indexKey="id" renderIndexCol={false} />
  );
}