import './table.css';

export default {
  title: 'Components/Table',
  decorators: [(storyFn) => `<div style="max-width: 785px">${storyFn()}</div>`],
};

const tableRow = (firstName, surname, age, profession) =>
  `<tr>
    <td>${firstName}</td>
    <td>${surname}</td>
    <td class="hds-table--text-align-right">${age}</td>
    <td>${profession}</td>
  </tr>`

export const Default = () => `
	<div class="hds-table-container">
		<table class="hds-table">
			<tr class="hds-table__header-row">
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
	 </div>
`;

export const Light = () => `
	<div class="hds-table-container">
		<table class="hds-table hds-table--light">
			<tr class="hds-table__header-row">
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
	</div>
`;

export const Zebra = () => `
	<div class="hds-table-container">
		<table class="hds-table hds-table--zebra">
			<tr class="hds-table__header-row">
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
	</div>
`;

export const ZebraLight = () => `
	<div class="hds-table-container">
		<table class="hds-table hds-table--light hds-table--zebra">
			<tr class="hds-table__header-row">
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
	</div>
`;

export const VerticalLines = () => `
	<div class="hds-table-container">
		<table class="hds-table hds-table--with-vertical-lines">
			<tr class="hds-table__header-row">
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
	</div>
`;

export const VerticalLinesLight = () => `
	<div class="hds-table-container">
		<table class="hds-table hds-table--light hds-table--with-vertical-lines">
			<tr class="hds-table__header-row">
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
	</div>
`;

export const VerticalLinesZebra = () => `
	<div class="hds-table-container">
	  <table class="hds-table hds-table--zebra hds-table--with-vertical-lines">
			<tr class="hds-table__header-row">
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
	</div>
`;

export const VerticalLinesZebraLight = () => `
  <div class="hds-table-container">
    <table class="hds-table hds-table--light hds-table--zebra hds-table--with-vertical-lines">
			<tr class="hds-table__header-row">
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
  </div>
`;

export const VerticalHeader = () => `
  <div class="hds-table-container" style="max-width: 486px">
    <table class="hds-table hds-table--with-vertical-header">
			<colgroup>
				<col span="1" class="hds-table__vertical-header-column">
			</colgroup>
    	<tr class="hds-table__header-row">
				<th></th>
				<th scope="col">8-12</th>
				<th scope="col">12-14</th>
				<th scope="col">14-16</th>
				<th scope="col">16-18</th>
    	</tr>
			<tbody class="hds-table__content hds-table__content--text-align-td-right">
    		<tr>
					<th scope="row">Monday</th>
					<td>324</td>
					<td>562</td>
					<td>280</td>
					<td>94</td>
				</tr>
    		<tr>
					<th scope="row">Tuesday</th>
					<td>341</td>
					<td>688</td>
					<td>425</td>
					<td>113</td>
				</tr>
				<tr>
					<th scope="row">Wednesday</th>
					<td>294</td>
					<td>492</td>
					<td>280</td>
					<td>67</td>
				</tr>
				<tr>
					<th scope="row">Thursday</th>
					<td>312</td>
					<td>501</td>
					<td>455</td>
					<td>112</td>
				</tr>
				<tr>
					<th scope="row">Friday</th>
					<td>150</td>
					<td>142</td>
					<td>362</td>
					<td>455</td>
				</tr>
			</tbody>
  	</table>
	</div>
`;

export const VerticalHeaderLight = () => `
  <div class="hds-table-container" style="max-width: 486px">
    <table class="hds-table hds-table--light hds-table--with-vertical-header">
			<colgroup>
				<col span="1" class="hds-table__vertical-header-column">
			</colgroup>
    	<tr class="hds-table__header-row">
				<th></th>
				<th scope="col">8-12</th>
				<th scope="col">12-14</th>
				<th scope="col">14-16</th>
				<th scope="col">16-18</th>
    	</tr>
			<tbody class="hds-table__content hds-table__content--text-align-td-right">
    		<tr>
					<th scope="row">Monday</th>
					<td>324</td>
					<td>562</td>
					<td>280</td>
					<td>94</td>
				</tr>
    		<tr>
					<th scope="row">Tuesday</th>
					<td>341</td>
					<td>688</td>
					<td>425</td>
					<td>113</td>
				</tr>
				<tr>
					<th scope="row">Wednesday</th>
					<td>294</td>
					<td>492</td>
					<td>280</td>
					<td>67</td>
				</tr>
				<tr>
					<th scope="row">Thursday</th>
					<td>312</td>
					<td>501</td>
					<td>455</td>
					<td>112</td>
				</tr>
				<tr>
					<th scope="row">Friday</th>
					<td>150</td>
					<td>142</td>
					<td>362</td>
					<td>455</td>
				</tr>
			</tbody>
  	</table>
	</div>
`;

