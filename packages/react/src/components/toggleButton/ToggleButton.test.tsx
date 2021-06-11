import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { ToggleButton } from './ToggleButton';

describe('<ToggleButton /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<ToggleButton id="toggle-button" value={false} label="Test label" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<ToggleButton id="toggle-button" value={false} label="Test label" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should set pressed true when user clicks the button', async () => {
    render(<ToggleButton id="toggle-button" value={false} label="Test label" />);
    const button = screen.getByRole('button', { pressed: false });
    userEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('should set pressed false when user clicks the button', async () => {
    render(<ToggleButton id="toggle-button" value label="Test label" />);
    const button = screen.getByRole('button', { pressed: true });
    userEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });
});
