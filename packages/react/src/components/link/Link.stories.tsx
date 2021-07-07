import React from 'react';

import { Link } from './Link';
import { IconDocument, IconEnvelope, IconPhone, IconPhoto } from '../../icons';

export default {
  component: Link,
  title: 'Components/Link',
  decorators: [(storyFn) => <div style={{ maxWidth: '600px' }}>{storyFn()}</div>],
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
      <Link
        {...args}
        external
        openInExternalDomainAriaLabel="Opens a different website"
        size="S"
        href="https://hds.hel.fi"
      >
        External link size S
      </Link>
      <br />
      <br />
      <Link
        {...args}
        external
        openInExternalDomainAriaLabel="Opens a different website"
        size="M"
        href="https://hds.hel.fi"
      >
        External link size M
      </Link>
      <br />
      <br />
      <Link
        {...args}
        external
        openInExternalDomainAriaLabel="Opens a different website"
        size="L"
        href="https://hds.hel.fi"
      >
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
  <Link
    {...args}
    href="https://hds.hel.fi"
    external={args.external}
    openInExternalDomainAriaLabel={args.openInExternalDomainAriaLabel}
    openInNewTabAriaLabel={args.openInNewTabAriaLabel}
    openInNewTab={args.openInNewTab}
  >
    Link that opens in a new tab
  </Link>
);
OpenInNewTabLink.storyName = 'Link that opens in a new tab';
OpenInNewTabLink.args = {
  openInNewTabAriaLabel: 'Opens in a new tab.',
  openInExternalDomainAriaLabel: 'Opens a different website',
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
        <Link {...args} external openInExternalDomainAriaLabel="Opens a different website">
          Inline link
        </Link>
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
      <p style={{ fontSize: '16px' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        <Link {...args} size="M" external openInExternalDomainAriaLabel="Opens a different website">
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
    <Link {...args} size="L" style={{ display: 'block', marginBottom: '20px', width: 'fit-content' }}>
      Standalone link
    </Link>
  );
};

standaloneLink.storyName = 'Standalone link';

export const withCustomIcon = (args) => {
  return (
    <div style={{ display: 'grid', columnGap: '10px', gridTemplateColumns: '1fr 1fr 1fr' }}>
      <div>
        <p>Small</p>
        <Link {...args} size="S" href="/#">
          <IconDocument style={{ marginRight: '4px', verticalAlign: 'text-top' }} size="xs" />
          Document link
        </Link>
        <br />
        <br />
        <Link {...args} size="S" href="/#">
          <IconPhone style={{ marginRight: '4px', verticalAlign: 'text-top' }} size="xs" />
          Phone link
        </Link>
        <br />
        <br />
        <Link {...args} size="S" href="/#">
          <IconEnvelope style={{ marginRight: '4px', verticalAlign: 'text-top' }} size="xs" />
          Envelope link
        </Link>
        <br />
        <br />
        <Link {...args} size="S" href="/#">
          <IconPhoto style={{ marginRight: '4px', verticalAlign: 'text-top' }} size="xs" />
          Photo link
        </Link>
      </div>
      <div>
        <p>Medium</p>
        <Link {...args} size="M" href="/#">
          <IconDocument style={{ marginRight: '8px', verticalAlign: 'sub' }} size="s" />
          Document link
        </Link>
        <br />
        <br />
        <Link {...args} size="M" href="/#">
          <IconPhone style={{ marginRight: '8px', verticalAlign: 'sub' }} size="s" />
          Phone link
        </Link>
        <br />
        <br />
        <Link {...args} size="M" href="/#">
          <IconEnvelope style={{ marginRight: '8px', verticalAlign: 'sub' }} size="s" />
          Envelope link
        </Link>
        <br />
        <br />
        <Link {...args} size="M" href="/#">
          <IconPhoto style={{ marginRight: '8px', verticalAlign: 'sub' }} size="s" />
          Photo link
        </Link>
      </div>
      <div>
        <p>Large</p>
        <Link {...args} size="L" href="/#">
          <IconDocument style={{ marginRight: '16px', verticalAlign: 'middle' }} size="l" />
          Document link
        </Link>
        <br />
        <br />
        <Link {...args} size="L" href="/#">
          <IconPhone style={{ marginRight: '16px', verticalAlign: 'middle' }} size="l" />
          Phone Link
        </Link>
        <br />
        <br />
        <Link {...args} size="L" href="/#">
          <IconEnvelope style={{ marginRight: '16px', verticalAlign: 'middle' }} size="l" />
          Envelope Link
        </Link>
        <br />
        <br />
        <Link {...args} size="L" href="/#">
          <IconPhoto style={{ marginRight: '16px', verticalAlign: 'middle' }} size="l" />
          Photo Link
        </Link>
      </div>
    </div>
  );
};

withCustomIcon.storyName = 'With a custom icon';
withCustomIcon.argTypes = {
  size: {
    control: false,
  },
};
