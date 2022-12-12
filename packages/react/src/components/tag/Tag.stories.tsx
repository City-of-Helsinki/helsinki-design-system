import React from 'react';
import { action } from '@storybook/addon-actions';

import { Tag, RoundedTag as RoundedTagComponent, LargeRoundedTag } from './Tag';

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

export const ClickableTag = (args) => (
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

export const DeletableTag = (args) => {
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

export const RoundedTag = (args) => <RoundedTagComponent {...args} />;

export const RoundedDeletableTag = (args) => {
  return (
    <RoundedTagComponent
      {...args}
      deleteButtonAriaLabel={`Delete item: ${args.children}`}
      srOnlyLabel
      onDelete={() => action(`Delete item: ${args.children}`)()}
    >
      {args.children}
    </RoundedTagComponent>
  );
};

export const LargeRoundedDeletableTag = (args) => {
  return (
    <LargeRoundedTag
      {...args}
      deleteButtonAriaLabel="Delete item"
      onDelete={() => action(`Delete item: ${args.children}`)()}
    >
      {args.children}
    </LargeRoundedTag>
  );
};
