import './text-input.css';
import '../../icons/icon.css';

const getLabel = (id = 'input', required = false, label = 'Label text') =>
  `<label for="${id}" class="hds-text-input__label">${label}${
    required ? '<span class="hds-text-input__required">*</span>' : ''
  }</label>`;
const getHelperText = (text = 'Assistive text') => `<span class="hds-text-input__helper-text">${text}</span>`;

export default {
  title: 'Components/Textarea',
  decorators: [(storyFn) => `<div style="max-width: 400px">${storyFn()}</div>`],
};

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

export const Required = () => `
   <div class="hds-text-input">
     ${getLabel('input5', true)}
     <div class="hds-text-input__input-wrapper">
       <textarea
         id="input5"
         class="hds-text-input__input"
         placeholder="Placeholder"
         required
       >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</textarea>
     </div>
     ${getHelperText()}
    </div>
`;
