import './selection-group.css';
import '../../icons/icon.css';
import '../../icons/share.css';
import '../../icons/angle-right.css';
import { useEffect } from '@storybook/client-api';

const getHelperText = (text = 'Assistive text') =>
  `<div class="hds-selection-group__helper-text-gap helper-text">${text}</div>`;

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

export const Invalid = () => `
  <fieldset class="hds-selection-group">
    <legend class="hds-selection-group__legend">
      Label
      <span class="hds-selection-group__required">*</span>
    </legend>
    <div class="hds-selection-group__items">
      ${getCheckboxes('Required')}
    </div>
    <div class="hds-selection-group__error-text">Error text</div>
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
    <div class="hds-selection-group__error-text">Error text</div>
  </fieldset>
`;

export const WithParent = () => {
  useEffect(() => {
    const checkbox = document.querySelector('#checkboxparent');
    checkbox.indeterminate = true;
  }, []);

  return `
    <script>
      function preventDefault(event) {
        event.preventDefault();
      }
    </script>
    <fieldset class="hds-fieldset">
      <legend style="margin-bottom: var(--spacing-xs);" class="hds-fieldset-legend">Group label *</legend>
      <div class="hds-checkbox" onclick="preventDefault(event)">
        <input
          aria-controls="checkboxchild1 checkboxchild2 checkboxchild3 checkboxchild4 checkboxchild5"
          type="checkbox"
          id="checkboxparent"
          name="checkboxparent"
          class="hds-checkbox__input"
        />
        <label for="checkboxparent"  class="hds-checkbox__label">Label</label>
      </div>
      <ul style="margin-left: var(--spacing-s); padding-inline-start: 0;" onclick="preventDefault(event)">
        <li style="margin-top: var(--spacing-s); list-style: none;">
          <div class="hds-checkbox">
            <input type="checkbox" id="checkboxchild1" name="checkboxchild1" class="hds-checkbox__input" />
            <label for="checkboxchild1"  class="hds-checkbox__label">Label</label>
          </div>
        </li>
        <li style="margin-top: var(--spacing-s); list-style: none;">
          <div class="hds-checkbox">
            <input type="checkbox" id="checkboxchild2" name="checkboxchild2" class="hds-checkbox__input" checked />
            <label for="checkboxchild2"  class="hds-checkbox__label">Label</label>
          </div>
        </li>
        <li style="margin-top: var(--spacing-s); list-style: none;">
          <div class="hds-checkbox">
            <input type="checkbox" id="checkboxchild3" name="checkboxchild3" class="hds-checkbox__input" checked />
            <label for="checkboxchild3"  class="hds-checkbox__label">Label</label>
          </div>
        </li>
        <li style="margin-top: var(--spacing-s); list-style: none;">
          <div class="hds-checkbox">
            <input type="checkbox" id="checkboxchild4" name="checkboxchild4" class="hds-checkbox__input" checked />
            <label for="checkboxchild4"  class="hds-checkbox__label">Label</label>
          </div>
        </li>
        <li style="margin-top: var(--spacing-s); list-style: none;">
          <div class="hds-checkbox">
            <input type="checkbox" id="checkboxchild5" name="checkboxchild5" class="hds-checkbox__input" />
            <label for="checkboxchild5"  class="hds-checkbox__label">Label</label>
          </div>
        </li>
      </ul>
    </fieldset>
  `;
};

WithParent.storyName = 'With a parent';

export const WithHelperText = () => `
  <fieldset class="hds-selection-group">
    <legend class="hds-selection-group__legend">Label</legend>
    <div class="hds-selection-group__items">
      ${getCheckboxes('Default')}
    </div>
    ${getHelperText()}
  </fieldset>
  <br/>
  <br/>
  <fieldset class="hds-selection-group">
    <legend class="hds-selection-group__legend">Label</legend>
    <div class="hds-selection-group__items">
      ${getRadios('Default')}
    </div>
    ${getHelperText()}
  </fieldset>
`;