export const VerticalHeaderZebra = () => `
  <div class="hds-table-container" style="max-width: 486px">
    <table class="hds-table hds-table--zebra hds-table--with-vertical-header">
			<colgroup>
				<col span="1" class="hds-table__vertical-header-column">
			</colgroup>
    	<tr class="hds-table__header-row">
				<th></th>
				<th scope="col">8-12</th>
				<th scope="col">12-14</th>
				<th scope="col">14-16</th>
				<th scope="col">16-18</th>
    	</tr>
			<tbody class="hds-table__content hds-table__content--text-align-td-right">
    		<tr>
					<th scope="row">Monday</th>
					<td>324</td>
					<td>562</td>
					<td>280</td>
					<td>94</td>
				</tr>
    		<tr>
					<th scope="row">Tuesday</th>
					<td>341</td>
					<td>688</td>
					<td>425</td>
					<td>113</td>
				</tr>
				<tr>
					<th scope="row">Wednesday</th>
					<td>294</td>
					<td>492</td>
					<td>280</td>
					<td>67</td>
				</tr>
				<tr>
					<th scope="row">Thursday</th>
					<td>312</td>
					<td>501</td>
					<td>455</td>
					<td>112</td>
				</tr>
				<tr>
					<th scope="row">Friday</th>
					<td>150</td>
					<td>142</td>
					<td>362</td>
					<td>455</td>
				</tr>
			</tbody>
  	</table>
	</div>
`;

export const VerticalHeaderZebraLight = () => `
  <div class="hds-table-container" style="max-width: 486px">
    <table class="hds-table hds-table--zebra hds-table--light hds-table--with-vertical-header">
			<colgroup>
				<col span="1" class="hds-table__vertical-header-column">
			</colgroup>
    	<tr class="hds-table__header-row">
				<th></th>
				<th scope="col">8-12</th>
				<th scope="col">12-14</th>
				<th scope="col">14-16</th>
				<th scope="col">16-18</th>
    	</tr>
			<tbody class="hds-table__content hds-table__content--text-align-td-right">
    		<tr>
					<th scope="row">Monday</th>
					<td>324</td>
					<td>562</td>
					<td>280</td>
					<td>94</td>
				</tr>
    		<tr>
					<th scope="row">Tuesday</th>
					<td>341</td>
					<td>688</td>
					<td>425</td>
					<td>113</td>
				</tr>
				<tr>
					<th scope="row">Wednesday</th>
					<td>294</td>
					<td>492</td>
					<td>280</td>
					<td>67</td>
				</tr>
				<tr>
					<th scope="row">Thursday</th>
					<td>312</td>
					<td>501</td>
					<td>455</td>
					<td>112</td>
				</tr>
				<tr>
					<th scope="row">Friday</th>
					<td>150</td>
					<td>142</td>
					<td>362</td>
					<td>455</td>
				</tr>
			</tbody>
  	</table>
	</div>
`;

export const VerticalHeaderAndLines = () => `
  <div class="hds-table-container" style="max-width: 486px">
    <table class="hds-table hds-table--with-vertical-header hds-table--with-vertical-lines">
			<colgroup>
				<col span="1" class="hds-table__vertical-header-column">
			</colgroup>
    	<tr class="hds-table__header-row">
				<th></th>
				<th scope="col">8-12</th>
				<th scope="col">12-14</th>
				<th scope="col">14-16</th>
				<th scope="col">16-18</th>
    	</tr>
			<tbody class="hds-table__content hds-table__content--text-align-td-right">
    		<tr>
					<th scope="row">Monday</th>
					<td>324</td>
					<td>562</td>
					<td>280</td>
					<td>94</td>
				</tr>
    		<tr>
					<th scope="row">Tuesday</th>
					<td>341</td>
					<td>688</td>
					<td>425</td>
					<td>113</td>
				</tr>
				<tr>
					<th scope="row">Wednesday</th>
					<td>294</td>
					<td>492</td>
					<td>280</td>
					<td>67</td>
				</tr>
				<tr>
					<th scope="row">Thursday</th>
					<td>312</td>
					<td>501</td>
					<td>455</td>
					<td>112</td>
				</tr>
				<tr>
					<th scope="row">Friday</th>
					<td>150</td>
					<td>142</td>
					<td>362</td>
					<td>455</td>
				</tr>
			</tbody>
  	</table>
	</div>
`;

