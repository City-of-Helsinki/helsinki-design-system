import './highlight.css';

export default {
  title: 'Components/Highlight',
};

const highlightText = 'You may select an highlight from the article to be displayed here. Select an excerpt that you want the user to pay attention to.';
const quoteText = 'Add an interesting quote here';
const quoteReference = 'First name Last name. Title.';
const customColor = '#00005e';

export const DefaultHighlight = () => `
  <figure class="hds-highlight">
    <blockquote>
      <p class="hds-highlight__text">${highlightText}</p>
    </blockquote>
  </figure>
`;

export const HighlightLarge = () => `
  <figure class="hds-highlight hds-highlight--large">
    <blockquote>
      <p class="hds-highlight__text">${highlightText}</p>
    </blockquote>
  </figure>
`;

export const HighlightSmall = () => `
  <figure class="hds-highlight hds-highlight--small">
    <blockquote>
      <p class="hds-highlight__text">${highlightText}</p>
    </blockquote>
  </figure>
`;

export const HighlightCustomStyles = () => `
  <figure class="hds-highlight" style="--accent-line-color:${customColor};--text-color:${customColor}">
    <blockquote>
      <p class="hds-highlight__text">${highlightText}</p>
    </blockquote>
  </figure>
`;

export const DefaultQuote = () => `
  <figure class="hds-highlight">
    <blockquote>
      <p class="hds-highlight__text hds-highlight__quote">${quoteText}</p>
    </blockquote>
    <figcaption class="hds-highlight__reference">${quoteReference}</figcaption>
  </figure>
`;

export const QuoteLarge = () => `
  <figure class="hds-highlight hds-highlight--large">
    <blockquote>
      <p class="hds-highlight__text hds-highlight__quote">${quoteText}</p>
    </blockquote>
    <figcaption class="hds-highlight__reference">${quoteReference}</figcaption>    
  </figure>
`;

export const QuoteSmall = () => `
  <figure class="hds-highlight hds-highlight--small">
    <blockquote>
      <p class="hds-highlight__text hds-highlight--small hds-highlight__quote">${quoteText}</p>
    </blockquote>
    <div class="hds-highlight__reference">${quoteReference}</div>
  </figure>
`;

export const QuoteCustomStyles = () => `
  <figure class="hds-highlight" style="--accent-line-color:${customColor};--text-color:${customColor}">
    <blockquote>
      <div class="hds-highlight__text hds-highlight__quote">${quoteText}</div>
    </blockquote>
    <div class="hds-highlight__reference">${quoteReference}</div>
  </figure>
`;
