import './notification.scss';

const iconMapping = {
  info: 'info-circle-fill',
  success: 'check-circle-fill',
  alert: 'alert-circle-fill',
  error: 'error-fill',
};

const getLabelText = type => type[0].toUpperCase() + type.substring(1);
const getInlineNotificationLabel = (type) => {
  return `
    <div class="hds-notification__label" role="heading" aria-level="2">
      <span class="hds-icon hds-icon--${iconMapping[type]}" aria-hidden="true"></span>
      <span>${getLabelText(type)}</span>
    </div>`;
};
const getToastLabel = (type) => {
  return `
    <div class="hds-notification__label">
      <span class="hds-icon hds-icon--${iconMapping[type]}" aria-hidden="true"></span>
      <span>${getLabelText(type)}</span>
    </div>`;
};
const text = `<div class="hds-notification__body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>`;
const closeButton = `
    <button
      class="hds-notification__close-button"
      aria-label="Close notification"
      type="button"
      onclick=""
    >
      <span class="hds-icon hds-icon--cross" aria-hidden="true"></span>
    </button>
`;

export default {
  title: 'Components/Notification',
  decorators: [(storyFn) => `<div style="max-width:400px">${storyFn()}</div>`],
};

export const Default = () => `
    <section aria-label="Notification" class="hds-notification">
      <div class="hds-notification__content">
        <div class="hds-notification__label" role="heading" aria-level="2">
            <span class="hds-icon hds-icon--info-circle-fill" aria-hidden="true"></span>
            <span>Info</span>
        </div>
        ${text}
      </div>
    </section>
`;

export const Success = () => `
    <section aria-label="Notification" class="hds-notification hds-notification--success">
      <div class="hds-notification__content">
        <div class="hds-notification__label" role="heading" aria-level="2">
            <span class="hds-icon hds-icon--check-circle-fill" aria-hidden="true"></span>
            <span>Success</span>
        </div>
        ${text}
      </div>
    </section>
`;

export const Alert = () => `
    <section aria-label="Notification" class="hds-notification hds-notification--alert">
      <div class="hds-notification__content">
        <div class="hds-notification__label" role="heading" aria-level="2">
            <span class="hds-icon hds-icon--alert-circle-fill" aria-hidden="true"></span>
            <span>Alert</span>
        </div>
        ${text}
      </div>
    </section>
`;

export const Error = () => `
    <section aria-label="Notification" class="hds-notification hds-notification--error">
      <div class="hds-notification__content">
        <div class="hds-notification__label" role="heading" aria-level="2">
            <span class="hds-icon hds-icon--error-fill" aria-hidden="true"></span>
            <span>Error</span>
        </div>
        ${text}
      </div>
    </section>
`;

export const Toast = () =>
  ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']
    .map(
      (position) =>
        `
        <section aria-label="Notification" role="alert" class="hds-notification hds-notification--${position}">
          <div class="hds-notification__content">
            ${getToastLabel('info')}
            ${position}
          </div>
        </section>
    `,
    )
    .join('');

export const Small = () =>
  ['info', 'success', 'alert', 'error']
    .map(
      (type) =>
        `
        <section aria-label="Notification" class="hds-notification hds-notification--small ${
          type ? `hds-notification--${type}` : ''
        }">
          <div class="hds-notification__content">
             ${getToastLabel(type)}
          </div>
        </section>
    `,
    )
    .join('');

export const Large = () =>
  ['info', 'success', 'alert', 'error']
    .map(
      (type) =>
        `
        <section aria-label="Notification" class="hds-notification hds-notification--large ${
          type ? `hds-notification--${type}` : ''
        }">
          <div class="hds-notification__content">
            ${getInlineNotificationLabel( type )}
            ${text}
          </div>
        </section>
    `,
    )
    .join('');

export const WithBoxShadow = () => `
    <section aria-label="Notification" class="hds-notification hds-notification--box-shadow">
      <div class="hds-notification__content">
        <div class="hds-notification__label" role="heading" aria-level="2">
            <span class="hds-icon hds-icon--info-circle-fill" aria-hidden="true"></span>
            <span>Info</span>
        </div>
        ${text}
      </div>
    </section>
`;

WithBoxShadow.storyName = 'With box shadow';

export const Invisible = () => `
    <div class="visually-hidden">
      <section aria-label="Notification" role="alert" class="hds-notification">
        <div class="hds-notification__content">
          <div class="hds-notification__label">
            <span>Info</span>
          </div>
          This notification is only visible to screen readers
        </div>
      </section>
    </div>
`;

export const WithClose = () => `
    <section aria-label="Notification" role="alert" class="hds-notification">
      <div class="hds-notification__content">
       <div class="hds-notification__label">
          <span class="hds-icon hds-icon--info-circle-fill" aria-hidden="true"></span>
          <span>Info</span>
        </div>
        ${text}
      </div>
      ${closeButton}
    </section>
    <br>
    <section aria-label="Notification" role="alert" class="hds-notification hds-notification--small">
      <div class="hds-notification__content">
        <div class="hds-notification__label">
          <span class="hds-icon hds-icon--info-circle-fill" aria-hidden="true"></span>
        </div>
        <div class="hds-notification__body">Info</div>
      </div>
      ${closeButton}
    </section>
    <br>
    <section aria-label="Notification" role="alert" class="hds-notification hds-notification--large">
      <div class="hds-notification__content">
       <div class="hds-notification__label">
          <span class="hds-icon hds-icon--info-circle-fill" aria-hidden="true"></span>
          <span>Info</span>
        </div>
        ${text}
      </div>
      ${closeButton}
    </section>
`;
WithClose.storyName = 'With close button';

export const WithLink = () => `
    <section aria-label="Notification" class="hds-notification">
      <div class="hds-notification__content">
        <div class="hds-notification__label" role="heading" aria-level="2">
            <span class="hds-icon hds-icon--info-circle-fill" aria-hidden="true"></span>
            <span>Info</span>
        </div>
        ${text}
        <a href="#" class="hds-link">Link</a>
      </div>
    </section>
`;

export const AsErrorSummary = () => `
    <section aria-label="Error summary" class="hds-notification hds-notification--error">
      <div class="hds-notification__content">
        <div class="hds-notification__label" role="heading" aria-level="2" tabindex="-1">
          <span class="hds-icon hds-icon--error-fill" aria-hidden="true"></span>
          <span>Form contains the following errors</span>
        </div>
        <div class="hds-notification__body">
          <ul>
            <li>
              Error 1: <a href="#field1">Please enter your first name</a>
            </li>
            <li>
              Error 2: <a href="#field2">Please enter your last name</a>
            </li>
            <li>
              Error 3: <a href="#field3">Please enter a valid email address</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
`;

AsErrorSummary.storyName = 'As error summary';

export const AsErrorSummaryLarge = () => `
    <section aria-label="Error summary" class="hds-notification hds-notification--error hds-notification--large">
      <div class="hds-notification__content">
        <div class="hds-notification__label" role="heading" aria-level="2" tabindex="-1">
          <span class="hds-icon hds-icon--error-fill" aria-hidden="true"></span>
          <span>Form contains the following errors</span>
        </div>
        <div class="hds-notification__body">
          <ul>
            <li>
              Error 1: <a href="#field1">Please enter your first name</a>
            </li>
            <li>
              Error 2: <a href="#field2">Please enter your last name</a>
            </li>
            <li>
              Error 3: <a href="#field3">Please enter a valid email address</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
`;

AsErrorSummaryLarge.storyName = 'As error summary (large)';

