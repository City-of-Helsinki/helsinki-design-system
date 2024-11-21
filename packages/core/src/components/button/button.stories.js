import './button.scss';
import '../../icons/icon.css';
import '../../icons/share.css';
import '../../icons/angle-right.css';
import '../../icons/trash.css';

export default {
  title: 'Components/Button',
  decorators: [(storyFn) => `<div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-start;">${storyFn()}</div>`],
};

export const Primary = () => `
  <button type="button" class="hds-button hds-button--primary" data-playwright="true">
    Button
  </button>
`;

export const Secondary = () => `
  <button type="button" class="hds-button hds-button--secondary" data-playwright="true">
    Button
  </button>
`;

export const Supplementary = () => `
  <button type="button" class="hds-button hds-button--supplementary" data-playwright="true">
    <span aria-hidden="true" class="hds-icon hds-icon--trash"></span>
    Button
  </button>
`;

export const Success = () => `
  <button type="button" class="hds-button hds-button--success" data-playwright="true">
    Button
  </button>
`;

export const Danger = () => `
  <button type="button" class="hds-button hds-button--danger" data-playwright="true">
    Button
  </button>
`;

export const FullWidth = () => `
  <button type="button" class="hds-button hds-button--primary hds-button--fullwidth" data-playwright="true">
    Button
  </button>
`;
FullWidth.storyName = 'Full width';

export const Small = () => `
  <button type="button" class="hds-button hds-button--primary hds-button--small" data-playwright="true">
    Button
  </button>
`;

export const Disabled = () => `
  <button type="button" disabled class="hds-button hds-button--primary">
    Button
  </button>
  <button type="button" disabled class="hds-button hds-button--secondary">
    Button
  </button>
  <button type="button" disabled class="hds-button hds-button--supplementary">
    Button
  </button>
  <button type="button" disabled class="hds-button hds-button--success">
    Button
  </button>
  <button type="button" disabled class="hds-button hds-button--danger">
    Button
  </button>
`;

export const Icons = () => `
  <button type="button" class="hds-button hds-button--primary" data-playwright="true">
    <span aria-hidden="true" class="hds-icon hds-icon--size-s hds-icon--share"></span>
    <span>Button</span>
  </button>

  <button type="button" class="hds-button hds-button--primary">
    <span>Button</span>
    <span aria-hidden="true" class="hds-icon hds-icon--size-s hds-icon--angle-right"></span>
  </button>

  <button type="button" class="hds-button hds-button--primary">
    <span aria-hidden="true" class="hds-icon hds-icon--size-s hds-icon--share"></span>
    <span>Button</span>
    <span aria-hidden="true" class="hds-icon hds-icon--size-s hds-icon--angle-right"></span>
  </button>

  <button type="button" class="hds-button hds-button--small hds-button--primary" data-playwright="true">
    <span aria-hidden="true" class="hds-icon hds-icon--size-s hds-icon--share"></span>
    <span>Button</span>
  </button>

  <button type="button" class="hds-button hds-button--small hds-button--primary">
    <span>Button</span>
    <span aria-hidden="true" class="hds-icon hds-icon--size-s hds-icon--angle-right"></span>
  </button>

  <button type="button" class="hds-button hds-button--small hds-button--primary">
    <span aria-hidden="true" class="hds-icon hds-icon--size-s hds-icon--share"></span>
    <span>Button</span>
    <span aria-hidden="true" class="hds-icon hds-icon--size-s hds-icon--angle-right"></span>
  </button>
`;

export const IconsWithClasses = () => `
  <button type="button" class="hds-button hds-button--primary hds-icon--share hds-icon-start--share" data-playwright="true">
    Button
  </button>

  <button type="button" class="hds-button hds-button--primary hds-icon--angle-right hds-icon-end--angle-right">
    Button
  </button>

  <button type="button" class="hds-button hds-button--primary hds-icon--angle-right hds-icon--share hds-icon-start--share hds-icon-end--angle-right">
    Button
  </button>

  <button type="button" class="hds-button hds-button--small hds-button--primary hds-icon--share hds-icon-start--share" data-playwright="true">
    Button
  </button>

  <button type="button" class="hds-button hds-button--small hds-button--primary hds-icon--angle-right hds-icon-end--angle-right">
    Button
  </button>

  <button type="button" class="hds-button hds-button--small hds-button--primary hds-icon--angle-right hds-icon--share hds-icon-start--share hds-icon-end--angle-right">
    Button
  </button>
`;

export const Loading = () => `
  <button disabled type="button" class="hds-button hds-button--clear" style="cursor: wait;">
    <div class="hds-loading-spinner hds-loading-spinner--small">
      <div></div>
      <div></div>
      <div></div>
    </div>
    Saving your changes
  </button>
`;

export const Themes = () => `
  <button type="button" class="hds-button hds-button--primary hds-button--theme-coat" data-playwright="true">
    Coat
  </button>

  <button type="button" class="hds-button hds-button--secondary hds-button--theme-coat" data-playwright="true">
    Coat
  </button>

  <button type="button" class="hds-button hds-button--supplementary hds-button--theme-coat" data-playwright="true">
    Coat
  </button>

  <button type="button" class="hds-button hds-button--primary hds-button--theme-black" data-playwright="true">
    Black
  </button>

  <button type="button" class="hds-button hds-button--secondary hds-button--theme-black" data-playwright="true">
    Black
  </button>

  <button type="button" class="hds-button hds-button--supplementary hds-button--theme-black" data-playwright="true">
    Black
  </button>
`;

export const LinkButton = () => `
  <button role="link" type="button" class="hds-button hds-button--primary" onclick="window.open('/')" data-playwright="true">
    Button used as a link
  </button>
`;

export const Inputs = () => `
  <input type="submit" class="hds-button hds-button--primary" value="Submit" />
  <input type="reset" class="hds-button hds-button--primary" value="Reset" />
  <input type="button" class="hds-button hds-button--primary" value="Button" />
`;
