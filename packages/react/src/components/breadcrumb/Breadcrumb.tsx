import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Breadcrumb.module.scss';
import { Link } from '../link';

export type BreadcrumbInfo = { title: string; path: string };
export type BreadcrumbProps = { list: BreadcrumbInfo[] };

const BreadcrumbItem = ({ item, active }: { item: BreadcrumbInfo; active: boolean }) => {
  return (
    <div className={styles.item}>
      {active ? <span className={styles.active}>{item.title}</span> : <Link href={item.path}>{item.title}</Link>}
    </div>
  );
};

const Separator = () => {
  return <span className={styles.separator}>{'\u003e'}</span>;
};

export const Breadcrumb = ({ list }: BreadcrumbProps) => {
  if (list.length < 2) {
    return null;
  }

  return (
    <div className={styles.breadcrumb}>
      {list.map((item, index) => (
        <>
          {index > 0 && <Separator />}
          <BreadcrumbItem item={item} active={index === list.length - 1} />
        </>
      ))}
    </div>
  );
};
