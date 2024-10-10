import React from 'react';

import { ErrorSummary, ErrorSummarySize, ErrorSummaryProps } from './ErrorSummary';

export default {
  component: ErrorSummary,
  title: 'Components/ErrorSummary',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  decorators: [(storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
  args: {
    label: 'Form contains following errors',
    size: ErrorSummarySize.Medium,
  },
  argTypes: {
    size: {
      options: [ErrorSummarySize.Medium, ErrorSummarySize.Large],
      control: { type: 'radio' },
    },
  },
};

export const Playground = (args: ErrorSummaryProps) => (
  <ErrorSummary {...args}>
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
  </ErrorSummary>
);
