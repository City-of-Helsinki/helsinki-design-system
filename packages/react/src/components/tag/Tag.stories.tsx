import React from 'react';
import { action } from '@storybook/addon-actions';

import { IconShare, IconTrash } from '../../icons';
import { Tag, TagProps, TagSize, TagTheme } from './Tag';

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

export const InformativeTagsSmall = (args: TagProps) => (
  <TagWrapper>
    <Tag {...args} id="info-1" />
    <Tag {...args} id="info-2" iconStart={<IconShare />} />
    <Tag {...args} id="info-2" iconEnd={<IconTrash />} />
    <Tag {...args} id="info-3" iconStart={<IconShare />} iconEnd={<IconTrash />} />
  </TagWrapper>
);

export const InformativeTagsLarge = (args: TagProps) => <InformativeTagsSmall {...args} />;
InformativeTagsLarge.args = { size: TagSize.Large };

export const LinkTags = (args: TagProps) => (
  <TagWrapper>
    <Tag
      data-playwright
      {...args}
      id="linktag-1"
      href="#linkTags"
      iconEnd={<IconShare />}
      aria-label="Open link to self"
    />
    <Tag
      data-playwright
      {...args}
      id="linktag-2"
      href="#linkTags"
      iconEnd={<IconShare />}
      size={TagSize.Large}
      aria-label="Open link to HDS-site"
    />
  </TagWrapper>
);

export const ActionTags = (args: TagProps) => (
  <TagWrapper>
    <Tag
      data-playwright
      {...args}
      id="action-1"
      onClick={() => action(`Click: ${args.children}`)()}
      aria-label="run action 1"
    >
      {args.children}
    </Tag>
    <Tag
      {...args}
      id="action-2"
      onClick={() => action(`Click: ${args.children}`)()}
      iconStart={<IconTrash />}
      aria-label="run action 2"
    >
      {args.children}
    </Tag>
    <Tag
      data-playwright
      {...args}
      size={TagSize.Large}
      id="action-3"
      onClick={() => action(`Click: ${args.children}`)()}
      aria-label="run action 3"
    >
      {args.children}
    </Tag>
    <Tag
      {...args}
      size={TagSize.Large}
      id="action-4"
      onClick={() => action(`Click: ${args.children}`)()}
      iconStart={<IconTrash />}
      aria-label="run action 4"
    >
      {args.children}
    </Tag>
  </TagWrapper>
);

export const DeletableTags = (args: TagProps) => {
  return (
    <TagWrapper>
      <Tag
        data-playwright
        {...args}
        aria-label={`Delete item: ${args.children}`}
        onDelete={() => action(`Delete item: ${args.children}`)()}
      >
        {args.children}
      </Tag>
      <Tag
        data-playwright
        size={TagSize.Large}
        {...args}
        aria-label={`Delete item: ${args.children}`}
        onDelete={() => action(`Delete item: ${args.children}`)()}
      >
        {args.children}
      </Tag>
      <Tag
        size={TagSize.Large}
        {...args}
        aria-label={`Delete item: ${args.children}`}
        onDelete={() => action(`Delete item: ${args.children}`)()}
        iconEnd={<IconTrash />}
      >
        {args.children}
      </Tag>
    </TagWrapper>
  );
};

export const CustomThemeTags = (args: TagProps) => {
  const customA: TagTheme = {
    '--background-color': 'var(--color-brick)',
    '--color': 'var(--color-white)',
    '--outline-color': 'var(--color-black-90)',
  };

  const customB: TagTheme = {
    '--background-color': 'var(--color-engel)',
    '--color': 'var(--color-black-90)',
    '--outline-color': 'var(--color-black-90)',
  };

  const customC: TagTheme = {
    '--background-color': 'var(--color-tram-dark)',
    '--background-color-hover': 'color-mix(in srgb, var(--color-tram-dark) 80%, white)',
    '--color': 'var(--color-white)',
    '--outline-color': 'var(--color-metro)',
  };

  const customD: TagTheme = {
    '--background-color': 'var(--color-fog)',
    '--color': 'var(--color-black-90)',
    '--outline-color': 'var(--color-black-90)',
    '--background-color-hover': 'orange',
  };

  return (
    <TagWrapper>
      <Tag {...args} theme={customA}>
        {args.children}
      </Tag>
      <Tag {...args} theme={customB} iconStart={<IconShare />}>
        {args.children}
      </Tag>
      <Tag
        {...args}
        theme={customC}
        size={TagSize.Large}
        onClick={() => action(`Click: ${args.children}`)()}
        aria-label="run custom action"
      >
        {args.children}
      </Tag>
      <Tag
        {...args}
        theme={customD}
        size={TagSize.Large}
        iconStart={<IconShare />}
        href="#customTags"
        aria-label="open custom link"
      >
        {args.children}
      </Tag>
    </TagWrapper>
  );
};

const longText =
  'Label - This is a tag with a very long text which is not advisable and might span into multiple lines';

const LongTextTags = (args: TagProps) => (
  <div style={{ maxWidth: '300px' }}>
    <TagWrapper>
      <Tag {...args}>{longText}</Tag>
      <Tag {...args} iconStart={<IconShare />}>
        {longText}
      </Tag>
      <Tag {...args} iconEnd={<IconShare />}>
        {longText}
      </Tag>
      <Tag {...args} iconStart={<IconShare />} iconEnd={<IconTrash />}>
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

export const LongTextTagsSmall = (args: TagProps) => <LongTextTags {...args} />;
LongTextTagsSmall.args = { multiline: true };

export const LongTextTagsLarge = (args: TagProps) => <LongTextTags {...args} />;
LongTextTagsLarge.args = { size: TagSize.Large, multiline: true };
