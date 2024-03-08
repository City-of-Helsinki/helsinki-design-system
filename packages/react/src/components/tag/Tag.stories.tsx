import React from 'react';
import { action } from '@storybook/addon-actions';

import { IconShare, IconTrash } from '../../icons';
import { Tag } from './Tag';

export default {
  component: Tag,
  title: 'Components/Tag',
  parameters: {
    controls: { expanded: true },
  },
  args: {
    children: 'Label',
  },
};

const TagWrapper = (args) => (
  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-start' }}>{args.children}</div>
);

export const InformativeTagsSmall = (args) => (
  <TagWrapper>
    <Tag {...args} id="info-1" />
    <Tag {...args} id="info-2" iconLeft={<IconShare />} />
    <Tag {...args} id="info-2" iconRight={<IconTrash />} />
    <Tag {...args} id="info-3" iconLeft={<IconShare />} iconRight={<IconTrash />} />
  </TagWrapper>
);

export const InformativeTagsLarge = (args) => <InformativeTagsSmall {...args} />;
InformativeTagsLarge.args = { size: 'l' };

export const LinkTags = (args) => (
  <TagWrapper>
    <Tag {...args} id="linktag-1" href="#linkTags" iconRight={<IconShare />} aria-label="Open link to self" />
    <Tag
      {...args}
      id="linktag-2"
      href="#linkTags"
      iconRight={<IconShare />}
      size="l"
      aria-label="Open link to HDS-site"
    />
  </TagWrapper>
);

export const ActionTags = (args) => (
  <TagWrapper>
    <Tag {...args} id="action-1" onClick={() => action(`Click: ${args.children}`)()} aria-label="run action 1">
      {args.children}
    </Tag>
    <Tag
      {...args}
      id="action-2"
      onClick={() => action(`Click: ${args.children}`)()}
      iconLeft={<IconTrash />}
      aria-label="run action 2"
    >
      {args.children}
    </Tag>
    <Tag {...args} size="l" id="action-3" onClick={() => action(`Click: ${args.children}`)()} aria-label="run action 3">
      {args.children}
    </Tag>
    <Tag
      {...args}
      size="l"
      id="action-4"
      onClick={() => action(`Click: ${args.children}`)()}
      iconLeft={<IconTrash />}
      aria-label="run action 4"
    >
      {args.children}
    </Tag>
  </TagWrapper>
);

export const DeletableTags = (args) => {
  return (
    <TagWrapper>
      <Tag
        {...args}
        aria-label={`Delete item: ${args.children}`}
        onDelete={() => action(`Delete item: ${args.children}`)()}
      >
        {args.children}
      </Tag>
      <Tag
        size="l"
        {...args}
        aria-label={`Delete item: ${args.children}`}
        onDelete={() => action(`Delete item: ${args.children}`)()}
      >
        {args.children}
      </Tag>
      <Tag
        size="l"
        {...args}
        aria-label={`Delete item: ${args.children}`}
        onDelete={() => action(`Delete item: ${args.children}`)()}
        iconRight={<IconTrash />}
      >
        {args.children}
      </Tag>
    </TagWrapper>
  );
};

export const CustomThemeTags = (args) => {
  const customA = {
    theme: {
      '--tag-background-color': 'var(--color-brick)',
      '--tag-color': 'var(--color-white)',
      '--tag-focus-outline-color': 'var(--color-black-90)',
    },
  };

  const customB = {
    theme: {
      '--tag-background-color': 'var(--color-engel)',
      '--tag-color': 'var(--color-black-90)',
      '--tag-focus-outline-color': 'var(--color-black-90)',
    },
  };

  const customC = {
    theme: {
      '--tag-background-color': 'var(--color-copper-dark)',
      '--tag-hover-background-color': 'var(--color-tram-dark)',
      '--tag-color': 'var(--color-white)',
      '--tag-focus-outline-color': 'var(--color-metro)',
    },
  };

  const customD = {
    theme: {
      '--tag-background-color': 'var(--color-fog)',
      '--tag-color': 'var(--color-black-90)',
      '--tag-focus-outline-color': 'var(--color-black-90)',
      '--tag-hover-background-color': 'orange',
    },
  };

  return (
    <TagWrapper>
      <Tag {...args} {...customA}>
        {args.children}
      </Tag>
      <Tag {...args} {...customB} iconLeft={<IconShare />}>
        {args.children}
      </Tag>
      <Tag
        {...args}
        {...customC}
        size="l"
        onClick={() => action(`Click: ${args.children}`)()}
        aria-label="run custom action"
      >
        {args.children}
      </Tag>
      <Tag {...args} {...customD} size="l" iconLeft={<IconShare />} href="#customTags" aria-label="open custom link">
        {args.children}
      </Tag>
    </TagWrapper>
  );
};

const longText =
  'Label - This is a tag with a very long text which is not advisable and might span into multiple lines';

const LongTextTags = (args) => (
  <div style={{ maxWidth: '300px' }}>
    <TagWrapper>
      <Tag {...args} multiline>
        {longText}
      </Tag>
      <Tag {...args} iconLeft={<IconShare />}>
        {longText}
      </Tag>
      <Tag {...args} iconRight={<IconShare />}>
        {longText}
      </Tag>
      <Tag {...args} iconLeft={<IconShare />} iconRight={<IconTrash />}>
        {longText}
      </Tag>
      <Tag {...args} onDelete={() => action(`Delete item: ${args.children}`)()} aria-label="delete item">
        {longText}
      </Tag>
      <Tag {...args} onClick={() => action(`Click item: ${args.children}`)()} aria-label="run custom action">
        {longText}
      </Tag>
      <Tag {...args} href="#linkTagsSmall" aria-label="open custom link">
        {longText}
      </Tag>
    </TagWrapper>
  </div>
);

export const LongTextTagsSmall = (args) => <LongTextTags {...args} />;
LongTextTagsSmall.args = { multiline: true };

export const LongTextTagsLarge = (args) => <LongTextTags {...args} />;
LongTextTagsLarge.args = { size: 'l', multiline: true };
