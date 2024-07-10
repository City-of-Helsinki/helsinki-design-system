import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Label } from './Label';
// eslint-disable-next-line jest/no-mocks-import
import {
  updateMockData,
  resetMockData,
  mockUseSelectDataHandlersContents,
  getCurrentMockMetaData,
  resetMockMetaData,
} from '../hooks/__mocks__/useSelectDataHandlers';

jest.mock('../hooks/useSelectDataHandlers', () => ({
  useSelectDataHandlers: () => mockUseSelectDataHandlersContents,
}));

describe('<Label />', () => {
  beforeEach(() => {
    resetMockData();
    resetMockMetaData();
  });
  const getLabelElement = (result: RenderResult) => {
    return result.container.querySelector('label') as HTMLLabelElement;
  };
  it('Label value is set as the label in the getData()', () => {
    const data = { label: 'Label text' };
    updateMockData(data);
    const result = render(<Label />);
    const html = getLabelElement(result).innerHTML;
    expect(html).toBe(data.label);
    expect(html.includes('*')).toBeFalsy();
  });
  it("Label's id is set as the id in the getMetaData()", () => {
    const metaData = getCurrentMockMetaData();
    const result = render(<Label />);
    expect(getLabelElement(result).getAttribute('id')).toBe(metaData.elementIds.label);
  });
  it('Label is marked as required when value is true', () => {
    const data = { label: 'Label text', required: true };
    updateMockData(data);
    const result = render(<Label />);
    const html = getLabelElement(result).innerHTML;
    expect(html.includes(data.label)).toBeTruthy();
    expect(html.includes('*')).toBeTruthy();
  });
});
