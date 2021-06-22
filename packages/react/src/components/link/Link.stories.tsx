import React from 'react';

import { Link } from './Link';

export default {
  component: Link,
  title: 'Components/Link',
  decorators: [(storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    href: '/?path=/docs/components-link--internal-links',
  },
};

export const Default = (args) => <Link {...args}>Default link</Link>;

export const InternalLinks = (args) => {
  return (
    <>
      <Link {...args} href={args.href} size="S">
        Internal link size S
      </Link>
      <br />
      <br />
      <Link {...args} href={args.href} size="M">
        Internal link size M
      </Link>
      <br />
      <br />
      <Link {...args} href={args.href} size="L">
        Internal link size L
      </Link>
    </>
  );
};
InternalLinks.storyName = 'Internal links';
InternalLinks.argTypes = {
  size: {
    control: false,
  },
  external: {
    control: false,
  },
};

export const ExternalLinks = (args) => {
  return (
    <>
      <Link {...args} external size="S" href="https://hds.hel.fi">
        External link size S
      </Link>
      <br />
      <br />
      <Link {...args} external size="M" href="https://hds.hel.fi">
        External link size M
      </Link>
      <br />
      <br />
      <Link {...args} external size="L" href="https://hds.hel.fi">
        External link size L
      </Link>
    </>
  );
};
ExternalLinks.storyName = 'External links';
ExternalLinks.argTypes = {
  size: {
    control: false,
  },
  external: {
    control: false,
  },
};

export const OpenInNewTabLink = (args) => (
  <Link {...args} href="https://hds.hel.fi" external={args.external} openInNewTab={args.openInNewTab}>
    Link that opens in a new tab
  </Link>
);
OpenInNewTabLink.storyName = 'Link that opens in a new tab';
OpenInNewTabLink.args = {
  openInNewTab: true,
  external: true,
};

export const visitedStylesDisabled = (args) => (
  <Link {...args} href={args.href} disableVisitedStyles={args.disableVisitedStyles}>
    Link without visited styles
  </Link>
);
visitedStylesDisabled.storyName = 'Link without visited styles';
visitedStylesDisabled.args = {
  disableVisitedStyles: true,
};

export const inlineLinks = (args) => {
  return (
    <>
      <p style={{ fontSize: '14px' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        <Link {...args} external>
          Inline link
        </Link>
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
      <p style={{ fontSize: '16px' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        <Link {...args} size="M" external>
          Inline link
        </Link>
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
    </>
  );
};

inlineLinks.storyName = 'Inline links';
inlineLinks.argTypes = {
  size: {
    control: false,
  },
};

export const standaloneLink = (args) => {
  return (
    <>
      <Link {...args} size="L" style={{ display: 'block', marginBottom: '20px', width: 'fit-content' }}>
        Standalone link
      </Link>
      <p style={{ display: 'inline', fontSize: '14px' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
    </>
  );
};

standaloneLink.storyName = 'Standalone link';
