import './radio-button.css';

const helperTextId = 'radiobutton-helper-text';
const getLabel = (id = 'input', label = 'Option') =>
  `<label for="${id}" class="hds-radio-button__label">${label}</label>`;
const getHelperText = (text = 'Assistive text') => `<span id="${helperTextId}" class="helper-text">${text}</span>`;

export default {
  title: 'Components/Radio button',
};

export const Default = () => `
    <div class="hds-radio-button">
      <input type="radio" id="radio1" class="hds-radio-button__input" name="example" value="foo" />
      ${getLabel('radio1')}
    </div>
`;

export const Selected = () => `
    <div class="hds-radio-button">
      <input type="radio" id="radio2" class="hds-radio-button__input" name="example" value="bar" checked />
      ${getLabel('radio2')}
    </div>
`;

export const Disabled = () => `
    <div class="hds-radio-button">
      <input type="radio" id="radio3" class="hds-radio-button__input" name="example" value="baz" disabled />
      ${getLabel('radio3')}
    </div>
`;

export const SelectedDisabled = () => `
    <div class="hds-radio-button">
      <input type="radio" id="radio4" class="hds-radio-button__input" checked disabled />
      ${getLabel('radio4')}
    </div>
`;
SelectedDisabled.storyName = 'Selected & disabled';

export const WithHelperText = () => `
    <div class="hds-radio-button">
      <input type="radio" id="radio3" class="hds-radio-button__input" name="example" value="baz" aria-describedby="${helperTextId}"/>
      ${getLabel('radio3')}
      ${getHelperText()}
    </div>
`;
