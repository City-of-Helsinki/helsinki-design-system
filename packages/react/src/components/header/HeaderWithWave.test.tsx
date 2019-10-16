import React from 'react';
import { render } from '@testing-library/react';

import HeaderWithWave from './HeaderWithWave';

describe('<HeaderWithWave /> spec', () => {
  it('renders the component', () => {
    render(<HeaderWithWave headingText="Lorem Ipsum" />);
  });

  it('renders the correct heading', () => {
    const testHeading = 'Test Heading';
    const { queryByText } = render(<HeaderWithWave headingText={testHeading} />);
    expect(queryByText(testHeading)).toBeTruthy();
  });
});
