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

export const DefaultTag = (args) => <Tag {...args} />;

export const DefaultTagClickable = (args) => (
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

export const DefaultTagDeletable = (args) => {
  return (
    <Tag
      {...args}
      deleteButtonAriaLabel={`Delete item: ${args.children}`}
      srOnlyLabel
      onDelete={() => action(`Delete item: ${args.children}`)()}
    >
      {args.children}
    </Tag>
  );
};

export const DefaultTagWithCustomTheme = (args) => (
  <Tag {...args} onClick={() => action(`Click: ${args.children}`)()}>
    {args.children}
  </Tag>
);

DefaultTagWithCustomTheme.args = {
  theme: {
    '--tag-background': 'var(--color-engel)',
    '--tag-color': 'var(--color-black-90)',
    '--tag-focus-outline-color': 'var(--color-black-90)',
  },
};

export const LargeTag = (args) => {
  return (
    <Tag {...args} size="l">
      {args.children}
    </Tag>
  );
};

export const LargeTagDeletable = (args) => {
  return (
    <Tag
      {...args}
      size="l"
      deleteButtonAriaLabel="Delete item"
      onDelete={() => action(`Delete item: ${args.children}`)()}
    >
      {args.children}
    </Tag>
  );
};

export const DefaultTagWithLongText = (args) => (
  <Tag {...args} style={{ maxWidth: '300px' }}>
    Label - This is a tag with a very long text which is not advisable and might span into multiple lines
  </Tag>
);

export const DefaultTagWithLongTextAndDeletable = (args) => (
  <Tag
    {...args}
    style={{ maxWidth: '300px' }}
    deleteButtonAriaLabel="Delete item"
    onDelete={() => action(`Delete item: ${args.children}`)()}
  >
    Label - This is a tag with a very long text which is not advisable and might span into multiple lines
  </Tag>
);

export const LargeTagWithLongText = (args) => (
  <Tag {...args} size="l" style={{ maxWidth: '300px' }}>
    Label - This is a tag with a very long text which is not advisable and might span into multiple lines
  </Tag>
);

export const LargeTagWithLongTextAndDeletable = (args) => (
  <Tag
    {...args}
    size="l"
    style={{ maxWidth: '300px' }}
    deleteButtonAriaLabel="Delete item"
    onDelete={() => action(`Delete item: ${args.children}`)()}
  >
    Label - This is a tag with a very long text which is not advisable and might span into multiple lines
  </Tag>
);
