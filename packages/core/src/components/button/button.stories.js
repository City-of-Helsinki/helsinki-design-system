import './button.css';
import '../../icons/icon.css';
import '../../icons/ui/icon-share.css';
import '../../icons/ui/icon-angle-right.css';
import '../../icons/ui/icon-trash.css';

const getLabel = (label = 'Button') => `<span class="hds-button__label">${label}</span>`;

export default {
  title: 'Components/Button',
  decorators: [(storyFn) => `<style>.hds-button {margin-right: 1rem;}</style>${storyFn()}`],
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
  
  <br>
  <br>
  
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
