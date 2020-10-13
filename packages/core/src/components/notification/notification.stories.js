import './notification.css';
import '../../icons/icon.css';
import '../../icons/ui/icon-info-circle.css';
import '../../icons/ui/icon-cross.css';
import '../../icons/ui/icon-alert-circle.css';
import '../../icons/ui/icon-error.css';
import '../../icons/ui/icon-check.css';

const iconMapping = {
  info: 'info-circle',
  success: 'check',
  alert: 'alert-circle',
  error: 'error',
};

const getLabel = (type = 'info') => {
  const label = type[0].toUpperCase() + type.substring(1);
  return `
    <div class="hds-notification__label" role="heading" aria-level="2">
      <span class="hds-icon hds-icon--${iconMapping[type]}" aria-hidden="true"></span>
      <span>${label}</span>
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
        ${getLabel()}
        ${text}
      </div>
    </section>
`;

export const Success = () => `
    <section aria-label="Notification" class="hds-notification hds-notification--success">
      <div class="hds-notification__content">
        ${getLabel('success')}
        ${text}
      </div>
    </section>
`;

export const Alert = () => `
    <section aria-label="Notification" class="hds-notification hds-notification--alert">
      <div class="hds-notification__content">
        ${getLabel('alert')}
        ${text}
      </div>
    </section>
`;

export const Error = () => `
    <section aria-label="Notification" class="hds-notification hds-notification--error">
      <div class="hds-notification__content">
        ${getLabel('error')}
        ${text}
      </div>
    </section>
`;

export const Toast = () =>
  ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']
    .map(
      (position) =>
        `
        <section aria-label="Notification" class="hds-notification hds-notification--${position}">
          <div role="alert" class="hds-notification__content">
            ${getLabel()}
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
            <div class="hds-notification__label">
              <span class="hds-icon hds-icon--${iconMapping[type]}" aria-hidden="true"></span>
            </div>
            <div class="hds-notification__body">${type[0].toUpperCase() + type.substring(1)}</div>
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
            ${getLabel(type)}
            ${text}
          </div>
        </section>
    `,
    )
    .join('');

export const Invisible = () => `
    <div class="hiddenFromScreen" aria-atomic="true" aria-live="assertive" role="status">
      <section aria-label="Notification" class="hds-notification">
        <div class="hds-notification__content">
          ${getLabel()}
          This notification is only visible to screen readers
        </div>
      </section>
    </div>
`;

export const WithClose = () => `
    <section aria-label="Notification" class="hds-notification">
      <div class="hds-notification__content">
        ${getLabel('info')}
        ${text}
      </div>
      ${closeButton}
    </section>
    <br>
    <section aria-label="Notification" class="hds-notification hds-notification--small">
      <div class="hds-notification__content">
        <div class="hds-notification__label">
          <span class="hds-icon hds-icon--info-circle" aria-hidden="true"></span>
        </div>
        <div class="hds-notification__body">Info</div>
      </div>
      ${closeButton}
    </section>
    <br>
    <section aria-label="Notification" class="hds-notification hds-notification--large">
      <div class="hds-notification__content">
        ${getLabel('info')}
        ${text}
      </div>
      ${closeButton}
    </section>
`;
WithClose.storyName = 'With close button';
