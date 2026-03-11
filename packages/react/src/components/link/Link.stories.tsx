import React from 'react';

import { Link, LinkSize, LinkProps } from './Link';
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

export const Default = (args: LinkProps) => <Link {...args}>Default link</Link>;

export const ExternalLinks = (args: LinkProps) => {
  return (
    <>
      <Link
        {...args}
        external
        openInExternalDomainAriaLabel="Opens a different website"
        size={LinkSize.Small}
        href="https://hds.hel.fi"
        data-playwright
      >
        External link size small
      </Link>
      <br />
      <br />
      <Link
        {...args}
        external
        openInExternalDomainAriaLabel="Opens a different website"
        size={LinkSize.Medium}
        href="https://hds.hel.fi"
      >
        External link size medium
      </Link>
      <br />
      <br />
      <Link
        {...args}
        external
        openInExternalDomainAriaLabel="Opens a different website"
        size={LinkSize.Large}
        href="https://hds.hel.fi"
      >
        External link size large
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

const inlineLinksBeforeFirst =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ' +
  'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ';
const inlineLinksBetween = ' laboris nisi ut aliquip ex ea commodo consequat. Duis ';
const inlineLinksAfterSecond =
  ' aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint ';
const inlineLinksRest =
  'occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export const inlineLinks = (args: LinkProps) => {
  return (
    <>
      <p style={{ fontSize: 'var(--fontsize-body-s)' }}>
        {inlineLinksBeforeFirst}
        <Link {...args} href="https://hds.hel.fi" external>
          Inline link
        </Link>
        {inlineLinksBetween}
        <Link {...args} href="https://hds.hel.fi" iconStart={<IconDocument />}>
          Document link
        </Link>
        {inlineLinksAfterSecond}
        {inlineLinksRest}
      </p>
      <p style={{ fontSize: 'var(--fontsize-body-m)' }}>
        {inlineLinksBeforeFirst}
        <Link {...args} href="https://hds.hel.fi" external openInExternalDomainAriaLabel="Opens in external domain">
          Inline link
        </Link>
        {inlineLinksBetween}
        <Link
          {...args}
          href="https://hds.hel.fi"
          iconStart={<IconDocument />}
          openInExternalDomainAriaLabel="Opens in external domain"
        >
          Document link
        </Link>
        {inlineLinksAfterSecond}
        {inlineLinksRest}
      </p>
      <p style={{ fontSize: 'var(--fontsize-body-l)' }}>
        {inlineLinksBeforeFirst}
        <Link {...args} href="https://hds.hel.fi" external openInExternalDomainAriaLabel="Opens in external domain">
          Inline link
        </Link>
        {inlineLinksBetween}
        <Link
          {...args}
          href="https://hds.hel.fi"
          iconStart={<IconDocument />}
          openInExternalDomainAriaLabel="Opens in external domain"
        >
          Document link
        </Link>
        {inlineLinksAfterSecond}
        {inlineLinksRest}
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

export const InternalLinks = (args: LinkProps) => {
  return (
    <>
      <Link {...args} href={args.href} size={LinkSize.Small}>
        Internal link size small
      </Link>
      <br />
      <br />
      <Link {...args} href={args.href} size={LinkSize.Medium}>
        Internal link size medium
      </Link>
      <br />
      <br />
      <Link {...args} href={args.href} size={LinkSize.Large}>
        Internal link size large
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

export const OpenInNewTabLinks = (args: LinkProps) => (
  <>
    <Link {...args} href="https://hds.hel.fi">
      Internal link
    </Link>
    <br />
    <br />
    <Link {...args} href="https://hel.fi" external openInExternalDomainAriaLabel="Opens in external domain">
      External link
    </Link>
    <br />
    <br />
    <Link {...args} href="/dummy.pdf" iconStart={<IconDocument />}>
      File link (PDF)
    </Link>
  </>
);
OpenInNewTabLinks.storyName = 'Links that open in a new tab';
OpenInNewTabLinks.args = {
  openInNewTabLabel: 'opens in a new tab',
  openInNewTab: true,
};

export const visitedStylesDisabled = (args: LinkProps) => (
  <Link {...args} href={args.href} disableVisitedStyles={args.disableVisitedStyles}>
    Link without visited styles
  </Link>
);
visitedStylesDisabled.storyName = 'Link without visited styles';
visitedStylesDisabled.args = {
  disableVisitedStyles: true,
};

export const standaloneLink = (args: LinkProps) => {
  return (
    <>
      <Link {...args} size={LinkSize.Large} style={{ display: 'block', width: 'fit-content' }}>
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

export const withCustomIcon = (args: LinkProps) => {
  return (
    <div style={{ display: 'grid', columnGap: '10px', gridTemplateColumns: '1fr 1fr 1fr' }}>
      <div>
        <p>Small</p>
        <Link {...args} iconStart={<IconDocument />} size={LinkSize.Small} href="/#">
          Document link
        </Link>
        <br />
        <br />
        <Link {...args} iconStart={<IconPhone />} size={LinkSize.Small} href="/#">
          Phone link
        </Link>
        <br />
        <br />
        <Link {...args} iconStart={<IconEnvelope />} size={LinkSize.Small} href="/#">
          Envelope link
        </Link>
        <br />
        <br />
        <Link {...args} iconStart={<IconPhoto />} size={LinkSize.Small} href="/#">
          Photo link
        </Link>
      </div>
      <div>
        <p>Medium</p>
        <Link {...args} iconStart={<IconDocument />} size={LinkSize.Medium} href="/#">
          Document link
        </Link>
        <br />
        <br />
        <Link {...args} iconStart={<IconPhone />} size={LinkSize.Medium} href="/#">
          Phone link
        </Link>
        <br />
        <br />
        <Link {...args} iconStart={<IconEnvelope />} size={LinkSize.Medium} href="/#">
          Envelope link
        </Link>
        <br />
        <br />
        <Link {...args} iconStart={<IconPhoto />} size={LinkSize.Medium} href="/#">
          Photo link
        </Link>
      </div>
      <div>
        <p>Large</p>
        <Link {...args} iconStart={<IconDocument />} size={LinkSize.Large} href="/#">
          Document link
        </Link>
        <br />
        <br />
        <Link {...args} iconStart={<IconPhone />} size={LinkSize.Large} href="/#">
          Phone Link
        </Link>
        <br />
        <br />
        <Link {...args} iconStart={<IconEnvelope />} size={LinkSize.Large} href="/#">
          Envelope Link
        </Link>
        <br />
        <br />
        <Link {...args} iconStart={<IconPhoto />} size={LinkSize.Large} href="/#">
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

export const withButtonStyles = (args: LinkProps) => {
  return (
    <Link {...args} useButtonStyles data-playwright>
      Link with button styles
    </Link>
  );
};
withButtonStyles.storyName = 'With Button styles';
