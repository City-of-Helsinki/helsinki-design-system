import './loading-spinner.css';

export default {
  title: 'Components/Loading spinner',
};

export const Default = () => `
  <div class="hds-loading-spinner">
    <div></div>
    <div></div>
    <div></div>
  </div>
`;

export const Small = () => `
  <div class="hds-loading-spinner hds-loading-spinner--small">
    <div></div>
    <div></div>
    <div></div>
  </div>
`;

export const CustomTheme = () => `
  <style>
    .hds-loading-spinner.custom-single-color {
      --spinner-color: var(--color-suomenlinna);
    }
  </style>
  <div class="hds-loading-spinner custom-single-color">
    <div></div>
    <div></div>
    <div></div>
  </div>

  <br />

  <style>
    .hds-loading-spinner.custom-multi-color {
      --spinner-color-stage1: var(--color-engel);
      --spinner-color-stage2: var(--color-summer);
      --spinner-color-stage3: var(--color-metro);
    }
  </style>
  <div class="hds-loading-spinner hds-loading-spinner--multicolor custom-multi-color">
    <div></div>
    <div></div>
    <div></div>
  </div>
`;
CustomTheme.storyName = 'Custom theme';
