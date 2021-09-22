import './table.css';
import '../checkbox/checkbox.css';

export default {
  title: 'Components/Table',
  decorators: [(storyFn) => `<div style="max-width: 785px">${storyFn()}</div>`],
};

const tableRow = (firstName, surname, age, profession) =>
  `<tr>
    <td>${firstName}</td>
    <td>${surname}</td>
    <td>${age}</td>
    <td>${profession}</td>
  </tr>`

export const Default = () => `
  <table class="hds-table">
    <tr class="hds-table__header-row hds-table__header-row--dark">
      <th scope="col">First name</th>
      <th scope="col">Surname</th>
      <th scope="col">Age</th>
      <th scope="col">Profession</th>
    </tr>
    <tbody class="hds-table__content">
      ${tableRow('Lauri', 'Kekkonen', '39', 'Engineer')}
      ${tableRow('Maria', 'Sarasoja', '62', 'Designer')}
      ${tableRow('Anneli', 'Routa', '50', 'Meteorologist')}
      ${tableRow('Osku', 'Rausku', '18', 'Mail carrier')}
    </tbody>
  </table>
`;

export const Dark = () => `
  <table class="hds-table">
    <tr class="hds-table__header-row hds-table__header-row--dark">
      <th scope="col">First name</th>
      <th scope="col">Surname</th>
      <th scope="col">Age</th>
      <th scope="col">Profession</th>
    </tr>
    <tbody class="hds-table__content">
      ${tableRow('Lauri', 'Kekkonen', '39', 'Engineer')}
      ${tableRow('Maria', 'Sarasoja', '62', 'Designer')}
      ${tableRow('Anneli', 'Routa', '50', 'Meteorologist')}
      ${tableRow('Osku', 'Rausku', '18', 'Mail carrier')}
    </tbody>
  </table>
`;

export const Light = () => `
  <table class="hds-table">
    <tr class="hds-table__header-row hds-table__header-row--light">
      <th scope="col">First name</th>
      <th scope="col">Surname</th>
      <th scope="col">Age</th>
      <th scope="col">Profession</th>
    </tr>
    <tbody class="hds-table__content">
      ${tableRow('Lauri', 'Kekkonen', '39', 'Engineer')}
      ${tableRow('Maria', 'Sarasoja', '62', 'Designer')}
      ${tableRow('Anneli', 'Routa', '50', 'Meteorologist')}
      ${tableRow('Osku', 'Rausku', '18', 'Mail carrier')}
    </tbody>
  </table>
`;

export const Zebra = () => `
  <table class="hds-table hds-table--zebra">
    <tr class="hds-table__header-row hds-table__header-row--dark">
      <th scope="col">First name</th>
      <th scope="col">Surname</th>
      <th scope="col">Age</th>
      <th scope="col">Profession</th>
    </tr>
    <tbody class="hds-table__content">
      ${tableRow('Lauri', 'Kekkonen', '39', 'Engineer')}
      ${tableRow('Maria', 'Sarasoja', '62', 'Designer')}
      ${tableRow('Anneli', 'Routa', '50', 'Meteorologist')}
      ${tableRow('Osku', 'Rausku', '18', 'Mail carrier')}
    </tbody>
  </table>
`;

export const WithVerticalLines = () => `
  <table class="hds-table hds-table--with-vertical-lines">
    <tr class="hds-table__header-row hds-table__header-row--dark">
      <th scope="col">First name</th>
      <th scope="col">Surname</th>
      <th scope="col">Age</th>
      <th scope="col">Profession</th>
    </tr>
    <tbody class="hds-table__content">
      ${tableRow('Lauri', 'Kekkonen', '39', 'Engineer')}
      ${tableRow('Maria', 'Sarasoja', '62', 'Designer')}
      ${tableRow('Anneli', 'Routa', '50', 'Meteorologist')}
      ${tableRow('Osku', 'Rausku', '18', 'Mail carrier')}
    </tbody>
  </table>
`;

