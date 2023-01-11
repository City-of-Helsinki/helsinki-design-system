import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Breadcrumb.module.scss';
import { Link } from '../link';

export type BreadcrumbInfo = { title: string; path: string | null };
export type BreadcrumbProps = { list: BreadcrumbInfo[] };

const BreadcrumbItem = ({ item }: { item: BreadcrumbInfo }) => {
  const hasPath = item.path !== null;
  return (
    <div className={styles.item}>
      {hasPath ? <Link href={item.path}>{item.title}</Link> : <span className={styles.currentPage}>{item.title}</span>}
    </div>
  );
};

const Separator = () => {
  return <span className={styles.separator}>{'\u003e'}</span>;
};

const MobileView = ({ item }: { item: BreadcrumbInfo }) => {
  return (
    <div className={styles.mobileView}>
      <span className={styles.separator}>{'\u2039'}</span>
      <Link href={item.path}>{item.title}</Link>
    </div>
  );
};

const getLastItemWithPath = (list: BreadcrumbInfo[]): BreadcrumbInfo | undefined => {
  return list.reduceRight((currentValue, currentItem) => {
    if (currentValue) {
      return currentValue;
    }
    if (currentItem.path) {
      return currentItem;
    }
    return undefined;
  }, undefined);
};

export const Breadcrumb = ({ list }: BreadcrumbProps) => {
  // The breadcrumb shows a list of links to parent pages and optionally can also show the title of the current page
  // If there are no items with paths, then the breadcrumb would only show the title of the current page
  // In this case there is no need to show the breadcrumb at all
  const lastItemWithPath = getLastItemWithPath(list);
  if (!lastItemWithPath) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        {list.map((item, index) => (
          <>
            {index > 0 && <Separator />}
            <BreadcrumbItem item={item} />
          </>
        ))}
      </div>
      <MobileView item={lastItemWithPath} />
    </div>
  );
};
