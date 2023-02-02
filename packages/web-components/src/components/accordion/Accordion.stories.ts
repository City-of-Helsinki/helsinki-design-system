import { html } from 'lit';
import { styleMap } from 'lit-html/directives/style-map.js';

import './Accordion';

export default {
  component: 'hds-accordion',
  title: 'Components/Accordion',
  decorators: [(storyFn) => html`<div style="max-width: 480px">${storyFn()}</div>`],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    heading: 'How to publish data?',
    language: 'en',
    children: 'To publish your data, open your profile settings and click button "Publish".',
    border: false,
    card: false,
    size: 'm',
    style: { 'max-width': '360px' },
  },
};

export const Default = (args) => html`<hds-accordion
  heading=${args.heading}
  language=${args.language}
  card=${args.card}
  border=${args.border}
  size=${args.size}
  style=${styleMap(args.style)}
  headingLevel="1"
>
  ${args.children}
</hds-accordion>`;

export const Custom = (args) => html`
  <div style="background: red">
    <hds-accordion
      heading=${args.heading}
      language=${args.language}
      card=${args.card}
      border=${args.border}
      size=${args.size}
      style=${styleMap(args.style)}
      headingLevel="1"
    >
      ${args.children}
    </hds-accordion>
  </div>
`;
