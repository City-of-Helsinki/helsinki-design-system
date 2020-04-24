import './button.css';
import '../../base.css';
import '../../icons/icon.css';
import '../../icons/icon-share.css';
import '../../icons/icon-angle-right.css';

const getLabel = (label = 'Button') => `<span class="hds-button__label text-medium">${label}</span>`;

export default {
  title: 'Button',
  decorators: [(storyFn) => `<style>.hds-button {margin-right: 1rem;}</style>${storyFn()}`],
};

/**
 * Primary
 */
export const Primary = () => `
  <button type="button" class="hds-button hds-button--primary">
    ${getLabel()}
  </button>
`;

/**
 * Secondary
 */
export const Secondary = () => `
  <button type="button" class="hds-button hds-button--secondary">
    ${getLabel()}
  </button>
`;

/**
 * Supplementary
 */
export const Supplementary = () => `
  <button type="button" class="hds-button hds-button--supplementary">
    ${getLabel()}
  </button>
`;

/**
 * Success
 */
export const Success = () => `
  <button type="button" class="hds-button hds-button--success">
    ${getLabel()}
  </button>
`;

/**
 * Danger
 */
export const Danger = () => `
  <button type="button" class="hds-button hds-button--danger">
    ${getLabel()}
  </button>
`;

/**
 * Full width
 */
export const FullWidth = () => `
  <button type="button" class="hds-button hds-button--primary hds-button--fullwidth">
    ${getLabel()}
  </button>
`;

FullWidth.story = {
  name: 'Full width',
};

/**
 * Small
 */
export const Small = () => `
  <button type="button" class="hds-button hds-button--primary hds-button--small">
    ${getLabel()}
  </button>
`;

/**
 * Disabled
 */
export const Disabled = () => `
  <button type="button" disabled class="hds-button hds-button--primary">
    ${getLabel()}
  </button>
`;

/**
 * Icons
 */
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

/**
 * Themes
 */
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
