import React, { useEffect, useMemo, useState } from 'react';

// import core base styles
import 'hds-core';
import styles from './Table.module.scss';
import { Table } from './Table';
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

export type DataTableProps = React.ComponentPropsWithoutRef<'table'> & {
  cellConfig: {
    cols: Array<Header>;
    sortingEnabled?: boolean;
    initialSortingColumnKey?: string; // undefined -> neutral order for all columns
    initialSortingOrder?: 'asc' | 'desc';
    ariaLabelSortButtonNeutral?: string;
    ariaLabelSortButtonAscending?: string;
    ariaLabelSortButtonDescending?: string;
    indexKey: string; // column key used as unique identifier for row
    renderIndexCol?: boolean; // whether index colum is rendered in table. Defaults to true.
  };
  rows: Array<object>;
  verticalHeaders?: Array<Header>;
  variant?: 'dark' | 'light';
  dense?: boolean;
  zebra?: boolean;
  caption?: string | React.ReactNode;
  verticalLines?: boolean;
  textAlignContentRight?: boolean; // defaults to false -> text is aligned left
  checkboxSelection?: boolean;
  ariaLabelCheckboxSelection?: string;
  setSelections?: Function; // Callback that gets called with all selected row id values
  initiallySelectedRows?: any[]; // Initially selected rows. Apply corresponding indexKey values here.
  /**
   * Custom theme styles
   */
  theme?: TableCustomTheme;
  heading?: string;
  headingAriaLevel?: number;
  customActionButtons?: React.ReactNode[];
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
  checkboxSelection,
  ariaLabelCheckboxSelection,
  initiallySelectedRows,
  rows,
  variant = 'dark',
  heading,
  headingAriaLevel = 2,
  dense = false,
  zebra = false,
  verticalLines = false,
  verticalHeaders,
  textAlignContentRight = false,
  setSelections,
  caption,
  theme,
  customActionButtons,
  ...rest
}: DataTableProps) => {
  if (cellConfig.renderIndexCol === undefined) {
    // eslint-disable-next-line no-param-reassign
    cellConfig.renderIndexCol = true;
  }
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

  const [sorting, setSorting] = useState<string>(cellConfig.initialSortingColumnKey);
  const [order, setOrder] = useState<'asc' | 'desc' | undefined>(cellConfig.initialSortingOrder);
  const [selectedRows, setSelectedRows] = useState<any[]>(initiallySelectedRows || []);
  const customThemeClass = useTheme<TableCustomTheme>(variant === 'dark' ? styles.dark : styles.light, theme);

  function selectAllRows() {
    const allRows = rows.map((row) => {
      return row[cellConfig.indexKey];
    });
    setSelectedRows(allRows);
  }

  function deSelectAllRows() {
    setSelectedRows([]);
  }

  useEffect(() => {
    if (setSelections) {
      setSelections(selectedRows);
    }
  }, [setSelections, selectedRows]);

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

  const firstRenderedColumnKey = cellConfig.cols.find((column) => {
    if (!cellConfig.renderIndexCol) {
      return column.key !== cellConfig.indexKey;
    }
    return true;
  }).key;

  return (
    <>
      {(checkboxSelection || heading || (customActionButtons && customActionButtons.length > 0)) && (
        <div className={styles.actionContainer}>
          {heading && (
            <div role="heading" aria-level={headingAriaLevel} className={styles.heading}>
              {heading}
            </div>
          )}
          {(checkboxSelection || (customActionButtons && customActionButtons.length > 0)) && (
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
                  >
                    Select all rows
                  </Button>
                  <Button
                    onClick={() => {
                      deSelectAllRows();
                    }}
                    variant="secondary"
                    size="small"
                    disabled={selectedRows.length === 0}
                  >
                    Clear selections
                  </Button>
                </>
              )}
              {customActionButtons &&
                customActionButtons.length > 0 &&
                customActionButtons.map((actionButton) => {
                  return actionButton;
                })}
            </div>
          )}
        </div>
      )}
      <Table
        variant={variant}
        dense={dense}
        zebra={zebra}
        verticalLines={verticalLines}
        customThemeClass={customThemeClass}
        {...rest}
      >
        {caption && <caption className={styles.caption}>{caption}</caption>}
        {verticalHeaders && verticalHeaders.length && <Table.VerticalHeaderColGroup />}
        <thead>
          <Table.HeaderRow>
            {verticalHeaders && verticalHeaders.length && <td role="presentation" />}
            {checkboxSelection && <td className={styles.checkboxHeader} />}
            {cellConfig.cols.map((column) => {
              if (column.key === cellConfig.indexKey && !cellConfig.renderIndexCol) {
                return null;
              }
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
            <tr key={row[cellConfig.indexKey]}>
              {verticalHeaders && verticalHeaders.length && <th scope="row">{verticalHeaders[index].headerName}</th>}
              {checkboxSelection && (
                <td className={styles.checkboxData}>
                  <Checkbox
                    checked={selectedRows.includes(row[cellConfig.indexKey])}
                    id={row[cellConfig.indexKey]}
                    label=""
                    aria-label={`${ariaLabelCheckboxSelection || 'Row selection'} ${row[firstRenderedColumnKey]}`}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows([...selectedRows, row[cellConfig.indexKey]]);
                      } else {
                        const result = [
                          ...selectedRows.filter((selectedRow) => selectedRow !== row[cellConfig.indexKey]),
                        ];
                        setSelectedRows(result);
                      }
                    }}
                    className={styles.checkbox}
                  />
                </td>
              )}
              {cellConfig.cols.map((column, cellIndex) => {
                if (column.key === cellConfig.indexKey && !cellConfig.renderIndexCol) {
                  return null;
                }
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
    </>
  );
};
