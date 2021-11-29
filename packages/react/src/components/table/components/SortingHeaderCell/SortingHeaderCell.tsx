import React from 'react';

// import core base styles
import 'hds-core';
import styles from '../../Table.module.scss';
import {
  IconSort,
  IconSortAlphabeticalAscending,
  IconSortAlphabeticalDescending,
  IconSortAscending,
  IconSortDescending,
} from '../../../../icons';

export type SortingHeaderCellProps = React.ComponentPropsWithoutRef<'th'> & {
  ariaLabelSortButtonUnset: string;
  ariaLabelSortButtonAscending: string;
  ariaLabelSortButtonDescending: string;
  colKey: string;
  setSortingAndOrder: Function;
  order: 'unset' | 'asc' | 'desc';
  title: string;
  sortIconType: 'string' | 'other';
};

type SortingIconProps = {
  ariaLabelSortButtonUnset: string;
  ariaLabelSortButtonAscending: string;
  ariaLabelSortButtonDescending: string;
  order: 'unset' | 'asc' | 'desc';
  sortIconType: 'string' | 'other';
};

const renderSortIcon = ({
  ariaLabelSortButtonUnset,
  ariaLabelSortButtonAscending,
  ariaLabelSortButtonDescending,
  order,
  sortIconType,
}: SortingIconProps) => {
  if (order === 'unset') {
    return <IconSort className={styles.sortIcon} aria-label={ariaLabelSortButtonUnset} />;
  }
  if (order === 'asc') {
    if (sortIconType === 'string') {
      return <IconSortAlphabeticalAscending className={styles.sortIcon} aria-label={ariaLabelSortButtonAscending} />;
    }
    return <IconSortAscending className={styles.sortIcon} aria-label={ariaLabelSortButtonAscending} />;
  }

  if (sortIconType === 'string') {
    return <IconSortAlphabeticalDescending className={styles.sortIcon} aria-label={ariaLabelSortButtonDescending} />;
  }

  return <IconSortDescending className={styles.sortIcon} aria-label={ariaLabelSortButtonDescending} />;
};

export const SortingHeaderCell = ({
  ariaLabelSortButtonUnset,
  ariaLabelSortButtonAscending,
  ariaLabelSortButtonDescending,
  colKey,
  title,
  setSortingAndOrder,
  order = 'unset',
  sortIconType = 'string',
  ...rest
}: SortingHeaderCellProps) => {
  return (
    <th className={styles.sortingHeader} scope="col" {...rest}>
      <div className={styles.sortColumnCell}>
        <button
          data-testid={`hds-table-sorting-header-${colKey}`}
          className={styles.sortButton}
          type="button"
          onClick={(event) => {
            // Prevent default to not submit form if we happen to be inside form
            event.preventDefault();
            setSortingAndOrder(colKey);
          }}
        >
          <span>{title}</span>
          {renderSortIcon({
            ariaLabelSortButtonUnset,
            ariaLabelSortButtonAscending,
            ariaLabelSortButtonDescending,
            order,
            sortIconType,
          })}
        </button>
      </div>
    </th>
  );
};
