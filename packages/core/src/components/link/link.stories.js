import './link.css';
import '../../icons/document.css';
import '../../icons/phone.css';
import '../../icons/envelope.css';
import '../../icons/photo.css';

export default {
  title: 'Components/Link',
  decorators: [(storyFn) => `<div style="max-width: 600px">${storyFn()}</div>`],
};

export const Default = () => `
  <a href="/?path=/story/components-link--all" class="hds-link hds-link--medium">Default link</a>
`;

export const ExternalLinks = () => `
  <a href="https://hds.hel.fi" class="hds-link hds-link--small" aria-label="External link size small. Opens in external domain" data-playwright="true">
    <span>External link size small</span><i class="hds-icon hds-icon--link-external" aria-hidden="true"></i></a>
  <br/>
  <br/>
  <a href="https://hds.hel.fi" class="hds-link hds-link--medium" aria-label="External link size medium. Opens in external domain">
    <span>External link size medium</span><i class="hds-icon hds-icon--link-external" aria-hidden="true"></i></a>
  <br/>
  <br/>
  <a href="https://hds.hel.fi" class="hds-link hds-link--large" aria-label="External link size large. Opens in external domain">
    <span>External link size large</span><i class="hds-icon hds-icon--link-external" aria-hidden="true"></i>
  </a>
`;

ExternalLinks.storyName = 'External links';

const inlineLink = `
  <a href="https://hel.fi" class="hds-link" aria-label="Inline link. Opens in external domain">
    <span>Inline link</span><i class="hds-icon hds-icon--link-external" aria-hidden="true"></i></a>
`

const inlineLinkWithIconClasses = `
  <a href="https://hds.hel.fi" class="hds-link hds-icon--document hds-icon-start--document" aria-label="Document link.">Document link</a>
`

export const inlineLinks = () => `
  <p style="font-size: var(--fontsize-body-s);">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ${inlineLink} laboris nisi ut aliquip ex ea commodo
    consequat. Duis ${inlineLinkWithIconClasses} aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
  <p style="font-size: var(--fontsize-body-m);">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ${inlineLink} laboris nisi ut aliquip ex ea commodo
    consequat. Duis ${inlineLinkWithIconClasses} aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
  <p style="font-size: var(--fontsize-body-l);">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ${inlineLink} laboris nisi ut aliquip ex ea commodo
    consequat. Duis ${inlineLinkWithIconClasses} aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
`

inlineLinks.storyName = 'Inline links';

export const InternalLinks = () => `
  <a href="/?path=/story/components-link--all" class="hds-link hds-link--small">Internal link size small</a>
  <br/>
  <br/>
  <a href="/?path=/story/components-link--all" class="hds-link hds-link--medium">Internal link size medium</a>
  <br/>
  <br/>
  <a href="/?path=/story/components-link--all" class="hds-link hds-link--large">Internal link size large</a>
`;

InternalLinks.storyName = 'Internal links';

export const openInNewTabLinks = () => `
  <a href="https://hds.hel.fi" class="hds-link hds-link--medium" rel="noopener" target="_blank">
    <span>Internal link (opens in a new tab)</span>
  </a>
  <br/>
  <br/>
  <a href="https://hel.fi" class="hds-link hds-link--medium" rel="noopener" target="_blank" aria-label="Opens in external domain">
    <span>External link (opens in a new tab)</span><i class="hds-icon hds-icon--link-external" aria-hidden="true"></i>
  </a>
  <br/>
  <br/>
  <a href="/dummy.pdf"
    class="hds-link hds-link--medium hds-icon--document hds-icon-start--document"
    rel="noopener"
    target="_blank"
  >File link (PDF. opens in a new tab)
`

openInNewTabLinks.storyName = 'Links that open in a new tab';

export const visitedStylesDisabled = () => `
  <a href="/?path=/story/components-link--all" class="hds-link hds-link--medium hds-link--disable-visited-styles">Link without visited styles</a>
`;

visitedStylesDisabled.storyName = 'Link without visited styles';

export const standaloneLink = () => `
  <a href="/?path=/story/components-link--all" class="hds-link hds-link--large" style="display: block; width: fit-content;">Standalone link</a>
  <p style="display: inline; font-size: 14px;">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
    laborum.
  </p>
`

standaloneLink.storyName = 'Standalone link';

export const withCustomIcon = () => `
  <div style="display: grid; column-gap: 10px; grid-template-columns: 1fr 1fr 1fr">
    <div>
      <p>Small</p>
      <a href="/#" class="hds-link hds-link--small hds-icon--document hds-icon-start--document" aria-label="Document link. Opens in external domain">Document link</a>
      <br/><br/>
      <a href="/#" class="hds-link hds-link--small hds-icon--phone hds-icon-start--phone" aria-label="Phone link. Opens in external domain">Phone link</a>
      <br/><br/>
      <a href="/#" class="hds-link hds-link--small hds-icon--envelope hds-icon-start--envelope" aria-label="Envelope link. Opens in external domain">Envelope link</a>
      <br/><br/>
      <a href="/#" class="hds-link hds-link--small hds-icon--photo hds-icon-start--photo" aria-label="Photo link. Opens in external domain">Photo link</a>
    </div>
    <div>
      <p>Medium</p>
      <a href="/#" class="hds-link hds-link--medium hds-icon--document hds-icon-start--document" aria-label="Document link. Opens in external domain">Document link</a>
      <br/><br/>
      <a href="/#" class="hds-link hds-link--medium hds-icon--phone hds-icon-start--phone" aria-label="Phone link. Opens in external domain">Phone link</a>
      <br/><br/>
      <a href="/#" class="hds-link hds-link--medium hds-icon--envelope hds-icon-start--envelope" aria-label="Envelope link. Opens in external domain">Envelope link</a>
      <br/><br/>
      <a href="/#" class="hds-link hds-link--medium hds-icon--photo hds-icon-start--photo" aria-label="Photo link. Opens in external domain">Photo link</a>
    </div>
    <div>
      <p>Large</p>
      <a href="/#" class="hds-link hds-link--large hds-icon--document hds-icon-start--document" aria-label="Document link. Opens in external domain">Document link</a>
      <br/><br/>
      <a href="/#" class="hds-link hds-link--large hds-icon--phone hds-icon-start--phone" aria-label="Phone Link. Opens in external domain">Phone Link</a>
      <br/><br/>
      <a href="/#" class="hds-link hds-link--large hds-icon--envelope hds-icon-start--envelope" aria-label="Envelope Link. Opens in external domain">Envelope Link</a>
      <br/><br/>
      <a href="/#" class="hds-link hds-link--large hds-icon--photo hds-icon-start--photo" aria-label="Photo Link. Opens in external domain">Photo Link</a>
    </div>
  </div>
`
withCustomIcon.storyName = 'With a custom icon';

export const withButtonStyles = () => `
  <a href="https://hds.hel.fi" class="hds-button hds-button--primary" aria-label="Button styled link. Opens in external domain" data-playwright="true">
    <span class="hds-button__label">Link with button styles</span>
  </a>
`
withButtonStyles.storyName = 'With Button styles';
