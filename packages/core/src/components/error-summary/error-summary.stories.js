import '../notification/notification.css';
import './error-summary.css';
import '../../icons/icon.css';
import '../../icons/alert-circle.css';

export default {
  title: 'Components/Error summary',
  decorators: [(storyFn) => `<div style="max-width:400px">${storyFn()}</div>`],
};

export const Default = () => `
    <section aria-label="Error summary" class="hds-notification hds-notification--error">
      <div class="hds-notification__content">
        <div class="hds-notification__label" role="heading" aria-level="2" tabindex="-1">
          <span class="hds-icon hds-icon--alert-circle" aria-hidden="true"></span>
          <span>Form contains following errors</span>
        </div>
        <div class="hds-notification__body hds-error-summary__body">
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

export const Large = () => `
    <section aria-label="Error summary" class="hds-notification hds-notification--error hds-notification--large">
      <div class="hds-notification__content">
        <div class="hds-notification__label" role="heading" aria-level="2" tabindex="-1">
          <span class="hds-icon hds-icon--alert-circle" aria-hidden="true"></span>
          <span>Form contains following errors</span>
        </div>
        <div class="hds-notification__body hds-error-summary__body">
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
