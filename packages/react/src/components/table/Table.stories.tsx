import React from 'react';
import { storiesOf } from '@storybook/react';

import Table, { Column } from './Table';

type DataType = { a: string; b: string; c: string };

const columns: Column<DataType>[] = [
  {
    Header: 'name',
    accessor: 'a',
  },
  {
    Header: 'height',
    accessor: 'b',
  },
  {
    Header: 'country',
    accessor: 'c',
  },
];

const MockData = [
  { a: 'foobar1', b: 'foobar6', c: 'foobar11' },
  { a: 'foobar2', b: 'foobar7', c: 'foobar12' },
  { a: 'foobar3', b: 'foobar8', c: 'foobar13' },
  { a: 'foobar4', b: 'foobar9', c: 'foobar14' },
  { a: 'foobar5', b: 'foobar10', c: 'foobar15' },
];

(Table as React.FC).displayName = 'Table';

storiesOf('Table', module).add('Table', () => (
  <Table
    data={MockData}
    columns={columns}
    renderSubComponent={row => {
      return row.index;
    }}
    renderMainHeader={() => 'Demos'}
    canSelectRows
  />
));
