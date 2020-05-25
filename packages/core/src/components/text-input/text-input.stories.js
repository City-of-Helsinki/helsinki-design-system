import './text-input.css';
import '../../icons/icon.css';

const getLabel = (id = 'input', label = 'Label text') =>
  `<label for="${id}" class="hds-text-input__label">${label}</label>`;
const getHelperText = (text = 'Assistive text') => `<span class="hds-text-input__helper-text">${text}</span>`;

export default {
  title: 'Text input',
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
        />
      </div>
      ${getHelperText()}
    </div>
`;

ReadOnly.story = {
  name: 'Read-only',
};

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
     ${getHelperText('Error text')}
    </div>
`;
