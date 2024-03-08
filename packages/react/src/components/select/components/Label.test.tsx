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
    expect(getLabelElement(result).innerHTML).toBe(data.label);
  });
  it("Label's id is set as the id in the getMetaData()", () => {
    const metaData = getCurrentMockMetaData();
    const result = render(<Label />);
    expect(getLabelElement(result).getAttribute('id')).toBe(metaData.elementIds.label);
  });
});
