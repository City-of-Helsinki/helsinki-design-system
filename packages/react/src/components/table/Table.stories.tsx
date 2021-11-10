import React, { useRef, useState } from 'react';
import { parse, isBefore, isSameDay } from 'date-fns';

import { Table } from './Table';
import { DataTable } from './DataTable';
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
// eslint-disable-next-line no-unused-vars
export const Default = (args) => {
  const cellConfig = {
    cols: [
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
    ],
    indexKey: 'id',
    renderIndexCol: false,
  };

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
      <DataTable caption={caption} cellConfig={cellConfig} rows={rows} />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars
export const Dark = (args) => {
  const cellConfig = {
    cols: [
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
    ],
    indexKey: 'id',
    renderIndexCol: false,
  };

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
      <DataTable caption={caption} variant="dark" cellConfig={cellConfig} rows={rows} />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars
export const Light = (args) => {
  const cellConfig = {
    cols: [
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
    ],
    indexKey: 'id',
    renderIndexCol: false,
  };

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
      <DataTable caption={caption} variant="light" cellConfig={cellConfig} rows={rows} />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars
export const Dense = (args) => {
  const cellConfig = {
    cols: [
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
    ],
    indexKey: 'id',
    renderIndexCol: false,
  };

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
      <DataTable dense caption={caption} cellConfig={cellConfig} rows={rows} />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars
export const Zebra = (args) => {
  const cellConfig = {
    cols: [
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
    ],
    indexKey: 'id',
    renderIndexCol: false,
  };

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
      <DataTable caption={caption} zebra cellConfig={cellConfig} rows={rows} />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars
export const VerticalLines = (args) => {
  const cellConfig = {
    cols: [
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
    ],
    indexKey: 'id',
    renderIndexCol: false,
  };

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
      <DataTable caption={caption} verticalLines cellConfig={cellConfig} rows={rows} />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars
export const VerticalHeaders = (args) => {
  const cellConfig = {
    cols: [
      { key: 'id', headerName: 'Not rendered' },
      { key: '8-12', headerName: '8-12' },
      { key: '12-14', headerName: '12-14' },
      { key: '14-16', headerName: '14-16' },
      { key: '16-18', headerName: '16-18' },
    ],
    indexKey: 'id',
    renderIndexCol: false,
  };

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
      <DataTable
        caption={caption}
        textAlignContentRight
        verticalHeaders={verticalHeaders}
        cellConfig={cellConfig}
        rows={unitRows}
      />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars
export const Sorting = (args) => {
  const cellConfig = {
    cols: [
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
    ],
    sortingEnabled: true,
    ariaLabelSortButtonNeutral: 'Not sorted',
    ariaLabelSortButtonAscending: 'Sorted in ascending order',
    ariaLabelSortButtonDescending: 'Sorted in descending order',
    indexKey: 'id',
    renderIndexCol: false,
  };

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
      <DataTable caption={caption} cellConfig={cellConfig} rows={rows} />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars
export const InitiallySortedBy = (args) => {
  const cellConfig = {
    cols: [
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
    ],
    sortingEnabled: true,
    initialSortingColumnKey: 'age',
    initialSortingOrder: 'desc' as 'desc',
    ariaLabelSortButtonNeutral: 'Not sorted',
    ariaLabelSortButtonAscending: 'Sorted in ascending order',
    ariaLabelSortButtonDescending: 'Sorted in descending order',
    indexKey: 'id',
    renderIndexCol: false,
  };

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
      <DataTable caption={caption} cellConfig={cellConfig} rows={rows} />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars
export const CustomSortFunction = (args) => {
  const cellConfig = {
    cols: [
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
    ],
    sortingEnabled: true,
    initialSortingColumnKey: 'Ilmoitus vanhenee',
    initialSortingOrder: 'asc' as 'asc',
    ariaLabelSortButtonNeutral: 'Not sorted',
    ariaLabelSortButtonAscending: 'Sorted in ascending order',
    ariaLabelSortButtonDescending: 'Sorted in descending order',
    indexKey: 'Paikka-ID',
  };

  const rows: Array<object> = workTrial;

  const caption = (
    <span>
      <b>Table 1</b>: Table description
    </span>
  );

  return (
    <div style={{ maxWidth: '1200px', height: '600px' }}>
      <DataTable caption={caption} dense cellConfig={cellConfig} rows={rows} />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars
export const CheckboxSelection = (args) => {
  const cellConfig = {
    cols: [
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
    ],
    indexKey: 'id',
    renderIndexCol: false,
  };

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
      <DataTable caption={caption} checkboxSelection cellConfig={cellConfig} rows={rows} />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars
export const CheckboxSelectionDense = (args) => {
  const cellConfig = {
    cols: [
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
    ],
    indexKey: 'id',
    renderIndexCol: false,
  };

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
      <DataTable checkboxSelection dense caption={caption} cellConfig={cellConfig} rows={rows} />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars
export const InitiallySelectedRows = (args) => {
  const cellConfig = {
    cols: [
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
    ],
    indexKey: 'id',
    renderIndexCol: false,
  };

  const rows: Array<object> = [
    { id: 1000, firstName: 'Lauri', surname: 'Kekkonen', age: 39, profession: 'Engineer' },
    { id: 1001, firstName: 'Maria', surname: 'Sarasoja', age: 62, profession: 'Designer' },
    { id: 1002, firstName: 'Anneli', surname: 'Routa', age: 50, profession: 'Meteorologist' },
    { id: 1003, firstName: 'Osku', surname: 'Rausku', age: 18, profession: 'Mail Carrier' },
  ];

  const initiallySelectedRows = [1002, 1003];

  const caption = (
    <span>
      <b>Table 1</b>: Table description
    </span>
  );

  return (
    <div style={{ maxWidth: '640px' }}>
      <DataTable
        caption={caption}
        initiallySelectedRows={initiallySelectedRows}
        checkboxSelection
        variant="dark"
        cellConfig={cellConfig}
        rows={rows}
      />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars
export const SelectAllRows = (args) => {
  const cellConfig = {
    cols: [
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
    ],
    indexKey: 'id',
    renderIndexCol: false,
  };

  const rows: Array<object> = [
    { id: 1000, firstName: 'Lauri', surname: 'Kekkonen', age: 39, profession: 'Engineer' },
    { id: 1001, firstName: 'Maria', surname: 'Sarasoja', age: 62, profession: 'Designer' },
    { id: 1002, firstName: 'Anneli', surname: 'Routa', age: 50, profession: 'Meteorologist' },
    { id: 1003, firstName: 'Osku', surname: 'Rausku', age: 18, profession: 'Mail Carrier' },
  ];

  const [tableRows, setTableRows] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);

  const myRef = useRef();

  return (
    <div style={{ maxWidth: '640px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button
          onClick={() => {
            const node = myRef.current as any;
            return node?.selectAllRows();
          }}
          style={{ width: 'fit-content', marginRight: '16px' }}
          variant="secondary"
          size="small"
        >
          Select all rows
        </Button>
        <Button
          onClick={() => {
            const node = myRef.current as any;
            return node?.deSelectAllRows();
          }}
          style={{ width: 'fit-content', marginRight: '16px' }}
          variant="secondary"
          size="small"
        >
          Deselect all rows
        </Button>
        <Button
          onClick={() => {
            setTableRows(
              tableRows.filter((row) => {
                const rowId = row[cellConfig.indexKey];

                return (
                  selectedRows.some((selectedRow) => {
                    return selectedRow === rowId;
                  }) === false
                );
              }),
            );
          }}
          style={{
            borderColor: selectedRows.length !== 0 ? '#b01038' : undefined,
            backgroundColor: selectedRows.length !== 0 ? '#b01038' : undefined,
            width: 'fit-content',
          }}
          variant="primary"
          size="small"
          iconLeft={<IconTrash />}
          disabled={selectedRows.length === 0}
        >
          Delete selected
        </Button>
      </div>
      <DataTable
        ref={myRef}
        aria-label="People"
        setSelections={setSelectedRows}
        checkboxSelection
        variant="dark"
        cellConfig={cellConfig}
        rows={tableRows}
      />
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars
export const CheckboxSelectionWithSorting = (args) => {
  const cellConfig = {
    cols: [
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
    ],
    sortingEnabled: true,
    ariaLabelSortButtonNeutral: 'Not sorted',
    ariaLabelSortButtonAscending: 'Sorted in ascending order',
    ariaLabelSortButtonDescending: 'Sorted in descending order',
    indexKey: 'id',
    renderIndexCol: false,
  };

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
      <DataTable checkboxSelection caption={caption} cellConfig={cellConfig} rows={rows} />
    </div>
  );
};
