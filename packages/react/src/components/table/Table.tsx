import React, { useEffect, useMemo, useState } from 'react';

// import core base styles
import 'hds-core';
import styles from './Table.module.scss';
import { TableContainer } from './components/TableContainer';
import { HeaderRow } from './components/HeaderRow';
import { VerticalHeaderColGroup } from './components/VerticalHeaderColGroup';
import { SortingHeaderCell } from './components/SortingHeaderCell';
import { TableBody } from './components/TableBody';
import { Checkbox } from '../checkbox';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../button';

type Header = {
  key: string;
  headerName: string;
  sortIconType?: 'string' | 'other';
  transform?: ({ args }: any) => string | JSX.Element; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export interface TableCustomTheme {
  '--background-color'?: string;
}

type SelectedRow = string | number;

export type TableProps = React.ComponentPropsWithoutRef<'table'> & {
  ariaLabelCheckboxSelection?: string;
  ariaLabelSortButtonAscending?: string;
  ariaLabelSortButtonDescending?: string;
  ariaLabelSortButtonUnset?: string;
  caption?: string | React.ReactNode;
  checkboxSelection?: boolean;
  clearSelectionsText?: string;
  cols: Array<Header>;
  customActionButtons?: React.ReactNode[];
  dataTestId?: string;
  dense?: boolean;
  heading?: string;
  headingAriaLevel?: number;
  headingId?: string; // id that is passed to heading. Only applicable when heading prop is used.
  indexKey: string; // column key used as unique identifier for row
  initialSortingColumnKey?: string; // undefined -> unset order for all columns
  initialSortingOrder?: 'asc' | 'desc';
  renderIndexCol?: boolean; // whether index colum is rendered in table. Defaults to true.
  rows: Array<object>;
  selectAllRowsText?: string;
  selectedRows?: SelectedRow[];
  setSelectedRows?: Function; // Callback that gets called with all selected row id values
  sortingEnabled?: boolean;
  textAlignContentRight?: boolean; // defaults to false -> text is aligned left
  theme?: TableCustomTheme; // Custom theme styles
  variant?: 'dark' | 'light';
  verticalHeaders?: Array<Header>;
  verticalLines?: boolean;
  zebra?: boolean;
};

const processRows = (rows, order, sorting, sortingEnabled, cols) => {
  if (!sortingEnabled || !order || !sorting) {
    return [...rows];
  }

  const sortColumn = cols.find((column) => {
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
};

export const Table = ({
  ariaLabelCheckboxSelection,
  ariaLabelSortButtonAscending,
  ariaLabelSortButtonDescending,
  ariaLabelSortButtonUnset,
  caption,
  checkboxSelection,
  clearSelectionsText,
  cols,
  customActionButtons,
  dataTestId,
  dense = false,
  heading,
  headingAriaLevel = 2,
  headingId = 'hds-table',
  indexKey,
  initialSortingColumnKey,
  initialSortingOrder,
  renderIndexCol = true,
  rows,
  selectAllRowsText,
  selectedRows,
  setSelectedRows,
  sortingEnabled = false,
  textAlignContentRight = false,
  theme,
  variant = 'dark',
  verticalHeaders,
  verticalLines = false,
  zebra = false,
  ...rest
}: TableProps) => {
  if (verticalHeaders && verticalHeaders.length && checkboxSelection) {
    // eslint-disable-next-line no-console
    console.warn(
      'Incompatible props verticalHeaders and checkboxSelection provided. Cannot use checkboxSelection when verticalHeaders is applied',
    );
    // eslint-disable-next-line no-param-reassign
    checkboxSelection = false;
  }

  if (checkboxSelection && caption) {
    // eslint-disable-next-line no-console
    console.warn('Cannot use caption prop when checkboxSelection is set to true. Use heading prop instead');
    // eslint-disable-next-line no-param-reassign
    caption = undefined;
  }

  const [sorting, setSorting] = useState<string>(initialSortingColumnKey);
  const [order, setOrder] = useState<'asc' | 'desc' | undefined>(initialSortingOrder);
  const customThemeClass = useTheme<TableCustomTheme>(variant === 'dark' ? styles.dark : styles.light, theme);

  const selectAllRows = () => {
    const allRows = rows.map((row) => {
      return row[indexKey];
    });
    setSelectedRows(allRows);
  };

  const deSelectAllRows = () => {
    setSelectedRows([]);
  };

  const setSortingAndOrder = (colKey: string): void => {
    if (sorting === colKey) {
      setOrder(order === 'desc' ? 'asc' : 'desc');
    } else {
      setOrder('asc');
    }
    setSorting(colKey);
  };

  const processedRows = useMemo(() => processRows(rows, order, sorting, sortingEnabled, cols), [
    rows,
    sorting,
    order,
    sortingEnabled,
    cols,
  ]);

  const firstRenderedColumnKey = cols.find((column) => {
    if (!renderIndexCol) {
      return column.key !== indexKey;
    }
    return true;
  }).key;

  const hasCustomActionButtons = customActionButtons && customActionButtons.length > 0;

  const visibleColumns = renderIndexCol ? cols : cols.filter((column) => column.key !== indexKey);

  return (
    <>
      {(checkboxSelection || heading || hasCustomActionButtons) && (
        <div className={styles.actionContainer}>
          {heading && (
            <div id={headingId} role="heading" aria-level={headingAriaLevel} className={styles.heading}>
              {heading}
            </div>
          )}
          {(checkboxSelection || hasCustomActionButtons) && (
            <div className={styles.actionButtonContainer}>
              {checkboxSelection && (
                <>
                  <Button
                    onClick={() => {
                      selectAllRows();
                    }}
                    variant="secondary"
                    size="small"
                    disabled={selectedRows.length === rows.length}
                    className={styles.actionButton}
                    data-testid={
                      dataTestId ? `hds-table-select-all-button-${dataTestId}` : 'hds-table-select-all-button'
                    }
                  >
                    {selectAllRowsText || 'Valitse kaikki rivit'}
                  </Button>
                  <Button
                    onClick={() => {
                      deSelectAllRows();
                    }}
                    variant="secondary"
                    size="small"
                    disabled={selectedRows.length === 0}
                    className={styles.actionButton}
                    data-testid={
                      dataTestId ? `hds-table-deselect-all-button-${dataTestId}` : 'hds-table-deselect-all-button'
                    }
                  >
                    {clearSelectionsText || 'Tyhjennä valinnat'}
                  </Button>
                </>
              )}
              {hasCustomActionButtons &&
                customActionButtons.map((actionButton) => {
                  return actionButton;
                })}
            </div>
          )}
        </div>
      )}
      <TableContainer
        variant={variant}
        dataTestId={dataTestId}
        dense={dense}
        zebra={zebra}
        verticalLines={verticalLines}
        customThemeClass={customThemeClass}
        headingId={heading ? headingId : undefined}
        {...rest}
      >
        {caption && <caption className={styles.caption}>{caption}</caption>}
        {verticalHeaders && verticalHeaders.length && <VerticalHeaderColGroup />}
        <thead>
          <HeaderRow>
            {verticalHeaders && verticalHeaders.length && <td role="presentation" />}
            {checkboxSelection && <td className={styles.checkboxHeader} />}
            {visibleColumns.map((column) => {
              if (sortingEnabled) {
                return (
                  <SortingHeaderCell
                    key={column.key}
                    colKey={column.key}
                    title={column.headerName}
                    ariaLabelSortButtonUnset={ariaLabelSortButtonUnset}
                    ariaLabelSortButtonAscending={ariaLabelSortButtonAscending}
                    ariaLabelSortButtonDescending={ariaLabelSortButtonDescending}
                    setSortingAndOrder={setSortingAndOrder}
                    order={sorting === column.key ? order : 'unset'}
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
          </HeaderRow>
        </thead>
        <TableBody textAlignContentRight={textAlignContentRight}>
          {processedRows.map((row, index) => (
            <tr key={row[indexKey]}>
              {verticalHeaders && verticalHeaders.length && <th scope="row">{verticalHeaders[index].headerName}</th>}
              {checkboxSelection && (
                <td className={styles.checkboxData}>
                  <Checkbox
                    checked={selectedRows.includes(row[indexKey])}
                    id={`hds-table-checkbox-${row[indexKey]}`}
                    aria-label={`${ariaLabelCheckboxSelection || 'Rivin valinta'} ${row[firstRenderedColumnKey]}`}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows([...selectedRows, row[indexKey]]);
                      } else {
                        const result = [...selectedRows.filter((selectedRow) => selectedRow !== row[indexKey])];
                        setSelectedRows(result);
                      }
                    }}
                    className={styles.checkbox}
                  />
                </td>
              )}
              {visibleColumns.map((column, cellIndex) => {
                return (
                  <td
                    data-testid={`${column.key}-${index}`}
                    key={cellIndex} // eslint-disable-line react/no-array-index-key
                  >
                    {column.transform && column.transform(row)}
                    {!column.transform && row[column.key]}
                  </td>
                );
              })}
            </tr>
          ))}
        </TableBody>
      </TableContainer>
    </>
  );
};
