import React from 'react';
import { render } from '@testing-library/react';

import { ErrorSummary, ErrorSummarySize } from './ErrorSummary';

describe('<ErrorSummary /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <ErrorSummary
        label="Form contains following errors"
        className="customClass"
        size={ErrorSummarySize.Medium}
        style={{ marginBottom: 'var(--spacing-m)' }}
      >
        <ul>
          <li>
            Error 1: <a href="#field1">Please enter your first name</a>
          </li>
          <li>
            Error 2: <a href="#field2">Please enter your last name</a>
          </li>
          <li>
            Error 3: <a href="#field3">Please enter a valid email address</a>
          </li>
        </ul>
      </ErrorSummary>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
