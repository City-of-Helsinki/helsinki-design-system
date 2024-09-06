/* eslint-disable react/forbid-component-props */
import { screen, render, waitFor } from '@testing-library/react';
import React, { useRef, HTMLAttributes, useState } from 'react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import { Table, TableProps } from './Table';
import useForceRender from '../../hooks/useForceRender';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

const getMockedId = (prefix: string) => {
  return `${prefix}uniqueId`;
};

const defaultCheckboxIdPrefix = `${getMockedId('hds-table-id-')}-checkbox-`;
const defaultHeadingId = getMockedId('hds-table-heading-');

jest.mock('lodash', () => ({
  ...(jest.requireActual('lodash') as Record<string, unknown>),
  uniqueId: (prefix: string) => {
    return getMockedId(prefix);
  },
}));

describe('<Table /> spec', () => {
  let cols: TableProps['cols'] = [];
  let rows: TableProps['rows'] = [];
  let caption: TableProps['caption'];
  let heading: TableProps['heading'];
  let indexKey: string = '';
  let renderIndexCol: boolean = false;
  let defaultProps: TableProps = {
    caption,
    cols,
    rows,
    indexKey,
    renderIndexCol,
  };

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

    defaultProps = {
      caption,
      cols,
      rows,
      indexKey,
      renderIndexCol,
      'data-testid': 'hds-table-data-testid',
    };
  });

  it('renders the component', () => {
    const { asFragment } = render(
      <Table
        {...defaultProps}
        id="table-id"
        headingId="heading-id"
        caption={undefined}
        heading="Heading"
        checkboxSelection
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render index column', () => {
    render(<Table {...defaultProps} renderIndexCol />);
    expect(screen.getByText('Not rendered')).toBeInTheDocument();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Table {...defaultProps} renderIndexCol={renderIndexCol} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Table element should not have a default id. Checkbox and heading both have.', async () => {
    const { container } = render(
      <Table
        {...defaultProps}
        heading="Heading"
        checkboxSelection
        caption={undefined}
        renderIndexCol={renderIndexCol}
      />,
    );
    const tableElement = container.querySelector('table') as HTMLTableElement;
    expect(tableElement.getAttribute('id')).toBeNull();

    const checkboxElement = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkboxElement.getAttribute('id')).toBe(`${defaultCheckboxIdPrefix}1000`);

    const headingElement = container.querySelector('div[role="heading"]') as HTMLDivElement;
    expect(headingElement.getAttribute('id')).toBe(defaultHeadingId);
  });

  it('Table element should have given id. Checkbox and heading use it as prefix', async () => {
    const id = 'table-id';
    const { container } = render(
      <Table {...defaultProps} id={id} caption={undefined} heading="Heading" checkboxSelection />,
    );
    const tableElement = container.querySelector('table') as HTMLTableElement;
    expect(tableElement.getAttribute('id')).toBe(id);

    const checkboxElement = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkboxElement.getAttribute('id')).toBe(`${id}-checkbox-1000`);

    const headingElement = container.querySelector('div[role="heading"]') as HTMLDivElement;
    expect(headingElement.getAttribute('id')).toBe(`${id}-table-heading`);
  });

  it('Given headingId is set to the heading element.', async () => {
    const id = 'table-id';
    const headingId = 'heading-id';
    const { container } = render(
      <Table {...defaultProps} id={id} headingId={headingId} caption={undefined} heading="Heading" />,
    );
    const headingElement = container.querySelector('div[role="heading"]') as HTMLDivElement;
    expect(headingElement.getAttribute('id')).toBe(headingId);
  });
  it('Ids do not change between renders - unless explicitly changed.', async () => {
    let tableId: string | undefined;
    let headingId: string | undefined;
    const renderCountIndicatorId = 'render-count-id';
    const reRenderButtonId = 're-render-id';

    const IdUpdateComponent = () => {
      const renderCountRef = useRef(1);
      const forceRender = useForceRender();
      const updateAndRender = () => {
        renderCountRef.current += 1;
        forceRender();
      };
      return (
        <div>
          <button id={reRenderButtonId} type="button" onClick={updateAndRender}>
            Re-render
          </button>
          <span id={renderCountIndicatorId}>{renderCountRef.current}</span>
          <Table
            {...defaultProps}
            id={tableId}
            headingId={headingId}
            caption={undefined}
            heading="Heading"
            checkboxSelection
          />
          ,
        </div>
      );
    };

    const { container } = render(<IdUpdateComponent />);

    const waitForUpdate = async () => {
      const getRenderId = () => (container.querySelector(`#${renderCountIndicatorId}`) as HTMLSpanElement).innerHTML;
      const renderId = getRenderId();
      await waitFor(() => {
        if (getRenderId() === renderId) {
          throw new Error('Render time not updated');
        }
      });
    };
    const reRenderAndWaitForUpdate = async () => {
      const button = container.querySelector(`#${reRenderButtonId}`) as HTMLButtonElement;
      const updatePromise = waitForUpdate();
      userEvent.click(button);
      await updatePromise;
    };

    const getIds = () => {
      const tableElement = container.querySelector('table') as HTMLTableElement;

      const checkboxElement = container.querySelector('input[type="checkbox"]') as HTMLInputElement;

      const headingElement = container.querySelector('div[role="heading"]') as HTMLDivElement;

      return [tableElement.getAttribute('id'), checkboxElement.getAttribute('id'), headingElement.getAttribute('id')];
    };

    expect(getIds()).toEqual([null, `${defaultCheckboxIdPrefix}1000`, defaultHeadingId]);

    await reRenderAndWaitForUpdate();
    await reRenderAndWaitForUpdate();
    await reRenderAndWaitForUpdate();
    expect(getIds()).toEqual([null, `${defaultCheckboxIdPrefix}1000`, defaultHeadingId]);

    tableId = 'new-table-id';
    await reRenderAndWaitForUpdate();
    expect(getIds()).toEqual([tableId, `${tableId}-checkbox-1000`, `${tableId}-table-heading`]);

    headingId = 'new-heading-id';
    await reRenderAndWaitForUpdate();
    expect(getIds()).toEqual([tableId, `${tableId}-checkbox-1000`, headingId]);

    tableId = undefined;
    headingId = undefined;
    await reRenderAndWaitForUpdate();
    expect(getIds()).toEqual([null, `${defaultCheckboxIdPrefix}1000`, defaultHeadingId]);
  });

  it('native html props are passed to the element', async () => {
    const tableProps = getCommonElementTestProps<'table'>('table');
    const { getByTestId } = render(
      <Table {...tableProps} caption={caption} cols={cols} rows={rows} indexKey={indexKey} renderIndexCol />,
    );
    const element = getByTestId(tableProps['data-testid']);
    expect(
      getElementAttributesMisMatches(element, {
        ...tableProps,
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
        {...defaultProps}
        ariaLabelSortButtonUnset="Not sorted"
        ariaLabelSortButtonAscending="Sorted in ascending order"
        ariaLabelSortButtonDescending="Sorted in descending order"
        caption={caption}
        cols={colsWithSorting}
      />,
    );
    const ageOfFirstRow = container.querySelector('[data-testid="age-0"] > div');
    expect(ageOfFirstRow).toHaveTextContent('39');
    userEvent.click(container.querySelector('[data-testid="hds-table-sorting-header-age"]') as HTMLElement);
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
        {...defaultProps}
        ariaLabelSortButtonUnset="Not sorted"
        ariaLabelSortButtonAscending="Sorted in ascending order"
        ariaLabelSortButtonDescending="Sorted in descending order"
        cols={colsWithSorting}
        indexKey={indexKey}
        onSort={mockOnSort}
      />,
    );

    userEvent.click(container.querySelector('[data-testid="hds-table-sorting-header-age"]') as HTMLElement);

    expect(mockOnSort).toHaveBeenCalledTimes(1);
  });

  it('Should successfully select and deselect a single row', () => {
    const TableWithSelection = () => {
      const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
      return (
        <Table
          {...defaultProps}
          checkboxSelection
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          ariaLabelCheckboxSelection="Row selection"
          heading={heading}
          caption={undefined}
          indexKey={indexKey}
        />
      );
    };

    const { container } = render(<TableWithSelection />);

    expect(container.querySelector(`[id="${defaultCheckboxIdPrefix}1000"]`)).not.toBeChecked();

    userEvent.click(container.querySelector(`[id="${defaultCheckboxIdPrefix}1000"]`) as HTMLElement);
    expect(container.querySelector(`[id="${defaultCheckboxIdPrefix}1000"]`)).toBeChecked();

    userEvent.click(container.querySelector(`[id="${defaultCheckboxIdPrefix}1000"]`) as HTMLElement);
    expect(container.querySelector(`[id="${defaultCheckboxIdPrefix}1000"]`)).not.toBeChecked();
  });

  it('Should successfully select all and deselect all rows', () => {
    const TableWithSelection = () => {
      const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
      return (
        <Table
          {...defaultProps}
          checkboxSelection
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          ariaLabelCheckboxSelection="Row selection"
          heading={heading}
          caption={undefined}
          indexKey={indexKey}
        />
      );
    };

    const { container } = render(<TableWithSelection />);

    rows.forEach((row) => {
      expect(
        container.querySelector(`[id="${defaultCheckboxIdPrefix}${(row as Record<string, string>).id}"]`),
      ).not.toBeChecked();
    });

    userEvent.click(
      container.querySelector('[data-testid="hds-table-select-all-button-hds-table-data-testid"]') as HTMLElement,
    );
    rows.forEach((row) => {
      expect(
        container.querySelector(`[id="${defaultCheckboxIdPrefix}${(row as Record<string, string>).id}"]`),
      ).toBeChecked();
    });

    userEvent.click(
      container.querySelector('[data-testid="hds-table-deselect-all-button-hds-table-data-testid"]') as HTMLElement,
    );
    rows.forEach((row) => {
      expect(
        container.querySelector(`[id="${defaultCheckboxIdPrefix}${(row as Record<string, string>).id}"]`),
      ).not.toBeChecked();
    });
  });
});
