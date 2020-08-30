import './checkbox.css';

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

export const Disabled = () => `
    <div class="hds-checkbox">
      <input type="checkbox" id="checkbox3" class="hds-checkbox__input" value="baz" disabled />
      ${getLabel('checkbox3')}
    </div>
`;

export const SelectedDisabled = () => `
    <div class="hds-checkbox">
      <input type="checkbox" id="checkbox4" class="hds-checkbox__input" value="bax" checked disabled />
      ${getLabel('checkbox4')}
    </div>
`;
SelectedDisabled.storyName = 'Selected & disabled';
