import '../text-input/text-input.css';
import '../../icons/icon.css';

const getLabel = (id = 'input', required = false, label = 'Label text') =>
  `<label for="${id}" class="hds-text-input__label">${label}${
    required ? '<span class="hds-text-input__required">*</span>' : ''
  }</label>`;

export default {
  title: 'Components/Phone input',
  decorators: [(storyFn) => `<div style="max-width: 400px">${storyFn()}</div>`],
};

export const Default = () => `
   <div class="hds-text-input">
     ${getLabel('input1')}
     <div class="hds-text-input__input-wrapper">
       <input
         id="input1"
         class="hds-text-input__input"
         type="tel"
         autocomplete="tel"
       />
     </div>
     <span class="hds-text-input__helper-text">Assistive text</span>
   </div>
`;

export const Invalid = () => `
   <div class="hds-text-input">
     ${getLabel('input1')}
     <div class="hds-text-input__input-wrapper">
       <input
         id="input1"
         class="hds-text-input__input"
         type="tel"
         autocomplete="tel"
       />
     </div>
     <span class="hds-text-input__error-text">Invalid phone number</span>
     <span class="hds-text-input__helper-text">Assistive text</span>
   </div>
`;

export const Success = () => `
   <div class="hds-text-input">
     ${getLabel('input1')}
     <div class="hds-text-input__input-wrapper">
       <input
         id="input1"
         class="hds-text-input__input"
         type="tel"
         autocomplete="tel"
       />
     </div>
     <span class="hds-text-input__success-text">Valid phone number</span>
   </div>
`;