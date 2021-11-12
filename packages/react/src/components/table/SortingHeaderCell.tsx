import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Table.module.scss';
import {
  IconSort,
  IconSortAlphabeticalAscending,
  IconSortAlphabeticalDescending,
  IconSortAscending,
  IconSortDescending,
} from '../../icons';

export type SortingHeaderCellProps = React.ComponentPropsWithoutRef<'th'> & {
  ariaLabelSortButtonNeutral: string;
  ariaLabelSortButtonAscending: string;
  ariaLabelSortButtonDescending: string;
  colKey: string;
  setSortingAndOrder: Function;
  order: 'neutral' | 'asc' | 'desc';
  title: string;
  sortIconType: 'string' | 'other';
};

type SortingIconProps = {
  ariaLabelSortButtonNeutral: string;
  ariaLabelSortButtonAscending: string;
  ariaLabelSortButtonDescending: string;
  order: 'neutral' | 'asc' | 'desc';
  sortIconType: 'string' | 'other';
};

const renderSortIcon = ({
  ariaLabelSortButtonNeutral,
  ariaLabelSortButtonAscending,
  ariaLabelSortButtonDescending,
  order,
  sortIconType,
}: SortingIconProps) => {
  if (order === 'neutral') {
    return <IconSort className={styles.sortIcon} aria-label={ariaLabelSortButtonNeutral} />;
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
  ariaLabelSortButtonNeutral,
  ariaLabelSortButtonAscending,
  ariaLabelSortButtonDescending,
  colKey,
  title,
  setSortingAndOrder,
  order = 'neutral',
  sortIconType = 'string',
  ...rest
}: SortingHeaderCellProps) => {
  return (
    <th className={styles.sortingHeader} scope="col" {...rest}>
      <div className={styles.sortColumnCell}>
        <button
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
            ariaLabelSortButtonNeutral,
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
