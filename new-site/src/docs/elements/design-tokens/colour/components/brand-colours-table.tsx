import React from "react"

import { Table } from 'hds-react';
import ColorExample from '../../../../../components/ColorExample';

const cols = [
  { key: 'colourNameEn', headerName: 'Colour name (en)' },
  { key: 'colourNameFi', headerName: 'Colour name (fi)' },
  { key: 'baseColourExample', headerName: 'Base colour' },
  { key: 'darkVariantExample', headerName: 'Dark' },
  { key: 'mediumLightVariantExample', headerName: 'Medium light' },
  { key: 'lightVariantExample', headerName: 'Light' },
];

const rows = [
  { colourNameEn: 'Bus', colourNameFi: 'Bussi', baseColourExample: <ColorExample color="var(--color-bus)" name="Bus base brand colour example" />, darkVariantExample: <ColorExample color="var(--color-bus-dark)" name="Bus dark variant example" />, mediumLightVariantExample: <ColorExample color="var(--color-bus-medium-light)" name="Bus medium light example" />, lightVariantExample: <ColorExample color="var(--color-bus-light)" name="Bus light variant example" />},
  { colourNameEn: 'Coat of Arms', colourNameFi: 'Vaakuna', baseColourExample: <ColorExample color="var(--color-coat-of-arms)" name="coat-of-arms base brand colour example" />, darkVariantExample: <ColorExample color="var(--color-coat-of-arms-dark)" name="coat-of-arms dark variant example" />, mediumLightVariantExample: <ColorExample color="var(--color-coat-of-arms-medium-light)" name="coat-of-arms medium light example" />, lightVariantExample: <ColorExample color="var(--color-coat-of-arms-light)" name="coat-of-arms light variant example" />},
  { colourNameEn: 'Gold', colourNameFi: 'Kulta', baseColourExample: <ColorExample color="var(--color-gold)" name="gold base brand colour example" />, darkVariantExample: <ColorExample color="var(--color-gold-dark)" name="gold dark variant example" />, mediumLightVariantExample: <ColorExample color="var(--color-gold-medium-light)" name="gold medium light example" />, lightVariantExample: <ColorExample color="var(--color-gold-light)" name="gold light variant example" />},
  { colourNameEn: 'Silver', colourNameFi: 'Hopea', baseColourExample: <ColorExample color="var(--color-silver)" name="silver base brand colour example" />, darkVariantExample: <ColorExample color="var(--color-silver-dark)" name="silver dark variant example" />, mediumLightVariantExample: <ColorExample color="var(--color-silver-medium-light)" name="silver medium light example" />, lightVariantExample: <ColorExample color="var(--color-silver-light)" name="silver light variant example" />},
  { colourNameEn: 'Brick', colourNameFi: 'Tiili', baseColourExample: <ColorExample color="var(--color-brick)" name="brick base brand colour example" />, darkVariantExample: <ColorExample color="var(--color-brick-dark)" name="brick dark variant example" />, mediumLightVariantExample: <ColorExample color="var(--color-brick-medium-light)" name="brick medium light example" />, lightVariantExample: <ColorExample color="var(--color-brick-light)" name="brick light variant example" />},
  { colourNameEn: 'Copper', colourNameFi: 'Kupari', baseColourExample: <ColorExample color="var(--color-copper)" name="copper base brand colour example" />, darkVariantExample: <ColorExample color="var(--color-copper-dark)" name="copper dark variant example" />, mediumLightVariantExample: <ColorExample color="var(--color-copper-medium-light)" name="copper medium light example" />, lightVariantExample: <ColorExample color="var(--color-copper-light)" name="copper light variant example" />},
  { colourNameEn: 'Engel', colourNameFi: 'Engel', baseColourExample: <ColorExample color="var(--color-engel)" name="Engel base brand colour example" />, darkVariantExample: <ColorExample color="var(--color-engel-dark)" name="Engel dark variant example" />, mediumLightVariantExample: <ColorExample color="var(--color-engel-medium-light)" name="Engel medium light example" />, lightVariantExample: <ColorExample color="var(--color-engel-light)" name="Engel light variant example" />},
  { colourNameEn: 'Fog', colourNameFi: 'Sumu', baseColourExample: <ColorExample color="var(--color-fog)" name="fog base brand colour example" />, darkVariantExample: <ColorExample color="var(--color-fog-dark)" name="fog dark variant example" />, mediumLightVariantExample: <ColorExample color="var(--color-fog-medium-light)" name="fog medium light example" />, lightVariantExample: <ColorExample color="var(--color-fog-light)" name="fog light variant example" />},
  { colourNameEn: 'Metro', colourNameFi: 'Metro', baseColourExample: <ColorExample color="var(--color-metro)" name="metro base brand colour example" />, darkVariantExample: <ColorExample color="var(--color-metro-dark)" name="metro dark variant example" />, mediumLightVariantExample: <ColorExample color="var(--color-metro-medium-light)" name="metro medium light example" />, lightVariantExample: <ColorExample color="var(--color-metro-light)" name="metro light variant example" />},
  { colourNameEn: 'Summer', colourNameFi: 'Kesä', baseColourExample: <ColorExample color="var(--color-summer)" name="summer base brand colour example" />, darkVariantExample: <ColorExample color="var(--color-summer-dark)" name="summer dark variant example" />, mediumLightVariantExample: <ColorExample color="var(--color-summer-medium-light)" name="summer medium light example" />, lightVariantExample: <ColorExample color="var(--color-summer-light)" name="summer light variant example" />},
  { colourNameEn: 'Suomenlinna', colourNameFi: 'Suomenlinna', baseColourExample: <ColorExample color="var(--color-suomenlinna)" name="suomenlinna base brand colour example" />, darkVariantExample: <ColorExample color="var(--color-suomenlinna-dark)" name="suomenlinna dark variant example" />, mediumLightVariantExample: <ColorExample color="var(--color-suomenlinna-medium-light)" name="suomenlinna medium light example" />, lightVariantExample: <ColorExample color="var(--color-suomenlinna-light)" name="suomenlinna light variant example" />},
  { colourNameEn: 'Tram', colourNameFi: 'Spåra', baseColourExample: <ColorExample color="var(--color-tram)" name="tram base brand colour example" />, darkVariantExample: <ColorExample color="var(--color-tram-dark)" name="tram dark variant example" />, mediumLightVariantExample: <ColorExample color="var(--color-tram-medium-light)" name="tram medium light example" />, lightVariantExample: <ColorExample color="var(--color-tram-light)" name="tram light variant example" />},
];

export default function BrandColoursTable() {
  return (
    <Table dense cols={cols} rows={rows} indexKey="id" renderIndexCol={false} />
  );
}