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
  { cssVariable: <code>--color-brick-dark</code>, sassVariable: <code>$color-brick-dark</code>, hexValue: '#800e04', example: <TextAndColorExample color="var(--color-brick-dark)" name="Brick dark variant example" /> },
  { cssVariable: <code>--color-brick-medium-light</code>, sassVariable: <code>$color-brick-medium-light</code>, hexValue: '#facbc8', example: <TextAndColorExample color="var(--color-brick-medium-light)" name="Brick medium light variant example" /> },
  { cssVariable: <code>--color-brick-light</code>, sassVariable: <code>$color-brick-light</code>, hexValue: '#ffeeed', example: <TextAndColorExample color="var(--color-brick-light)" name="Brick light variant example" /> },
  
  { cssVariable: <code>--color-bus-dark</code>, sassVariable: <code>$color-bus-dark</code>, hexValue: '#00005e', example: <TextAndColorExample color="var(--color-bus-dark)" name="Bus dark variant example" /> },
  { cssVariable: <code>--color-bus-medium-light</code>, sassVariable: <code>$color-bus-medium-light</code>, hexValue: '#ccccff', example: <TextAndColorExample color="var(--color-bus-medium-light)" name="Bus medium light variant example" /> },
  { cssVariable: <code>--color-bus-light</code>, sassVariable: <code>$color-bus-light</code>, hexValue: '#00005e', example: <TextAndColorExample color="var(--color-bus-light)" name="Bus light variant example" /> },
  
  { cssVariable: <code>--color-coat-of-arms-dark</code>, sassVariable: <code>$color-coat-of-arms-dark</code>, hexValue: '#005799', example: <TextAndColorExample color="var(--color-coat-of-arms-dark)" name="Coat of Arms dark variant example" /> },
  { cssVariable: <code>--color-coat-of-arms-medium-light</code>, sassVariable: <code>$color-coat-of-arms-medium-light</code>, hexValue: '#b5daf7', example: <TextAndColorExample color="var(--color-coat-of-arms-medium-light)" name="Coat of Arms medium light variant example" /> },
  { cssVariable: <code>--color-coat-of-arms-light</code>, sassVariable: <code>$color-coat-of-arms-light</code>, hexValue: '#e6f4ff', example: <TextAndColorExample color="var(--color-coat-of-arms-light)" name="Coat of Arms light variant example" /> },
  
  { cssVariable: <code>--color-gold-dark</code>, sassVariable: <code>$color-gold-dark</code>, hexValue: '#9e823c', example: <TextAndColorExample color="var(--color-gold-dark)" name="Gold dark variant example" /> },
  { cssVariable: <code>--color-gold-medium-light</code>, sassVariable: <code>$color-gold-medium-light</code>, hexValue: '#e8d7a7', example: <TextAndColorExample color="var(--color-gold-medium-light)" name="Gold medium light variant example" /> },
  { cssVariable: <code>--color-gold-light</code>, sassVariable: <code>$color-gold-light</code>, hexValue: '#f7f2e4', example: <TextAndColorExample color="var(--color-gold-light)" name="Gold light variant example" /> },
  
  { cssVariable: <code>--color-silver-dark</code>, sassVariable: <code>$color-silver-dark</code>, hexValue: '#b0b8bf', example: <TextAndColorExample color="var(--color-silver-dark)" name="Silver dark variant example" /> },
  { cssVariable: <code>--color-silver-medium-light</code>, sassVariable: <code>$color-silver-medium-light</code>, hexValue: '#efeff0', example: <TextAndColorExample color="var(--color-silver-medium-light)" name="Silver medium light variant example" /> },
  { cssVariable: <code>--color-silver-light</code>, sassVariable: <code>$color-silver-light</code>, hexValue: '#f7f7f8', example: <TextAndColorExample color="var(--color-silver-light)" name="Silver light variant example" /> },
  
  { cssVariable: <code>--color-copper-dark</code>, sassVariable: <code>$color-copper-dark</code>, hexValue: '#00a17d', example: <TextAndColorExample color="var(--color-copper-dark)" name="Copper dark variant example" /> },
  { cssVariable: <code>--color-copper-medium-light</code>, sassVariable: <code>$color-copper-medium-light</code>, hexValue: '#9ef0de', example: <TextAndColorExample color="var(--color-copper-medium-light)" name="Copper medium light variant example" /> },
  { cssVariable: <code>--color-copper-light</code>, sassVariable: <code>$color-copper-light</code>, hexValue: '#cffaf1', example: <TextAndColorExample color="var(--color-copper-light)" name="Copper light variant example" /> },
  
  { cssVariable: <code>--color-engel-dark</code>, sassVariable: <code>$color-engel-dark</code>, hexValue: '#dbc030', example: <TextAndColorExample color="var(--color-engel-dark)" name="Engel dark variant example" /> },
  { cssVariable: <code>--color-engel-medium-light</code>, sassVariable: <code>$color-engel-medium-light</code>, hexValue: '#fff3b8', example: <TextAndColorExample color="var(--color-engel-medium-light)" name="Engel medium light variant example" /> },
  { cssVariable: <code>--color-engel-light</code>, sassVariable: <code>$color-engel-light</code>, hexValue: '#fff9db', example: <TextAndColorExample color="var(--color-engel-light)" name="Engel light variant example" /> },

  { cssVariable: <code>--color-fog-dark</code>, sassVariable: <code>$color-fog-dark</code>, hexValue: '#72a5cf', example: <TextAndColorExample color="var(--color-fog-dark)" name="Fog dark variant example" /> },
  { cssVariable: <code>--color-fog-medium-light</code>, sassVariable: <code>$color-fog-medium-light</code>, hexValue: '#d0e6f7', example: <TextAndColorExample color="var(--color-fog-medium-light)" name="Fog medium light variant example" /> },
  { cssVariable: <code>--color-fog-light</code>, sassVariable: <code>$color-fog-light</code>, hexValue: '#e8f3fc', example: <TextAndColorExample color="var(--color-fog-light)" name="Fog light variant example" /> },

  { cssVariable: <code>--color-metro-dark</code>, sassVariable: <code>$color-metro-dark</code>, hexValue: '#bd2f00', example: <TextAndColorExample color="var(--color-metro-dark)" name="Metro dark variant example" /> },
  { cssVariable: <code>--color-metro-medium-light</code>, sassVariable: <code>$color-metro-medium-light</code>, hexValue: '#ffcab3', example: <TextAndColorExample color="var(--color-metro-medium-light)" name="Metro medium light variant example" /> },
  { cssVariable: <code>--color-metro-light</code>, sassVariable: <code>$color-metro-light</code>, hexValue: '#ffeee6', example: <TextAndColorExample color="var(--color-metro-light)" name="Metro light variant example" /> },

  { cssVariable: <code>--color-summer-dark</code>, sassVariable: <code>$color-summer-dark</code>, hexValue: '#cc9200', example: <TextAndColorExample color="var(--color-summer-dark)" name="Summer dark variant example" /> },
  { cssVariable: <code>--color-summer-medium-light</code>, sassVariable: <code>$color-summer-medium-light</code>, hexValue: '#ffe49c', example: <TextAndColorExample color="var(--color-summer-medium-light)" name="Summer medium light variant example" /> },
  { cssVariable: <code>--color-summer-light</code>, sassVariable: <code>$color-summer-light</code>, hexValue: '#fff4d4', example: <TextAndColorExample color="var(--color-summer-light)" name="Summer light variant example" /> },

  { cssVariable: <code>--color-suomenlinna-dark</code>, sassVariable: <code>$color-suomenlinna-dark</code>, hexValue: '#e673a5', example: <TextAndColorExample color="var(--color-suomenlinna-dark)" name="Suomenlinna dark variant example" /> },
  { cssVariable: <code>--color-suomenlinna-medium-light</code>, sassVariable: <code>$color-suomenlinna-medium-light</code>, hexValue: '#ffdbeb', example: <TextAndColorExample color="var(--color-suomenlinna-medium-light)" name="Suomenlinna medium light variant example" /> },
  { cssVariable: <code>--color-suomenlinna-light</code>, sassVariable: <code>$color-suomenlinna-light</code>, hexValue: '#fff0f7', example: <TextAndColorExample color="var(--color-suomenlinna-light)" name="Suomenlinna light variant example" /> },

  { cssVariable: <code>--color-tram-dark</code>, sassVariable: <code>$color-tram-dark</code>, hexValue: '#006631', example: <TextAndColorExample color="var(--color-tram-dark)" name="Tram dark variant example" /> },
  { cssVariable: <code>--color-tram-medium-light</code>, sassVariable: <code>$color-tram-medium-light</code>, hexValue: '#a3e3c2', example: <TextAndColorExample color="var(--color-tram-medium-light)" name="Tram medium light variant example" /> },
  { cssVariable: <code>--color-tram-light</code>, sassVariable: <code>$color-tram-light</code>, hexValue: '#dff7eb', example: <TextAndColorExample color="var(--color-tram-light)" name="Tram light variant example" /> },
];

export default function BrandColourVariationTokensTable() {
  return (
    <Table dense cols={cols} rows={rows} heading="Brand colour variation tokens" headingAriaLevel={3} indexKey="id" renderIndexCol={false} />
  );
}