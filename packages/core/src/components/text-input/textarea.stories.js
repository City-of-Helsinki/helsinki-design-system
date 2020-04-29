import './text-input.css';
import '../../icons/icon.css';

const getLabel = (id = 'input', label = 'Label text') =>
  `<label for="${id}" class="hds-text-input__label">${label}</label>`;
const getHelperText = (text = 'Assistive text') => `<span class="hds-text-input__helper-text">${text}</span>`;

export default {
  title: 'Textarea',
  decorators: [(storyFn) => `<div style="max-width: 400px">${storyFn()}</div>`],
};

/**
 * Default
 */
export const Default = () => `
    <div class="hds-text-input">
      ${getLabel()}
      <div class="hds-text-input__input-wrapper">
        <textarea
          id="input"
          class="hds-text-input__input"
          placeholder="Placeholder"
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</textarea>
      </div>
      ${getHelperText()}
    </div>
`;

/**
 * Disabled
 */
export const Disabled = () => `
    <div class="hds-text-input">
      ${getLabel('input3')}
      <div class="hds-text-input__input-wrapper">
        <textarea
          id="input3"
          class="hds-text-input__input"
          placeholder="Placeholder"
          disabled
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</textarea>
      </div>
      ${getHelperText()}
    </div>
`;

/**
 * Invalid
 */
export const Invalid = () => `
   <div class="hds-text-input hds-text-input--invalid">
     ${getLabel('input4')}
     <div class="hds-text-input__input-wrapper">
       <textarea
         id="input4"
         class="hds-text-input__input"
         placeholder="Placeholder"
       >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</textarea>
     </div>
     ${getHelperText('Error text')}
    </div>
`;
