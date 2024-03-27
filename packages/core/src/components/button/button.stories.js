import './button.css';
import '../../icons/icon.css';
import '../../icons/share.css';
import '../../icons/angle-right.css';
import '../../icons/trash.css';

const getLabel = (label = 'Button') => `<span>${label}</span>`;

export default {
  title: 'Components/Button',
  decorators: [(storyFn) => `<div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-start;">${storyFn()}</div>`],
};

export const Primary = () => `
  <button type="button" class="hds-button hds-button--primary">
    ${getLabel()}
  </button>
`;

export const Secondary = () => `
  <button type="button" class="hds-button hds-button--secondary">
    ${getLabel()}
  </button>
`;

export const Supplementary = () => `
  <button type="button" class="hds-button hds-button--supplementary">
    <span aria-hidden="true" class="hds-icon hds-icon--trash"></span>
    ${getLabel()}
  </button>
`;

export const Success = () => `
  <button type="button" class="hds-button hds-button--success">
    ${getLabel()}
  </button>
`;

export const Danger = () => `
  <button type="button" class="hds-button hds-button--danger">
    ${getLabel()}
  </button>
`;

export const FullWidth = () => `
  <button type="button" class="hds-button hds-button--primary hds-button--fullwidth">
    ${getLabel()}
  </button>
`;
FullWidth.storyName = 'Full width';

export const Small = () => `
  <button type="button" class="hds-button hds-button--primary hds-button--small">
    ${getLabel()}
  </button>
`;

export const Disabled = () => `
  <button type="button" disabled class="hds-button hds-button--primary">
    ${getLabel()}
  </button>
`;

export const Icons = () => `
  <button type="button" class="hds-button hds-button--primary">
    <span aria-hidden="true" class="hds-icon hds-icon--share"></span>
    ${getLabel()}
  </button>

  <button type="button" class="hds-button hds-button--primary">
    ${getLabel()}
    <span aria-hidden="true" class="hds-icon hds-icon--angle-right"></span>
  </button>

  <button type="button" class="hds-button hds-button--primary">
    <span aria-hidden="true" class="hds-icon hds-icon--share"></span>
    ${getLabel()}
    <span aria-hidden="true" class="hds-icon hds-icon--angle-right"></span>
  </button>

  <button type="button" class="hds-button hds-button--small hds-button--primary">
    <span aria-hidden="true" class="hds-icon hds-icon--share"></span>
    ${getLabel()}
  </button>

  <button type="button" class="hds-button hds-button--small hds-button--primary">
    ${getLabel()}
    <span aria-hidden="true" class="hds-icon hds-icon--angle-right"></span>
  </button>

  <button type="button" class="hds-button hds-button--small hds-button--primary">
    <span aria-hidden="true" class="hds-icon hds-icon--share"></span>
    ${getLabel()}
    <span aria-hidden="true" class="hds-icon hds-icon--angle-right"></span>
  </button>
`;

export const IconsWithClasses = () => `
  <button type="button" class="hds-button hds-button--primary hds-icon--share hds-icon-start--share">
    Buttoni
  </button>

  <button type="button" class="hds-button hds-button--primary hds-icon--angle-right hds-icon-end--angle-right">
    Button
  </button>

  <button type="button" class="hds-button hds-button--primary hds-icon--share hds-icon--angle-right hds-icon-start--share hds-icon-end--angle-right">
    Button
  </button>

  <button type="button" class="hds-button hds-button--small hds-button--primary">
    <span aria-hidden="true" class="hds-icon hds-icon--share"></span>
    ${getLabel()}
  </button>

  <button type="button" class="hds-button hds-button--small hds-button--primary">
    ${getLabel()}
    <span aria-hidden="true" class="hds-icon hds-icon--angle-right"></span>
  </button>

  <button type="button" class="hds-button hds-button--small hds-button--primary">
    <span aria-hidden="true" class="hds-icon hds-icon--share"></span>
    ${getLabel()}
    <span aria-hidden="true" class="hds-icon hds-icon--angle-right"></span>
  </button>
`;

export const Loading = () => `
  <button type="button" class="hds-button hds-button--loading">
    <div class="hds-loading-spinner hds-loading-spinner--small">
      <div></div>
      <div></div>
      <div></div>
    </div>
    Saving your changes
  </button>
`;

export const Themes = () => `
  <button type="button" class="hds-button hds-button--primary hds-button--theme-coat">
    ${getLabel('coat')}
  </button>

  <button type="button" class="hds-button hds-button--secondary hds-button--theme-coat">
    ${getLabel('coat')}
  </button>

  <button type="button" class="hds-button hds-button--supplementary hds-button--theme-coat">
    ${getLabel('coat')}
  </button>

  <br>
  <br>

    <button type="button" class="hds-button hds-button--primary hds-button--theme-black">
    ${getLabel('Black')}
  </button>

  <button type="button" class="hds-button hds-button--secondary hds-button--theme-black">
    ${getLabel('Black')}
  </button>

  <button type="button" class="hds-button hds-button--supplementary hds-button--theme-black">
    ${getLabel('Black')}
  </button>
`;

export const LinkButton = () => `
  <button role="link" type="button" class="hds-button hds-button--primary" onclick="window.open('/')">
    ${getLabel("Button used as a link")}
  </button>
`;

export const Inputs = () => `
  <input type="submit" class="hds-button hds-button--primary" value="Submit"/>
  <input type="reset" class="hds-button hds-button--primary" value="Reset"/>
  <input type="button" class="hds-button hds-button--primary" value="Button" />
`;

