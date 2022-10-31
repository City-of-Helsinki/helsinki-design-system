import { html } from 'lit';

import '.';

export default {
  title: 'Components/Accordion',
  decorators: [(storyFn) => html`<div style="maxWidth: 480px">${storyFn()}</div>`],
  parameters: {
    controls: { hideNoControlsWarning: true },

  },
  args: {
    heading: 'How to publish data?',
    language: 'en',
    children: 'To publish your data, open your profile settings and click button "Publish".',
    style: { maxWidth: '360px' }, // TODO
  },
};

export const Default = (args) => html`
  <hds-accordion heading=${args.heading} language=${args.language} headingLevel='1'>
    ${args.children}
  </hds-accordion>`
