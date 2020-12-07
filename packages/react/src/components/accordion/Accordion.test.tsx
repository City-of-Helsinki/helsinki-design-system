import React from 'react';
import { render } from '@testing-library/react';

import { Accordion } from './Accordion';

describe('<Accordion /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Accordion title="Foo">Bar</Accordion>);
    expect(asFragment()).toMatchSnapshot();
  });
});
