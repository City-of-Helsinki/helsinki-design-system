import { useEffect } from "@storybook/client-api";
import './checkbox.scss';
import '../selection-group/selection-group.css';

const errorTextId = 'checkbox-error-text';
const helperTextId = 'checkbox-helper-text';
const getLabel = (id = 'input', label = 'Option') => `<label for="${id}"  class="hds-checkbox__label">${label}</label>`;

export default {
  title: 'Components/Checkbox',
};

export const Default = () => `
    <div class="hds-checkbox">
      <input type="checkbox" id="checkbox1" class="hds-checkbox__input" value="foo" />
      ${getLabel('checkbox1')}
    </div>
`;

export const Selected = () => `
    <div class="hds-checkbox">
      <input type="checkbox" id="checkbox2" class="hds-checkbox__input" value="bar" checked />
      ${getLabel('checkbox2')}
    </div>
`;

export const Indeterminate = () => {
  useEffect(() => {
    const checkbox = document.querySelector('#checkbox3');
    checkbox.indeterminate = true;
  }, []);

  return `
    <div class="hds-checkbox">
      <input type="checkbox" id="checkbox3" class="hds-checkbox__input" value="bar" />
      ${getLabel('checkbox3')}
    </div>
`;
}

export const Disabled = () => `
    <div class="hds-checkbox">
      <input type="checkbox" id="checkbox4" class="hds-checkbox__input" value="baz" disabled />
      ${getLabel('checkbox4')}
    </div>
`;

export const SelectedDisabled = () => `
    <div class="hds-checkbox">
      <input type="checkbox" id="checkbox5" class="hds-checkbox__input" value="bax" checked disabled />
      ${getLabel('checkbox5')}
    </div>
`;
SelectedDisabled.storyName = 'Selected & disabled';

export const Invalid = () => `
    <div class="hds-checkbox" style="width: 300px">
      <input type="checkbox" id="checkbox6" class="hds-checkbox__input" value="baz" aria-describedby="${errorTextId}" />
      ${getLabel('checkbox6')}
     <span id="number-input-error" class="hds-checkbox__error-text">Invalid value</span>
    </div>
`;

export const GroupWithParent = () => {
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
  `
}

GroupWithParent.storyName = 'Group with a parent';

export const WithHelperText = () => `
    <div class="hds-checkbox">
      <input type="checkbox" id="checkbox7" class="hds-checkbox__input" value="foo" aria-describedby="${helperTextId}"/>
      ${getLabel('checkbox7')}
      <span id="${helperTextId}" class="helper-text">Assistive text</span>
    </div>
`;
