import React from 'react';

import 'hds-core';
import styles from './Breadcrumb.module.scss';
import { Link } from '../link';
import { IconAngleLeft, IconAngleRight } from '../../icons';

export type BreadcrumbInfo = { title: string; path: string | null };
export type BreadcrumbProps = { list: BreadcrumbInfo[] };

const LinkItem = ({ item }: { item: BreadcrumbInfo }) => {
  return (
    <Link href={item.path} className={styles.link}>
      {item.title}
    </Link>
  );
};

const BreadcrumbItem = ({ item }: { item: BreadcrumbInfo }) => {
  const hasPath = item.path !== null;
  return (
    <li className={styles.item}>
      {hasPath ? <LinkItem item={item} /> : <span className={styles.currentPage}>{item.title}</span>}
    </li>
  );
};

const Separator = ({ direction = 'right' }: { direction?: 'left' | 'right' }) => {
  const IconComponent = direction === 'right' ? IconAngleRight : IconAngleLeft;
  return (
    <span className={styles.separator} aria-hidden>
      <IconComponent size="xs" />
    </span>
  );
};

const MobileView = ({ item }: { item: BreadcrumbInfo }) => {
  return (
    <div className={styles.mobileView}>
      <Separator direction="left" />
      <LinkItem item={item} />
    </div>
  );
};
const DesktopListView = ({ list }: BreadcrumbProps) => {
  return (
    <ol className={styles.breadcrumb}>
      {list.map((item, index) => (
        <>
          {index > 0 && <Separator />}
          <BreadcrumbItem item={item} />
        </>
      ))}
    </ol>
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
      <DesktopListView list={list} />
      <MobileView item={lastItemWithPath} />
    </div>
  );
};
