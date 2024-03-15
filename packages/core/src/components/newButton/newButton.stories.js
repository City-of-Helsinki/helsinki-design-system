import './newButton.css';
import '../../icons/icon.css';
import '../../icons/share.css';
import '../../icons/angle-right.css';
import '../../icons/trash.css';

const getLabel = (label = 'New button') => label; /*`<span class="new-hds-button__label">${label}</span>`;*/

export default {
  title: 'Components/NewButton',
  decorators: [(storyFn) => `<style>.new-hds-button {margin-right: 1rem;}</style>${storyFn()}`],
};

export const Primary = () => `
  <button type="button" class="new-hds-button new-hds-button--primary">
    ${getLabel()}
  </button>
`;

export const Secondary = () => `
  <button type="button" class="new-hds-button new-hds-button--secondary">
    ${getLabel()}
  </button>
`;

export const Supplementary = () => `
  <button type="button" class="new-hds-button new-hds-button--supplementary">
    <span aria-hidden="true" class="hds-icon hds-icon--trash"></span>
    ${getLabel()}
  </button>
`;

export const Success = () => `
  <button type="button" class="new-hds-button new-hds-button--success">
    ${getLabel()}
  </button>
`;

export const Danger = () => `
  <button type="button" class="new-hds-button new-hds-button--danger">
    ${getLabel()}
  </button>
`;

export const FullWidth = () => `
  <button type="button" class="new-hds-button new-hds-button--primary new-hds-button--fullwidth">
    ${getLabel()}
  </button>
`;
FullWidth.storyName = 'Full width';

export const Small = () => `
  <button type="button" class="new-hds-button new-hds-button--primary new-hds-button--small">
    ${getLabel()}
  </button>
`;

export const Disabled = () => `
  <button type="button" disabled class="new-hds-button new-hds-button--primary">
    ${getLabel()}
  </button>
`;

export const Icons = () => `
  <button type="button" class="new-hds-button new-hds-button--primary">
    <span aria-hidden="true" class="hds-icon hds-icon--share"></span>
    ${getLabel()}
  </button>

  <button type="button" class="new-hds-button new-hds-button--primary">
    ${getLabel()}
    <span aria-hidden="true" class="hds-icon hds-icon--angle-right"></span>
  </button>

  <button type="button" class="new-hds-button new-hds-button--primary">
    <span aria-hidden="true" class="hds-icon hds-icon--share"></span>
    ${getLabel()}
    <span aria-hidden="true" class="hds-icon hds-icon--angle-right"></span>
  </button>

  <br>
  <br>

  <button type="button" class="new-hds-button new-hds-button--small new-hds-button--primary">
    <span aria-hidden="true" class="hds-icon hds-icon--share"></span>
    ${getLabel()}
  </button>

  <button type="button" class="new-hds-button new-hds-button--small new-hds-button--primary">
    ${getLabel()}
    <span aria-hidden="true" class="hds-icon hds-icon--angle-right"></span>
  </button>
  
  <button type="button" class="new-hds-button new-hds-button--small new-hds-button--primary">
    <span aria-hidden="true" class="hds-icon hds-icon--share"></span>
    ${getLabel()}
    <span aria-hidden="true" class="hds-icon hds-icon--angle-right"></span>
  </button>
`;

export const Loading = () => `
  <button type="button" class="new-hds-button new-hds-button--loading">
    <div class="hds-loading-spinner hds-loading-spinner--small">
      <div></div>
      <div></div>
      <div></div>
    </div>
    ${getLabel()}
  </button>
`;

export const Themes = () => `
  <button type="button" class="new-hds-button new-hds-button--primary new-hds-button--theme-coat">
    ${getLabel('coat')}
  </button>

  <button type="button" class="new-hds-button new-hds-button--secondary new-hds-button--theme-coat">
    ${getLabel('coat')}
  </button>

  <button type="button" class="new-hds-button new-hds-button--supplementary new-hds-button--theme-coat">
    ${getLabel('coat')}
  </button>

  <br>
  <br>

    <button type="button" class="new-hds-button new-hds-button--primary new-hds-button--theme-black">
    ${getLabel('Black')}
  </button>

  <button type="button" class="new-hds-button new-hds-button--secondary new-hds-button--theme-black">
    ${getLabel('Black')}
  </button>

  <button type="button" class="new-hds-button new-hds-button--supplementary new-hds-button--theme-black">
    ${getLabel('Black')}
  </button>
`;

export const LinkButton = () => `
  <button role="link" type="button" class="new-hds-button new-hds-button--primary" onclick="window.open('/')">
    ${getLabel("Button used as a link")}
  </button>
`;

export const Inputs = () => `
  <input type="submit" class="new-hds-button new-hds-button--primary" value="Submit"/>
  <input type="reset" class="new-hds-button new-hds-button--primary" value="Reset"/>
  <input type="button" class="new-hds-button new-hds-button--primary" value="Button" />
`;

