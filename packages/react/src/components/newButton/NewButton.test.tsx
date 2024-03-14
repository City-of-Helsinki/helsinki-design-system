import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { NewButton } from './NewButton';

describe('<Button /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<NewButton>My Button</NewButton>);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders the loading button component', () => {
    const { asFragment } = render(
      <NewButton isLoading loadingText="foo">
        My Button
      </NewButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<NewButton>My Button</NewButton>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
