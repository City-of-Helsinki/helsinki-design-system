import React from 'react';

import { Highlight } from './Highlight';

export default {
  component: Highlight,
  title: 'Components/Highlight',
  parameters: {
    controls: { expanded: true },
  },
};

export const DefaultHighlight = (args) => <Highlight {...args} />;
DefaultHighlight.args = {
  text:
    'You may select an highlight from the article to be displayed here. Select an excerpt that you want the user to pay attention to.',
};
export const HighlightSmall = (args) => <Highlight {...args} />;
HighlightSmall.args = {
  text:
    'You may select an highlight from the article to be displayed here. Select an excerpt that you want the user to pay attention to.',
  size: 'small',
};
export const HighlightLarge = (args) => <Highlight {...args} />;
HighlightLarge.args = {
  text:
    'You may select an highlight from the article to be displayed here. Select an excerpt that you want the user to pay attention to.',
  size: 'large',
};
export const HighlightCustomColor = (args) => <Highlight {...args} />;
HighlightCustomColor.args = {
  text:
    'You may select an highlight from the article to be displayed here. Select an excerpt that you want the user to pay attention to.',
  theme: {
    '--border-left-color': '#009246',
  },
};
export const DefaultQuote = (args) => <Highlight {...args} />;
DefaultQuote.args = {
  text: 'Add an interesting quote here',
  type: 'quote',
  reference: 'First name Last name. Title.',
};
export const QuoteLarge = (args) => <Highlight {...args} />;
QuoteLarge.args = {
  text: 'Add an interesting quote here',
  type: 'quote',
  size: 'large',
  reference: 'First name Last name. Title.',
};
export const QuoteSmall = (args) => <Highlight {...args} />;
QuoteSmall.args = {
  text: 'Add an interesting quote here',
  type: 'quote',
  size: 'small',
  reference: 'First name Last name. Title.',
};
export const QuoteCustomColor = (args) => <Highlight {...args} />;
QuoteCustomColor.args = {
  text: 'Add an interesting quote here',
  type: 'quote',
  reference: 'First name Last name. Title.',
  theme: {
    '--border-left-color': '#009246',
  },
};
