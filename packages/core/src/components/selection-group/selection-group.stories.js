import './selection-group.css';
import '../../icons/icon.css';
import '../../icons/ui/icon-share.css';
import '../../icons/ui/icon-angle-right.css';

const getCheckboxLabel = (id = 'input', label = 'Option') =>
  `<label for="${id}"  class="hds-checkbox__label">${label}</label>`;

const getRadioLabel = (id = 'input', label = 'Option') =>
  `<label for="${id}" class="hds-radio-button__label">${label}</label>`;

const getCheckboxes = (key) => `
      <div class="hds-selection-group__item">
        <div class="hds-checkbox">
          <input type="checkbox" id="checkbox${key}1" name="checkbox${key}1" class="hds-checkbox__input" value="foo" />
          ${getCheckboxLabel(`checkbox${key}1`, 'Option 1')}
        </div>
      </div>
      <div class="hds-selection-group__item">
        <div class="hds-checkbox">
          <input type="checkbox" id="checkbox${key}2" name="checkbox${key}2" class="hds-checkbox__input" value="bar" />
          ${getCheckboxLabel(`checkbox${key}2`, 'Option 2')}
        </div>
      </div>
      <div class="hds-selection-group__item">
        <div class="hds-checkbox">
          <input type="checkbox" id="checkbox${key}3" name="checkbox${key}3" class="hds-checkbox__input" value="baz" />
          ${getCheckboxLabel(`checkbox${key}3`, 'Option 3')}
        </div>
      </div>
`;

const getRadios = (key) => `
      <div class="hds-selection-group__item">
        <div class="hds-radio-button">
          <input type="radio" id="radio${key}1" class="hds-radio-button__input" name="radio${key}" value="foo" checked />
          ${getRadioLabel(`radio${key}1`, 'Option 1')}
        </div>
      </div>
      <div class="hds-selection-group__item">
        <div class="hds-radio-button">
          <input type="radio" id="radio${key}2" class="hds-radio-button__input" name="radio${key}" value="bar" />
          ${getRadioLabel(`radio${key}2`, 'Option 2')}
        </div>
      </div>
      <div class="hds-selection-group__item">
        <div class="hds-radio-button">
          <input type="radio" id="radio${key}3" class="hds-radio-button__input" name="radio${key}" value="baz" />
          ${getRadioLabel(`radio${key}3`, 'Option 3')}
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
      ${getCheckboxes('Default')}
    </div>
  </fieldset>
  <br/>
  <br/>
  <fieldset class="hds-selection-group">
    <legend class="hds-selection-group__legend">Label</legend>
    <div class="hds-selection-group__items">
      ${getRadios('Default')}
    </div>
  </fieldset>
`;

export const Horizontal = () => `
  <fieldset class="hds-selection-group">
    <legend class="hds-selection-group__legend">Label</legend>
    <div class="hds-selection-group__items hds-selection-group__items--horizontal">
      ${getCheckboxes('Horizontal')}
    </div>
  </fieldset>
  <br/>
  <br/>
  <fieldset class="hds-selection-group">
    <legend class="hds-selection-group__legend">Label</legend>
    <div class="hds-selection-group__items hds-selection-group__items--horizontal">
      ${getRadios('Horizontal')}
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
      ${getCheckboxes('Required')}
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
      ${getRadios('Required')}
    </div>
  </fieldset>
`;
