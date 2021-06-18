import './link.css';
import '../../icons/icon.css';

export default {
  title: 'Components/Link',
  decorators: [(storyFn) => `<div style="max-width: 400px">${storyFn()}</div>`],
};

export const Default = () => `
  <a href="/?path=/story/components-link--all" class="hds-link hds-link--small">Default link</a>
`;


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

export const ExternalLinks = () => `
  <a href="https://hds.hel.fi" class="hds-link hds-link--small">
    External link size small<i class="hds-icon icon hds-icon--link-external hds-icon--size-s vertical-align-small-icon" aria-label="Avautuu uuteen domainiin"></i>
  </a>
  <br/>
  <br/>
  <a href="https://hds.hel.fi" class="hds-link hds-link--medium">
    External link size medium<i class="hds-icon icon hds-icon--link-external hds-icon--size-s vertical-align-small-icon" aria-label="Avautuu uuteen domainiin"></i>
  </a>
  <br/>
  <br/>
  <a href="https://hds.hel.fi" class="hds-link hds-link--large">
    External link size large<i class="hds-icon icon hds-icon--link-external hds-icon--size-l vertical-align-big-icon" aria-label="Avautuu uuteen domainiin"></i>
  </a>
`;

ExternalLinks.storyName = 'External links';

export const openInNewTabLink = () => `
  <a href="https://hds.hel.fi" class="hds-link hds-link--small" target="_blank" aria-label="Avautuu uudessa välilehdessä">
    Link that opens in a new tab<i class="hds-icon icon hds-icon--link-external hds-icon--size-s vertical-align-small-icon" aria-label="Avautuu uuteen domainiin"></i>
  </a>
`

openInNewTabLink.storyName = 'Link that opens in a new tab';

export const visitedStylesDisabled = () => `
  <a href="/?path=/story/components-link--all" class="hds-link hds-link--small hds-link--disable-visited-styles">Link without visited styles</a>
`;

visitedStylesDisabled.storyName = 'Link without visited styles';

const link = `
  <a href="https://hds.hel.fi" class="hds-link hds-link--small">
    Inline link<i class="hds-icon icon hds-icon--link-external hds-icon--size-s vertical-align-small-icon" aria-label="Avautuu uuteen domainiin"></i></a>
`

export const inlineLink = () => `
  <p style={{ fontSize: '14px', lineHeight: '30px' }}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ${link} laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
`

inlineLink.storyName = 'Inline link';

export const standaloneLink = () => `
  <a href="/?path=/story/components-link--all" class="hds-link hds-link--large">Standalone link</a>
  <p style={{ display: 'inline', fontSize: '14px' }}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
    laborum.
  </p>
`
