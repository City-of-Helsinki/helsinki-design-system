import './notification.css';
import '../../icons/icon.css';
import '../../icons/ui/icon-info-circle.css';
import '../../icons/ui/icon-cross.css';
import '../../icons/ui/icon-alert-circle.css';
import '../../icons/ui/icon-error.css';
import '../../icons/ui/icon-check.css';

const getLabel = (type = 'info') => {
  const label = type[0].toUpperCase() + type.substring(1);
  const iconMapping = {
    info: 'info-circle',
    success: 'check',
    alert: 'alert-circle',
    error: 'error',
  };
  return `
    <div class="hds-notification__label">
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
  title: 'Notification',
  decorators: [(storyFn) => `<div style="max-width:400px">${storyFn()}</div>`],
};

export const Default = () => `
    <div class="hds-notification">
      ${getLabel()}
      ${text}
    </div>
`;

export const Success = () => `
    <div class="hds-notification hds-notification--success">
      ${getLabel('success')}
      ${text}
    </div>
`;

export const Alert = () => `
    <div class="hds-notification hds-notification--alert">
      ${getLabel('alert')}
      ${text}
    </div>
`;

export const Error = () => `
    <div class="hds-notification hds-notification--error">
      ${getLabel('error')}
      ${text}
    </div>
`;

export const Inline = () =>
  [null, 'success', 'alert', 'error']
    .map(
      (type) =>
        `
        <div class="hds-notification hds-notification--inline ${type ? `hds-notification--${type}` : ''}">
          ${getLabel(type || 'info')}
          ${text}
        </div>
    `,
    )
    .join('');

export const Small = () =>
  [null, 'success', 'alert', 'error']
    .map(
      (type) =>
        `
        <div class="hds-notification hds-notification--small ${type ? `hds-notification--${type}` : ''}">
          ${getLabel(type || 'info')}
        </div>
    `,
    )
    .join('');

export const Large = () =>
  [null, 'success', 'alert', 'error']
    .map(
      (type) =>
        `
        <div class="hds-notification hds-notification--large ${type ? `hds-notification--${type}` : ''}">
          ${getLabel(type || 'info')}
          ${text}
        </div>
    `,
    )
    .join('');

export const WithClose = () => `
    <div class="hds-notification">
      ${getLabel('info')}
      ${text}
      ${closeButton}
    </div>
    <br>
    <div class="hds-notification hds-notification--small">
      ${getLabel('info')}
      ${closeButton}
    </div>
    <br>
    <div class="hds-notification hds-notification--large">
      ${getLabel('info')}
      ${text}
      ${closeButton}
    </div>
`;

WithClose.story = {
  name: 'With close button',
};
