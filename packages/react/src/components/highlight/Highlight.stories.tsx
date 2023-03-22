import React from 'react';

import { Highlight } from './Highlight';

export default {
  component: Highlight,
  title: 'Components/Highlight',
  parameters: {
    controls: { expanded: true },
  },
};

const QuoteArgs = { text: 'Add an interesting quote here', type: 'quote', reference: 'First name Last name. Title.' };
const HighlightArgs = {
  text:
    'You may select an highlight from the article to be displayed here. Select an excerpt that you want the user to pay attention to.',
};

export const DefaultHighlight = (args) => <Highlight {...args} />;
DefaultHighlight.args = {
  ...HighlightArgs,
};

export const HighlightSmall = (args) => <Highlight {...args} />;
HighlightSmall.args = {
  ...HighlightArgs,
  variant: 'small',
};

export const HighlightLarge = (args) => <Highlight {...args} />;
HighlightLarge.args = {
  ...HighlightArgs,
  variant: 'l',
};

export const HighlightCustomAccentColor = (args) => <Highlight {...args} />;
HighlightCustomAccentColor.args = {
  ...HighlightArgs,
  theme: {
    '--accent-line-color': '#009246',
  },
};

export const HighlightCustomTextColor = (args) => <Highlight {...args} />;
HighlightCustomTextColor.args = {
  ...HighlightArgs,
  theme: {
    '--text-color': '#009246',
  },
};

export const DefaultQuote = (args) => <Highlight {...args} />;
DefaultQuote.args = {
  ...QuoteArgs,
};

export const QuoteLarge = (args) => <Highlight {...args} />;
QuoteLarge.args = {
  ...QuoteArgs,
  variant: 'l',
};

export const QuoteSmall = (args) => <Highlight {...args} />;
QuoteSmall.args = {
  ...QuoteArgs,
  variant: 's',
};

export const QuoteCustomAccentColor = (args) => <Highlight {...args} />;
QuoteCustomAccentColor.args = {
  ...QuoteArgs,
  theme: {
    '--accent-line-color': '#009246',
  },
};

export const QuoteCustomTextColor = (args) => <Highlight {...args} />;
QuoteCustomTextColor.args = {
  ...QuoteArgs,
  theme: {
    '--text-color': '#009246',
  },
};
