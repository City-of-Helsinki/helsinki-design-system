import './notification.css';
import '../../icons/icon.css';
import '../../icons/icon-info.css';
import '../../icons/icon-close.css';
import '../../icons/icon-attention.css';
import '../../icons/icon-warning.css';
import '../../icons/icon-check.css';

const getLabel = (icon = 'info', label = 'Label text') =>
  `<div class="hds-notification__label">
        <span class="hds-icon hds-icon--${icon}" aria-hidden="true"></span>
        <span class="text-md text-bold">${label}</span>
  </div>`;
const text = `<div class="hds-notification__body text-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</div>`;

export default {
  title: 'Notification',
  decorators: [(storyFn) => `<div style="max-width:400px">${storyFn()}</div>`],
};

/**
 * Default
 */
export const Default = () => `
    <div class="hds-notification">
      ${getLabel()}
      ${text}
    </div>
`;

/**
 * Success
 */
export const Success = () => `
    <div class="hds-notification hds-notification--success">
      ${getLabel('check')}
      ${text}
    </div>
`;

/**
 * Warning
 */
export const Warning = () => `
    <div class="hds-notification hds-notification--warning">
      ${getLabel('attention')}
      ${text}
    </div>
`;

/**
 * Error
 */
export const Error = () => `
    <div class="hds-notification hds-notification--error">
      ${getLabel('warning')}
      ${text}
    </div>
`;

/**
 * With close button
 */
export const WithClose = () => `
    <div class="hds-notification">
      ${getLabel()}
      ${text}
      <button
        class="hds-notification__close-button"
        aria-label="Close notification"
        onclick=""
      >
        <span class="hds-icon hds-icon--close" aria-hidden="true"></span>
      </button>
    </div>
`;

WithClose.story = {
  name: 'With close button',
};
