import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { ToggleButton } from './ToggleButton';

describe('<ToggleButton /> spec', () => {
  it('renders the component', () => {
    let checked = false;
    const { asFragment } = render(
      <ToggleButton
        id="toggle-button"
        checked={checked}
        onChange={() => {
          checked = !checked;
        }}
        label="Test label"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    let checked = false;
    const { container } = render(
      <ToggleButton
        id="toggle-button"
        checked={checked}
        onChange={() => {
          checked = !checked;
        }}
        label="Test label"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should call onChange on click', async () => {
    let checked = false;
    render(
      <ToggleButton
        id="toggle-button"
        checked={checked}
        onChange={() => {
          checked = !checked;
        }}
        label="Test label"
      />,
    );
    const button = screen.getByRole('button', { pressed: false });
    userEvent.click(button);
    expect(checked).toBeTruthy();
  });
});
