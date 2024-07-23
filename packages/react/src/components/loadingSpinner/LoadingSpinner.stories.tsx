import React, { useState } from 'react';

import { LoadingSpinner, LoadingSpinnerProps } from './LoadingSpinner';
import { Button } from '../button';

export default {
  component: LoadingSpinner,
  title: 'Components/LoadingSpinner',
};

export const Default = (args: LoadingSpinnerProps) => <LoadingSpinner {...args} />;

export const Small = (args: LoadingSpinnerProps) => <LoadingSpinner {...args} />;
Small.args = {
  small: true,
};

export const CustomTheme = (args: LoadingSpinnerProps) => (
  <>
    <LoadingSpinner {...args} multicolor={false} />
    <br />
    <LoadingSpinner {...args} multicolor />
  </>
);
CustomTheme.storyName = 'Custom theme';
CustomTheme.args = {
  theme: {
    '--spinner-color': 'var(--color-tram)',
    '--spinner-color-stage1': 'var(--color-coat-of-arms)',
    '--spinner-color-stage2': 'var(--color-tram)',
    '--spinner-color-stage3': 'var(--color-metro)',
  },
};

export const MultipleSpinners = (args: LoadingSpinnerProps) => {
  const [showSpinner1, setShowSpinner1] = useState(false);
  const [showSpinner2, setShowSpinner2] = useState(false);
  const [showSpinner3, setShowSpinner3] = useState(false);

  return (
    <>
      <div style={{ marginBottom: 'var(--spacing-s)' }}>
        <Button onClick={() => setShowSpinner1(!showSpinner1)}>
          {showSpinner1 ? 'Remove' : 'Add'} loading spinner #1
        </Button>
      </div>
      <div style={{ marginBottom: 'var(--spacing-s)' }}>
        <Button onClick={() => setShowSpinner2(!showSpinner2)}>
          {showSpinner2 ? 'Remove' : 'Add'} loading spinner #2
        </Button>
      </div>
      <div style={{ marginBottom: 'var(--spacing-s)' }}>
        <Button onClick={() => setShowSpinner3(!showSpinner3)}>
          {showSpinner3 ? 'Remove' : 'Add'} loading spinner #3
        </Button>
      </div>
      {showSpinner1 && <LoadingSpinner {...args} />}
      {showSpinner2 && <LoadingSpinner {...args} />}
      {showSpinner3 && <LoadingSpinner {...args} />}
    </>
  );
};
MultipleSpinners.storyName = 'Multiple spinners';
