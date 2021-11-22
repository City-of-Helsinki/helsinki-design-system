import React, { useState } from 'react';
import { parse, isBefore, isSameDay } from 'date-fns';

import { Table } from './Table';
import workTrial from './story-example-work-trial.json';
import { Button } from '../button';
import { IconTrash } from '../../icons';

export default {
  component: Table,
  title: 'Components/Table',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const Default = (args) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'firstName', headerName: 'First name' },
    { key: 'surname', headerName: 'Surname' },
    {
      key: 'age',
      headerName: 'Age',
      transform: ({ age }) => {
        return <div style={{ textAlign: 'right' }}>{age}</div>;
      },
    },
    { key: 'profession', headerName: 'Profession' },
  ];

  const rows: Array<object> = [
    { id: 1000, firstName: 'Lauri', surname: 'Kekkonen', age: 39, profession: 'Engineer' },
    { id: 1001, firstName: 'Maria', surname: 'Sarasoja', age: 62, profession: 'Designer' },
    { id: 1002, firstName: 'Anneli', surname: 'Routa', age: 50, profession: 'Meteorologist' },
    { id: 1003, firstName: 'Osku', surname: 'Rausku', age: 18, profession: 'Mail Carrier' },
  ];

  const caption = (
    <span>
      <b>Table 1</b>: Table description
    </span>
  );

  return (
    <div style={{ maxWidth: '640px' }}>
      <Table cols={cols} rows={rows} caption={caption} indexKey="id" renderIndexCol={false} />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const Dark = (args) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'firstName', headerName: 'First name' },
    { key: 'surname', headerName: 'Surname' },
    {
      key: 'age',
      headerName: 'Age',
      transform: ({ age }) => {
        return <div style={{ textAlign: 'right' }}>{age}</div>;
      },
    },
    { key: 'profession', headerName: 'Profession' },
  ];

  const rows: Array<object> = [
    { id: 1000, firstName: 'Lauri', surname: 'Kekkonen', age: 39, profession: 'Engineer' },
    { id: 1001, firstName: 'Maria', surname: 'Sarasoja', age: 62, profession: 'Designer' },
    { id: 1002, firstName: 'Anneli', surname: 'Routa', age: 50, profession: 'Meteorologist' },
    { id: 1003, firstName: 'Osku', surname: 'Rausku', age: 18, profession: 'Mail Carrier' },
  ];

  const caption = (
    <span>
      <b>Table 1</b>: Table description
    </span>
  );

  return (
    <div style={{ maxWidth: '640px' }}>
      <Table cols={cols} rows={rows} caption={caption} variant="dark" indexKey="id" renderIndexCol={false} />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const Light = (args) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'firstName', headerName: 'First name' },
    { key: 'surname', headerName: 'Surname' },
    {
      key: 'age',
      headerName: 'Age',
      transform: ({ age }) => {
        return <div style={{ textAlign: 'right' }}>{age}</div>;
      },
    },
    { key: 'profession', headerName: 'Profession' },
  ];

  const rows: Array<object> = [
    { id: 1000, firstName: 'Lauri', surname: 'Kekkonen', age: 39, profession: 'Engineer' },
    { id: 1001, firstName: 'Maria', surname: 'Sarasoja', age: 62, profession: 'Designer' },
    { id: 1002, firstName: 'Anneli', surname: 'Routa', age: 50, profession: 'Meteorologist' },
    { id: 1003, firstName: 'Osku', surname: 'Rausku', age: 18, profession: 'Mail Carrier' },
  ];

  const caption = (
    <span>
      <b>Table 1</b>: Table description
    </span>
  );

  return (
    <div style={{ maxWidth: '640px' }}>
      <Table caption={caption} cols={cols} variant="light" indexKey="id" renderIndexCol={false} rows={rows} />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const Dense = (args) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'firstName', headerName: 'First name' },
    { key: 'surname', headerName: 'Surname' },
    {
      key: 'age',
      headerName: 'Age',
      transform: ({ age }) => {
        return <div style={{ textAlign: 'right' }}>{age}</div>;
      },
    },
    { key: 'profession', headerName: 'Profession' },
  ];

  const rows: Array<object> = [
    { id: 1000, firstName: 'Lauri', surname: 'Kekkonen', age: 39, profession: 'Engineer' },
    { id: 1001, firstName: 'Maria', surname: 'Sarasoja', age: 62, profession: 'Designer' },
    { id: 1002, firstName: 'Anneli', surname: 'Routa', age: 50, profession: 'Meteorologist' },
    { id: 1003, firstName: 'Osku', surname: 'Rausku', age: 18, profession: 'Mail Carrier' },
  ];

  const caption = (
    <span>
      <b>Table 1</b>: Table description
    </span>
  );

  return (
    <div style={{ maxWidth: '500px' }}>
      <Table cols={cols} rows={rows} dense caption={caption} indexKey="id" renderIndexCol={false} />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const Zebra = (args) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'firstName', headerName: 'First name' },
    { key: 'surname', headerName: 'Surname' },
    {
      key: 'age',
      headerName: 'Age',
      transform: ({ age }) => {
        return <div style={{ textAlign: 'right' }}>{age}</div>;
      },
    },
    { key: 'city', headerName: 'City' },
    { key: 'profession', headerName: 'Profession' },
    {
      key: 'experience',
      headerName: 'Experience (years)',
      transform: ({ experience }) => {
        return <div style={{ textAlign: 'right' }}>{experience}</div>;
      },
    },
  ];

  const rows: Array<object> = [
    {
      id: 1000,
      firstName: 'Lauri',
      surname: 'Kekkonen',
      age: 39,
      city: 'Helsinki',
      profession: 'Engineer',
      experience: 10,
    },
    {
      id: 1001,
      firstName: 'Maria',
      surname: 'Sarasoja',
      age: 62,
      city: 'Tampere',
      profession: 'Designer',
      experience: 39,
    },
    {
      id: 1002,
      firstName: 'Anneli',
      surname: 'Routa',
      age: 50,
      city: 'Turku',
      profession: 'Meteorologist',
      experience: 25,
    },
    {
      id: 1002,
      firstName: 'Osku',
      surname: 'Rausku',
      age: 18,
      city: 'Oulu',
      profession: 'Mail Carrier',
      experience: 1,
    },
  ];

  const caption = (
    <span>
      <b>Table 1</b>: Table description
    </span>
  );

  return (
    <div style={{ maxWidth: '800px' }}>
      <Table rows={rows} cols={cols} caption={caption} zebra indexKey="id" renderIndexCol={false} />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const VerticalLines = (args) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'firstName', headerName: 'First name' },
    { key: 'surname', headerName: 'Surname' },
    {
      key: 'age',
      headerName: 'Age',
      transform: ({ age }) => {
        return <div style={{ textAlign: 'right' }}>{age}</div>;
      },
    },
    { key: 'profession', headerName: 'Profession' },
  ];

  const rows: Array<object> = [
    { id: 1000, firstName: 'Lauri', surname: 'Kekkonen', age: 39, profession: 'Engineer' },
    { id: 1001, firstName: 'Maria', surname: 'Sarasoja', age: 62, profession: 'Designer' },
    { id: 1002, firstName: 'Anneli', surname: 'Routa', age: 50, profession: 'Meteorologist' },
    { id: 1003, firstName: 'Osku', surname: 'Rausku', age: 18, profession: 'Mail Carrier' },
  ];

  const caption = (
    <span>
      <b>Table 1</b>: Table description
    </span>
  );

  return (
    <div style={{ maxWidth: '640px' }}>
      <Table verticalLines cols={cols} rows={rows} caption={caption} indexKey="id" renderIndexCol={false} />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const VerticalHeaders = (args) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: '8-12', headerName: '8-12' },
    { key: '12-14', headerName: '12-14' },
    { key: '14-16', headerName: '14-16' },
    { key: '16-18', headerName: '16-18' },
  ];

  const unitRows: Array<object> = [
    { id: 'monday', '8-12': 324, '12-14': 562, '14-16': 280, '16-18': 94 },
    { id: 'tuesday', '8-12': 341, '12-14': 688, '14-16': 425, '16-18': 113 },
    { id: 'wednesday', '8-12': 294, '12-14': 492, '14-16': 280, '16-18': 67 },
    { id: 'thursday', '8-12': 312, '12-14': 501, '14-16': 455, '16-18': 112 },
    { id: 'friday', '8-12': 150, '12-14': 142, '14-16': 362, '16-18': 455 },
  ];

  const verticalHeaders = [
    { key: 'monday', headerName: 'Monday' },
    { key: 'tuesday', headerName: 'Tuesday' },
    { key: 'wednesday', headerName: 'Wednesday' },
    { key: 'thursday', headerName: 'Thursday' },
    { key: 'friday', headerName: 'Friday' },
  ];

  const caption = (
    <span>
      <b>Table 1</b>: Table description
    </span>
  );

  return (
    <div style={{ maxWidth: '486px' }}>
      <Table
        verticalHeaders={verticalHeaders}
        cols={cols}
        rows={unitRows}
        caption={caption}
        textAlignContentRight
        indexKey="id"
        renderIndexCol={false}
      />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const Sorting = (args) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'firstName', headerName: 'First name' },
    { key: 'surname', headerName: 'Surname' },
    {
      key: 'age',
      headerName: 'Age',
      sortIconType: 'other' as 'other',
      transform: ({ age }) => {
        return <div style={{ textAlign: 'right' }}>{age}</div>;
      },
    },
    { key: 'profession', headerName: 'Profession' },
  ];

  const rows: Array<object> = [
    { id: 1000, firstName: 'Lauri', surname: 'Kekkonen', age: 39, profession: 'Engineer' },
    { id: 1001, firstName: 'Maria', surname: 'Sarasoja', age: 62, profession: 'Designer' },
    { id: 1002, firstName: 'Anneli', surname: 'Routa', age: 50, profession: 'Meteorologist' },
    { id: 1003, firstName: 'Osku', surname: 'Rausku', age: 18, profession: 'Mail Carrier' },
    { id: 1004, firstName: 'Linda', surname: 'Koululainen', age: 8, profession: 'School student' },
  ];

  const caption = (
    <span>
      <b>Table 1</b>: Table description
    </span>
  );

  return (
    <div style={{ maxWidth: '640px' }}>
      <Table
        sortingEnabled
        ariaLabelSortButtonUnset="Not sorted"
        ariaLabelSortButtonAscending="Sorted in ascending order"
        ariaLabelSortButtonDescending="Sorted in descending order"
        indexKey="id"
        renderIndexCol={false}
        cols={cols}
        rows={rows}
        caption={caption}
      />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const SortingLightVariant = (args) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'firstName', headerName: 'First name' },
    { key: 'surname', headerName: 'Surname' },
    {
      key: 'age',
      headerName: 'Age',
      sortIconType: 'other' as 'other',
      transform: ({ age }) => {
        return <div style={{ textAlign: 'right' }}>{age}</div>;
      },
    },
    { key: 'profession', headerName: 'Profession' },
  ];

  const rows: Array<object> = [
    { id: 1000, firstName: 'Lauri', surname: 'Kekkonen', age: 39, profession: 'Engineer' },
    { id: 1001, firstName: 'Maria', surname: 'Sarasoja', age: 62, profession: 'Designer' },
    { id: 1002, firstName: 'Anneli', surname: 'Routa', age: 50, profession: 'Meteorologist' },
    { id: 1003, firstName: 'Osku', surname: 'Rausku', age: 18, profession: 'Mail Carrier' },
    { id: 1004, firstName: 'Linda', surname: 'Koululainen', age: 8, profession: 'School student' },
  ];

  const caption = (
    <span>
      <b>Table 1</b>: Table description
    </span>
  );

  return (
    <div style={{ maxWidth: '640px' }}>
      <Table
        variant="light"
        sortingEnabled
        ariaLabelSortButtonUnset="Not sorted"
        ariaLabelSortButtonAscending="Sorted in ascending order"
        ariaLabelSortButtonDescending="Sorted in descending order"
        indexKey="id"
        renderIndexCol={false}
        cols={cols}
        rows={rows}
        caption={caption}
      />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const InitiallySortedBy = (args) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'firstName', headerName: 'First name' },
    { key: 'surname', headerName: 'Surname' },
    {
      key: 'age',
      headerName: 'Age',
      sortIconType: 'other' as 'string' | 'other',
      transform: ({ age }) => {
        return <div style={{ textAlign: 'right' }}>{age}</div>;
      },
    },
    { key: 'profession', headerName: 'Profession' },
  ];

  const rows: Array<object> = [
    { id: 1000, firstName: 'Lauri', surname: 'Kekkonen', age: 39, profession: 'Engineer' },
    { id: 1001, firstName: 'Maria', surname: 'Sarasoja', age: 62, profession: 'Designer' },
    { id: 1002, firstName: 'Anneli', surname: 'Routa', age: 50, profession: 'Meteorologist' },
    { id: 1003, firstName: 'Osku', surname: 'Rausku', age: 18, profession: 'Mail Carrier' },
    { id: 1004, firstName: 'Linda', surname: 'Koululainen', age: 8, profession: 'School student' },
  ];

  const caption = (
    <span>
      <b>Table 1</b>: Table description
    </span>
  );

  return (
    <div style={{ maxWidth: '640px' }}>
      <Table
        initialSortingColumnKey="age"
        initialSortingOrder={'desc' as 'desc'}
        sortingEnabled
        ariaLabelSortButtonUnset="Not sorted"
        ariaLabelSortButtonAscending="Sorted in ascending order"
        ariaLabelSortButtonDescending="Sorted in descending order"
        rows={rows}
        cols={cols}
        indexKey="id"
        renderIndexCol={false}
        caption={caption}
      />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const CustomSortFunction = (args) => {
  const cols = [
    { key: 'Paikka-ID', headerName: 'Paikka-ID' },
    { key: 'Paikan tyyppi', headerName: 'Paikan tyyppi' },
    { key: 'Tehtävänimike', headerName: 'Tehtävänimike' },
    {
      key: 'Ilmoitus vanhenee',
      headerName: 'Ilmoitus vanhenee',
      sortIconType: 'other' as 'other',
      customSortCompareFunction: (a, b) => {
        const aDate = parse(a, 'dd.MM.yyyy', new Date());
        const bDate = parse(b, 'dd.MM.yyyy', new Date());

        if (isSameDay(aDate, bDate)) {
          return 0;
        }

        if (isBefore(aDate, bDate)) {
          return -1;
        }

        return 1;
      },
    },
    { key: 'Toimiala/liikelaitos', headerName: 'Toimiala/liikelaitos' },
    { key: 'Työpaikka', headerName: 'Työpaikka' },
    { key: 'Postinumero', headerName: 'Postinumero' },
    {
      key: 'Paikkoja',
      headerName: 'Paikkoja',
      sortIconType: 'other' as 'other',
      transform: ({ Paikkoja }) => {
        return <div style={{ textAlign: 'right' }}>{Paikkoja}</div>;
      },
    },
    {
      key: 'Haastatteluun halutaan',
      headerName: 'Haastatteluun halutaan',
      sortIconType: 'other' as 'other',
      transform: (row) => {
        return <div style={{ textAlign: 'right' }}>{row['Haastatteluun halutaan']}</div>;
      },
    },
  ];

  const rows: Array<object> = workTrial;

  const caption = (
    <span>
      <b>Table 1</b>: Table description
    </span>
  );

  return (
    <div style={{ maxWidth: '1200px', height: '600px' }}>
      <Table
        sortingEnabled
        initialSortingColumnKey="Ilmoitus vanhenee"
        initialSortingOrder={'asc' as 'asc'}
        ariaLabelSortButtonUnset="Not sorted"
        ariaLabelSortButtonAscending="Sorted in ascending order"
        ariaLabelSortButtonDescending="Sorted in descending order"
        cols={cols}
        rows={rows}
        indexKey="Paikka-ID"
        caption={caption}
        dense
      />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const CheckboxSelection = (args) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'firstName', headerName: 'First name' },
    { key: 'surname', headerName: 'Surname' },
    {
      key: 'age',
      headerName: 'Age',
      transform: ({ age }) => {
        return <div style={{ textAlign: 'right' }}>{age}</div>;
      },
    },
    { key: 'profession', headerName: 'Profession' },
  ];

  const rows: Array<object> = [
    { id: 1000, firstName: 'Lauri', surname: 'Kekkonen', age: 39, profession: 'Engineer' },
    { id: 1001, firstName: 'Maria', surname: 'Sarasoja', age: 62, profession: 'Designer' },
    { id: 1002, firstName: 'Anneli', surname: 'Routa', age: 50, profession: 'Meteorologist' },
    { id: 1003, firstName: 'Osku', surname: 'Rausku', age: 18, profession: 'Mail Carrier' },
  ];

  return (
    <div style={{ maxWidth: '640px' }}>
      <Table
        checkboxSelection
        heading="Employees"
        indexKey="id"
        renderIndexCol={false}
        cols={cols}
        rows={rows}
        selectAllRowsText="Select all rows"
        clearSelectionsText="Clear selections"
        ariaLabelCheckboxSelection="Row selection"
      />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const CheckboxSelectionDense = (args) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'firstName', headerName: 'First name' },
    { key: 'surname', headerName: 'Surname' },
    {
      key: 'age',
      headerName: 'Age',
      transform: ({ age }) => {
        return <div style={{ textAlign: 'right' }}>{age}</div>;
      },
    },
    { key: 'profession', headerName: 'Profession' },
  ];

  const rows: Array<object> = [
    { id: 1000, firstName: 'Lauri', surname: 'Kekkonen', age: 39, profession: 'Engineer' },
    { id: 1001, firstName: 'Maria', surname: 'Sarasoja', age: 62, profession: 'Designer' },
    { id: 1002, firstName: 'Anneli', surname: 'Routa', age: 50, profession: 'Meteorologist' },
    { id: 1003, firstName: 'Osku', surname: 'Rausku', age: 18, profession: 'Mail Carrier' },
  ];

  return (
    <div style={{ maxWidth: '500px' }}>
      <Table
        dense
        checkboxSelection
        heading="Employees"
        cols={cols}
        rows={rows}
        indexKey="id"
        renderIndexCol={false}
        selectAllRowsText="Select all rows"
        clearSelectionsText="Clear selections"
        ariaLabelCheckboxSelection="Row selection"
      />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const InitiallySelectedRows = (args) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'firstName', headerName: 'First name' },
    { key: 'surname', headerName: 'Surname' },
    {
      key: 'age',
      headerName: 'Age',
      transform: ({ age }) => {
        return <div style={{ textAlign: 'right' }}>{age}</div>;
      },
    },
    { key: 'profession', headerName: 'Profession' },
  ];

  const rows: Array<object> = [
    { id: 1000, firstName: 'Lauri', surname: 'Kekkonen', age: 39, profession: 'Engineer' },
    { id: 1001, firstName: 'Maria', surname: 'Sarasoja', age: 62, profession: 'Designer' },
    { id: 1002, firstName: 'Anneli', surname: 'Routa', age: 50, profession: 'Meteorologist' },
    { id: 1003, firstName: 'Osku', surname: 'Rausku', age: 18, profession: 'Mail Carrier' },
  ];

  return (
    <div style={{ maxWidth: '640px' }}>
      <Table
        heading="Employees"
        initiallySelectedRows={[1002, 1003]}
        checkboxSelection
        variant="dark"
        cols={cols}
        rows={rows}
        indexKey="id"
        renderIndexCol={false}
        selectAllRowsText="Select all rows"
        clearSelectionsText="Clear selections"
        ariaLabelCheckboxSelection="Row selection"
      />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const WithCustomActions = (args) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'firstName', headerName: 'First name' },
    { key: 'surname', headerName: 'Surname' },
    {
      key: 'age',
      headerName: 'Age',
      transform: ({ age }) => {
        return <div style={{ textAlign: 'right' }}>{age}</div>;
      },
    },
    { key: 'profession', headerName: 'Profession' },
  ];

  const indexKey = 'id';

  const rows: Array<object> = [
    { id: 1000, firstName: 'Lauri', surname: 'Kekkonen', age: 39, profession: 'Engineer' },
    { id: 1001, firstName: 'Maria', surname: 'Sarasoja', age: 62, profession: 'Designer' },
    { id: 1002, firstName: 'Anneli', surname: 'Routa', age: 50, profession: 'Meteorologist' },
    { id: 1003, firstName: 'Osku', surname: 'Rausku', age: 18, profession: 'Mail Carrier' },
  ];

  const [tableRows, setTableRows] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);

  const deleteSelectedButton = (
    <Button
      key={1}
      onClick={() => {
        setTableRows(
          tableRows.filter((row) => {
            const rowId = row[indexKey];

            return (
              selectedRows.some((selectedRow) => {
                return selectedRow === rowId;
              }) === false
            );
          }),
        );
        setSelectedRows([]);
      }}
      style={{
        flexGrow: 0,
      }}
      className="table-custom-action"
      variant="secondary"
      size="small"
      iconLeft={<IconTrash />}
      disabled={selectedRows.length === 0}
    >
      Delete selected
    </Button>
  );

  const CopySelected = (
    <Button
      key={2}
      onClick={() => {
        // eslint-disable-next-line no-console
        console.log('Copy clicked!');
      }}
      style={{
        flexGrow: 0,
      }}
      className="table-custom-action"
      variant="secondary"
      size="small"
      disabled={selectedRows.length === 0}
    >
      Copy selected
    </Button>
  );

  return (
    <div style={{ maxWidth: '640px' }}>
      <Table
        customActionButtons={[deleteSelectedButton, CopySelected]}
        setSelections={setSelectedRows}
        checkboxSelection
        cols={cols}
        rows={tableRows}
        heading="Employees"
        indexKey={indexKey}
        renderIndexCol={false}
        variant="dark"
        selectAllRowsText="Select all rows"
        clearSelectionsText="Clear selections"
        ariaLabelCheckboxSelection="Row selection"
      />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const CheckboxSelectionWithSorting = (args) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'firstName', headerName: 'First name' },
    { key: 'surname', headerName: 'Surname' },
    {
      key: 'age',
      headerName: 'Age',
      sortIconType: 'other' as 'other',
      transform: ({ age }) => {
        return <div style={{ textAlign: 'right' }}>{age}</div>;
      },
    },
    { key: 'profession', headerName: 'Profession' },
  ];

  const rows: Array<object> = [
    { id: 1000, firstName: 'Lauri', surname: 'Kekkonen', age: 39, profession: 'Engineer' },
    { id: 1001, firstName: 'Maria', surname: 'Sarasoja', age: 62, profession: 'Designer' },
    { id: 1002, firstName: 'Anneli', surname: 'Routa', age: 50, profession: 'Meteorologist' },
    { id: 1003, firstName: 'Osku', surname: 'Rausku', age: 18, profession: 'Mail Carrier' },
    { id: 1004, firstName: 'Linda', surname: 'Koululainen', age: 8, profession: 'School student' },
  ];

  return (
    <div style={{ maxWidth: '640px' }}>
      <Table
        sortingEnabled
        ariaLabelSortButtonUnset="Not sorted"
        ariaLabelSortButtonAscending="Sorted in ascending order"
        ariaLabelSortButtonDescending="Sorted in descending order"
        selectAllRowsText="Select all rows"
        clearSelectionsText="Clear selections"
        ariaLabelCheckboxSelection="Row selection"
        checkboxSelection
        cols={cols}
        rows={rows}
        indexKey="id"
        renderIndexCol={false}
        heading="Employees"
      />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const CustomHeaderBackgroundColorForDarkVariant = (args) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'firstName', headerName: 'First name' },
    { key: 'surname', headerName: 'Surname' },
    {
      key: 'age',
      headerName: 'Age',
      transform: ({ age }) => {
        return <div style={{ textAlign: 'right' }}>{age}</div>;
      },
    },
    { key: 'profession', headerName: 'Profession' },
  ];

  const rows: Array<object> = [
    { id: 1000, firstName: 'Lauri', surname: 'Kekkonen', age: 39, profession: 'Engineer' },
    { id: 1001, firstName: 'Maria', surname: 'Sarasoja', age: 62, profession: 'Designer' },
    { id: 1002, firstName: 'Anneli', surname: 'Routa', age: 50, profession: 'Meteorologist' },
    { id: 1003, firstName: 'Osku', surname: 'Rausku', age: 18, profession: 'Mail Carrier' },
  ];

  const caption = (
    <span>
      <b>Table 1</b>: Table description
    </span>
  );

  const theme = {
    '--background-color': 'var(--color-tram)',
  };

  return (
    <div style={{ maxWidth: '640px' }}>
      <Table
        theme={theme}
        caption={caption}
        variant="dark"
        indexKey="id"
        renderIndexCol={false}
        rows={rows}
        cols={cols}
      />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const CustomHeaderBackgroundColorForLightVariant = (args) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'firstName', headerName: 'First name' },
    { key: 'surname', headerName: 'Surname' },
    {
      key: 'age',
      headerName: 'Age',
      transform: ({ age }) => {
        return <div style={{ textAlign: 'right' }}>{age}</div>;
      },
    },
    { key: 'profession', headerName: 'Profession' },
  ];

  const rows: Array<object> = [
    { id: 1000, firstName: 'Lauri', surname: 'Kekkonen', age: 39, profession: 'Engineer' },
    { id: 1001, firstName: 'Maria', surname: 'Sarasoja', age: 62, profession: 'Designer' },
    { id: 1002, firstName: 'Anneli', surname: 'Routa', age: 50, profession: 'Meteorologist' },
    { id: 1003, firstName: 'Osku', surname: 'Rausku', age: 18, profession: 'Mail Carrier' },
  ];

  const caption = (
    <span>
      <b>Table 1</b>: Table description
    </span>
  );

  const theme = {
    '--background-color': 'var(--color-suomenlinna)',
  };

  return (
    <div style={{ maxWidth: '640px' }}>
      <Table
        theme={theme}
        caption={caption}
        variant="light"
        indexKey="id"
        renderIndexCol={false}
        rows={rows}
        cols={cols}
      />
    </div>
  );
};
