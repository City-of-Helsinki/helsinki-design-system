import React from 'react';

// import core base styles
import 'hds-core';
import styles from './FooterItemGroup.module.scss';
import { getChildrenAsArray } from '../../../utils/getChildren';

export const FooterItemGroup = ({ children }: React.PropsWithChildren<{}>) => {
  const childrenAsArray = getChildrenAsArray(children);
  return (
    <div className={styles.itemGroup}>
      {childrenAsArray.map((child) => {
        const { subItem } = child.props;
        return !subItem ? <h3 key={`h3-${child.key}`}>{child}</h3> : child;
      })}
    </div>
  );
};
