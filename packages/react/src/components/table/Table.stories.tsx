/* eslint-disable react/forbid-component-props */
import React, { useEffect, useState } from 'react';
import { parse, isBefore, isSameDay } from 'date-fns';

import { Table, TableProps } from './Table';
import workTrial from './story-example-work-trial.json';
import { Button } from '../button';
import { IconTrash } from '../../icons';
import { LoadingSpinner } from '../loadingSpinner';

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
export const Default = (args: TableProps) => {
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
export const Light = (args: TableProps) => {
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
export const Dense = (args: TableProps) => {
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
export const Zebra = (args: TableProps) => {
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
      id: 1003,
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
export const VerticalLines = (args: TableProps) => {
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
export const VerticalHeaders = (args: TableProps) => {
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
export const Sorting = (args: TableProps) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'firstName', headerName: 'First name', isSortable: true },
    { key: 'surname', headerName: 'Surname', isSortable: true },
    {
      key: 'age',
      headerName: 'Age',
      sortIconType: 'other' as const,
      transform: ({ age }) => {
        return <div style={{ textAlign: 'right' }}>{age}</div>;
      },
      isSortable: true,
    },
    { key: 'profession', headerName: 'Profession', isSortable: true },
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
export const SortingLightVariant = (args: TableProps) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'firstName', headerName: 'First name', isSortable: true },
    { key: 'surname', headerName: 'Surname', isSortable: true },
    {
      key: 'age',
      headerName: 'Age',
      sortIconType: 'other' as const,
      transform: ({ age }) => {
        return <div style={{ textAlign: 'right' }}>{age}</div>;
      },
      isSortable: true,
    },
    { key: 'profession', headerName: 'Profession', isSortable: true },
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
export const InitiallySortedBy = (args: TableProps) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'firstName', headerName: 'First name', isSortable: true },
    { key: 'surname', headerName: 'Surname', isSortable: true },
    {
      key: 'age',
      headerName: 'Age',
      sortIconType: 'other' as const,
      transform: ({ age }) => {
        return <div style={{ textAlign: 'right' }}>{age}</div>;
      },
      isSortable: true,
    },
    { key: 'profession', headerName: 'Profession', isSortable: true },
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
        initialSortingOrder={'desc' as const}
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
export const CustomSortFunction = (args: TableProps) => {
  const cols = [
    { key: 'Paikka-ID', headerName: 'Paikka-ID', isSortable: true },
    { key: 'Paikan tyyppi', headerName: 'Paikan tyyppi', isSortable: false },
    { key: 'Tehtävänimike', headerName: 'Tehtävänimike', isSortable: true },
    {
      key: 'Ilmoitus vanhenee',
      headerName: 'Ilmoitus vanhenee',
      sortIconType: 'other' as const,
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
      isSortable: true,
    },
    { key: 'Toimiala/liikelaitos', headerName: 'Toimiala/liikelaitos', isSortable: true },
    { key: 'Työpaikka', headerName: 'Työpaikka', isSortable: true },
    { key: 'Postinumero', headerName: 'Postinumero', isSortable: true },
    {
      key: 'Paikkoja',
      headerName: 'Paikkoja',
      sortIconType: 'other' as const,
      transform: ({ Paikkoja }) => {
        return <div style={{ textAlign: 'right' }}>{Paikkoja}</div>;
      },
      isSortable: true,
    },
    {
      key: 'Haastatteluun halutaan',
      headerName: 'Haastatteluun halutaan',
      sortIconType: 'other' as const,
      transform: (row) => {
        return <div style={{ textAlign: 'right' }}>{row['Haastatteluun halutaan']}</div>;
      },
      isSortable: true,
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
        initialSortingColumnKey="Ilmoitus vanhenee"
        initialSortingOrder={'asc' as const}
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
export const SortingSideEffects = (args: TableProps) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'firstName', headerName: 'First name', isSortable: true },
    { key: 'surname', headerName: 'Surname', isSortable: true },
    {
      key: 'age',
      headerName: 'Age',
      sortIconType: 'other' as const,
      transform: ({ age }) => {
        return <div style={{ textAlign: 'right' }}>{age}</div>;
      },
      isSortable: true,
    },
    { key: 'profession', headerName: 'Profession', isSortable: true },
  ];

  const data: Array<object> = [
    { id: 1000, firstName: 'Lauri', surname: 'Kekkonen', age: 39, profession: 'Engineer' },
    { id: 1001, firstName: 'Maria', surname: 'Sarasoja', age: 62, profession: 'Designer' },
    { id: 1002, firstName: 'Anneli', surname: 'Routa', age: 50, profession: 'Meteorologist' },
    { id: 1003, firstName: 'Osku', surname: 'Rausku', age: 18, profession: 'Mail Carrier' },
    { id: 1004, firstName: 'Linda', surname: 'Koululainen', age: 8, profession: 'School student' },
  ];
  const [loading, toggleLoading] = useState(false);
  const [rows, setRows] = useState<object[]>(data);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        toggleLoading((currentValue) => !currentValue);
        setRows(data);
      }, 1000);
    }
  }, [loading]);

  const caption = (
    <span>
      <b>Table 1</b>: Table with loading spinner
    </span>
  );

  return (
    <div style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Table
        ariaLabelSortButtonUnset="Not sorted"
        ariaLabelSortButtonAscending="Sorted in ascending order"
        ariaLabelSortButtonDescending="Sorted in descending order"
        indexKey="id"
        renderIndexCol={false}
        cols={cols}
        rows={rows}
        caption={caption}
        onSort={(order, colKey, handleSort) => {
          // Side effects
          setRows([]);
          toggleLoading((currentValue) => !currentValue);
          // Call table's own sorting function
          handleSort();
        }}
      />
      {loading && <LoadingSpinner style={{ marginTop: 'var(--spacing-l)' }} />}
    </div>
  );
};

