import React from 'react';
import { render } from '@testing-library/react';

import WallOfText from './WallOfText';

describe('<WallOfText /> spec', () => {
  it('renders the component', () => {
    render(<WallOfText />);
  });

  it('renders the children', () => {
    render(
      <WallOfText>
        <h3>Lorem</h3>
        <p>Ipsum</p>
        <p>Dolor</p>
      </WallOfText>,
    );
    expect(document.querySelectorAll('h3').length).toBe(1);
    expect(document.querySelectorAll('p').length).toBe(2);
  });
});
