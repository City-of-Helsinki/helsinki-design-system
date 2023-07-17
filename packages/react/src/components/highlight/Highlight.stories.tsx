import React from 'react';

import { Highlight } from './Highlight';

export default {
  component: Highlight,
  title: 'Components/Highlight',
  parameters: {
    controls: { expanded: true },
  },
};

const customColor = '#00005e';

const quoteArgs = { text: 'Add an interesting quote here', type: 'quote', reference: 'First name Last name. Title.' };

const highlightArgs = {
  text:
    'You may select an highlight from the article to be displayed here. Select an excerpt that you want the user to pay attention to.',
};

export const DefaultHighlight = (args) => <Highlight {...args} />;
DefaultHighlight.args = {
  ...highlightArgs,
};

export const HighlightSmall = (args) => <Highlight {...args} />;
HighlightSmall.args = {
  ...highlightArgs,
  variant: 'small',
};

export const HighlightLarge = (args) => <Highlight {...args} />;
HighlightLarge.args = {
  ...highlightArgs,
  variant: 'l',
};

export const HighlightCustomAccentColor = (args) => <Highlight {...args} />;
HighlightCustomAccentColor.args = {
  ...highlightArgs,
  theme: {
    '--accent-line-color': customColor,
  },
};

export const HighlightCustomTextColor = (args) => <Highlight {...args} />;
HighlightCustomTextColor.args = {
  ...highlightArgs,
  theme: {
    '--text-color': customColor,
  },
};

export const DefaultQuote = (args) => <Highlight {...args} />;
DefaultQuote.args = {
  ...quoteArgs,
};

export const QuoteLarge = (args) => <Highlight {...args} />;
QuoteLarge.args = {
  ...quoteArgs,
  variant: 'l',
};

export const QuoteSmall = (args) => <Highlight {...args} />;
QuoteSmall.args = {
  ...quoteArgs,
  variant: 's',
};

export const QuoteCustomAccentColor = (args) => <Highlight {...args} />;
QuoteCustomAccentColor.args = {
  ...quoteArgs,
  theme: {
    '--accent-line-color': customColor,
  },
};

export const QuoteCustomTextColor = (args) => <Highlight {...args} />;
QuoteCustomTextColor.args = {
  ...quoteArgs,
  theme: {
    '--text-color': customColor,
  },
};
