import './status-label.css';

export default {
  title: 'Components/StatusLabel',
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

export const WithRoundedCorners = () => `
  <span class="hds-status-label hds-status-label--rounded-corners">
    Rounded
  </span>
`;

export const Icons = () => `
  <span class='hds-status-label hds-status-label--with-icon'>
    <span aria-hidden='true' class='hds-status-label-icon hds-icon hds-icon--info-circle'></span>
    Default
  </span>

  <br />
  <br />

  <span class='hds-status-label hds-status-label--with-icon hds-status-label--info'>
    <span aria-hidden='true' class='hds-status-label-icon hds-icon hds-icon--info-circle'></span>
    Info
  </span>

  <br />
  <br />

  <span class='hds-status-label hds-status-label--with-icon hds-status-label--success'>
    <span aria-hidden='true' class='hds-status-label-icon hds-icon hds-icon--check-circle'></span>
    Success
  </span>

  <br />
  <br />

  <span class='hds-status-label hds-status-label--with-icon hds-status-label--alert'>
    <span aria-hidden='true' class='hds-status-label-icon hds-icon hds-icon--alert-circle'></span>
    Alert
  </span>

  <br />
  <br />

  <span class='hds-status-label hds-status-label--with-icon hds-status-label--error'>
    <span aria-hidden='true' class='hds-status-label-icon hds-icon hds-icon--error'></span>
    Error
  </span>

  <br />
  <br />

  <span class='hds-status-label hds-status-label--with-icon hds-status-label--rounded-corners'>
    <span aria-hidden='true' class='hds-status-label-icon hds-icon hds-icon--info-circle'></span>
    Rounded
  </span>
`;
