import type { Preview } from '@storybook/react';
import React from 'react';
import './index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%',
        }}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
