import './status-label.css';
import './../notification/notification.css';
/**
 * Note: default rectangular StatusLabel will be deprecated in 3.0.0. 
 * Rounded corder variant will be used as default instead.
 */

export default {
  title: 'Components/StatusLabel',
};

const deprecatedInfo = () => `
    <section aria-label="Notification" class="hds-notification hds-notification--alert">
      <div class="hds-notification__content">
        <div class="hds-notification__label" role="heading" aria-level="2">
            <span class="hds-icon hds-icon--info-circle-fill" aria-hidden="true"></span>
            <span>Breaking change</span>
        </div>
          The default rectangular status labels are deprecated. The rounded cornered variant will replace the default
          rectangular StatusLabel in the next major release.
        </div>
    </section>
`;


export const Default = () => `
  ${deprecatedInfo()}
  <br />
  <span class="hds-status-label">
    Default
  </span>
`;

export const Info = () => `
  ${deprecatedInfo()}
  <br />
  <span class="hds-status-label hds-status-label--info">
    Info
  </span>
`;

export const Success = () => `
  ${deprecatedInfo()}
  <br />
  <span class="hds-status-label hds-status-label--success">
    Success
  </span>
`;

export const Alert = () => `
  ${deprecatedInfo()}
  <br />
  <span class="hds-status-label hds-status-label--alert">
    Alert
  </span>
`;

export const Error = () => `
  ${deprecatedInfo()}
  <br />
  <span class="hds-status-label hds-status-label--error">
    Error
  </span>
`;

export const WithRoundedCorners = () => `
  ${deprecatedInfo()}
  <br />
  <span class="hds-status-label hds-status-label--rounded-corners">
    Rounded
  </span>
`;

export const Icons = () => `
  ${deprecatedInfo()}

  <br />
  <br />

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