SortingSideEffects.parameters = {
  loki: { skip: true }, // The starting point is exactly the same as for other tables
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const CheckboxSelection = (args: TableProps) => {
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

  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);

  return (
    <div style={{ maxWidth: '640px' }}>
      <Table
        checkboxSelection
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        heading="Employees"
        id="checkbox-selection"
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
export const CheckboxSelectionDense = (args: TableProps) => {
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

  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);

  return (
    <div style={{ maxWidth: '500px' }}>
      <Table
        dense
        checkboxSelection
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        heading="Employees"
        id="checkbox-selection-dense"
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
export const InitiallySelectedRows = (args: TableProps) => {
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

  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([1002, 1003]);

  return (
    <div style={{ maxWidth: '640px' }}>
      <Table
        heading="Employees"
        id="initially-selected"
        checkboxSelection
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
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
export const WithCustomActions = (args: TableProps) => {
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
  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);

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

  const copySelected = (
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
        customActionButtons={[deleteSelectedButton, copySelected]}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        checkboxSelection
        cols={cols}
        rows={tableRows}
        heading="Employees"
        id="custom-actions"
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
export const CheckboxSelectionWithSorting = (args: TableProps) => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'firstName', headerName: 'First name', isSortable: true },
    { key: 'surname', headerName: 'Surname', isSortable: true },
    {
      key: 'age',
      headerName: 'Age',
      sortIconType: 'other' as const,
      transform: ({ age }) => {
        return <div style={{ textAlign: 'right' }}>{age}</div>;
      },
      isSortable: true,
    },
    { key: 'profession', headerName: 'Profession', isSortable: true },
  ];

  const rows: Array<object> = [
    { id: 1000, firstName: 'Lauri', surname: 'Kekkonen', age: 39, profession: 'Engineer' },
    { id: 1001, firstName: 'Maria', surname: 'Sarasoja', age: 62, profession: 'Designer' },
    { id: 1002, firstName: 'Anneli', surname: 'Routa', age: 50, profession: 'Meteorologist' },
    { id: 1003, firstName: 'Osku', surname: 'Rausku', age: 18, profession: 'Mail Carrier' },
    { id: 1004, firstName: 'Linda', surname: 'Koululainen', age: 8, profession: 'School student' },
  ];

  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);

  return (
    <div style={{ maxWidth: '640px' }}>
      <Table
        ariaLabelSortButtonUnset="Not sorted"
        ariaLabelSortButtonAscending="Sorted in ascending order"
        ariaLabelSortButtonDescending="Sorted in descending order"
        selectAllRowsText="Select all rows"
        clearSelectionsText="Clear selections"
        ariaLabelCheckboxSelection="Row selection"
        checkboxSelection
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        cols={cols}
        rows={rows}
        indexKey="id"
        renderIndexCol={false}
        heading="Employees"
        id="selection-with-sorting"
      />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const CustomBackgroundColorsForDarkVariant = (args: TableProps) => {
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
    '--header-background-color': 'var(--color-tram)',
    '--content-background-color': 'var(--color-black-5)',
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
export const CustomBackgroundColorsForLightVariant = (args: TableProps) => {
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
    '--header-background-color': 'var(--color-suomenlinna)',
    '--content-background-color': 'var(--color-black-5)',
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
