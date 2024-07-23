import React from 'react';

import { Highlight, HighlightProps } from './Highlight';

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
  text: 'You may select an highlight from the article to be displayed here. Select an excerpt that you want the user to pay attention to.',
};

export const DefaultHighlight = (args: HighlightProps) => <Highlight {...args} />;
DefaultHighlight.args = {
  ...highlightArgs,
};

export const HighlightSmall = (args: HighlightProps) => <Highlight {...args} />;
HighlightSmall.args = {
  ...highlightArgs,
  size: 'small',
};

export const HighlightLarge = (args: HighlightProps) => <Highlight {...args} />;
HighlightLarge.args = {
  ...highlightArgs,
  size: 'l',
};

export const HighlightCustomAccentColor = (args: HighlightProps) => <Highlight {...args} />;
HighlightCustomAccentColor.args = {
  ...highlightArgs,
  theme: {
    '--accent-line-color': customColor,
  },
};

export const HighlightCustomTextColor = (args: HighlightProps) => <Highlight {...args} />;
HighlightCustomTextColor.args = {
  ...highlightArgs,
  theme: {
    '--text-color': customColor,
  },
};

export const DefaultQuote = (args: HighlightProps) => <Highlight {...args} />;
DefaultQuote.args = {
  ...quoteArgs,
};

export const QuoteLarge = (args: HighlightProps) => <Highlight {...args} />;
QuoteLarge.args = {
  ...quoteArgs,
  size: 'l',
};

export const QuoteSmall = (args: HighlightProps) => <Highlight {...args} />;
QuoteSmall.args = {
  ...quoteArgs,
  size: 's',
};

export const QuoteCustomAccentColor = (args: HighlightProps) => <Highlight {...args} />;
QuoteCustomAccentColor.args = {
  ...quoteArgs,
  theme: {
    '--accent-line-color': customColor,
  },
};

export const QuoteCustomTextColor = (args: HighlightProps) => <Highlight {...args} />;
QuoteCustomTextColor.args = {
  ...quoteArgs,
  theme: {
    '--text-color': customColor,
  },
};