export const VerticalHeaderAndLinesLight = () => `
  <div class="hds-table-container" style="max-width: 486px">
    <table class="hds-table hds-table--light hds-table--with-vertical-lines hds-table--with-vertical-header">
			<colgroup>
				<col span="1" class="hds-table__vertical-header-column">
			</colgroup>
    	<tr class="hds-table__header-row">
				<th></th>
				<th scope="col">8-12</th>
				<th scope="col">12-14</th>
				<th scope="col">14-16</th>
				<th scope="col">16-18</th>
    	</tr>
			<tbody class="hds-table__content hds-table__content--text-align-td-right">
    		<tr>
					<th scope="row">Monday</th>
					<td>324</td>
					<td>562</td>
					<td>280</td>
					<td>94</td>
				</tr>
    		<tr>
					<th scope="row">Tuesday</th>
					<td>341</td>
					<td>688</td>
					<td>425</td>
					<td>113</td>
				</tr>
				<tr>
					<th scope="row">Wednesday</th>
					<td>294</td>
					<td>492</td>
					<td>280</td>
					<td>67</td>
				</tr>
				<tr>
					<th scope="row">Thursday</th>
					<td>312</td>
					<td>501</td>
					<td>455</td>
					<td>112</td>
				</tr>
				<tr>
					<th scope="row">Friday</th>
					<td>150</td>
					<td>142</td>
					<td>362</td>
					<td>455</td>
				</tr>
			</tbody>
  	</table>
	</div>
`;

export const VerticalHeaderAndLinesZebra = () => `
  <div class="hds-table-container" style="max-width: 486px">
    <table class="hds-table hds-table--zebra hds-table--with-vertical-lines hds-table--with-vertical-header">
			<colgroup>
				<col span="1" class="hds-table__vertical-header-column">
			</colgroup>
    	<tr class="hds-table__header-row">
				<th></th>
				<th scope="col">8-12</th>
				<th scope="col">12-14</th>
				<th scope="col">14-16</th>
				<th scope="col">16-18</th>
    	</tr>
			<tbody class="hds-table__content hds-table__content--text-align-td-right">
    		<tr>
					<th scope="row">Monday</th>
					<td>324</td>
					<td>562</td>
					<td>280</td>
					<td>94</td>
				</tr>
    		<tr>
					<th scope="row">Tuesday</th>
					<td>341</td>
					<td>688</td>
					<td>425</td>
					<td>113</td>
				</tr>
				<tr>
					<th scope="row">Wednesday</th>
					<td>294</td>
					<td>492</td>
					<td>280</td>
					<td>67</td>
				</tr>
				<tr>
					<th scope="row">Thursday</th>
					<td>312</td>
					<td>501</td>
					<td>455</td>
					<td>112</td>
				</tr>
				<tr>
					<th scope="row">Friday</th>
					<td>150</td>
					<td>142</td>
					<td>362</td>
					<td>455</td>
				</tr>
			</tbody>
  	</table>
	</div>
`;

export const VerticalHeaderAndLinesZebraLight = () => `
  <div class="hds-table-container" style="max-width: 486px;">
    <table class="hds-table hds-table--light hds-table--zebra hds-table--with-vertical-lines hds-table--with-vertical-header">
			<colgroup>
				<col span="1" class="hds-table__vertical-header-column">
			</colgroup>
    	<tr class="hds-table__header-row">
				<th></th>
				<th scope="col">8-12</th>
				<th scope="col">12-14</th>
				<th scope="col">14-16</th>
				<th scope="col">16-18</th>
    	</tr>
			<tbody class="hds-table__content hds-table__content--text-align-td-right">
    		<tr>
					<th scope="row">Monday</th>
					<td>324</td>
					<td>562</td>
					<td>280</td>
					<td>94</td>
				</tr>
    		<tr>
					<th scope="row">Tuesday</th>
					<td>341</td>
					<td>688</td>
					<td>425</td>
					<td>113</td>
				</tr>
				<tr>
					<th scope="row">Wednesday</th>
					<td>294</td>
					<td>492</td>
					<td>280</td>
					<td>67</td>
				</tr>
				<tr>
					<th scope="row">Thursday</th>
					<td>312</td>
					<td>501</td>
					<td>455</td>
					<td>112</td>
				</tr>
				<tr>
					<th scope="row">Friday</th>
					<td>150</td>
					<td>142</td>
					<td>362</td>
					<td>455</td>
				</tr>
			</tbody>
  	</table>
	</div>
`;
