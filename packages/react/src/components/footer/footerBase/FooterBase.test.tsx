import React from 'react';
import { render } from '@testing-library/react';

import { FooterBase } from './FooterBase';
import { FooterWrapper } from '../../../utils/test-utils';

describe('<Footer.Base /> spec', () => {
  const mockDate = new Date(2020, 1, 1);
  const RealDate = Date;
  beforeAll(() => {
    (global as any).Date = class extends RealDate {
      constructor() {
        super();
        return mockDate;
      }
    };
  });
  afterAll(() => {
    global.Date = RealDate;
  });

  it('renders the component', () => {
    const { asFragment } = render(<FooterBase copyrightHolder="Copyright" copyrightText="All rights reserved" />, {
      wrapper: FooterWrapper,
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
