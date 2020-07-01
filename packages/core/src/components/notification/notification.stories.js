import './notification.css';
import '../../icons/icon.css';
import '../../icons/ui/icon-info-circle.css';
import '../../icons/ui/icon-cross.css';
import '../../icons/ui/icon-alert-circle.css';
import '../../icons/ui/icon-error.css';
import '../../icons/ui/icon-check.css';

const getLabel = (icon = 'info-circle', label = 'Label text') =>
  `<div class="hds-notification__label">
        <span class="hds-icon hds-icon--${icon}" aria-hidden="true"></span>
        <span class="text-md text-bold">${label}</span>
  </div>`;
const text = `<div class="hds-notification__body text-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</div>`;

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
      ${getLabel('check')}
      ${text}
    </div>
`;

export const Warning = () => `
    <div class="hds-notification hds-notification--warning">
      ${getLabel('alert-circle')}
      ${text}
    </div>
`;

export const Error = () => `
    <div class="hds-notification hds-notification--error">
      ${getLabel('error')}
      ${text}
    </div>
`;

export const WithClose = () =>
  [null, 'success', 'warning', 'error']
    .map(
      (item) =>
        `
        <div class="hds-notification ${item ? `hds-notification--${item}` : ''}">
          ${getLabel()}
          ${text}
          <button
            class="hds-notification__close-button button-reset"
            aria-label="Close notification"
            onclick=""
          >
            <span class="hds-icon hds-icon--cross" aria-hidden="true"></span>
          </button>
        </div>
    `,
    )
    .join('');

WithClose.story = {
  name: 'With close button',
};
