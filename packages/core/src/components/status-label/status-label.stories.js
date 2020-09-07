import './status-label.css';

export default {
  title: 'Components/Status label',
};

export const Default = () => `
  <span class="hds-status-label">
    Default
  </span>
`;

export const Info = () => `
  <span class="hds-status-label hds-status-label--info">
    Info
  </span>
`;

export const Success = () => `
  <span class="hds-status-label hds-status-label--success">
    Success
  </span>
`;

export const Alert = () => `
  <span class="hds-status-label hds-status-label--alert">
    Alert
  </span>
`;

export const Error = () => `
  <span class="hds-status-label hds-status-label--error">
    Error
  </span>
`;
