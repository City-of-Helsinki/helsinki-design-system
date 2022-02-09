import './card.css';

export default {
  title: 'Components/Card',
};

const body = `<div class="hds-card__body">
    <div class="hds-card__heading" role="heading" aria-level="2">Card</div>
    <div class="hds-card__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
  </div>`;

const button = `<button type="button" class="hds-button hds-button--secondary hds-button--theme-black" role="link">
      <span class="hds-button__label">Button</span>
    </button>`;

export const Empty = () => `
  <div class="hds-card" role="region"></div>
  <br>
  <br>
  <div class="hds-card hds-card--border" role="region"></div>
`;

export const WithBoxShadow = () => `
  <div class="hds-card hds-card--box-shadow" role="region"></div>
`;

export const TextHeading = () => `
  <div class="hds-card" role="region">
    ${body}
  </div>
  <br>
  <br>
  <div class="hds-card hds-card--border" role="region">
    ${body}
  </div>
`;
TextHeading.storyName = 'Text & heading';

export const TextHeadingButton = () => `
  <div class="hds-card" role="region">
    ${body}
    ${button}
  </div>
  <br>
  <br>
  <div class="hds-card hds-card--border" role="region">
    ${body}
    ${button}
  </div>
`;
TextHeadingButton.storyName = 'Text, heading & button';
