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
    children: 'Americum',
  },
};

export const Default = (args) => <Tag {...args} />;

export const Clickable = (args) => (
  <>
    <Tag {...args} label="Link" role="link" id="link" onClick={() => action(`Click: ${args.children}`)()}>
      {args.children}
    </Tag>
    <Tag
      {...args}
      label="Button"
      role="button"
      id="button"
      style={{ marginLeft: 'var(--spacing-s)' }}
      onClick={() => action(`Click: ${args.children}`)()}
    >
      {args.children}
    </Tag>
  </>
);
Clickable.storyName = 'Clickable tag';

export const Deletable = (args) => {
  return (
    <Tag
      {...args}
      deleteButtonAriaLabel={`Delete: ${args.label}`}
      onDelete={() => action(`Delete: ${args.children}`)()}
    >
      {args.children}
    </Tag>
  );
};
Deletable.storyName = 'Deletable tag';

export const CustomTheme = (args) => (
  <Tag {...args} onClick={() => action(`Click: ${args.children}`)()}>
    {args.children}
  </Tag>
);
CustomTheme.args = {
  theme: {
    '--tag-background': 'var(--color-engel)',
    '--tag-color': 'var(--color-black-90)',
    '--tag-focus-outline-color': 'var(--color-black-90)',
  },
};
