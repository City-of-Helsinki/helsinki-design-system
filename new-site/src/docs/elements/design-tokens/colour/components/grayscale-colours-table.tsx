import React from "react"

import { Table } from 'hds-react';
import ColorExample from '../../../../../components/examples/ColorExample';

const cols = [
  { key: 'black', headerName: 'Black' },
  { key: '90', headerName: '90%' },
  { key: '80', headerName: '80%' },
  { key: '70', headerName: '70%' },
  { key: '60', headerName: '60%' },
  { key: '50', headerName: '50%' },
  { key: '40', headerName: '40%' },
  { key: '30', headerName: '30%' },
  { key: '20', headerName: '20%' },
  { key: '10', headerName: '10%' },
  { key: '5', headerName: '5%' },
  { key: 'white', headerName: 'White' },
];

const rows = [
  { 
    black: <ColorExample color="var(--color-black)" name="Black colour example" />, 
    90: <ColorExample color="var(--color-black-90)" name="Black-90 colour example" />, 
    80: <ColorExample color="var(--color-black-80)" name="Black-80 colour example" />,
    70: <ColorExample color="var(--color-black-70)" name="Black-70 colour example" />,
    60: <ColorExample color="var(--color-black-60)" name="Black-60 colour example" />,
    50: <ColorExample color="var(--color-black-50)" name="Black-50 colour example" />,
    40: <ColorExample color="var(--color-black-40)" name="Black-40 colour example" />,
    30: <ColorExample color="var(--color-black-30)" name="Black-30 colour example" />,
    20: <ColorExample color="var(--color-black-20)" name="Black-20 colour example" />,
    10: <ColorExample color="var(--color-black-10)" name="Black-10 colour example" />,
    5: <ColorExample color="var(--color-black-5)" name="Black-5 colour example" />,
    white: <ColorExample color="var(--color-white)" name="White colour example" />
  }
];

export default function GrayscaleColoursTable() {
  return (
    <Table dense cols={cols} rows={rows} indexKey="id" renderIndexCol={false} />
  );
}