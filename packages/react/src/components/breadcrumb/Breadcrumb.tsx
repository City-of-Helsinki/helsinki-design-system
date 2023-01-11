import React from 'react';

import 'hds-core';
import styles from './Breadcrumb.module.scss';
import { Link } from '../link';
import { IconAngleLeft, IconAngleRight } from '../../icons';

export type BreadcrumbInfo = { title: string; path: string | null };
export type BreadcrumbProps = { list: BreadcrumbInfo[]; label?: string };

const LinkItem = ({ item }: { item: BreadcrumbInfo }) => {
  return (
    <Link href={item.path} className={styles.link}>
      {item.title}
    </Link>
  );
};

const Separator = ({ direction = 'right' }: { direction?: 'left' | 'right' }) => {
  const isRightArrow = direction === 'right';
  const IconComponent = isRightArrow ? IconAngleRight : IconAngleLeft;
  const classNames = isRightArrow ? styles.separator : styles.backArrow;
  const size = isRightArrow ? 'xs' : 's';
  return (
    <span className={classNames} aria-hidden>
      <IconComponent size={size} />
    </span>
  );
};

const BreadcrumbItem = ({ item, showSeparator }: { item: BreadcrumbInfo; showSeparator: boolean }) => {
  const hasPath = item.path !== null;
  return (
    <li className={styles.item}>
      {hasPath ? <LinkItem item={item} /> : <span className={styles.currentPage}>{item.title}</span>}
      {showSeparator && <Separator key={`separator-${item.title}`} />}
    </li>
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
const DesktopListView = ({ list }: { list: BreadcrumbInfo[] }) => {
  return (
    <ol className={styles.breadcrumb}>
      {list.map((item, index) => (
        <React.Fragment key={item.title}>
          <BreadcrumbItem key={item.title} item={item} showSeparator={index < list.length - 1} />
        </React.Fragment>
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

export const Breadcrumb = ({ list, label = 'Murupolku' }: BreadcrumbProps) => {
  // The breadcrumb shows a list of links to parent pages and optionally can also show the title of the current page
  // If there are no items with paths, then the breadcrumb would only show the title of the current page
  // In this case there is no need to show the breadcrumb at all
  const lastItemWithPath = getLastItemWithPath(list);
  if (!lastItemWithPath) {
    return null;
  }

  return (
    <nav aria-label={label} className={styles.container}>
      <DesktopListView list={list} />
      <MobileView item={lastItemWithPath} />
    </nav>
  );
};
