import './text-input.css';
import '../../icons/icon.css';

const getLabel = (id = 'input', required = false, label = 'Label text') =>
  `<label for="${id}" class="hds-text-input__label">${label}${
    required ? '<span class="hds-text-input__required">*</span>' : ''
  }</label>`;
const getHelperText = (text = 'Assistive text') => `<span class="hds-text-input__helper-text">${text}</span>`;
const getErrorText = (text = 'Error text') => `<span class="hds-text-input__error-text">${text}</span>`;
const getSuccessText = (text = 'Success text') => `<span class="hds-text-input__success-text">${text}</span>`;
const getInfoText = (text = 'Info text') => `<span class="hds-text-input__info-text">${text}</span>`;

export default {
  title: 'Components/Text input',
  decorators: [(storyFn) => `<div style="max-width: 400px">${storyFn()}</div>`],
};

export const Default = () => `
    <div class="hds-text-input">
      ${getLabel()}
      <div class="hds-text-input__input-wrapper">
        <input
          id="input"
          class="hds-text-input__input"
          type="text"
          placeholder="Placeholder"
          data-playwright="true"
        />
      </div>
      ${getHelperText()}
    </div>
`;

export const ReadOnly = () => `
    <div class="hds-text-input">
      ${getLabel('input2')}
      <div class="hds-text-input__input-wrapper">
        <input
          id="input2"
          class="hds-text-input__input"
          type="text"
          value="Text input value"
          readonly
          data-playwright="true"
        />
      </div>
      ${getHelperText()}
    </div>
`;
ReadOnly.storyName = 'Read-only';

export const Disabled = () => `
    <div class="hds-text-input">
      ${getLabel('input3')}
      <div class="hds-text-input__input-wrapper">
        <input
          id="input3"
          class="hds-text-input__input"
          type="text"
          value="Text input value"
          disabled
          data-playwright="true"
        />
      </div>
      ${getHelperText()}
    </div>
`;

export const Invalid = () => `
   <div class="hds-text-input hds-text-input--invalid">
     ${getLabel('input4')}
     <div class="hds-text-input__input-wrapper">
       <input
         id="input4"
         class="hds-text-input__input"
         type="text"
         placeholder="Placeholder"
       />
     </div>
     ${getErrorText()}
     ${getHelperText()}
    </div>
`;

export const Success = () => `
   <div class="hds-text-input hds-text-input--success">
     ${getLabel('input4')}
     <div class="hds-text-input__input-wrapper">
       <input
         id="input4"
         class="hds-text-input__input"
         type="text"
         placeholder="Placeholder"
       />
     </div>
     ${getSuccessText()}
     ${getHelperText()}
    </div>
`;

export const Info = () => `
   <div class="hds-text-input hds-text-input--info">
     ${getLabel('input4')}
     <div class="hds-text-input__input-wrapper">
       <input
         id="input4"
         class="hds-text-input__input"
         type="text"
         placeholder="Placeholder"
       />
     </div>
     ${getInfoText()}
     ${getHelperText()}
    </div>
`;

export const Required = () => `
   <div class="hds-text-input">
     ${getLabel('input5', true)}
     <div class="hds-text-input__input-wrapper">
       <input
         id="input5"
         class="hds-text-input__input"
         type="text"
         placeholder="Placeholder"
         required
       />
     </div>
     ${getHelperText()}
    </div>
`;
