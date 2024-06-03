import React from 'react';

import '../../styles/base.module.css';
import styles from './Breadcrumb.module.scss';
import { Link } from '../link';
import { IconAngleLeft, IconAngleRight } from '../../icons';
import classNames from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';
import { IconSize } from '../../icons/Icon.interface';

export interface BreadcrumbCustomTheme {
  /**
   * Custom horizontal margins for small screens.
   * This is for the mobile view with only a single visible path.
   * Default --spacing-layout-2-xs
   */
  '--horizontal-margin-small'?: string;
  /**
   * Custom horizontal margins for medium screens
   * Default --spacing-layout-xs
   */
  '--horizontal-margin-medium'?: string;
  /**
   * Custom horizontal margins for large screens
   * Default --spacing-layout-xs
   */
  '--horizontal-margin-large'?: string;
  /**
   * Custom horizontal margins for x-large screens
   * Default --spacing-layout-s
   */
  '--horizontal-margin-x-large'?: string;
}

export type BreadcrumbListItem = { title: string; path: string | null };
export type BreadcrumbProps = {
  /**
   * Aria-label for the created <nav> element
   */
  ariaLabel: string;
  /**
   * Array of items that should be shown in the breadcrumb.
   */
  list: BreadcrumbListItem[];
  /**
   * Custom theme styles
   */
  theme?: BreadcrumbCustomTheme;
};

const LinkItem = ({ item }: { item: BreadcrumbListItem }) => {
  return (
    <Link href={item.path} className={styles.link}>
      {item.title}
    </Link>
  );
};

const Separator = ({ direction = 'right' }: { direction?: 'left' | 'right' }) => {
  const isRightArrow = direction === 'right';
  const IconComponent = isRightArrow ? IconAngleRight : IconAngleLeft;
  const classList = isRightArrow ? styles.separator : styles.backArrow;
  const size = isRightArrow ? IconSize.ExtraSmall : IconSize.Small;
  return (
    <span className={classList} aria-hidden>
      <IconComponent size={size} />
    </span>
  );
};

const BreadcrumbItem = ({ item, showSeparator }: { item: BreadcrumbListItem; showSeparator: boolean }) => {
  const hasPath = item.path !== null;
  return (
    <li className={styles.listItem}>
      {hasPath ? (
        <LinkItem item={item} />
      ) : (
        <span aria-current className={styles.activeListItem}>
          {item.title}
        </span>
      )}
      {showSeparator && <Separator key={`separator-${item.title}`} />}
    </li>
  );
};

const MobileView = ({ item }: { item: BreadcrumbListItem }) => {
  return (
    <div className={classNames(styles.list, styles.mobileList)}>
      <Separator direction="left" />
      <LinkItem item={item} />
    </div>
  );
};

const DesktopListView = ({ list }: { list: BreadcrumbListItem[] }) => {
  return (
    <ol className={classNames(styles.list, styles.desktopList)}>
      {list.map((item, index) => (
        <React.Fragment key={item.title}>
          <BreadcrumbItem key={item.title} item={item} showSeparator={index < list.length - 1} />
        </React.Fragment>
      ))}
    </ol>
  );
};

const getLastItemWithPath = (list: BreadcrumbListItem[]): BreadcrumbListItem | undefined => {
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

export const Breadcrumb = ({ list, ariaLabel, theme }: BreadcrumbProps) => {
  const customThemeClass = useTheme<BreadcrumbCustomTheme>(styles.breadcrumb, theme);
  // The breadcrumb shows a list of links to parent pages and optionally can also show the title of the current page
  // If there are no items with paths, then the breadcrumb would only show the title of the current page
  // In this case there is no need to show the breadcrumb at all
  const lastItemWithPath = getLastItemWithPath(list);
  if (!lastItemWithPath) {
    return null;
  }

  return (
    <nav aria-label={ariaLabel} className={classNames(styles.breadcrumb, customThemeClass)}>
      <DesktopListView list={list} />
      <MobileView item={lastItemWithPath} />
    </nav>
  );
};
