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
  return `
    <div class="hds-checkbox">
      <input type="checkbox" id="checkbox3" class="hds-checkbox__input" value="bar" />
      ${getLabel('checkbox3')}
    </div>
    <script>
      (function() {
        function initCheckbox() {
          const checkbox = document.querySelector('#checkbox3');
          if (!checkbox) {
            setTimeout(initCheckbox, 10);
            return;
          }
          checkbox.indeterminate = true;
          let isIndeterminate = true;
          let isChecked = false;

          checkbox.addEventListener('change', function(e) {
            e.preventDefault();
            if (isIndeterminate) {
              isIndeterminate = false;
              isChecked = true;
              checkbox.indeterminate = false;
              checkbox.checked = true;
            } else if (isChecked) {
              isChecked = false;
              checkbox.checked = false;
            } else {
              isIndeterminate = true;
              checkbox.indeterminate = true;
              checkbox.checked = false;
            }
          });
        }
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initCheckbox);
        } else {
          initCheckbox();
        }
      })();
    </script>
`;
};

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
      <span id="${errorTextId}" class="hds-checkbox__error-text">Invalid value</span>
    </div>
`;

export const GroupWithParent = () => {
  return `
    <fieldset class="hds-fieldset">
      <legend style="margin-bottom: var(--spacing-xs);" class="hds-fieldset-legend">Group label *</legend>
      <div class="hds-checkbox">
        <input
          aria-controls="checkboxchild1 checkboxchild2 checkboxchild3 checkboxchild4 checkboxchild5"
          type="checkbox"
          id="checkboxparent"
          name="checkboxparent"
          class="hds-checkbox__input"
        />
        <label for="checkboxparent"  class="hds-checkbox__label">Label</label>
      </div>
      <ul style="margin-left: var(--spacing-s); padding-inline-start: 0;">
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
    <script>
      (function() {
        function initGroupCheckboxes() {
          const parentCheckbox = document.querySelector('#checkboxparent');
          const childCheckboxes = [
            document.querySelector('#checkboxchild1'),
            document.querySelector('#checkboxchild2'),
            document.querySelector('#checkboxchild3'),
            document.querySelector('#checkboxchild4'),
            document.querySelector('#checkboxchild5'),
          ];

          if (!parentCheckbox) {
            setTimeout(initGroupCheckboxes, 10);
            return;
          }

          const updateParentState = function() {
            const checkedCount = childCheckboxes.filter(function(cb) {
              return cb && cb.checked;
            }).length;
            const totalCount = childCheckboxes.length;

            if (checkedCount === 0) {
              parentCheckbox.checked = false;
              parentCheckbox.indeterminate = false;
            } else if (checkedCount === totalCount) {
              parentCheckbox.checked = true;
              parentCheckbox.indeterminate = false;
            } else {
              parentCheckbox.checked = false;
              parentCheckbox.indeterminate = true;
            }
          };

          // Initialize parent state
          updateParentState();

          // Parent checkbox controls all children
          parentCheckbox.addEventListener('change', function() {
            const shouldCheck = this.checked;
            childCheckboxes.forEach(function(child) {
              if (child) {
                child.checked = shouldCheck;
              }
            });
          });

          // Children checkboxes update parent state
          childCheckboxes.forEach(function(child) {
            if (child) {
              child.addEventListener('change', updateParentState);
            }
          });
        }
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initGroupCheckboxes);
        } else {
          initGroupCheckboxes();
        }
      })();
    </script>
  `;
};

GroupWithParent.storyName = 'Group with a parent';

export const WithHelperText = () => `
    <div class="hds-checkbox">
      <input type="checkbox" id="checkbox7" class="hds-checkbox__input" value="foo" aria-describedby="${helperTextId}"/>
      ${getLabel('checkbox7')}
      <span id="${helperTextId}" class="helper-text">Assistive text</span>
    </div>
`;
