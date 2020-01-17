import React from 'react';
import classNames from 'classnames';
import {
  useTable,
  useExpanded,
  useSortBy,
  useRowSelect,
  TableOptions,
  HeaderProps,
  Row,
  HeaderGroup,
  Column as ColumnType,
} from 'react-table';

import AngleLeft from '../../icons/IconArrowLeft';
import AngleDown from '../../icons/IconArrowRight';
import Checkbox from './checkbox/Checkbox';
import styles from './table.module.scss';

export type Column<D extends object> = ColumnType<D>;

export type TableProps<D extends object> = {
  data: D[];
  canSelectRows?: boolean;
  renderSubComponent?: (row: Row<D>) => React.ReactNode;
  renderMainHeader?: (props: HeaderProps<D>) => React.ReactNode;
} & TableOptions<D>;

const EXPANDER = 'EXPANDER';
const MAIN_HEADER = 'MAIN_HEADER';
const SELECTOR = 'SELECTOR';

const Table = <D extends object>({
  columns,
  data: tableData,
  canSelectRows,
  renderSubComponent,
  renderMainHeader,
}: TableProps<D>) => {
  const selectorCol: Column<D> = {
    Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
    Header: ({ getToggleAllRowsSelectedProps }) => <Checkbox {...getToggleAllRowsSelectedProps()} />,
    id: SELECTOR,
  };

  const expanderCol: Column<D> = {
    Cell: ({ row }) => (
      <div {...row.getExpandedToggleProps()} className={styles.expandArrowWrapper}>
        {row.isExpanded ? <AngleLeft /> : <AngleDown />}
      </div>
    ),
    Header: ({ state, toggleExpanded }) => (
      <span
        tabIndex={0}
        role="button"
        onKeyPress={() => Object.keys(state.expanded).forEach(path => toggleExpanded([path], false))}
        onClick={() => Object.keys(state.expanded).forEach(path => toggleExpanded([path], false))}
      >
        Pienennä kaikki
      </span>
    ),
    id: EXPANDER,
  };

  const tableColumns = React.useMemo(() => {
    const headers = [...(canSelectRows ? [selectorCol] : []), ...columns, ...(renderSubComponent ? [expanderCol] : [])];

    const withMainHeader = [
      {
        Header: renderMainHeader,
        columns: headers,
        id: MAIN_HEADER,
      },
    ];

    return renderMainHeader ? withMainHeader : headers;
  }, [canSelectRows, columns, renderSubComponent, renderMainHeader, selectorCol, expanderCol]);

  const data = React.useMemo(() => tableData, [tableData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, flatColumns } = useTable(
    {
      columns: tableColumns,
      data,
    },
    useSortBy,
    useExpanded,
    useRowSelect,
  );

  const renderTableHead = (headerGroup: HeaderGroup<D>) => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map(column => (
        <th
          {...column.getHeaderProps(column.getSortByToggleProps())}
          className={classNames(styles.tableHeader, {
            [styles.mainHeader]: renderMainHeader && column.depth === 0,
            [styles.selector]: column.id === SELECTOR,
            [styles.expander]: column.id === EXPANDER,
          })}
        >
          {column.render('Header')}
          {column.isSorted && <div className={styles.arrow}>{column.isSortedDesc ? <AngleDown /> : <AngleLeft />}</div>}
        </th>
      ))}
    </tr>
  );

  const renderTableBody = (row: Row<D>) => {
    prepareRow(row);
    return (
      <React.Fragment key={row.index}>
        <tr
          {...row.getRowProps()}
          className={classNames(styles.tableRow, {
            [styles.selected]: row.isSelected,
          })}
        >
          {row.cells.map(cell => (
            <td {...cell.getCellProps()} className={styles.tableData}>
              <div
                className={classNames(styles.tableCell, {
                  [styles.selector]: cell.column.id === SELECTOR,
                })}
              >
                {cell.render('Cell')}
              </div>
            </td>
          ))}
        </tr>
        {renderSubComponent && row.isExpanded && (
          <tr className={classNames(styles.tableRow, styles.expandedRow)}>
            <td className={styles.tableData} colSpan={flatColumns.length}>
              {renderSubComponent(row)}
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  };

  return (
    <table {...getTableProps()} className={styles.table}>
      <thead>{headerGroups.map(renderTableHead)}</thead>
      <tbody {...getTableBodyProps()}>{rows.map(renderTableBody)}</tbody>
    </table>
  );
};

export default Table;
