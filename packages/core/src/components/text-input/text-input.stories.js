import './text-input.css';
import '../../icons/icon.css';
import '../../icons/icon-lock.css';

const getLabel = (id = 'input', label = 'Label text') =>
  `<label for="${id}" class="hds-text-input__label text-sm text-bold">${label}</label>`;
const getHelperText = (text = 'input', invalid = false) =>
  `<span class="hds-text-input__${invalid ? 'invalid' : 'helper'}-text text-sm">${text}</span>`;

export default {
  title: 'Text input',
};

/**
 * Default
 */
export const Default = () => `
    <div class="hds-text-input">
      ${getLabel()}
      <div class="hds-text-input__input-wrapper">
        <input
          id="input"
          class="text-md"
          type="text"
          placeholder="default value"
        />
      </div>
      ${getHelperText('This describes the purpose of this field.')}
    </div>
`;

/**
 * Read-only
 */
export const ReadOnly = () => `
    <div class="hds-text-input hds-text-input--read-only">
      ${getLabel('input2')}
      <div class="hds-text-input__input-wrapper">
        <input
          id="input2"
          class="text-md"
          type="text"
          placeholder="default value"
          value="text input value"
          disabled
        />
        <div class="hds-text-input__input-icon">
          <span class="hds-icon hds-icon--lock" aria-hidden="true"></span>
        </div>
      </div>
    </div>
`;

ReadOnly.story = {
  name: 'Read-only',
};

/**
 * Invalid
 */
export const Invalid = () => `
   <div class="hds-text-input hds-text-input--invalid">
     ${getLabel('input3')}
     <div class="hds-text-input__input-wrapper">
       <input
         id="input3"
         class="text-md"
         type="text"
         placeholder="default value"
       />
     </div>
     ${getHelperText('This field is invalid!', true)}
    </div>
`;
