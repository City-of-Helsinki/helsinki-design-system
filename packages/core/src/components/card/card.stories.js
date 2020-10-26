import './card.css';

export default {
  title: 'Components/Card',
};

const body = `<div class="hds-card__body">
    <div class="hds-card__heading" role="heading" aria-level="2">Card</div>
    <div class="hds-card__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
  </div>`;

const button = `<button type="button" class="hds-button hds-button--secondary hds-button--theme-black">
      <span class="hds-button__label">Button</span>
    </button>`;

export const Empty = () => `
  <div class="hds-card"></div>
  <br>
  <br>
  <div class="hds-card hds-card--border"></div>
`;

export const TextHeading = () => `
  <div class="hds-card">
    ${body}
  </div>
  <br>
  <br>
  <div class="hds-card hds-card--border">
    ${body}
  </div>
`;
TextHeading.storyName = 'Text & heading';

export const TextHeadingButton = () => `
  <div class="hds-card">
    ${body}
    ${button}
  </div>
  <br>
  <br>
  <div class="hds-card hds-card--border">
    ${body}
    ${button}
  </div>
`;
TextHeadingButton.storyName = 'Text, heading & button';
