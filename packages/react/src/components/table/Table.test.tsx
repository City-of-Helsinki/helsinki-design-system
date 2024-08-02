/* eslint-disable react/forbid-component-props */
import { screen, render } from '@testing-library/react';
import React, { HTMLAttributes, useState } from 'react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import { Table, TableProps } from './Table';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

describe('<Table /> spec', () => {
  let cols;
  let rows;
  let caption;
  let heading;
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
      { id: 1004, firstName: 'Linda', surname: 'Koululainen', age: 8, profession: 'School student' },
    ];

    caption = (
      <span>
        <b>Table 1</b>: Table description
      </span>
    );

    heading = 'Employees';
  });

  it('renders the component', () => {
    const { asFragment } = render(
      <Table caption={caption} cols={cols} rows={rows} indexKey={indexKey} renderIndexCol={renderIndexCol} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render index column', () => {
    render(<Table caption={caption} cols={cols} rows={rows} indexKey={indexKey} renderIndexCol />);
    expect(screen.getByText('Not rendered')).toBeInTheDocument();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <Table caption={caption} cols={cols} rows={rows} indexKey={indexKey} renderIndexCol={renderIndexCol} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('native html props are passed to the element', async () => {
    const tableProps = getCommonElementTestProps<'table', Pick<TableProps, 'dataTestId'>>('table');
    // the component has "dataTestId" prop
    tableProps.dataTestId = tableProps['data-testid'];
    const { getByTestId } = render(
      <Table {...tableProps} caption={caption} cols={cols} rows={rows} indexKey={indexKey} renderIndexCol />,
    );
    const element = getByTestId(tableProps['data-testid']);
    expect(
      getElementAttributesMisMatches(element, {
        ...tableProps,
        dataTestId: undefined,
      } as HTMLAttributes<HTMLTableElement>),
    ).toHaveLength(0);
  });

  it('Should successfully sort the table', () => {
    const colsWithSorting = [
      { key: 'id', headerName: 'Not rendered' },
      { key: 'firstName', headerName: 'First name', isSortable: true },
      { key: 'surname', headerName: 'Surname', isSortable: true },
      {
        key: 'age',
        headerName: 'Age',
        transform: ({ age }) => {
          return <div style={{ textAlign: 'right' }}>{age}</div>;
        },
        isSortable: true,
      },
      { key: 'profession', headerName: 'Profession', isSortable: true },
    ];

    const { container } = render(
      <Table
        ariaLabelSortButtonUnset="Not sorted"
        ariaLabelSortButtonAscending="Sorted in ascending order"
        ariaLabelSortButtonDescending="Sorted in descending order"
        caption={caption}
        cols={colsWithSorting}
        rows={rows}
        indexKey={indexKey}
        renderIndexCol={renderIndexCol}
      />,
    );
    const ageOfFirstRow = container.querySelector('[data-testid="age-0"] > div');
    expect(ageOfFirstRow).toHaveTextContent('39');
    userEvent.click(container.querySelector('[data-testid="hds-table-sorting-header-age"]') as HTMLButtonElement);
    const ageOfSortedTableFirstRow = container.querySelector('[data-testid="age-0"] > div');
    expect(ageOfSortedTableFirstRow).toHaveTextContent('8');
  });

  it('Should successfully call onSort when sort button is pressed', () => {
    const colsWithSorting = [
      { key: 'id', headerName: 'Not rendered' },
      { key: 'firstName', headerName: 'First name', isSortable: true },
      { key: 'surname', headerName: 'Surname', isSortable: true },
      {
        key: 'age',
        headerName: 'Age',
        transform: ({ age }) => {
          return <div style={{ textAlign: 'right' }}>{age}</div>;
        },
        isSortable: true,
      },
      { key: 'profession', headerName: 'Profession', isSortable: true },
    ];

    const mockOnSort = jest.fn();

    const { container } = render(
      <Table
        ariaLabelSortButtonUnset="Not sorted"
        ariaLabelSortButtonAscending="Sorted in ascending order"
        ariaLabelSortButtonDescending="Sorted in descending order"
        caption={caption}
        cols={colsWithSorting}
        rows={rows}
        indexKey={indexKey}
        onSort={mockOnSort}
        renderIndexCol={renderIndexCol}
      />,
    );

    userEvent.click(container.querySelector('[data-testid="hds-table-sorting-header-age"]') as HTMLButtonElement);

    expect(mockOnSort).toHaveBeenCalledTimes(1);
  });

  it('Should successfully select and deselect a single row', () => {
    const TableWithSelection = () => {
      const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);
      return (
        <Table
          checkboxSelection
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          ariaLabelCheckboxSelection="Row selection"
          heading={heading}
          cols={cols}
          rows={rows}
          indexKey={indexKey}
          renderIndexCol={renderIndexCol}
        />
      );
    };

    const { container } = render(<TableWithSelection />);

    expect(container.querySelector('[id="hds-table-id-checkbox-1000"]')).not.toBeChecked();

    userEvent.click(container.querySelector('[id="hds-table-id-checkbox-1000"]') as HTMLButtonElement);
    expect(container.querySelector('[id="hds-table-id-checkbox-1000"]')).toBeChecked();

    userEvent.click(container.querySelector('[id="hds-table-id-checkbox-1000"]') as HTMLButtonElement);
    expect(container.querySelector('[id="hds-table-id-checkbox-1000"]')).not.toBeChecked();
  });

  it('Should successfully select all and deselect all rows', () => {
    const TableWithSelection = () => {
      const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);
      return (
        <Table
          checkboxSelection
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          ariaLabelCheckboxSelection="Row selection"
          heading={heading}
          cols={cols}
          rows={rows}
          indexKey={indexKey}
          renderIndexCol={renderIndexCol}
        />
      );
    };

    const { container } = render(<TableWithSelection />);

    rows.forEach((row) => {
      expect(container.querySelector(`[id="hds-table-id-checkbox-${row.id}"]`)).not.toBeChecked();
    });

    userEvent.click(
      container.querySelector('[data-testid="hds-table-select-all-button-hds-table-data-testid"]') as HTMLButtonElement,
    );
    rows.forEach((row) => {
      expect(container.querySelector(`[id="hds-table-id-checkbox-${row.id}"]`)).toBeChecked();
    });

    userEvent.click(
      container.querySelector(
        '[data-testid="hds-table-deselect-all-button-hds-table-data-testid"]',
      ) as HTMLButtonElement,
    );
    rows.forEach((row) => {
      expect(container.querySelector(`[id="hds-table-id-checkbox-${row.id}"]`)).not.toBeChecked();
    });
  });
});
