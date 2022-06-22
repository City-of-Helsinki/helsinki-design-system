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
        <Link size="S" {...args} external openInExternalDomainAriaLabel="Opens a different website">
          Inline link
        </Link>
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
      <p style={{ fontSize: '16px' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        <Link {...args} external openInExternalDomainAriaLabel="Opens a different website">
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
        <Link {...args} iconLeft={<IconDocument size="xs" aria-hidden />} size="S" href="/#">
          Document link
        </Link>
        <br />
        <br />
        <Link {...args} iconLeft={<IconPhone size="xs" aria-hidden />} size="S" href="/#">
          Phone link
        </Link>
        <br />
        <br />
        <Link {...args} iconLeft={<IconEnvelope size="xs" aria-hidden />} size="S" href="/#">
          Envelope link
        </Link>
        <br />
        <br />
        <Link {...args} iconLeft={<IconPhoto size="xs" aria-hidden />} size="S" href="/#">
          Photo link
        </Link>
      </div>
      <div>
        <p>Medium</p>
        <Link {...args} iconLeft={<IconDocument size="s" aria-hidden />} size="M" href="/#">
          Document link
        </Link>
        <br />
        <br />
        <Link {...args} iconLeft={<IconPhone size="s" aria-hidden />} size="M" href="/#">
          Phone link
        </Link>
        <br />
        <br />
        <Link {...args} iconLeft={<IconEnvelope size="s" aria-hidden />} size="M" href="/#">
          Envelope link
        </Link>
        <br />
        <br />
        <Link {...args} iconLeft={<IconPhoto size="s" aria-hidden />} size="M" href="/#">
          Photo link
        </Link>
      </div>
      <div>
        <p>Large</p>
        <Link {...args} iconLeft={<IconDocument size="l" aria-hidden />} size="L" href="/#">
          Document link
        </Link>
        <br />
        <br />
        <Link {...args} iconLeft={<IconPhone size="l" aria-hidden />} size="L" href="/#">
          Phone Link
        </Link>
        <br />
        <br />
        <Link {...args} iconLeft={<IconEnvelope size="l" aria-hidden />} size="L" href="/#">
          Envelope Link
        </Link>
        <br />
        <br />
        <Link {...args} iconLeft={<IconPhoto size="l" aria-hidden />} size="L" href="/#">
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
