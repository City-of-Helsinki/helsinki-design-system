import './loading-spinner.css';

export default {
  title: 'Components/Loading spinner',
};

export const Default = () => `
  <div class="hds-loading-spinner" role="progressbar" aria-valuemin="0" aria-valuemax="100">
    <div></div>
    <div></div>
    <div></div>
  </div>
`;

export const Small = () => `
  <div class="hds-loading-spinner hds-loading-spinner--small" role="progressbar" aria-valuemin="0" aria-valuemax="100">
    <div></div>
    <div></div>
    <div></div>
  </div>
`;
