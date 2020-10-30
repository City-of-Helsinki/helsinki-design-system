import React from 'react';
import { action } from '@storybook/addon-actions';

import { Tag } from './Tag';

export default {
  component: Tag,
  title: 'Components/Tag',
  parameters: {
    controls: { expanded: true },
  },
  args: {
    label: 'Americum',
  },
};

export const Default = (args) => <Tag {...args} />;

export const Clickable = (args) => (
  <>
    <Tag {...args} label="Link" role="link" id="link" onClick={() => action(`Click: ${args.label}`)()} />
    <Tag
      {...args}
      label="Button"
      role="button"
      id="button"
      style={{ marginLeft: 'var(--spacing-s)' }}
      onClick={() => action(`Click: ${args.label}`)()}
    />
  </>
);
Clickable.storyName = 'Clickable tag';

export const Deletable = (args) => {
  return (
    <Tag {...args} deleteButtonAriaLabel={`Delete: ${args.label}`} onDelete={() => action(`Delete: ${args.label}`)()} />
  );
};
Deletable.storyName = 'Deletable tag';
