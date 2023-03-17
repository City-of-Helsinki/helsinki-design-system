import './highlight.css';

export default {
  title: 'Components/Highlight',
};

const highlightText = 'You may select an highlight from the article to be displayed here. Select an excerpt that you want the user to pay attention to.';
const quoteText = 'Add an interesting quote here';
const quoteReference = 'First name Last name. Title.';

export const DefaultHighlight = () => `
  <div class="hds-highlight" role="region">
    <div class="hds-highlight__text">${highlightText}</div>
  </div>
`;

export const HighlightLarge = () => `
  <div class="hds-highlight hds-highlight--large" role="region">
    <div class="hds-highlight__text">${highlightText}</div>
  </div>
`;

export const HighlightSmall = () => `
  <div class="hds-highlight hds-highlight--small" role="region">
    <div class="hds-highlight__text">${highlightText}</div>
  </div>
`;

export const HighlightCustomStyles = () => `
  <div class="hds-highlight" role="region" style="--accent-line-color:#009246;--text-color:#0000bf">
    <div class="hds-highlight__text">${highlightText}</div>
  </div>
`;

export const DefaultQuote = () => `
  <div class="hds-highlight" role="region">
    <div class="hds-highlight__text hds-highlight__quote">${highlightText}</div>
    <div class="hds-highlight__reference">${quoteReference}</div>
  </div>
`;

export const QuoteLarge = () => `
  <div class="hds-highlight hds-highlight--large" role="region">
    <div class="hds-highlight__text hds-highlight__quote">${quoteText}</div>
    <div class="hds-highlight__reference">${quoteReference}</div>
  </div>
`;

export const QuoteSmall = () => `
  <div class="hds-highlight hds-highlight--small" role="region">
    <div class="hds-highlight__text hds-highlight--small hds-highlight__quote">${quoteText}</div>
    <div class="hds-highlight__reference">${quoteReference}</div>
  </div>
`;

export const QuoteCustomStyles = () => `
  <div class="hds-highlight" role="region" style="--accent-line-color:#009246;--text-color:#0000bf">
    <div class="hds-highlight__text hds-highlight__quote">${quoteText}</div>
    <div class="hds-highlight__reference">${quoteReference}</div>
  </div>
  `;
