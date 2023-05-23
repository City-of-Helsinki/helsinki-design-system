import React, { isValidElement } from 'react';

// import base styles
import '../../../styles/base.css';

import styles from './FooterItemGroup.module.scss';
import { getChildrenAsArray } from '../../../utils/getChildren';

export const FooterItemGroup = ({ children }: React.PropsWithChildren<Record<string, unknown>>) => {
  const childrenAsArray = getChildrenAsArray(children);
  return (
    <div className={styles.itemGroup}>
      {childrenAsArray.map((child) => {
        if (isValidElement(child)) {
          const { subItem } = child.props;
          return !subItem ? <h3 key={`h3-${child.key}`}>{child}</h3> : child;
        }

        return null;
      })}
    </div>
  );
};
