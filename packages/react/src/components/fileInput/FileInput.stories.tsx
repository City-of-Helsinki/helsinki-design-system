import React from 'react';

import { FileInput } from './FileInput';

export default {
  component: FileInput,
  title: 'Components/FileInput',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Example = (args) => <FileInput {...args} accept=".png,.jpg" helperText="Only .png and .jpg files." />;

export const Multiple = (args) => (
  <FileInput {...args} multiple accept=".png,.jpg" helperText="Only .png and .jpg files." />
);
