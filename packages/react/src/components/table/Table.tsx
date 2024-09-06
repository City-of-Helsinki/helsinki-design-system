import React, { useMemo, useState } from 'react';
import '../../styles/base.module.css';
import { uniqueId } from 'lodash';

import styles from './Table.module.scss';
import { TableContainer } from './components/TableContainer';
import { HeaderRow } from './components/HeaderRow';
import { VerticalHeaderColGroup } from './components/VerticalHeaderColGroup';
import { SortingHeaderCell } from './components/SortingHeaderCell';
import { TableBody } from './components/TableBody';
import { Checkbox } from '../checkbox';
import { useTheme } from '../../hooks/useTheme';
import { Button, ButtonSize, ButtonVariant } from '../button';
import classNames from '../../utils/classNames';
import { AllElementPropsWithoutRef } from '../../utils/elementTypings';

type Header = {
  /**
   * Boolean indicating whether a column is sortable
   */
  isSortable?: boolean;
  /**
   * Key of header. Maps with the corresponding row data keys.
   */
  key: string;
  /**
   * Visible header name that is rendered.
   */
  headerName: string;
  /**
   * Sort icon type to be used in sorting. Use type string if the content is a string, otherwise use type other.
   * @default 'string'
   */
  sortIconType?: 'string' | 'other';
  /**
   * Transform function for the corresponding row data. Use this to render custom content inside the table cell.
   */
  transform?: ({ args }: any) => string | JSX.Element; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export interface TableCustomTheme {
  /**
   * Custom background color for table headers.
   */
  '--header-background-color'?: string;
  /**
   * Custom background color for the table content.
   * @default 'var(--color-white)'
   */
  '--content-background-color'?: string;
}

type SelectedRow = string | number;

export type TableProps = AllElementPropsWithoutRef<'table'> & {
  /**
   * Aria-label for checkbox selection.
   * @default 'Rivin valinta'
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ariaLabelCheckboxSelection?: string;
  /**
   * Aria-label for sort button in ascending state.
   * @default 'Järjestetty nousevaan järjestykseen'
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ariaLabelSortButtonAscending?: string;
  /**
   * Aria-label for sort button in descending state.
   * @default 'Järjestetty laskevaan järjestykseen'
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ariaLabelSortButtonDescending?: string;
  /**
   * Aria-label for sort button in the unordered state.
   * @default ''
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ariaLabelSortButtonUnset?: string;
  /**
   * Caption of the table.
   */
  caption?: string | React.ReactNode;
  /**
   * Boolean indicating whether the table has the checkbox selection column to select rows.
   * @default false
   */
  checkboxSelection?: boolean;
  /**
   * Text for clear selected rows button.
   * @default 'Tyhjennä valinnat'
   */
  clearSelectionsText?: string;
  /**
   * Columns of the table header row. Defines header name, optional sort icon type and optional cell row transform function.
   */
  cols: Array<Header>;
  /**
   *  Custom action buttons to place on top of the table.
   */
  customActionButtons?: React.ReactNode[];
  /**
   * Boolean indicating whether to use the dense variant of the table.
   * @default false
   */
  dense?: boolean;
  /**
   * Table heading.
   */
  heading?: string;
  /**
   * Table heading aria level.
   */
  headingAriaLevel?: number;
  /**
   * A custom class name passed to table heading.
   */
  headingClassName?: string;
  /**
   * Table heading id. Used to name table to assistive technologies. Only applicable when heading prop is used. An id is created from the `id` prop or with `lodash.uniqueId`, if a value is not passed.
   */
  headingId?: string;
  /**
   * Id that is passed to the native html table element and used as a prefix for the `id` attribute of the Checkbox component, if `checkboxSelection` is `true`. An unique id for the checkbox is created, if a value is not passed.
   */
  id?: string;
  /**
   * Column key used as a unique identifier for a row
   */
  indexKey: string;
  /**
   * Key indicating a column that you wish to be initially sorted. Use undefined to have no column initially sorted.
   */
  initialSortingColumnKey?: string;
  /**
   * Sorting order applied for initial sorting.
   */
  initialSortingOrder?: 'asc' | 'desc';
  /**
   * Function for providing side effects before or after the sort. If you want to use the component's own sorting function, call the handleSort callback function.
   * @param order
   * @param colKey
   * @param handleSort
   */
  onSort?: (order: 'asc' | 'desc', colKey: string, handleSort: () => void) => void;
  /**
   * Boolean indicating whether index column is rendered in the table.
   * @default true
   */
  renderIndexCol?: boolean;
  /**
   * Table rows. An array of objects where keys map with the keys of col.
   */
  rows: Array<object>;
  /**
   * Text for the select all rows button.
   * @default 'Valitse kaikki rivit'
   */
  selectAllRowsText?: string;
  /**
   * Selected table rows.
   */
  selectedRows?: SelectedRow[];
  /**
   * Callback that updates selected rows.
   */
  setSelectedRows?: React.Dispatch<React.SetStateAction<SelectedRow[]>>;
  /**
   * Boolean indicating whether table data cell text content is aligned right. Default is false -> text is aligned left.
   * @default false
   */
  textAlignContentRight?: boolean;
  /**
   * Custom theme to change table header background color.
   */
  theme?: TableCustomTheme; // Custom theme styles
  /**
   * Table variant. Use dark for dark brand background colors, and light for light brand background colors.
   * @default 'dark'
   */
  variant?: 'dark' | 'light';
  /**
   * Vertical headers of the table.
   */
  verticalHeaders?: Array<Header>;
  /**
   * Boolean indicating whether the table has vertical lines on columns
   */
  verticalLines?: boolean;
  /**
   * Boolean indicating whether the table has alternating row colors zebra style.
   */
  zebra?: boolean;
};

const processRows = (rows, order, sorting, cols) => {
  const sortingEnabled = cols.some((column) => {
    return column.isSortable === true;
  });

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
  ariaLabelCheckboxSelection = 'Rivin valinta',
  ariaLabelSortButtonAscending = 'Järjestetty nousevaan järjestykseen',
  ariaLabelSortButtonDescending = 'Järjestetty laskevaan järjestykseen',
  ariaLabelSortButtonUnset = '',
  caption,
  checkboxSelection = false,
  clearSelectionsText = 'Tyhjennä valinnat',
  cols,
  customActionButtons,
  'data-testid': dataTestId,
  dense = false,
  heading,
  headingAriaLevel = 2,
  headingClassName,
  headingId,
  id,
  indexKey,
  initialSortingColumnKey,
  initialSortingOrder,
  onSort,
  renderIndexCol = true,
  rows,
  selectAllRowsText = 'Valitse kaikki rivit',
  selectedRows = [],
  setSelectedRows,
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
  const checkboxIdPrefix = useMemo<string>(() => {
    const prefix = id || uniqueId('hds-table-id-');
    return `${prefix}-checkbox-`;
  }, [id]);
  const uniqueHeadingId = useMemo<string>(() => {
    if (headingId) {
      return headingId;
    }
    if (id) {
      return `${id}-table-heading`;
    }
    return uniqueId('hds-table-heading-');
  }, [headingId, id]);
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

  const processedRows = useMemo(() => processRows(rows, order, sorting, cols), [rows, sorting, order, cols]);

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
            <div
              id={uniqueHeadingId}
              role="heading"
              aria-level={headingAriaLevel}
              className={classNames(styles.heading, headingClassName)}
            >
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
                    variant={ButtonVariant.Secondary}
                    size={ButtonSize.Small}
                    disabled={selectedRows.length === rows.length}
                    className={styles.actionButton}
                    data-testid={dataTestId ? `hds-table-select-all-button-${dataTestId}` : undefined}
                  >
                    {selectAllRowsText}
                  </Button>
                  <Button
                    onClick={() => {
                      deSelectAllRows();
                    }}
                    variant={ButtonVariant.Secondary}
                    size={ButtonSize.Small}
                    disabled={selectedRows.length === 0}
                    className={styles.actionButton}
                    data-testid={dataTestId ? `hds-table-deselect-all-button-${dataTestId}` : undefined}
                  >
                    {clearSelectionsText}
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
        // eslint-disable-next-line react/forbid-component-props
        data-testid={dataTestId}
        dense={dense}
        id={id}
        zebra={zebra}
        verticalLines={verticalLines}
        customThemeClass={customThemeClass}
        headingId={heading ? uniqueHeadingId : undefined}
        {...rest}
      >
        {caption && <caption className={styles.caption}>{caption}</caption>}
        {verticalHeaders && verticalHeaders.length && <VerticalHeaderColGroup />}
        <thead>
          <HeaderRow>
            {/* eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role */}
            {verticalHeaders && verticalHeaders.length && <td role="presentation" />}
            {checkboxSelection && <td className={styles.checkboxHeader} />}
            {visibleColumns.map((column) => {
              if (column.isSortable) {
                return (
                  <SortingHeaderCell
                    key={column.key}
                    colKey={column.key}
                    title={column.headerName}
                    // eslint-disable-next-line react/forbid-component-props
                    ariaLabelSortButtonUnset={ariaLabelSortButtonUnset}
                    // eslint-disable-next-line react/forbid-component-props
                    ariaLabelSortButtonAscending={ariaLabelSortButtonAscending}
                    // eslint-disable-next-line react/forbid-component-props
                    ariaLabelSortButtonDescending={ariaLabelSortButtonDescending}
                    setSortingAndOrder={setSortingAndOrder}
                    onSort={onSort}
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
                    id={`${checkboxIdPrefix}${row[indexKey]}`}
                    aria-label={`${ariaLabelCheckboxSelection} ${row[firstRenderedColumnKey]}`}
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
