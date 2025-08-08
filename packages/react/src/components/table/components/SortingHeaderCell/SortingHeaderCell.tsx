/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';

import '../../../../styles/base.module.css';
import styles from '../../Table.module.scss';
import {
  IconSort,
  IconSortAlphabeticalAscending,
  IconSortAlphabeticalDescending,
  IconSortAscending,
  IconSortDescending,
} from '../../../../icons';

export type SortingHeaderCellProps = {
  ariaLabelSortButtonUnset: string;
  ariaLabelSortButtonAscending: string;
  ariaLabelSortButtonDescending: string;
  colKey: string;
  onSort?: (order: 'asc' | 'desc', colKey: string, handleSort: () => void) => void;
  order: 'unset' | 'asc' | 'desc';
  title: string;
  setSortingAndOrder: (colKey: string) => void;
  sortIconType: 'string' | 'other';
} & React.ComponentPropsWithoutRef<'th'>;

type SortingIconProps = {
  order: 'unset' | 'asc' | 'desc';
  sortIconType: 'string' | 'other';
};

const renderSortIcon = ({ order, sortIconType }: SortingIconProps) => {
  if (order === 'unset') {
    return <IconSort className={styles.sortIcon} />;
  }
  if (order === 'asc') {
    if (sortIconType === 'string') {
      return <IconSortAlphabeticalAscending className={styles.sortIcon} />;
    }
    return <IconSortAscending className={styles.sortIcon} />;
  }

  if (sortIconType === 'string') {
    return <IconSortAlphabeticalDescending className={styles.sortIcon} />;
  }

  return <IconSortDescending className={styles.sortIcon} />;
};

const resolveNewOrder = ({ previousOrder }) => {
  if (previousOrder === 'unset') {
    return 'asc';
  }

  return previousOrder === 'desc' ? 'asc' : 'desc';
};

export const SortingHeaderCell = ({
  ariaLabelSortButtonUnset,
  ariaLabelSortButtonAscending,
  ariaLabelSortButtonDescending,
  colKey,
  onSort,
  title,
  setSortingAndOrder,
  order = 'unset',
  sortIconType = 'string',
  ...rest
}: SortingHeaderCellProps) => {
  const sortingCallback = () => {
    setSortingAndOrder(colKey);
  };

  const orderLabel = {
    unset: ariaLabelSortButtonUnset,
    asc: ariaLabelSortButtonAscending,
    desc: ariaLabelSortButtonDescending,
  }[order];

  return (
    <th className={styles.sortingHeader} scope="col" {...rest}>
      <div className={styles.sortColumnCell}>
        <button
          data-testid={`hds-table-sorting-header-${colKey}`}
          className={styles.sortButton}
          type="button"
          aria-label={orderLabel}
          onClick={(event) => {
            // Prevent default to not submit form if we happen to be inside form
            event.preventDefault();
            if (onSort) {
              onSort(resolveNewOrder({ previousOrder: order }), colKey, sortingCallback);
            } else {
              setSortingAndOrder(colKey);
            }
          }}
        >
          <span>{title}</span>
          {renderSortIcon({ order, sortIconType })}
        </button>
      </div>
    </th>
  );
};
