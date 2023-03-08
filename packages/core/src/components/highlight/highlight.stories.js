import './highlight.css';

export default {
  title: 'Components/Highlight',
};

const highlightText = 'You may select an highlight from the article to be displayed here. Select an excerpt that you want the user to pay attention to.';
const quoteText = 'Add an interesting quote here';
const quoteReference = 'First name Last name. Title.';

export const DefaultHighlight = () => `
  <div class="hds-highlight-wrapper">
    <div class="hds-highlight" role="region">
      <div class="hds-highlight--text">${highlightText}</div>
    </div>
  </div>
`;

export const HighlightLarge = () => `
  <div class="hds-highlight-wrapper--large">
    <div class="hds-highlight" role="region">
      <div class="hds-highlight--text hds-highlight--large">${highlightText}</div>
    </div>
  </div>
`;

export const HighlightSmall = () => `
  <div class="hds-highlight-wrapper--small">
    <div class="hds-highlight" role="region">
      <div class="hds-highlight--text hds-highlight--small">${highlightText}</div>
    </div>
  </div>
`;

export const DefaultQuote = () => `
  <div class="hds-highlight-wrapper">
    <div class="hds-highlight" role="region">
      <div class="hds-highlight--text hds-highlight--quote">${highlightText}</div>
      <div class="hds-highlight--reference">${quoteReference}</div>
    </div>
  </div>
  `;

export const QuoteLarge = () => `
  <div class="hds-highlight-wrapper--large">
    <div class="hds-highlight" role="region">
      <div class="hds-highlight--text hds-highlight--large hds-highlight--quote">${highlightText}</div>
      <div class="hds-highlight--reference">${quoteReference}</div>
    </div>
  </div>  
`;

export const QuoteSmall = () => `
  <div class="hds-highlight-wrapper--small">
    <div class="hds-highlight" role="region">
      <div class="hds-highlight--text hds-highlight--small hds-highlight--quote">${highlightText}</div>
      <div class="hds-highlight--reference">${quoteReference}</div>
    </div>
  </div>  
`;
