import './button.css';
import '../../icons/icon.css';
import '../../icons/icon-share.css';
import '../../icons/icon-angle-right.css';

const label = '<span class="hds-button__label text-medium">Button</span>';

export default {
  title: 'Button',
};

/**
 * Primary
 */
export const Primary = () => `
  <button type="button" class="hds-button hds-button--primary">
    ${label}
  </button>
`;

/**
 * Secondary
 */
export const Secondary = () => `
  <button type="button" class="hds-button hds-button--secondary">
    ${label}
  </button>
`;

/**
 * Supplementary
 */
export const Supplementary = () => `
  <button type="button" class="hds-button hds-button--supplementary">
    ${label}
  </button>
`;

/**
 * Full width
 */
export const FullWidth = () => `
  <button type="button" class="hds-button hds-button--primary hds-button--fullwidth">
    ${label}
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
    ${label}
  </button>
`;

/**
 * Disabled
 */
export const Disabled = () => `
  <button type="button" disabled class="hds-button hds-button--primary">
    ${label}
  </button>
`;

/**
 * Icons
 */
export const Icons = () => `
  <button type="button" class="hds-button hds-button--primary">
    <span aria-hidden="true" class="hds-icon hds-icon--share"></span>
    ${label}
  </button>
  
  <button type="button" class="hds-button hds-button--primary">
    ${label}
    <span aria-hidden="true" class="hds-icon hds-icon--angle-right"></span>
  </button>
  
  <button type="button" class="hds-button hds-button--primary">
    <span aria-hidden="true" class="hds-icon hds-icon--share"></span>
    ${label}
    <span aria-hidden="true" class="hds-icon hds-icon--angle-right"></span>
  </button>
`;
