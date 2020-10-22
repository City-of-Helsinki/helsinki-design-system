import './selection-group.css';
import '../../icons/icon.css';
import '../../icons/ui/icon-share.css';
import '../../icons/ui/icon-angle-right.css';

const getCheckboxLabel = (id = 'input', label = 'Option') =>
  `<label for="${id}"  class="hds-checkbox__label">${label}</label>`;

const getRadioLabel = (id = 'input', label = 'Option') =>
  `<label for="${id}" class="hds-radio-button__label">${label}</label>`;

const getCheckboxes = () => `
      <div class="hds-selection-group__item">
        <div class="hds-checkbox">
          <input type="checkbox" id="checkbox1" class="hds-checkbox__input" value="foo" />
          ${getCheckboxLabel('checkbox1', 'Option 1')}
        </div>
      </div>
      <div class="hds-selection-group__item">
        <div class="hds-checkbox">
          <input type="checkbox" id="checkbox2" class="hds-checkbox__input" value="bar" />
          ${getCheckboxLabel('checkbox2', 'Option 2')}
        </div>
      </div>
      <div class="hds-selection-group__item">
        <div class="hds-checkbox">
          <input type="checkbox" id="checkbox3" class="hds-checkbox__input" value="baz" />
          ${getCheckboxLabel('checkbox3', 'Option 3')}
        </div>
      </div>
`;

const getRadios = () => `
      <div class="hds-selection-group__item">
        <div class="hds-radio-button">
          <input type="radio" id="radio1" class="hds-radio-button__input" name="example" value="foo" />
          ${getRadioLabel('radio1', 'Option 1')}
        </div>
      </div>
      <div class="hds-selection-group__item">
        <div class="hds-radio-button">
          <input type="radio" id="radio2" class="hds-radio-button__input" name="example" value="bar" />
          ${getRadioLabel('radio2', 'Option 2')}
        </div>
      </div>
      <div class="hds-selection-group__item">
        <div class="hds-radio-button">
          <input type="radio" id="radio3" class="hds-radio-button__input" name="example" value="baz" />
          ${getRadioLabel('radio3', 'Option 3')}
        </div>
      </div>
`;

export default {
  title: 'Components/Selection group',
  decorators: [(storyFn) => `<div style="max-width: 400px;">${storyFn()}</div>`],
};

export const Default = () => `
  <fieldset class="hds-selection-group">
    <legend class="hds-selection-group__legend">Label</legend>
    <div class="hds-selection-group__items">
      ${getCheckboxes()}
    </div>
  </fieldset>
  <br/>
  <br/>
  <fieldset class="hds-selection-group">
    <legend class="hds-selection-group__legend">Label</legend>
    <div class="hds-selection-group__items">
      ${getRadios()}
    </div>
  </fieldset>
`;

export const Horizontal = () => `
  <fieldset class="hds-selection-group">
    <legend class="hds-selection-group__legend">Label</legend>
    <div class="hds-selection-group__items hds-selection-group__items--horizontal">
      ${getCheckboxes()}
    </div>
  </fieldset>
  <br/>
  <br/>
  <fieldset class="hds-selection-group">
    <legend class="hds-selection-group__legend">Label</legend>
    <div class="hds-selection-group__items hds-selection-group__items--horizontal">
      ${getRadios()}
    </div>
  </fieldset>
`;

export const Required = () => `
  <fieldset class="hds-selection-group">
    <legend class="hds-selection-group__legend">
      Label
      <span class="hds-selection-group__required">*</span>
    </legend>
    <div class="hds-selection-group__items">
      ${getCheckboxes()}
    </div>
  </fieldset>
  <br/>
  <br/>
  <fieldset class="hds-selection-group">
    <legend class="hds-selection-group__legend">
      Label
      <span class="hds-selection-group__required">*</span>
    </legend>
    <div class="hds-selection-group__items">
      ${getRadios()}
    </div>
  </fieldset>
`;
