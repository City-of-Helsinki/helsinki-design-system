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
  variant: 'small',
};
export const HighlightLarge = (args) => <Highlight {...args} />;
HighlightLarge.args = {
  text:
    'You may select an highlight from the article to be displayed here. Select an excerpt that you want the user to pay attention to.',
  variant: 'large',
};
export const HighlightCustomAccentColor = (args) => <Highlight {...args} />;
HighlightCustomAccentColor.args = {
  text:
    'You may select an highlight from the article to be displayed here. Select an excerpt that you want the user to pay attention to.',
  theme: {
    '--accent-line-color': '#009246',
  },
};
export const HighlightCustomTextColor = (args) => <Highlight {...args} />;
HighlightCustomTextColor.args = {
  text:
    'You may select an highlight from the article to be displayed here. Select an excerpt that you want the user to pay attention to.',
  theme: {
    '--text-color': '#009246',
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
  variant: 'large',
  reference: 'First name Last name. Title.',
};
export const QuoteSmall = (args) => <Highlight {...args} />;
QuoteSmall.args = {
  text: 'Add an interesting quote here',
  type: 'quote',
  variant: 'small',
  reference: 'First name Last name. Title.',
};
export const QuoteCustomAccentColor = (args) => <Highlight {...args} />;
QuoteCustomAccentColor.args = {
  text: 'Add an interesting quote here',
  type: 'quote',
  reference: 'First name Last name. Title.',
  theme: {
    '--accent-line-color': '#009246',
  },
};
export const QuoteCustomTextColor = (args) => <Highlight {...args} />;
QuoteCustomTextColor.args = {
  text: 'Add an interesting quote here',
  type: 'quote',
  reference: 'First name Last name. Title.',
  theme: {
    '--text-color': '#009246',
  },
};
