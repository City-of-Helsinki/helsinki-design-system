import React from 'react';
import { render } from '@testing-library/react';

import { Tooltip } from './Tooltip';

describe('<Tooltip /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <Tooltip labelText="tooltip label" openButtonLabelText="show tooltip" closeButtonLabelText="close tooltip">
        tooltip body
      </Tooltip>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
