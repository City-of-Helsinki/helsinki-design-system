import React, { useMemo, useState } from 'react';

// import core base styles
import 'hds-core';
import { Table } from './Table';

type Header = {
  key: string;
  headerName: string;
  sortIconType?: 'string' | 'other';
  transform?: ({ args }: any) => string | JSX.Element; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export type DataTableProps = React.ComponentPropsWithoutRef<'table'> & {
  cellConfig: {
    cols: Array<Header>;
    sortingEnabled?: boolean;
    initialSortingColumnKey?: string;
    initialSortingOrder?: 'asc' | 'desc';
    ariaLabelSortButtonNeutral?: string;
    ariaLabelSortButtonAscending?: string;
    ariaLabelSortButtonDescending?: string;
  };
  rows: Array<object>;
  verticalHeaders?: Array<Header>;
  verticalHeaderColumnAriaLabel?: string;
  variant?: 'dark' | 'light';
  dense?: boolean;
  zebra?: boolean;
  verticalLines?: boolean;
  textAlignContentRight?: boolean; // defaults to false -> text is aligned left
};

function processRows(rows, order, sorting, cellConfig) {
  if (!cellConfig.sortingEnabled || !order || !sorting) {
    return [...rows];
  }

  const sortColumn = cellConfig.cols.find((column) => {
    return column.key === sorting;
  });

  const customSortCompareFunction = sortColumn ? sortColumn.customSortCompareFunction : undefined;

  if (customSortCompareFunction) {
    const sortedRows = [...rows].sort((a, b) => {
      const aValue = a[sorting];
      const bValue = b[sorting];

      return customSortCompareFunction(aValue, bValue);
    });

    if (order === 'asc') {
      return sortedRows;
    }
    if (order === 'desc') {
      return sortedRows.reverse();
    }
  }

  return [...rows].sort((a, b) => {
    const aValue = a[sorting];
    const bValue = b[sorting];

    if (aValue < bValue) {
      return order === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return order === 'asc' ? 1 : -1;
    }

    return 0;
  });
}

export const DataTable = ({
  cellConfig,
  rows,
  variant = 'dark',
  dense = false,
  zebra = false,
  verticalLines = false,
  verticalHeaders,
  textAlignContentRight = false,
  ...rest
}: DataTableProps) => {
  const [sorting, setSorting] = useState<string>(cellConfig.initialSortingColumnKey);
  const [order, setOrder] = useState<'asc' | 'desc' | undefined>(cellConfig.initialSortingOrder);

  const setSortingAndOrder = (colKey: string): void => {
    if (sorting === colKey) {
      setOrder(order === 'desc' ? 'asc' : 'desc');
    } else {
      setOrder('asc');
    }
    setSorting(colKey);
  };

  const processedRows = useMemo(() => processRows(rows, order, sorting, cellConfig), [
    rows,
    sorting,
    order,
    cellConfig,
  ]);

  return (
    <Table variant={variant} dense={dense} zebra={zebra} verticalLines={verticalLines} {...rest}>
      {verticalHeaders && verticalHeaders.length && <Table.VerticalHeaderColGroup />}
      <thead>
        <Table.HeaderRow>
          {verticalHeaders && verticalHeaders.length && <td role="presentation" />}
          {cellConfig.cols.map((column) => {
            if (cellConfig.sortingEnabled) {
              return (
                <Table.SortingHeaderCell
                  key={column.key}
                  colKey={column.key}
                  title={column.headerName}
                  ariaLabelSortButtonNeutral={cellConfig.ariaLabelSortButtonNeutral}
                  ariaLabelSortButtonAscending={cellConfig.ariaLabelSortButtonAscending}
                  ariaLabelSortButtonDescending={cellConfig.ariaLabelSortButtonDescending}
                  setSortingAndOrder={setSortingAndOrder}
                  order={sorting === column.key ? order : 'neutral'}
                  sortIconType={column.sortIconType}
                />
              );
            }
            return (
              <th key={column.key} scope="col">
                {column.headerName}
              </th>
            );
          })}
        </Table.HeaderRow>
      </thead>
      <Table.TableBody textAlignContentRight={textAlignContentRight}>
        {processedRows.map((row, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <tr key={index}>
            {verticalHeaders && verticalHeaders.length && <th scope="row">{verticalHeaders[index].headerName}</th>}
            {cellConfig.cols.map((column, cellIndex) => {
              return (
                <td
                  key={cellIndex} // eslint-disable-line react/no-array-index-key
                >
                  {column.transform && column.transform(row)}
                  {!column.transform && row[column.key]}
                </td>
              );
            })}
          </tr>
        ))}
      </Table.TableBody>
    </Table>
  );
};
