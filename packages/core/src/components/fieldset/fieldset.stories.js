import './fieldset.css';

export default {
  title: 'Components/Fieldset',
  decorators: [(storyFn) => `<div style="max-width: 600px">${storyFn()}</div>`],
};

const firstNameInput = `<div class='hds-text-input'>
      First name *
      <div class='hds-text-input__input-wrapper'>
        <input
          id='first-name'
          name='first-name'
          class='hds-text-input__input'
          type='text'
          aria-labelledby=''
        />
      </div>
    </div>`;

const lastNameInput = `<div class='hds-text-input'>
      Last name *
      <div class='hds-text-input__input-wrapper'>
        <input
          id='last-name'
          name='last-name'
          class='hds-text-input__input'
          type='text'
        />
      </div>
    </div>`;

const socialSecurityNumberInput = `<div class='hds-text-input'>
      Social Security number *
      <div class='hds-text-input__input-wrapper'>
        <input
          id='social-security-number'
          name='social-security-number'
          class='hds-text-input__input'
          type='text'
          placeholder='Eg. 111299-1234'
        />
      </div>
    </div>`;

export const Default = () => `
    <fieldset class='hds-fieldset'>
      <legend class='hds-fieldset-legend'>Applicant information</legend>
      <div style='display: grid; grid-gap: 12px 16px; grid-template-columns: repeat(auto-fill, minmax(245px, 1fr));'>
       ${firstNameInput}
       ${lastNameInput}
       </div>
      <div style='margin-top: 12px'>
       ${socialSecurityNumberInput}
      </div>
    </fieldset>
`;

export const WithBorders = () => `
    <fieldset class='hds-fieldset hds-fieldset--border'>
      <legend class='hds-fieldset-legend'>Applicant information</legend>
      <div style='display: grid; grid-gap: 12px 16px; grid-template-columns: repeat(auto-fill, minmax(245px, 1fr));'>
       ${firstNameInput}
       ${lastNameInput}
       </div>
      <div style='margin-top: 12px'>
       ${socialSecurityNumberInput}
      </div>
    </fieldset>
`;
