import { render } from '@testing-library/react';
import React from 'react';
import { axe } from 'jest-axe';

import { Table } from './Table';

describe('<Table /> spec', () => {
  let cols;
  let rows;
  let caption;
  let indexKey;
  let renderIndexCol;

  beforeEach(() => {
    cols = [
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
    indexKey = 'id';
    renderIndexCol = false;

    rows = [
      { id: 1000, firstName: 'Lauri', surname: 'Kekkonen', age: 39, profession: 'Engineer' },
      { id: 1001, firstName: 'Maria', surname: 'Sarasoja', age: 62, profession: 'Designer' },
      { id: 1002, firstName: 'Anneli', surname: 'Routa', age: 50, profession: 'Meteorologist' },
      { id: 1003, firstName: 'Osku', surname: 'Rausku', age: 18, profession: 'Mail Carrier' },
    ];

    caption = (
      <span>
        <b>Table 1</b>: Table description
      </span>
    );
  });

  it('renders the component', () => {
    const { asFragment } = render(
      <Table caption={caption} cols={cols} rows={rows} indexKey={indexKey} renderIndexCol={renderIndexCol} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <Table caption={caption} cols={cols} rows={rows} indexKey={indexKey} renderIndexCol={renderIndexCol} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
