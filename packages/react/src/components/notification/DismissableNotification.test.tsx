import React from 'react';
import { render } from '@testing-library/react';

import DismissableNotification from './DismissableNotification';

describe('<DismissableNotification /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <DismissableNotification labelText="This is the tool tip label text" closeLabel="close label">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
      </DismissableNotification>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
